import { Component, createElement, ATTRIBUTES } from '../utils/framework'

export default class List extends Component {
  constructor() {
    super()
  }

  appendChild(child) {
    this.template = child
    this.render()
  }

  render() {
    let data = this[ATTRIBUTES].data || []
    this.children = data.map(this.template)
    this.root = (<div>{this.children}</div>).render()
    return this.root
  }
}
