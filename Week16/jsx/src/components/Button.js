import { Component, createElement } from '../utils/framework'

export default class Button extends Component {
  constructor() {
    super()
    this.childContent = <span></span>
  }
  appendChild(child) {
    this.childContent.appendChild(child)
  }

  render() {
    this.root = (<button>{this.childContent}</button>).render()
    return this.root
  }
}
