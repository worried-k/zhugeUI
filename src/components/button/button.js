/**
 * Created by yqdong on 2017/9/6.
 * qq: 1013501639
 * @author yqdong
 *
 */
import util from '../../utils/util'

import '../../assets/styles/reset.sass'
import './styles/button.sass'

import template from './template/button.html'

class Button {
  constructor (container, option) {
    let options = util.mergeObject({
      theme: 'normal', // normal,border
      type: 'normal', // normal, primary, danger, secondary, success
      size: 'normal', // normal small large
      disabled: false,

      content: '',

      icon: {
        show: false,
        iconClass: ''
      },
      className: '',
      onClick: null
    }, option)

    for (let prop in options) {
      this['_' + prop] = options[prop]
    }
    this._dom = {
      container: container,
      icon: null,
      content: null
    }
    this._class = []
    if (this._className) {
      this._class.push(this._className)
    }
    this._init()
  }
  _init () {
    this._render()
    this._initEventBind()
  }
  _render () {
    this._resetStyle()
    this._dom.container.append(util.strReplace(template, {
      iconClass: this._icon.iconClass,
      displayIcon: this._icon.show ? 'inline-block' : 'none',
      content: this._content
    }))

    this._dom.content = this._dom.container.find('span')
    this._dom.icon = this._dom.container.find('i')
  }

  _resetStyle () {
    this._dom.container.addClass(this._class.join(' '))
    this._dom.container.attr('class', '')

    let mainClass = this._theme + '-' + this._type

    this._dom.container.addClass('zg-button')
      .addClass((this._icon.show && !this._content) ? 'only-icon' : '')
      .addClass(this._theme === this._type ? 'normal' : mainClass)
      .addClass(this._size === 'normal' ? 'normal-size' : this._size)

    if (this._disabled) {
      this._dom.container.addClass(this._theme === 'normal' ? 'normal-disable' : 'border-disable')
    }
  }

  _initEventBind () {
    this._dom.container.bind('click', this, this.__onClick)
  }
  __onClick (event) {
    let context = event.data
    const callback = context._onClick
    if (util.isFunction(callback)) {
      callback.call(context)
    }
  }
  disable (flag) {
    this._disabled = flag
    this._resetStyle()
    return this
  }

  setType (type) {
    this._type = type
    this._resetStyle()
    return this
  }

  setContent (content) {
    this._content = content
    this._dom.content.text(content)
    this._resetStyle()
    return this
  }

  addClass (clazz) {
    this._class.push(clazz)
    this._dom.container.addClass(clazz)
    return this
  }

  removeClass (clazz) {
    let index = this._class.indexOf(clazz)
    if (index > -1) {
      this._class.splice(index, 1)
      this._dom.container.removeClass(clazz)
    }
    return this
  }

  destroy () {
    this._dom.container.unbind('click')
    this._dom.container.remove()
  }
}
export default Button
