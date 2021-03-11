import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { append as svgAppend, attr as svgAttr, classes as svgClasses, create as svgCreate } from 'tiny-svg';

import { getRoundRectPath } from 'bpmn-js/lib/draw/BpmnRenderUtil';

import { isNil } from 'min-dash';

const HIGH_PRIORITY = 1500;
const TASK_BORDER_RADIUS = 2;
const COLOR_GREEN = '#52B415';
const COLOR_YELLOW = '#ffc800';
const COLOR_RED = '#cc0000';

export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);

    const suitabilityScore = this.getSuitabilityScore(element);

    if (!isNil(suitabilityScore)) {
      const color = this.getColor(suitabilityScore);

      const rect = drawRect(parentNode, 50, 20, TASK_BORDER_RADIUS, color);

      svgAttr(rect, {
        transform: 'translate(-20, -10)'
      });

      let text = svgCreate('text');

      svgAttr(text, {
        fill: '#fff',
        transform: 'translate(-15, 5)'
      });

      svgClasses(text).add('djs-label');

      svgAppend(text, document.createTextNode(suitabilityScore));

      svgAppend(parentNode, text);
    }

    return shape;
  }

  getShapePath(shape) {
    if (is(shape, 'bpmn:Task')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }

  getSuitabilityScore(element) {
    const businessObject = getBusinessObject(element);

    const { suitable } = businessObject;

    return Number.isFinite(suitable) ? suitable : null;
  }

  getColor(suitabilityScore) {
    if (suitabilityScore > 75) {
      return COLOR_GREEN;
    } else if (suitabilityScore > 25) {
      return COLOR_YELLOW;
    }

    return COLOR_RED;
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: strokeColor || '#000',
    strokeWidth: 2,
    fill: '#fff'
  });

  svgAppend(parentNode, rect);

  return rect;
}
