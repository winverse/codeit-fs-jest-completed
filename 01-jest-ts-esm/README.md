# 01-jest-ts-esm

## 목표

- Jest, TypeScript, ESM 조합을 안정적으로 실행 가능한 상태로 만듭니다.

## 교재 대응

- 1장 `1-04 Jest + TypeScript + ESM 설정`
- 1장 `1-05 첫 테스트 실행`

## 도달 상태

- `package.json`, `tsconfig.json`, `jest.config.mjs`가 현재 폴더 안에서 바로 읽히는 상태입니다.
- Jest, TypeScript, ESM을 함께 쓰는 최소 설정이 완성된 상태입니다.
- `src/add.ts`, `src/add.spec.ts`로 첫 테스트를 실행할 수 있는 상태입니다.
- `src/shipping-fee.ts`, `src/shipping-fee.spec.ts`로 분기 coverage를 확인할 수 있는 상태입니다.
- `#src/*` alias가 함께 잡혀 있습니다.
- `pnpm test:cov`로 비어 있는 분기를 확인하는 첫 기준점이 준비된 상태입니다.
