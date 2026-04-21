# 05-express-foundation

## 목표

- Express 앱을 `ESM + TypeScript` 기준으로 다시 세웁니다.
- 런타임 구조는 `codeit-fs-express-typescript`처럼 읽히도록 정리합니다.
- 아직 테스트 파일과 테스트 유틸은 넣지 않습니다.

## 교재 대응

- 4장 이후 Express 테스트로 넘어가기 전 준비 단계

## 도달 상태

- `App`, `main`, `Controller`, `Service`, `Repository`, `Provider`가 구분된 상태입니다.
- 런타임 코드는 `src/` 아래에만 있고, 테스트 보조물은 아직 들어오지 않은 상태입니다.
- 단위 테스트 경계를 설명할 수 있는 최소 구조가 준비된 상태입니다.
- 테스트 파일은 아직 없지만, 각 계층의 동작과 기대 결과를 문장으로 정리할 수 있는 상태입니다.
- 이후 `06-express-unit-tests`에서 테스트 레이어를 붙일 준비가 끝난 상태입니다.
