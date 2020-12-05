
# 第一周学习总结

2014年开始做iOS开发, 2018年，开始做前端开发。一直忙于理清项目需求，完成项目功能，对于前端的系统知识，一直处于比较初级的阶段。早就想对前端能够建立自己的知识框架，苦于找不到门路，也不知道该从哪里开始系统学习。

偶然机会看到《重学前端》《前端训练营》课程，豁然开朗，这不正是专门为我设置的课程吗？对前端有个整体的认识，整体的训练。第一周的课程看了两遍，收获颇丰，对前端的进阶学习充满信心，希望自己在前端训练营结束后，前端技能有质的提升。


## 知识点：
#### DOM:
1. document.getElementById
2. document.getElementsByClassName
3. document.createElement
4. Element.classList.add
5. Element.innerText
6. Element.innerHTML
7. Element.appendChild

#### CSS:
*   display:
        
        none;           不显示
        inline;         默认
        inline-block    行内块元素

*   vertical-align:

        baseline;       默认。元素放置在父元素的基线上
        sub;            垂直对齐文本的下标
        super;          垂直对齐文本的上标
        top;            把元素顶端与行中最高元素的顶端对齐
        text-top;       把元素顶端与父元素字体的顶端对齐
        middle;         把元素放置在父元素的中部
        bottom;         把元素顶端与行中最低元素的顶端对齐
        text-bottom;    把元素顶端与父元素字体的底端对齐

#### JS:
**forEach:**
`不能continue跳过/break终止循环, 没有返回值，不能return`
    
    arr.forEach((ele, index, array) => {})
    ele: 当前元素
    index: 当前元素索引
    array: 数组
    
**for in(遍历数组索引、对象的属性)**
    `原型链上的所有属性都将被访问`
    
    let arr = ['a', 'b', 'c']
    Array.prototype.something = ['e', 'f']
    for(let ele in arr) {}
    遍历数组时，ele为索引
    arr[i]  // a, b, c, ['e', 'f']
    
    let obj = {a: 1, b: 2, c: 3}
    Array.prototype.something2 = {d: 4}
    for (let item in obj) {}
    遍历对象时，item表示key值
    obj[item]// 1, 2, 3, {d: 4}
    

**for of**
    `ES6新增了遍历器(Iterator)机制, 只要部署了Iterator的数据结构都可以使用 for ··· of ··· 完成遍历操作`
    
    原生具备Iterator接口的数据：
    Array   Map Set String TypedArray 函数的arguments对象 NodeList对象
    
    let arr = ['a', 'b', 'c']
    for(let ele of arr) {}
    遍历数组时，ele为数组中的对象
    
    let str = 'abc'
    for(let ele of str) {}
    遍历字符串时，ele为单个字符
    
    let obj = {a: 1, b: 2, c: 3}
    for (let key of Object.keys(obj)) {}
    遍历对象需要借助Object.keys

    
    
**map**

    arr.map((ele, index, array) => {return ele})
    对数组元素操作后，返回新数组。
    某个元素未返回的话，默认返回undefined
    
    
**filter**
    `过滤数组中符合条件的元素，返回数组`

**总结**

    forEach：    一般用来遍历数组
    forin:      一般用来遍历普通对象或json
    forof:      一般用来遍历数组
    forin遍历出来的是key
    forof遍历出来的是value


##### async异步编程
    callback
    Promise
    async/await
    generator



PS: 前端脑图先提交一份，后续学习过程中不断补充、完善。

