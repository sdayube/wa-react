import { createStitches } from '@stitches/react';

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
  },
  media: {
    bp1: '(width < 640px)',
    bp2: '(720px <= width < 1024px)',
    bp3: '(1024px <= width)',
  },
});
