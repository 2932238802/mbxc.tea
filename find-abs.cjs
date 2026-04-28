const fs = require('fs')
const path = require('path')
const root = 'D:/LosAngelous/Los/LosTeaWeb/src'
function walk(dir,out=[]) { for (const name of fs.readdirSync(dir)) { const full=path.join(dir,name); const st=fs.statSync(full); if(st.isDirectory()) walk(full,out); else if(/\.(vue|ts)$/.test(name)) out.push(full)} return out }
for (const f of walk(root)) {
  const s = fs.readFileSync(f,'utf8')
  if (/src="\/|url\('\/|image: '\/|to="\/|link: '\//.test(s)) {
    console.log('---', path.relative(root,f))
    s.split(/\r?\n/).forEach((line,i)=>{ if (/src="\/|url\('\/|image: '\/|to="\/|link: '\//.test(line)) console.log(i+1, line.trim())})
  }
}
