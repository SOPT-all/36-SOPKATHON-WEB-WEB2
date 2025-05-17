/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        // Title
        'title-extra-24': ['24px', { lineHeight: '130%', letterSpacing: '0%', fontWeight: 800 }],
        'title-extra-20': ['20px', { lineHeight: '130%', letterSpacing: '0%', fontWeight: 800 }],
        'title-bold-20': ['20px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 700 }],
        'title-bold-18': ['18px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 700 }],
        'title-med-18': ['18px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 500 }],
        
        // Body
        'body-bold-17': ['17px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 700 }],
        'body-semi-17': ['17px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 600 }],
        'body-med-17': ['17px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 500 }],
        'body-bold-15': ['15px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 700 }],
        'body-semi-15': ['15px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 600 }],
        'body-med-15': ['15px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 500 }],
        'body-bold-13': ['13px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 700 }],
        'body-semi-13': ['13px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 600 }],
        'body-med-13': ['13px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 500 }],
        
        // Caption
        'cap-semi-11': ['11px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 600 }],
        'cap-med-11': ['11px', { lineHeight: '140%', letterSpacing: '0%', fontWeight: 400 }],
      },
      colors: {
        'CB-blue': '#42BDCC',
        'gray': {
          '01': '#F3F3F6',
          '02': '#E6E6EB',
          '03': '#D5D5DE',
          '04': '#999AAB',
          '05': '#7B7C87',
          '06': '#575A63',
          '07': '#3A3C42',
        },
      },
    },
  },
  plugins: [],
};
