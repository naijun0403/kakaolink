const { default: commonjs } = require('@rollup/plugin-commonjs');

module.exports = {
    input: './index.js',
    output: {
        name: 'kakaolink',
        file: './dist/kakaolink.js',
        format: 'cjs',
        compact: true,
        sourcemap: true,
    },
    plugins: [
        commonjs(),
    ]
}