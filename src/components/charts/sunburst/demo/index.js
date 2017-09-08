/**
 * Created by yqdong on 2017/9/8.
 * qq: 1013501639
 * @author yqdong
 *
 */
// import d3 from 'd3'
import $ from 'jquery'
import Sunburst from '../zoomAbleSunburst'

import template from './template.html'
import root from './sequences.json'

$('body').append(template)

const sun = new Sunburst('#test', {
  store: root.behavior_datas[0],
  field: {
    value: 'count'
  }
})
console.log(sun)
