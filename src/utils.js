export function randomHex (max, width = null) {
  let result = Math.floor(Math.random() * max).toString(16).toUpperCase()
  if (width) {
    result = result.padStart(2, '0')
  }
  return result.toUpperCase()
}

export function randomColorString () {
  const r = randomHex(256, 2)
  const g = randomHex(256, 2)
  const b = randomHex(256, 2)
  return `#${r}${g}${b}`
}
