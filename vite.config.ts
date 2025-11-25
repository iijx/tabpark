import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path';
import { ArcoResolver, HeadlessUiResolver } from 'unplugin-vue-components/resolvers';
// import webExtension from '@samrum/vite-plugin-web-extension'
// import manifest from './manifest'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
  build: {
    // outDir: 'gitdist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        popup: path.resolve(__dirname, 'popup.html'),
      }
    }
  },
  plugins: [
    vue(),
    tailwindcss({
      // 确保 Tailwind 能够处理 Less 文件中的 @apply
    }),
    AutoImport({
      imports: [
        'vue', 
        'vue-router',
        {
          '@/interface': [
            ['*', 'IBase']
          ]
        },
        {
          '@/compositions/use-app/index': [
            ['default', 'useApp'],
          ]
        },
        {
          '@/api/index': ['Api', 'http', 'ApiIsNeedLogin'],
        }
      ],
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
          HeadlessUiResolver(),
          ArcoResolver({
            sideEffect: true
          }),
          name => {
            if (name.startsWith('Icon')) return { name: name.slice(4), from: '@icon-park/vue-next'};
          }
        ]
    }),
    // webExtension({
    //   manifest: {
    //     ...manifest,
    //   },
    // }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/style/var.less";`,
        javascriptEnabled: true,
        modifyVars: {},
        // 确保 Less 不会处理未知的 @ 指令，保留它们给 PostCSS/Tailwind 处理
        compress: false,
      }
    }
  },
  
})
