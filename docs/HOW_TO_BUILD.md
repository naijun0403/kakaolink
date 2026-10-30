# How to Build

## 프로젝트 빌드 및 검사

Node.js 20.x에서는 20.19 이상, 그 외에는 22.12 이상과 `package.json`에 지정된 pnpm을 사용합니다.
CI는 Node.js 24를 사용합니다.

```sh
pnpm install --frozen-lockfile
pnpm check      # 린트 및 타입 검사
pnpm build      # dist/ 생성
pnpm package:module # 빌드 후 배포용 모듈 디렉터리 조립
pnpm test       # 빌드 후 런타임·Intent·모듈 패키징 검증
pnpm lint:fix   # 자동 수정 가능한 린트 문제 수정
```

- `tsconfig.json`: TypeScript 7의 엄격한 타입 검사와 ES2020/CommonJS 컴파일을 담당합니다.
  `node16` 모듈 설정은 기존 CommonJS 해석을 유지하며, `rootDir`로 출력 경로를 명시합니다.
- `build.sh`: 출력 디렉터리를 비우고 컴파일러를 실행한 뒤 포함된 JS 파일을 복사합니다.
  타입 오류가 있으면 빌드가 중단되고, 외부 선언 파일은 결과에 포함하지 않습니다.
- `.oxlintrc.json`: Oxlint 규칙과 GraalJS·예제·테스트 실행 환경을 정의합니다.
  직접 관리하는 코드를 검사하고, 생성물과 외부 코드는 제외합니다.
- `tests/build.test.mjs`: 런타임에 전달할 결과물의 문법·모듈 경로·외부 JS 보존을 검증합니다.
- `scripts/package-module.mjs`: 빌드된 코드와 배포용 메타데이터·문서만 조립합니다.
- `tests/module-package.test.mjs`: 독립된 설치 위치에서 모듈 로딩과 패키지 구성을 검증합니다.

`package.json`과 CI가 검사와 빌드를 실행하고, 각 도구가 설정과 소스를 읽습니다.
런타임 코드는 개발 도구에 의존하지 않습니다.

## CI 모듈 ZIP

`main`·`dev`의 push와 pull request에서 검사·빌드·테스트 후 모듈 artifact를 업로드합니다.
수동 실행 설정도 포함합니다. 해당 설정이 기본 브랜치에 반영되면 Actions의 `Build Artifacts`에서
`Run workflow`로 실행할 수 있습니다. [GitHub 수동 실행 안내](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)를 참고합니다.
실행 결과의 Artifacts에서 `kakaolink-module`을 선택하면 `kakaolink-module.zip`을 받습니다.
보관 기간은 14일입니다.

ZIP의 최상위에는 모듈 폴더가 있습니다.

```text
kakaolink/
  index.js
  package.json       # main: index.js
  auth/ intent/ web/ # 컴파일된 런타임 코드와 내부 모듈
  modules/crypto-js.js
  LICENSE
  readme.md
  docs/
  example/
```

압축을 풀어 나온 `kakaolink` 폴더를 봇의 모듈 디렉터리에 넣고 `require('kakaolink')`로 불러옵니다.
배포용 `package.json`에는 모듈 메타데이터만 포함하며 별도 의존성 설치는 필요하지 않습니다.

로컬에서도 같은 내용을 조립할 수 있습니다.

```sh
pnpm build
pnpm package:module
```

`scripts/package-module.mjs`가 빌드 결과와 문서를 `artifacts/module/kakaolink/`에 조립합니다.
CI는 `artifacts/module/`을 업로드하고, GitHub가 다운로드용 ZIP을 생성합니다.
문서와 예제는 사용 안내이며, 포함된 개발용 빌드 명령은 소스 저장소에서 실행합니다.

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
