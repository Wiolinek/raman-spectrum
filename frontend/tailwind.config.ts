import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: 'rgba(26,26,29,0.85)',
        secondary: 'rgba(26,26,29,0.55)',
        bgColor: 'hsla(216, 41%, 79%, 0.7)',
      },
      boxShadow: {
        'heavy-box-shadow': '0 10px 20px #00000029',
        'custom-box-shadow': '0 8px 16px #00000020',
        'inner-box-shadow': 'inset 0 0 0 1px #15151533',
      },
      dropShadow: {
        'custom-drop-shadow': '0px 0px 20px #00000012',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)',
      },
    }
  },

  plugins: []
} satisfies Config;
