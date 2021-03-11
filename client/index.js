import { registerBpmnJSModdleExtension, registerBpmnJSPlugin } from 'camunda-modeler-plugin-helpers';

// import BpmnExtensionModule from './bpmn-js-extension';
import CustomRendererExtensionModule from './custom-renderer-extension';
import CustomPaletteExtensionModule from './custom-palette';
import CustomContextPadExtensionModule from './custom-context-pad';
import qa from '../resources/qa.json';

// registerBpmnJSPlugin(BpmnExtensionModule);
registerBpmnJSPlugin(CustomRendererExtensionModule);
registerBpmnJSPlugin(CustomPaletteExtensionModule);
registerBpmnJSPlugin(CustomContextPadExtensionModule);
registerBpmnJSModdleExtension(qa);
