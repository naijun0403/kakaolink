#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

rm -rf ./dist
pnpm exec tsc

mkdir -p ./dist/modules
cp ./src/modules/crypto-js.js ./dist/modules/crypto-js.js
