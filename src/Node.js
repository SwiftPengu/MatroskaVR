import uuid from 'uuid/v4'

// A node
class Node {
  constructor (element) {
    this.parent = null
    this.children = []
    this.element = element
    this.uuid = uuid()
  }

  addChild (child) {
    if (child) {
      this.children.push(child)
      child.parent = this
    }
  }

  hasParent () {
    return this.parent != null
  }
}

export default Node
