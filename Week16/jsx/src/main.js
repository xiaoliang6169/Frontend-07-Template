// import { createElement } from '../utils/framework'
import Carousel from '../components/Carousel'
import Button from '../components/Button'
import List from '../components/List'

let imgs = [
  {
    src:
      'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    name: '图片1',
  },
  {
    src:
      'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    name: '图片2',
  },
  {
    src:
      'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    name: '图片3',
  },
  {
    src:
      'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
    name: '图片4',
  },
]
let carousel = (
  <Carousel
    class="carouselBox"
    imgs={imgs}
    onChange={(event) => console.log(event.detail)}
    onClick={(event) => console.log(event.detail)}
  ></Carousel>
)

let button = <Button>插入的按钮</Button>
let list = (
  <List data={imgs}>
    {(one) => (
      <div class="list">
        <img src={one.src} />
        <a href={one.src} target="_blank">
          {one.name}
        </a>
      </div>
    )}
  </List>
)

carousel
  .mountTo(document.querySelector('body'))(<br />)
  .mountTo(document.querySelector('body'))(<hr />)
  .mountTo(document.querySelector('body'))(<br />)
  .mountTo(document.querySelector('body'))

button
  .mountTo(document.querySelector('body'))(<br />)
  .mountTo(document.querySelector('body'))(<hr />)
  .mountTo(document.querySelector('body'))(<br />)
  .mountTo(document.querySelector('body'))

list.mountTo(document.querySelector('body'))
