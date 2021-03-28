class Listener {
  constructor(element, recognizer) {
    this.contexts = new Map()

    this.isListenerMouse = false // 是否已经监听了鼠标的一些操作
    // this.element = element
    element.addEventListener('mousedown', (event) => {
      const context = Object.create(null)
      this.contexts.set('mouse_' + (1 << event.button), context)

      const mousemove = (event) => {
        let button = 1

        while (button <= event.buttons) {
          if (button & event.buttons) {
            let key
            if (event.buttons === 2) {
              key = 4
            } else if (event.buttons === 4) {
              key = 2
            } else {
              key = event.buttons
            }
            let context = this.contexts.get('mouse_' + key)
            recognizer.move(event, context)
          }
          button = button << 1
        }
      }
      const mouseup = (event) => {
        let context = this.contexts.get('mouse_' + (1 << event.button))
        recognizer.end(event, context)
        this.contexts.delete('mouse_' + (1 << event.button))

        // 确保鼠标所有按下的键都已经抬起，再停止监听
        if (this.contexts.size === 0) {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
          this.isListenerMouse = false
        }
      }

      recognizer.start(event, context)
      // 鼠标按下左键后，再按下右键，这样下面两个监听会被重复添加，这里做一下判断处理
      if (!this.isListenerMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        this.isListenerMouse = true
      }
    })

    element.addEventListener('touchstart', (event) => {
      let changedTouches = event.changedTouches
      for (let point of changedTouches) {
        let context = Object.create(null)
        this.contexts.set(point.identifier, context)
        recognizer.start(point, context)
      }
    })
    element.addEventListener('touchmove', (event) => {
      let changedTouches = event.changedTouches
      for (let point of changedTouches) {
        recognizer.move(point, this.contexts.get(point.identifier))
      }
    })
    element.addEventListener('touchend', (event) => {
      let changedTouches = event.changedTouches
      for (let point of changedTouches) {
        let context = this.contexts.get(point.identifier)
        recognizer.end(point, context)
        this.contexts.delete(point.identifier)
      }
    })
    element.addEventListener('touchcancel', (event) => {
      let changedTouches = event.changedTouches
      for (let point of changedTouches) {
        let context = this.contexts.get(point.identifier)
        recognizer.cancel(point, context)
        this.contexts.delete(point.identifier)
      }
    })
  }
}

class Recognizer {
  constructor(dispatch) {
    this.dispatch = dispatch
  }
  start(point, context) {
    // console.log('start', point.clientX, point.clientY)
    context.startX = point.clientX
    context.startY = point.clientY
    context.isTap = true // 普通点
    context.isPan = false // 拖拽
    context.isPress = false // 长按
    // 记录move时点的时间和坐标，用于判断是否是快速移动
    context.flickArr = [
      {
        x: point.clientX,
        y: point.clientY,
        t: Date.now(),
      },
    ]
    this.dispatch.dispatch('start', {
      clientX: point.clientX,
      clientY: point.clientY,
    })
    context.handler = setTimeout(() => {
      context.isTap = false // 普通点
      context.isPan = false // 拖拽
      context.isPress = true // 长按
      this.dispatch.dispatch('press', {})
    }, 500)
  }

  move(point, context) {
    // console.log('move', point.clientX, point.clientY)
    ;(context.clientX = point.clientX), (context.clientY = point.clientY)
    let dx = context.clientX - context.startX,
      dy = context.clientY - context.startY
    context.isVertical = Math.abs(dx) < Math.abs(dy) // 拖拽的方向

    // 有效的拖拽（拖拽距离超过10px）
    if (!context.isPan && dx ** 2 + dy ** 2 >= 100) {
      clearTimeout(context.handler)
      context.isTap = false // 普通点
      context.isPan = true // 拖拽
      context.isPress = false // 长按
      this.dispatch.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: context.clientX,
        clientY: context.clientY,
        isVertical: context.isVertical,
      })
    }

    if (context.isPan) {
      this.dispatch.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: context.clientX,
        clientY: context.clientY,
        isVertical: context.isVertical,
      })
    }

    // 只留下半秒内的点
    context.flickArr = context.flickArr.filter(
      (point) => Date.now() - point.t <= 500
    )
    context.flickArr.push({
      x: point.clientX,
      y: point.clientY,
      t: Date.now(),
    })
  }

  end(point, context) {
    clearTimeout(context.handler)
    if (context.isTap) {
      // 是点击
      this.dispatch.dispatch('tap', {})
    } else if (context.isPress) {
      // 是长按
      this.dispatch.dispatch('pressend', {})
    }

    let v // 最后的速度
    if (!context.flickArr.length) {
      v = 0
    } else {
      let firstPoint = context.flickArr[0]
      let d = Math.pow(
        (point.clientX - firstPoint.x) ** 2 +
          (point.clientY - firstPoint.y) ** 2,
        0.5
      )
      let t = Date.now() - firstPoint.t
      v = d / t
    }

    // 速度超过阈值
    if (v > 0.5) {
      context.isFlick = true
      this.dispatch.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: context.clientX,
        clientY: context.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      })
    } else {
      context.isFlick = false
    }

    if (context.isPan) {
      // 是拖拽
      this.dispatch.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: context.clientX,
        clientY: context.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      })
    }
    this.dispatch.dispatch('end', {
      startX: context.startX,
      startY: context.startY,
      clientX: context.clientX || context.startX,
      clientY: context.clientY || context.startY,
      isVertical: context.isVertical,
      isFlick: context.isFlick,
      velocity: v,
    })
  }

  cancel(point, context) {
    // console.log('cancel', point.clientX, point.clientY)
    clearTimeout(context.handler)
    this.dispatch.dispatch('cancel', {})
  }
}

// 事件派发
class Dispatch {
  constructor(element) {
    this.element = element
  }
  dispatch(type, properties) {
    const event = new Event(type)
    for (let key in properties) {
      event[key] = properties[key]
    }
    this.element.dispatchEvent(event)
  }
}

export const enableGesture = (window.enableGesture = function (element) {
  new Listener(element, new Recognizer(new Dispatch(element)))
})
