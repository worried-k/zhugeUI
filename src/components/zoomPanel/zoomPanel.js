/*
 * @Author: kangpeng
 * @Date: 2017-09-07 16:44:05
 * @Last Modified by: kangpeng
 */
import $ from 'jquery'
import util from '../../utils/util'

import '../../assets/styles/reset.sass'
import '../../assets/icons/icon.sass'

import './styles/zoomPanel.sass'

import template from './template/zoomPanel.html'

class ZoomPanel {
  constructor (container, option) {
    let options = util.mergeObject({
      header: '',
      content: '',
      onChange: null
    }, option)
    this._options = {}
    for (let prop in options) {
      this._options[prop] = options[prop]
    }
    this._dom = {
      container: $(container),
      layout: null,
      zoomBtn: null
    }
    this.id = Math.random().toString().split('.')[1]

    this._store = {
      isFull: false
    }

    this._init()
  }

  _init () {
    this._createLayout()
    this._initEventBind()
    this._render()
  }

  _createLayout () {
    this._dom.layout = $(util.strReplace(template, {
      id: this.id,
      header: this._options.header,
      content: this._options.content
    }))
  }

  _initEventBind () {
    this._dom.layout.on('click', '#zoomBtn' + this.id, (e) => {
      let btn = $(e.currentTarget)
      if (this._store.isFull) {
        this._revert()
        this._store.isFull = false
        btn.removeClass('icon-renovate').addClass('icon-fullscreen').find('span').html('全屏')
      } else {
        this._fullScreen()
        this._store.isFull = true
        btn.removeClass('icon-fullscreen').addClass('icon-renovate').find('span').html('还原')
      }
      if (typeof this._options.onChange === 'function') {
        this._options.onChange(this._store.isFull)
      }
    })
  }

  _render () {
    this._dom.container.append(this._dom.layout)
    this._dom.zoomBtn = this._dom.container.find('zoomBtn' + this.id)
  }

  _fullScreen () {
    this._dom.layout.css('position', 'fixed')
  }

  _revert () {
    this._dom.layout.css('position', 'relative')
  }

  destroy () {
    this._dom.layout.off('click')
    this._dom.container.empty()
  }
}
export default ZoomPanel
