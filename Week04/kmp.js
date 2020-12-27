function kmp(source, pattern) {
  // 计算table
  let table = new Array(pattern.length).fill(0)

  {
    let i = 1 // pattern中循环的每个字符的位置
    let j = 0 // 已匹配的数量
    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        i++
        j++
        table[i] = j
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          i++
        }
      }
    }
  }
  // 匹配
  {
    let j = 0 // pattern中下标位置
    let i = 0 // source中下标位置
    while (i < source.length) {
      if (source[i] === pattern[j]) {
        i++
        j++
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          i++
        }
      }
      if (j === pattern.length) {
        return i - j
      }
    }
    return -1
  }
}
// aabaaac
console.log(kmp('aaaaa', 'bba'))
