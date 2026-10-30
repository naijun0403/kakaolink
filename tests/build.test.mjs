import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { parse } from 'acorn';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = join(projectDirectory, 'dist');

test('build emits ES2020 with resolvable CommonJS imports at the package entry', async () => {
    const entries = await readdir(outputDirectory, { recursive: true });
    const javascriptFiles = entries.filter(entry => entry.endsWith('.js'));
    const emittedFiles = new Set(javascriptFiles.map(entry => resolve(outputDirectory, entry)));
    const packageJson = JSON.parse(await readFile(join(projectDirectory, 'package.json'), 'utf8'));

    assert.ok(emittedFiles.has(resolve(projectDirectory, packageJson.main)));
    assert.ok(javascriptFiles.length > 1);
    assert.equal(entries.some(entry => entry.endsWith('.d.ts')), false);

    for (const filename of javascriptFiles) {
        const filePath = join(outputDirectory, filename);
        const code = await readFile(filePath, 'utf8');
        assert.doesNotThrow(() => parse(code, { ecmaVersion: 2020 }), filename);

        for (const [, dependency] of code.matchAll(/require\(["'](\.[^"']*)["']\)/g)) {
            const dependencyPath = resolve(dirname(filePath), dependency);
            assert.ok(
                emittedFiles.has(dependencyPath)
                    || emittedFiles.has(`${dependencyPath}.js`)
                    || emittedFiles.has(join(dependencyPath, 'index.js')),
                `${filename}: missing ${dependency}`
            );
        }
    }
});

test('build preserves the bundled crypto-js runtime', async () => {
    const source = await readFile(join(projectDirectory, 'src/modules/crypto-js.js'));
    const output = await readFile(join(outputDirectory, 'modules/crypto-js.js'));
    assert.deepEqual(output, source);
});
