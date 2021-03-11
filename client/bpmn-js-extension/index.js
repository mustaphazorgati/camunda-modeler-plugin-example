import ExampleExtensionService from './ExampleExtensionService';

/**
 * A bpmn-js module, defining all extension services and their dependencies.
 */
export default {
  __init__: ['drilldown_human_task'],
  drilldown_human_task: ['type', ExampleExtensionService]
};
