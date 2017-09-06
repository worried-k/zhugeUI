/**
 * Created by yqdong on 2017/9/6.
 * qq: 1013501639
 * @author yqdong
 *
 */

import template from './template/index.html'
import './styles/main.sass'

function Demo () {
  const name = 'demo'
  console.log(`this is ${name}!!`)
  document.body.innerHTML = template
}

Demo.prototype = {
  constructor: Demo
}

export default Demo
