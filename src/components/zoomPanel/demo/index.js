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
  header: '123',
  content: '456',
  onChange (isFull) {
    console.log('isFull：' + isFull)
  }
})

console.log(demo)
