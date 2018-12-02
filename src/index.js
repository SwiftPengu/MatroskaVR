import 'aframe'
import 'aframe-extras' // Grid
import Node from './Node'
import { randomColorString } from './utils.js'

import * as imgGridUrl from '../assets/grid.png'
import template from './index.hbs'

// The world data
const world = {
  rootNode: null,
  currentNode: null,
  currentContainer: null
}
window.world = world

document.addEventListener('DOMContentLoaded', () => {
  setupPage().then((scene) => {
    world.currentContainer = scene
    world.rootNode = spawnObject({ x: 0, y: 0, z: 0 })
  })
})

function setupPage () {
  return new Promise((resolve) => {
    // Inject HTML
    document.body.innerHTML = template()

    // Init the grid
    document.querySelector('#grid').src = imgGridUrl

    // Register clicks on the floor
    document.querySelector('#floor').addEventListener('click', (ev) =>
      spawnObject(ev.detail.intersection.point)
    )

    // Return the scene
    resolve(document.querySelector('a-scene'))
  })
}

// Initializes and spawns a node at the provided location
function spawnObject (location) {
  if (world.currentContainer) {
    const newObject = document.createElement('a-sphere')
    newObject.setAttribute('position', location)
    newObject.setAttribute('color', randomColorString())

    // Add a node
    console.log(newObject)
    const newNode = new Node(newObject)
    if (world.currentNode) {
      world.currentNode.addChild(newNode)
    }

    // newObject.addEventListener('click', () => {
    //   performSwitch(currentNode, newNode)
    // })

    world.currentContainer.appendChild(newObject)
    console.log('New node added', newNode)
    return newObject
  } else {
    console.warn('Warning trying to add objects before scene was loaded')
    return undefined
  }
}

// Animates 'object' such that it becomes the new reference context
// 'callback' is invoked after the animation finishes
// 'backwards' indicates whether the animation should be played backwards
function performSwitch (srcNode, targetNode, callback, backwards = false) {
  const targetElement = targetNode.element

  // Add child node elements

  // Add a return object except when moving to the rootNode
  if (targetNode !== world.rootNode) {
    // TODO use the container as targetelem instead of the scene
    addTransitionObject(targetNode, srcNode.parent, world.currentContainer)
  }

  // After animation
  world.currentNode = targetNode // Switch currentNode
  if (callback) callback()
}

function addTransitionObject (srcNode, targetNode, parentElem) {
  const returnElem = document.createElement('a-cube')
  returnElem.setAttribute('color', 'blue')
  returnElem.setAttribute('scale', '0.5 0.5 0.5')
  returnElem.addEventListener('click', () => {
    performSwitch(srcNode, targetNode, null, true)
  })

  parentElem.appendChild(returnElem)
}
