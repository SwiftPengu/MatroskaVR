import AFRAME from 'aframe'
import template from './index.hbs'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = template()
  console.log('scene added')
})
