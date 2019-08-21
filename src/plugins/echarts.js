import Vue from 'vue'
const echarts = require('echarts/lib/echarts')

// 按需引入echarts中的组件

// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataset')

// require("echarts/lib/component/graphic");

// require("echarts/lib/component/grid");

require('echarts/lib/component/legendScroll')

// require("echarts/lib/component/axisPointer");

// require("echarts/lib/component/polar");

// require("echarts/lib/component/geo");

// require("echarts/lib/component/parallel");

// require("echarts/lib/component/singleAxis");

// require("echarts/lib/component/brush");

// require("echarts/lib/component/calendar");

// require("echarts/lib/component/dataZoom");

// require("echarts/lib/component/visualMap");

// require("echarts/lib/component/markPoint");

// require("echarts/lib/component/markLine");

// require("echarts/lib/component/markArea");

// require("echarts/lib/component/timeline");

require('echarts/lib/component/toolbox')

Vue.prototype.$echarts = echarts
