学习笔记

@charset
@import
rules
  @media
  @page
  rule
  
css规则
    选择器
    声明
      key
      value
    selector 
       https://www.w3.org/TR/2018/REC-selectors-3-20181106/
       https://www.w3.org/TR/2018/WD-selectors-4-20181121/
    key
        https://www.w3.org/TR/css-variables/
    value
        https://www.w3.org/TR/css-values-4/
        
选择器语法
复合选择器
    <简单选择器>+
    *或者div必须写在前面
复杂选择器
    <复合选择器><sp><复合选择器>
    <复合选择器>'>'<复合选择器>
    <复合选择器>'~'<复合选择器>
    <复合选择器>'+'<复合选择器>
    <复合选择器>'||'<复合选择器>
    
伪类
  链接/行为
  :any-link
  :link :visited
  :hover
  :active
  :focus
  :target
  树结构
  :empty
  :nth-child
  :nth-last-child
  :first-child :last-child :only-child
逻辑型
:not伪类
:where :has

伪元素
::before
::after
::first-line
::first-letter


为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
first-line不匹配任何真实的元素
first-line 伪元素仅在附加到块状容器（例如块框，行内块，表标题或表单元格）时才有效,要在同一个流里

