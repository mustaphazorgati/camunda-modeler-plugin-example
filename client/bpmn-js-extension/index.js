/**
 * A bpmn-js service that provides the actual plug-in feature.
 *
 * Checkout the bpmn-js examples to learn about its capabilities
 * and the extension points it offers:
 *
 * https://github.com/bpmn-io/bpmn-js-examples
 */

function ExampleExtensionService(eventBus) {
  eventBus.on('shape.added', function (context) {
    var element = context.element;
    console.log('A shape was added!', element);
  });

  eventBus.on('connection.added', function (context) {
    var element = context.element;
    console.log('A connection was added!', element);
  });
}

ExampleExtensionService.$inject = ['eventBus'];

/**
 * A bpmn-js module, defining all extension services and their dependencies.
 */
export default {
  __init__: ['drilldown_human_task'],
  drilldown_human_task: ['type', ExampleExtensionService]
};
