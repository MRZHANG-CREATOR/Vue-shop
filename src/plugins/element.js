import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox
} from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Dialog)
Vue.use(Pagination) // 全局注册组件
Vue.use(Tooltip) // 全局注册组件
Vue.use(Switch) // 全局注册组件
Vue.use(Table) // 全局注册组件
Vue.use(TableColumn) // 全局注册组件
Vue.use(Button) // 全局注册组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
// Vue.use(Message) // Message与其他组件配置方法不同，这样配置会直接弹框
Vue.prototype.$message = Message // 用自定义属性，挂载到原型对象上
