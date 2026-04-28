const fs = require('fs')
const path = require('path')
const root = 'D:/LosAngelous/Los/LosTeaWeb/src'
function walk(dir, out=[]) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (/\.(vue|ts|css)$/.test(name)) out.push(full)
  }
  return out
}
const patterns = [
  { name: 'root img src', re: /src=["']\//g },
  { name: 'root css url', re: /url\(["']?\//g },
  { name: 'root image string', re: /image:\s*["']\//g },
  { name: 'root fetch', re: /fetch\(["']\//g },
  { name: 'public jpg/png literal', re: /["']\/[^"']+\.(?:jpg|png|jpeg|webp|gif)["']/gi },
]
for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8')
  const lines = text.split(/\r?\n/)
  let any = false
  for (const {name,re} of patterns) {
    re.lastIndex = 0
    if (re.test(text)) any = true
  }
  if (!any) continue
  console.log('--- ' + path.relative(root, file))
  lines.forEach((line, i) => {
    if (patterns.some(({re}) => { re.lastIndex = 0; return re.test(line) })) {
      console.log(`${i+1}: ${line.trim()}`)
    }
  })
}
