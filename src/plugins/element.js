import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// Vue.use(Message) // Message与其他组件配置方法不同，这样配置会直接弹框
Vue.prototype.$message = Message // 用自定义属性，挂载到原型对象上
