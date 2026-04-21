# 04-module-mocking-and-isolation

## 목표

- 모듈 모킹과 테스트 간섭 차단 전략을 교육용 최소 예제로 정리한다.

## 교재 대응

- 5장 `의존성 모킹과 테스트 격리`

## 도달 상태

- ESM에서 `unstable_mockModule` 사용
- 동적 `import()`와 import 시점 순서 제어
- `resetModules`와 `isolateModulesAsync` 예제
- 환경 변수와 모듈 캐시 정리 예제
- 모듈 수준 상태를 테스트별로 안전하게 끊는 기준선 확보
