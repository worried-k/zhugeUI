/**
 * Created by yqdong on 2017/9/7.
 * qq: 1013501639
 * @author yqdong
 *
 */
import Button from '../button'
import $ from 'jquery'
import template from './template.html'
import '../../../assets/icons/style.sass'
$('body').append(template)

const theme = ['normal', 'border']
const type = ['normal', 'primary', 'danger', 'secondary', 'success']

for (let i = 0; i < theme.length; i++) {
  type.forEach(function (type) {
    const id = `#${type}${i}`
    window[type + i] = new Button($(id), {
      theme: theme[i],
      type: type,
      content: type,
      icon: {
        show: true,
        iconClass: 'icon-add'
      },
      size: 'normal'
    })
  })
}
window.icon = new Button($('#icon'), {
  icon: {
    show: true,
    iconClass: 'icon-funnel'
  }
})
window.disabled0 = new Button($('#disabled0'), {
  disabled: true,
  size: 'small',
  content: 'disabled'
})

window.disabled1 = new Button($('#disabled1'), {
  theme: 'border',
  disabled: true,
  content: 'disabled'
})
