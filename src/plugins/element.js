import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/common/styles/element-ui.scss'

// 按需引入
import {
  Button,
  Input,
  Pagination,
  Alert,
  Loading,
  MessageBox,
  Notification,
  Message,
  Tooltip,
  Radio,
  RadioGroup,
  RadioButton,
  InputNumber,
  Select,
  Option,
  OptionGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Form,
  FormItem,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Table,
  TableColumn,
  Scrollbar,
  DatePicker,
  Dialog,
  Tag,
  Switch

} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Pagination)

Vue.use(Alert)
Vue.use(Loading.directive)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Scrollbar)
Vue.use(DatePicker)

Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Switch);


Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
