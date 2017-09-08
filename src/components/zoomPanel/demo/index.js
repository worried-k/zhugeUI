/*
 * @Author: kangpeng
 * @Date: 2017-09-07 17:45:59
 * @Last Modified by: kangpeng
 */
import ZoomPanel from '../zoomPanel'
import $ from 'jquery'
import template from './template.html'

$('body').append(template)

let demo = new ZoomPanel('#demo', {
  onResize (isFull) {
    demo.updateDomContent((content) => {
      content.append(`<p>isFull：${isFull}</p>`)
    })
  }
})

demo.updateDomHeader((header) => {
  header.append('12345')
})

demo.updateDomContent((content) => {
  content.append('67890')
})
