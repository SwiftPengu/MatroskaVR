// A node
class Node {
  constructor (parent = null) {
    this.parent = parent
    this.children = []
  }

  addChild (child) {
    if (child) {
      this.children.push(child)
    }
  }

  hasParent () {
    return this.parent == null
  }
}

export default Node
