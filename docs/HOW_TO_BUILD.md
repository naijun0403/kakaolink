# How to Build
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