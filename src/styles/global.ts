import { globalCss } from '.';

// this is the file that sets the global styles for the app
export const globalStyles = globalCss({
  // these root configurations are applied to the entire app and are commonly
  // used to allow better control of the component styles
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  body: {
    '-webkit-font-smoothing': 'antialiased',
    fontFamily: '$body',
    backgroundColor: '$background',
    color: '$text',
  },
});
