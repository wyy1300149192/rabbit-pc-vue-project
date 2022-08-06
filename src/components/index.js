// 引入组件
import Skeleton from './Skeleton'
import Slider from './Slider'
import More from './More'
import Bread from './Bread'
import BreadItem from './Bread/Item.vue'
import InfiniteLoad from './InfiniteLoad'
import ImageView from './ImageView'
import City from './City'
import Numbox from './Numbox'
import Button from './Button'
import CheckBox from './CheckBox'
import Message from './Message/index.vue'

// 导出install方法 注册组件
export default {
  install (app) {
    app.component(Skeleton.name, Skeleton)
    app.component(Slider.name, Slider)
    app.component(More.name, More)
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    app.component(InfiniteLoad.name, InfiniteLoad)
    app.component(ImageView.name, ImageView)
    app.component(City.name, City)
    app.component(Numbox.name, Numbox)
    app.component(Button.name, Button)
    app.component(CheckBox.name, CheckBox)
    app.component(Message.name, Message)
  }
}
