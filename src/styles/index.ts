import { createStitches } from '@stitches/react';

// the stitches library was used because it is easy to manage themes and variants with it

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      title: '#333',
      text: '#333333cc',
      background: '#fff',
      borderBlue: '#3174ee',
      borderGray: '#d8dee2',
    },
    fonts: {
      body: 'Open Sans, system-ui, sans-serif',
    },

    // By setting the media query breakpoints here, we can use them in our
    // component styles. This is a great way to keep the media queries
    // consistent across the app.
  },
  media: {
    bp1: '(width < 640px)',
    bp2: '(720px <= width < 1024px)',
    bp3: '(1024px <= width)',
  },
});
