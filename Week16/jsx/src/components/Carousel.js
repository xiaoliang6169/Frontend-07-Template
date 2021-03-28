import { Component, STATE, ATTRIBUTES } from '../utils/framework'
import { TimeLine, Animation } from '../utils/animation'
import { ease } from '../utils/ease'
import { enableGesture } from '../utils/gesture'

export { STATE, ATTRIBUTES }

export default class Carousel extends Component {
  constructor() {
    super()
  }
  render() {
    this.root = document.createElement('div')
    this.root.classList.add(this[ATTRIBUTES].class)
    let imgs = this[ATTRIBUTES].imgs
    let children = []
    for (let { src } of imgs) {
      let divDom = document.createElement('div')
      divDom.style.backgroundImage = `url('${src}')`
      divDom.classList.add('item')
      children.push(divDom)
      this.root.appendChild(divDom)
    }

    enableGesture(this.root)

    this.root.addEventListener('tap', () => {
      this.triggerEvent('click', {
        data: this[ATTRIBUTES].imgs[this[STATE].position],
        position: this[STATE].position,
      })
    })

    const timeLine = new TimeLine()
    timeLine.start()

    let handler = null // 自动轮播定时器
    this[STATE].position = 0
    let animationT = 0 // 当次轮播切换图片的开始时的时间
    let animationX = 0 // 当次轮播切换图片移动过的距离

    // 拖拽事件
    this.root.addEventListener('pan', (event) => {
      let x = event.clientX - event.startX - animationX
      let current = this[STATE].position - (x - (x % 500)) / 500 // 当前处于当中的图的序号
      let offset = x % 500
      // 分别设置它的前一张、它、它的下一张的图片
      for (let num of [-1, 0, 1]) {
        let pos = num + current // 得到了序号，但序号可能不在 children 数组的索引值范围，需要做一个循环
        pos = ((pos % children.length) + children.length) % children.length

        // 给这几张图片设置位置
        children[pos].style.transform = `translateX(${
          -pos * 500 + num * 500 + offset
        }px)`
      }
    })
    // 拖拽结束事件
    this.root.addEventListener('end', (event) => {
      timeLine.reset()
      timeLine.start()
      handler = setInterval(nextPicture, 3000)

      let x = event.clientX - event.startX - animationX
      let current = this[STATE].position - (x - (x % 500)) / 500 // 当前处于当中的图的序号

      let direction = Math.round((x % 500) / 500)

      if (event.isFlick) {
        if (event.startX < event.clientX) {
          direction = Math.ceil((x % 500) / 500)
        } else {
          direction = Math.floor((x % 500) / 500)
        }
      }

      // 分别设置它的前一张、它、它的下一张的图片
      for (let num of [-1, 0, 1]) {
        let pos = num + current // 得到了序号，但序号可能不在 children 数组的索引值范围，需要做一个循环
        pos = ((pos % children.length) + children.length) % children.length

        timeLine.add(
          new Animation(
            children[pos].style,
            'transform',
            -pos * 500 + num * 500 + (x % 500),
            -pos * 500 + num * 500 + direction * 500,
            500,
            0,
            ease,
            (v) => `translateX(${v}px)`
          )
        )
      }

      this[STATE].position = current - direction
      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length
      this.triggerEvent('change', this[STATE].position)
    })

    // 开始拖拽时
    this.root.addEventListener('start', (event) => {
      timeLine.pause()
      clearInterval(handler)

      let timeSpace = Date.now() - animationT
      let progress = (timeSpace < 500 ? timeSpace : 0) / 500
      animationX = progress ? ease(progress) * 500 - 500 : 0
    })

    // 自动轮播动画
    let nextPicture = () => {
      let nextIndex = (this[STATE].position + 1) % children.length

      animationT = Date.now()

      let nowDom = children[this[STATE].position]
      let nextDom = children[nextIndex]

      timeLine.add(
        new Animation(
          nowDom.style,
          'transform',
          -500 * this[STATE].position,
          -500 * this[STATE].position - 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      )
      timeLine.add(
        new Animation(
          nextDom.style,
          'transform',
          -500 * nextIndex + 500,
          -500 * nextIndex,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      )

      this[STATE].position = nextIndex
      this.triggerEvent('change', this[STATE].position)
    }

    // 自动轮播
    handler = setInterval(nextPicture, 3000)

    return this.root
  }
}
