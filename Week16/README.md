组件化

对象
properties 属性
methods 方法
inherit 继承关系

组件
properties 强调从属关系
methods
inherit
attribute 特性  强调描述性
config & state 配置(构造函数传参)和状态
event 事件机制(往外传递)
lifecycle 生命周期
children    结构的必要性

动画：
setInterval(() => {}, 16)
let tick = () => {
    setTimeout(tick, 16)
}
let tick = () => {
    let handler = requestAnimationFrame(tick)
    cancelAnimationFrame(handler)
}

手势
start:
    end: tap
    move 10px: pan start
    continue 0.5s: press start

pan start: 
    move: pan move

press start:
    move 10px: pan start
    end: press end

press move:
    move: pen move
    end add speed is over xxx: flick
    end: pen end

touch cancel


