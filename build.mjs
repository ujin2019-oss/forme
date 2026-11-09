import { mkdir, copyFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
await mkdir(path.join(root,'dist'),{recursive:true});
await copyFile(path.join(root,'index.html'),path.join(root,'dist/index.html'));
for (const dir of ['css','js','assets']) await cp(path.join(root,dir),path.join(root,'dist',dir),{recursive:true,filter:source=>!source.endsWith('.png')});
console.log('Static site ready in dist/');
