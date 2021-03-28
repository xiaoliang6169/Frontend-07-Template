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

手势动画应用
1. 给Carousel添加Gesture和Animation
2. 处理Gesture 和 Animation 的结合
    捡起播放中的图片
    利用 pan 事件进行拖拽
    利用 end 事件处理手势结束后的事情

添加更多属性
优化变量作用域
添加状态控制
给carousel添加event属性

内容型children
模板型children


