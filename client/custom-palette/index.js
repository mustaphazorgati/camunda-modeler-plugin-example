import CustomPalette from './CustomPalette';

/**
 * A bpmn-js module, defining all extension services and their dependencies.
 */
export default {
  __init__: ['custom_palette'],
  custom_palette: ['type', CustomPalette]
};
