# How to Build

## 프로젝트 빌드 및 검사

Node.js 20.x에서는 20.19 이상, 그 외에는 22.12 이상과 `package.json`에 지정된 pnpm을 사용합니다.
CI는 Node.js 24를 사용합니다.

```sh
pnpm install --frozen-lockfile
pnpm check      # 린트 및 타입 검사
pnpm build      # dist/ 생성
pnpm test       # 빌드 후 ES2020 문법, CommonJS 경로, crypto-js 복사 검증
pnpm lint:fix   # 자동 수정 가능한 린트 문제 수정
```

- `tsconfig.json`: TypeScript 7의 엄격한 타입 검사와 ES2020/CommonJS 컴파일을 담당합니다.
  `node16` 모듈 설정은 기존 CommonJS 해석을 유지하며, `rootDir`로 출력 경로를 명시합니다.
- `build.sh`: 출력 디렉터리를 비우고 컴파일러를 실행한 뒤 포함된 JS 파일을 복사합니다.
  타입 오류가 있으면 빌드가 중단되고, 외부 선언 파일은 결과에 포함하지 않습니다.
- `.oxlintrc.json`: Oxlint 규칙과 GraalJS·예제·테스트 실행 환경을 정의합니다.
  직접 관리하는 코드를 검사하고, 생성물과 외부 코드는 제외합니다.
- `tests/build.test.mjs`: 런타임에 전달할 결과물의 문법·모듈 경로·외부 JS 보존을 검증합니다.

`package.json`과 CI가 검사와 빌드를 실행하고, 각 도구가 설정과 소스를 읽습니다.
런타임 코드는 개발 도구에 의존하지 않습니다.

## crypto-js 빌드 방법

> 필수 요소: rollup (@rollup/plugin-commonjs, @rollup/plugin-babel), babel (@babel/preset-env)

1. `git clone https://github.com/brix/crypto-js.git` 으로 레포지토리를 클론합니다.
2. 필수 요소를 설치합니다.
3. `rollup.config.js` 파일을 생성합니다.
4. `rollup -c` 로 빌드합니다.
5. `dist` 폴더에 빌드된 파일이 있습니다.

`rollup.config.js` 파일은 다음과 같습니다.

```js
const { default: commonjs } = require('@rollup/plugin-commonjs');
const { default: babel } = require('@rollup/plugin-babel');

module.exports = {
    input: './index.js',
    output: {
        name: 'crypto-js',
        file: './dist/crypto-js.js',
        format: 'cjs',
        compact: true,
        sourcemap: true,
    },
    plugins: [
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        targets: {
                            browsers: ['last 2 versions', 'ie >= 11'],
                        },
                    },
                ],
            ],
        }),
    ]
}
```
