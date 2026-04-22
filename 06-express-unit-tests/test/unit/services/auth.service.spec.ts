import { jest } from '@jest/globals';
import { PlainPasswordProvider } from '#src/providers/password.provider.js';
import { AuthService } from '#src/services/auth.service.js';
import { teacherUserRecord } from '#test/mock/users.js';
import { StubPasswordProvider } from '#test/stub/providers/password.provider.js';
import { StubUserRepository } from '#test/stub/repository/user.repository.js';

describe('AuthService', () => {
  test('email과 password가 모두 맞으면 공개 사용자 정보를 돌려준다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findByEmail.mockResolvedValue(teacherUserRecord);
    const passwordProvider = new StubPasswordProvider();
    const service = new AuthService(userRepository, passwordProvider);

    passwordProvider.compare.mockResolvedValue(true);

    await expect(service.login('teacher@example.com', 'pw')).resolves.toEqual({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    });
    expect(passwordProvider.compare).toHaveBeenCalledWith(
      'pw',
      teacherUserRecord.passwordHash,
    );
  });

  test('비밀번호가 틀리면 null을 돌려준다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findByEmail.mockResolvedValue(teacherUserRecord);
    const passwordProvider = new StubPasswordProvider();
    const service = new AuthService(userRepository, passwordProvider);

    passwordProvider.compare.mockResolvedValue(false);

    await expect(
      service.login('teacher@example.com', 'wrong'),
    ).resolves.toBeNull();
  });

  test('사용자를 찾지 못하면 password 비교를 건너뛴다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findByEmail.mockResolvedValue(null);
    const passwordProvider = new StubPasswordProvider();
    const service = new AuthService(userRepository, passwordProvider);

    await expect(
      service.login('missing@example.com', 'pw'),
    ).resolves.toBeNull();
    expect(passwordProvider.compare).not.toHaveBeenCalled();
  });

  test('실제 객체를 유지한 채 spyOn으로 compare 호출을 검증할 수 있다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findByEmail.mockResolvedValue(teacherUserRecord);
    const passwordProvider = new PlainPasswordProvider();
    const compareSpy = jest
      .spyOn(passwordProvider, 'compare')
      .mockResolvedValue(true);
    const service = new AuthService(userRepository, passwordProvider);

    await expect(service.login('teacher@example.com', 'pw')).resolves.toEqual({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    });
    expect(compareSpy).toHaveBeenCalledWith('pw', 'pw');
  });

  test('사용자 id가 있으면 공개 프로필을 돌려준다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findById.mockResolvedValue(teacherUserRecord);
    const passwordProvider = new StubPasswordProvider();
    const service = new AuthService(userRepository, passwordProvider);

    await expect(service.getUserProfile(1)).resolves.toEqual({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    });
  });

  test('사용자 id로 찾지 못하면 null을 돌려준다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findById.mockResolvedValue(null);
    const passwordProvider = new StubPasswordProvider();
    const service = new AuthService(userRepository, passwordProvider);

    await expect(service.getUserProfile(999)).resolves.toBeNull();
  });
});
