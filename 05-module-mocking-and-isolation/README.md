# 05-module-mocking-and-isolation

## 목표

- import 시점에 고정되는 의존성을 어떻게 테스트할지 작은 예제로 정리한다.

## 교재 대응

- 5장 `의존성 모킹과 테스트 격리`

## 도달 상태

- `audit.service`를 기준으로 import 시점 상태 읽기
- ESM에서 `unstable_mockModule()` 사용
- 동적 `import()`와 import 순서 제어
- `resetModules()`와 `isolateModulesAsync()` 예제
- 환경 변수, 모듈 캐시, mock 상태를 함께 정리하는 기준
