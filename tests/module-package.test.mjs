import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { before, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
const moduleDirectory = join(projectDirectory, 'artifacts/module/kakaolink');

before(() => {
    execFileSync(process.execPath, [join(projectDirectory, 'scripts/package-module.mjs')], {
        cwd: tmpdir(), stdio: 'pipe'
    });
});

test('packaged module loads by name after installation in a standalone modules directory', async t => {
    const directory = await mkdtemp(join(tmpdir(), 'kakaolink-module-'));
    t.after(() => rm(directory, { recursive: true, force: true }));
    await cp(moduleDirectory, join(directory, 'node_modules/kakaolink'), { recursive: true });
    const require = createRequire(join(directory, 'app.js'));
    const { KakaoLink } = require('kakaolink');
    for (const method of ['login', 'web', 'intent', 'openIntent']) {
        assert.equal(typeof KakaoLink[method], 'function', method);
    }
});

test('module metadata points at the root entry and excludes development files', async () => {
    const sourcePackage = JSON.parse(await readFile(join(projectDirectory, 'package.json'), 'utf8'));
    const modulePackage = JSON.parse(await readFile(join(moduleDirectory, 'package.json'), 'utf8'));
    assert.equal(modulePackage.name, sourcePackage.name);
    assert.equal(modulePackage.version, sourcePackage.version);
    assert.equal(modulePackage.main, 'index.js');
    for (const key of ['scripts', 'devDependencies', 'packageManager']) {
        assert.equal(key in modulePackage, false, key);
    }
    const entries = await readdir(moduleDirectory);
    for (const name of ['src', 'dist', 'node_modules', 'tests', 'scripts', '.github', 'build.sh', 'pnpm-lock.yaml']) {
        assert.equal(entries.includes(name), false, name);
    }
});

test('module includes the bundled runtime, license, API documentation and examples', async () => {
    const runtime = await readFile(join(moduleDirectory, 'modules/crypto-js.js'));
    assert.deepEqual(runtime, await readFile(join(projectDirectory, 'dist/modules/crypto-js.js')));
    for (const name of ['LICENSE', 'readme.md', 'docs/API.md', 'docs/HOW_TO_BUILD.md',
        'example/loginWithKakaotalk.js', 'example/sendWithIntent.js', 'example/sendPreparedIntent.js']) {
        const content = await readFile(join(moduleDirectory, name), 'utf8');
        assert.ok(content.length > 0, name);
    }
});
