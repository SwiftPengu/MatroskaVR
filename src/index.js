import 'aframe'
import 'aframe-extras' // Grid
import template from './index.hbs'
import Node from './Node'

// The world data
const rootNode = new Node()
window.rootNode = rootNode
let currentNode = rootNode
let scene = null

document.addEventListener('DOMContentLoaded', () => {
  scene = setupPage()
  setupInteractivity()
})

function setupPage () {
  // Inject HTML
  document.body.innerHTML = template()
  document.querySelector('#grid').src = require('../assets/grid.png')
  return document.querySelector('a-scene')
}

function setupInteractivity () {
  // Register clicks on the floor
  document.querySelector('#floor').addEventListener('click', (ev) =>
    spawnObject(ev.detail.intersection.point)
  )
}

// Initializes and spawns a node at the provided location
function spawnObject (location, color = null) {
  if (scene) {
    const newObject = document.createElement('a-sphere')
    newObject.setAttribute('position', location)
    newObject.setAttribute('color', randomColorString())

    // Add a node
    const newNode = new Node(newObject)
    currentNode.addChild(newNode)
    scene.appendChild(newObject)

    console.log('New node added', newNode)
  } else {
    console.warn('Warning trying to add objects before scene was loaded')
  }
}

function randomHex (max, width = null) {
  let result = Math.floor(Math.random() * max).toString(16).toUpperCase()
  if (width) {
    result = result.padStart(2, '0')
  }
  return result.toUpperCase()
}

function randomColorString () {
  const r = randomHex(256, 2)
  const g = randomHex(256, 2)
  const b = randomHex(256, 2)
  return `#${r}${g}${b}`
}
