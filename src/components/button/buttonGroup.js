/**
 * Created by yqdong on 2017/9/7.
 * qq: 1013501639
 * @author yqdong
 *
 */
import Button from './button'
import $ from 'jquery'
import util from '../../utils/util'
import './styles/buttonGroup.sass'

class ButtonGroup {
  constructor (container, option) {
    const options = util.mergeObject({
      /**
       * {
     *  name: '',
     *  icon: ''
     * }
       */
      store: [],
      size: 'normal', // normal, small, large
      onChange: null,
      defaultValue: ''// name
    }, option)
    options.defaultValue = options.defaultValue || options.store[0].name
    for (let prop in options) {
      this['_' + prop] = options[prop]
    }

    this._dom = {
      container: container
    }
    this._buttons = {}
    this._current = {
      button: null,
      data: null
    }
    this._init()
  }
  _init () {
    this._render()
    this._resetStyle()
  }
  _render () {
    let buttonArr = []

    this._store.forEach(function (item, i) {
      let id = Math.random().toString().split('.')[1]
      let container = $(`<span id="item${id}"></span>`)
      let context = this

      this._buttons[item.name] = new Button(container, {
        theme: 'border',
        type: 'normal',
        size: this._size,
        content: item.name,
        icon: {
          show: true,
          iconClass: item.icon || ''
        },
        onClick () {
          context._onClick(this, item)
        }
      })

      this._initDefaultValue(item, this._buttons[item.name])

      buttonArr.push(container)
    }, this)
    this._dom.container.append(buttonArr)
  }
  _initDefaultValue (data, button) {
    if (data.name === this._defaultValue) {
      button.addClass('checked')
      this._current.button = button
      this._current.data = data
    }
  }
  _resetStyle () {
    this._dom.container.addClass('zg-button-group')
  }

  _onClick (button, data) {
    if (this._current.button === button) return
    if (this._current.button) {
      this._current.button.removeClass('checked')
    }
    this._current.button = button.addClass('checked')
    this._current.data = data
    let callback = this._onChange
    if (util.isFunction(callback)) {
      callback.call(this, data, button)
    }
  }
}
export default ButtonGroup
