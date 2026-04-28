const fs = require('fs')
const path = require('path')
const root = 'D:/LosAngelous/Los/LosTeaWeb/src'
const exts = new Set(['.vue', '.ts'])
const imageRe = /\/(?:[^\s"'`)]+)\.(?:jpg|png|jpeg|webp|gif)/g
function walk(dir,out=[]) { for (const name of fs.readdirSync(dir)) { const full=path.join(dir,name); const st=fs.statSync(full); if(st.isDirectory()) walk(full,out); else if(exts.has(path.extname(name))) out.push(full)} return out }
for (const f of walk(root)) {
  let s = fs.readFileSync(f,'utf8')
  let next = s
  const hits = new Set([...s.matchAll(imageRe)].map(m=>m[0]))
  if (!hits.size) continue
  for (const hit of hits) {
    const name = hit.slice(1)
    next = next.split(`src="/${name}"`).join(`:src="assetUrl('${name}')"`)
    next = next.split(`image: '/${name}'`).join(`image: assetUrl('${name}')`)
    next = next.split(`url('/${name}')`).join(`url('${hit}')`)
  }
  if (next !== s) {
    if (!next.includes("import { assetUrl } from '@/utils/asset'")) {
      const idx = next.indexOf('<script setup')
      if (idx >= 0) {
        const scriptEnd = next.indexOf('>', idx) + 1
        next = next.slice(0, scriptEnd) + "\nimport { assetUrl } from '@/utils/asset'" + next.slice(scriptEnd)
      }
    }
    fs.writeFileSync(f,next,'utf8')
    console.log('updated', path.relative(root,f))
  }
}
