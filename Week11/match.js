let parser = selectorParser
console.log(parser)
function match(selector, element) {
  let rules = parser(selector),
    position = rules.length - 1
  console.log(rules, element.className)
  while (element != document.body && position !== 0) {
    let rule = rules[position]
    if (rule.type === 'node') {
      if (
        rule.rules[0].type === 'tag' &&
        rule.rules[0].name === element.tagName.toLowerCase()
      ) {
        position--
      } else if (
        rule.rules[0].type === 'id' &&
        rule.rules[0].name === element.id
      ) {
        position--
      } else if (
        rule.rules[0].type === 'class' &&
        rule.rules[0].name === element.className
      ) {
        position--
      } else {
        if (position === rules.length - 1) {
          return false
        }
      }
    } else {
      if (rule.joint === '>' && element != element.parentElement) {
        return false
      }
      position--
    }
    element = element.parentElement
  }
  return position === 0 ? true : false
}

console.log(
  match('.detailCnt .artical .name', document.getElementsByClassName('name')[0])
)
//为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
//first-line不匹配任何真实的元素
//first-line 伪元素仅在附加到块状容器（例如块框，行内块，表标题或表单元格）时才有效,要在同一个流里
