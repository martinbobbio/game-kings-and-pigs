const BASIC_COLORS = {
  white: {
    main: '#ffffff',
  },
  black: {
    main: '#0b0c18',
  },
  gray: {
    main: '#6b7688',
  },
};

const FONT_SIZES = {
  sm: '12px',
  md: '14px',
  lg: '18px',
  xl: '24px',
  xxl: '30px',
  xxxl: '96px',
};

const LINE_HEIGHTS = {
  sm: '20px',
  md: '22px',
  lg: '26px',
  xl: '32px',
  xxl: '38px',
  xxxl: '80px',
};

const FONT_WEIGHTS = {
  low: 400,
  medium: 700,
  high: 1000,
};

const BOX_SHADOWS = {
  low: '0 2px 4px rgba(0, 0, 0, 0.2)',
  medium: '0 4px 6px rgba(0, 0, 0, 0.3)',
  high: '0 8px 10px rgba(0, 0, 0, 0.4)',
};

const BASIC_PROPS = {
  fontSize: FONT_SIZES,
  lineHeight: LINE_HEIGHTS,
  fontWeight: FONT_WEIGHTS,
  boxShadow: BOX_SHADOWS,
};

export const THEME = {
  light: {
    ...BASIC_PROPS,
    palette: {
      ...BASIC_COLORS,
      primary: {
        main: '#5c6bc0',
      },
      default: {
        main: '#030303',
        background1: '#edf2f8',
        background2: '#ffffff',
      },
      elements: {
        header: {
          main: 'hsla(0,0%,100%,.25)',
          border: 'hsla(0,0%,100%,.18)',
        },
      },
    },
  },
  dark: {
    ...BASIC_PROPS,
    palette: {
      ...BASIC_COLORS,
      primary: {
        main: '#3949ab',
      },
      default: {
        main: '#edf2f8',
        background1: '#191624',
        background2: '#0b0c18',
      },
      elements: {
        header: {
          main: 'rgba(0, 0, 0, 0.25)',
          border: 'hsla(0, 0%, 5%, 0.18)',
        },
      },
    },
  },
};
