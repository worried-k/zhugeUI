/**
 * Created by yqdong on 2017/9/6.
 * qq: 1013501639
 * @author yqdong
 *
 */
function Demo () {
  const name = 'demo'
  console.log(`this is ${name}!!!`)
}

Demo.prototype = {
  constructor: Demo
}

export default Demo
