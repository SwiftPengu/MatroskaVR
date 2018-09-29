import AFRAME from 'aframe'
import 'aframe-extras' // Grid
import template from './index.hbs'
import Node from './Node'

let currentNode = null
let scene = null
document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = template()
  scene = document.querySelector('a-scene')
  console.log('scene added')

  // Set-up navigation system
  currentNode = new Node()

  document.querySelector('#floor').addEventListener('click', (ev) => spawnObject(ev))
})

function spawnObject (ev) {
  const loc = ev.detail.intersection.point
  const newObject = document.createElement('a-sphere')
  newObject.setAttribute('position', loc)
  newObject.addEventListener('componentinitialized', (ev) => {
    const mat = ev.target.getAttribute('material')
    ev.target.setAttribute('color', randomColorString())
    if (mat) {
      mat.color = randomColorString()
    }
  })
  scene.appendChild(newObject)
}

function randomColorString () {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return '#' + (r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase()
}
window.randomColorString = randomColorString
