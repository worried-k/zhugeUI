/**
 * Created by yqdong on 2017/9/8.
 * qq: 1013501639
 * @author yqdong
 *
 */
import d3 from 'd3'
import $ from 'jquery'
import util from '../../../utils/util'

import './styles/zoomAble.sass'
import template from './template/zoomAble.html'
import arrowHtm from './template/arrow.html'

class ZoomAbleSunburst {
  constructor (selector, options) {
    let option = util.mergeObject({
      width: 500,
      height: 500,
      valueFormatter: d3.format(',d'),
      store: null,
      callback: {
        onHover: null,
        onClick: null
      },
      field: {
        value: 'value',
        beginName: 'begin',
        endName: 'end'
      }
    }, options)

    for (let key in option) {
      this['_' + key] = option[key]
    }

    this._selector = selector
    this._radius = Math.min(this._width, this._height) / 2 - 10

    this._linearRange = d3.scale.linear().range([0, 2 * Math.PI])
    this._sqrtRange = d3.scale.sqrt().range([0, this._radius])

    this._color = ['#FFCEA3', '#FAE692', '#C0F5A2', '#78EBA8', '#8CEBDB', '#9EE0FF', '#C4C2FF', '#ECB4F4', '#FFA3D1', '#FEB1B1',
      '#FFAEAB', '#F0C673', '#74D681', '#85D6B8', '#8BB6E0', '#7E9BE0', '#AA8BE0', '#EB88D7', '#F08BA9', '#E87984']

    let context = this
    this._partition = d3.layout.partition().value(function (d) {
      return d[context._field.value]
    })

    this._svg = null
    this._arc = null

    this._chosenNodes = []

    this._dom = {
      container: $(this._selector),
      arrowBar: null,
      btnReset: null
    }
    // 下钻的定级节点
    this._topNode = null
    this._nameIndex = {
      arr: []
    }
    this.id = Math.random().toString().split('.')[1]

    this._init()
  }
  /**
   *
   * @private
   */
  _init () {
    this._render()
    this._initEventBind()
    this._initArc()
    this._initSvg()
    this.setStore(this._store)
    this._renderArrows()
  }
  /**
   *
   * @private
   */
  _render () {
    this._dom.container.append(util.strReplace(template, {
      id: this.id
    }))
    this._dom.container.addClass('zg-sunburst')
    this._dom.arrowBar = $('#arrowBar' + this.id)
    this._dom.btnReset = $('#btnReset' + this.id)
  }

  /**
   *
   * @private
   */
  _initEventBind () {
    this._dom.btnReset.bind('click', this, this._onReset)
  }

  /**
   *
   * @private
   */
  _onReset (event) {
    let context = event.data
    context.zoomTo()
  }

  /**
   *
   * @private
   */
  _initSvg () {
    this._svg = d3.select(this._selector).append('svg')
      .attr('width', this._width)
      .attr('height', this._height)
      .append('g')
      .attr('id', 'container')
      .attr('transform', 'translate(' + this._width / 2 + ',' + (this._height / 2) + ')')
  }

  /**
   *
   * @private
   */
  _initArc () {
    let context = this
    this._arc = d3.svg.arc()
      .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, context._linearRange(d.x)))
      }).endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, context._linearRange(d.x + d.dx)))
      }).innerRadius(function (d) {
        return Math.max(0, context._sqrtRange(d.y))
      }).outerRadius(function (d) {
        return Math.max(0, context._sqrtRange(d.y + d.dy))
      })
  }

  /**
   *
   * @param nodeOrPath
   * @returns {*}
   * @private
   */
  _getColor (nodeOrPath) {
    if (nodeOrPath.name === this._field.beginName) {
      return '#FFF7E8'
    } else if (nodeOrPath.name === this._field.endName) {
      return '#ADB1B8'
    }
    let nameIndex = this._nameIndex.arr.indexOf(nodeOrPath.name)
    let colorLength = this._color.length
    return this._color[nameIndex >= colorLength ? nameIndex % colorLength : nameIndex]
  }

  /**
   *
   * @private
   */
  _onMouseLeave () {
    this._svg.selectAll('path').style('opacity', 1)
    this._dom.arrowBar.find('.zg-sunburst--temp').remove()
  }

  /**
   *
   * @param node
   * @private
   */
  _onMouseOver (node) {
    let sequenceArray = this._chosenNodes = this._getAncestors(node)

    this._svg.selectAll('path')
      .style('opacity', 0.3)
      .filter(function (node) {
        let flag = (sequenceArray.indexOf(node) >= 0)
        return flag
      }).style('opacity', 1)

    this._renderArrows(true, node)

    if (this._callback.onHover) {
      this._callback.onHover.call(node, sequenceArray)
    }
  }

  /**
   *
   * @param node
   * @private
   */
  _onClick (node) {
    let context = this
    this._topNode = node
    this._svg
      .transition()
      .duration(750)
      .tween('scale', function () {
        let xd = d3.interpolate(context._linearRange.domain(), [node.x, node.x + node.dx])
        let yd = d3.interpolate(context._sqrtRange.domain(), [node.y, 1])
        let yr = d3.interpolate(context._sqrtRange.range(), [node.y ? 20 : 0, context._radius])

        return function (t) {
          context._linearRange.domain(xd(t))
          context._sqrtRange.domain(yd(t))
            .range(yr(t))
        }
      })
      .selectAll('path')
      .attrTween('d', function (d) {
        return function () {
          return context._arc(d)
        }
      })

    if (node.parent) {
      this._dom.btnReset.css('visibility', 'visible')
    }
    this._renderArrows()
    if (this._callback.onClick) {
      this._callback.onClick.call(node, this._chosenNodes)
    }
  }

  /**
   *
   * @param node
   * @param topNode
   * @returns {Array}
   * @private
   */
  _getAncestors (node, topNode) {
    let nodes = []
    let parent = node.parent

    if (node !== topNode) {
      nodes.push(node)
    } else {
      return nodes
    }
    while (parent && parent !== topNode) {
      nodes.unshift(parent)
      parent = parent.parent
    }
    return nodes
  }

  /**
   *
   * @param node
   * @param target
   * @returns {boolean}
   * @private
   */
  _isParents (node, target) {
    if (!node) return false
    let flag = false
    let parent = node.parent

    while (parent) {
      if (parent === target) {
        flag = true
        break
      }
      parent = parent.parent
    }
    return flag
  }

  /**
   *
   * @param isHover
   * @param node
   * @private
   */
  _renderArrows (isHover, node) {
    if (isHover && this._isParents(this._topNode, node)) {
      return
    }

    let total = this._store.value
    let percentHtm = '<div class="zg-sunburst--pre-percent {temp}">{percent}%</div>'

    let arrowArr = []
    let renderNodes = isHover ? this._getAncestors(node, this._topNode) : this._chosenNodes
    renderNodes.forEach(function (node) {
      if (isHover && node.parent) {
        arrowArr.push(util.strReplace(percentHtm, {
          percent: ((node.value / node.parent.value) * 100).toFixed(2),
          temp: isHover ? 'zg-sunburst--temp' : ''
        }))
      }
      arrowArr.push(util.strReplace(arrowHtm, {
        name: node.name,
        percent: ((node.value / total) * 100).toFixed(2),
        temp: isHover ? 'zg-sunburst--temp' : '',
        bgColor: this._getColor(node)
      }))
    }, this)
    this._dom.arrowBar[isHover ? 'append' : 'html'](arrowArr.join(''))
    if (isHover) {
      this._dom.arrowBar.scrollLeft(6666666666666666)
    }
  }

  /**
   *
   * @param root
   * @private
   */
  _initNameIndex (root) {
    let indexMap = this._nameIndex
    let children = root.children
    let context = this

    if (!indexMap[root.name]) {
      indexMap[root.name] = root
      indexMap.arr.push(root.name)
    }

    if (children) {
      children.sort(function (a, b) {
        return a[context._field.value] - b[context._field.value]
      })
      children.forEach(function (node) {
        if (!indexMap[node.name]) {
          indexMap[node.name] = node
          indexMap.arr.push(node.name)
        }
        context._initNameIndex(node)
      })
    }
  }

  /**
   *
   * @param store
   */
  setStore (store) {
    let context = this
    this._nameIndex = {arr: []}
    this._initNameIndex(store)

    this._store = store
    let data = this._partition.nodes(store)

    this._svg.selectAll('path')
      .data(data)
      .enter().append('path')
      .attr('d', this._arc)
      .style('fill', function () {
        return context._getColor.apply(context, arguments)
      }).on('click', function () {
        context._onClick.apply(context, arguments)
      }).on('mouseover', function () {
        context._onMouseOver.apply(context, arguments)
      }).on('mouseleave', function () {
        context._onMouseLeave.apply(context, arguments)
      }).append('title')
      .text(function (d) {
        return d.name + '\n' + context._valueFormatter(d.value)
      })
  }

  /**
   *
   * @param node
   */
  zoomTo (node) {
    node = node || this._store
    this._chosenNodes = this._getAncestors(node)
    this._onClick(node)
  }
}

export default ZoomAbleSunburst
