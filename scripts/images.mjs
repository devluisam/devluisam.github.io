// Otimiza as imagens do portfólio.
//
// Entrada:  assets-src/projetos/<slug>/<nome>.(png|jpg|jpeg|webp)
//           assets-src/sobre/<nome>.(png|jpg|jpeg|webp)
// Saída:    img/projetos/<slug>/<nome>.webp      (até 1600 px de largura)
//           img/projetos/<slug>/<nome>-800.webp  (versão leve para os cards)
//           img/sobre/<nome>.webp
//
// Uso: npm run images   (requer `npm install` uma vez, por causa do sharp)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'img');
const EXT = /\.(png|jpe?g|webp)$/i;

async function convert(file, outDir, { max = 1600, small = 800, quality = 78 } = {}) {
  const name = path.basename(file).replace(EXT, '');
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(file).metadata();
  const width = Math.min(meta.width, max);
  await sharp(file).resize({ width }).webp({ quality, effort: 6 }).toFile(path.join(outDir, `${name}.webp`));
  if (small && meta.width > small * 1.2) {
    await sharp(file).resize({ width: small }).webp({ quality: quality - 4, effort: 6 }).toFile(path.join(outDir, `${name}-${small}.webp`));
  }
  return `${path.relative(ROOT, outDir)}/${name}.webp`;
}

let count = 0;
const projetos = path.join(SRC, 'projetos');
if (fs.existsSync(projetos)) {
  for (const slug of fs.readdirSync(projetos)) {
    const dir = path.join(projetos, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const files = fs.readdirSync(dir).filter((f) => EXT.test(f)).sort();
    for (const f of files) {
      console.log('✓', await convert(path.join(dir, f), path.join(OUT, 'projetos', slug)));
      count++;
    }
    // imagem de compartilhamento (WhatsApp, LinkedIn…) a partir da capa
    if (files.length) {
      await sharp(path.join(dir, files[0]))
        .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(OUT, 'projetos', slug, 'og.jpg'));
    }
  }
}
const sobre = path.join(SRC, 'sobre');
if (fs.existsSync(sobre)) {
  for (const f of fs.readdirSync(sobre).filter((f) => EXT.test(f))) {
    console.log('✓', await convert(path.join(sobre, f), path.join(OUT, 'sobre'), { max: 900, small: 0, quality: 76 }));
    count++;
  }
}
console.log(`${count} imagem(ns) otimizada(s).`);
