import { access, copyFile, cp, readFile, rm, writeFile } from 'node:fs/promises';

const projectDirectory = new URL('../', import.meta.url);
const artifactDirectory = new URL('artifacts/module/', projectDirectory);
const moduleDirectory = new URL('kakaolink/', artifactDirectory);
const sourcePackage = JSON.parse(await readFile(new URL('package.json', projectDirectory), 'utf8'));

await access(new URL('dist/index.js', projectDirectory));
await rm(artifactDirectory, { recursive: true, force: true });
await cp(new URL('dist/', projectDirectory), moduleDirectory, { recursive: true });

const modulePackage = {
    name: sourcePackage.name,
    version: sourcePackage.version,
    description: sourcePackage.description,
    main: 'index.js',
    author: sourcePackage.author,
    license: sourcePackage.license,
    repository: sourcePackage.repository,
    homepage: sourcePackage.homepage
};

await writeFile(new URL('package.json', moduleDirectory), JSON.stringify(modulePackage, null, 2) + '\n');
await Promise.all([
    copyFile(new URL('LICENSE', projectDirectory), new URL('LICENSE', moduleDirectory)),
    copyFile(new URL('readme.md', projectDirectory), new URL('readme.md', moduleDirectory)),
    cp(new URL('docs/', projectDirectory), new URL('docs/', moduleDirectory), { recursive: true }),
    cp(new URL('example/', projectDirectory), new URL('example/', moduleDirectory), { recursive: true })
]);

console.log('Module ready: artifacts/module/kakaolink/');
