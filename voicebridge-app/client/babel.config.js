export default {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }], // Ensures React JSX is handled
    ],
  };