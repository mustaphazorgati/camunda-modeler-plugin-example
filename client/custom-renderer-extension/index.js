import CustomRenderer from './CustomRenderer';

/**
 * A bpmn-js module, defining all extension services and their dependencies.
 */
export default {
  __init__: ['custom_renderer'],
  custom_renderer: ['type', CustomRenderer]
};
