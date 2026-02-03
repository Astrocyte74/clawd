// Detect deployment environment
const getBasePath = () => {
  // For Render deployment
  return '/'
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: getBasePath(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
