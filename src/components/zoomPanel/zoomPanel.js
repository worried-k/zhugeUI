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
      onResize: null
    }, option)
    this._options = {}
    for (let prop in options) {
      this._options[prop] = options[prop]
    }
    this._dom = {
      container: $(container),
      layout: null,
      zoomBtn: null,
      header: null,
      content: null
    }
    this.id = Math.random().toString().split('.')[1]

    this._store = {
      isFull: false
    }

    this._init()
  }

  _init () {
    this._render()
    this._initEventBind()
  }

  _render () {
    this._dom.layout = $(util.strReplace(template, {
      id: this.id,
      header: this._options.header,
      content: this._options.content
    }))
    this._dom.container.append(this._dom.layout)

    util.cacheElementObj(this._dom, this._dom.container, this.id)
  }

  _initEventBind () {
    this._dom.zoomBtn.on('click', () => {
      this._onZoomBtnClick()
    })
  }

  _onZoomBtnClick () {
    if (this._store.isFull) {
      this._onRevert()
    } else {
      this._onFullScreen()
    }
    if (util.isFunction(this._options.onResize)) {
      this._options.onResize(this._store.isFull)
    }
  }

  _onFullScreen () {
    this._dom.layout.css('position', 'fixed')
    this._store.isFull = true
    this._dom.zoomBtn.removeClass('icon-fullscreen').addClass('icon-ic_fullscreen_exit').find('span').html('还原')
  }

  _onRevert () {
    this._dom.layout.css('position', 'relative')
    this._store.isFull = false
    this._dom.zoomBtn.removeClass('icon-ic_fullscreen_exit').addClass('icon-fullscreen').find('span').html('全屏')
  }

  updateDomHeader (callback) {
    if (util.isFunction(callback)) {
      callback.call(this, this._dom.header)
    }
  }

  updateDomContent (callback) {
    if (util.isFunction(callback)) {
      callback.call(this, this._dom.content)
    }
  }

  destroy () {
    this._dom.zoomBtn.off('click')
    this._dom.container.empty()
  }
}
export default ZoomPanel
