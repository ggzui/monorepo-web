import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import { type UserConfig, defineConfig, mergeConfig } from 'vite'
import { commonConfig } from './common'

export function defineUniConfig(options: UserConfig = {}) {
  return defineConfig(async ({ mode }) => {
    const root = process.cwd()
    const isBuild = mode === 'production'

    const pathResolve = (pathname: string) => resolve(root, '.', pathname)

    const uniConfig: UserConfig = {
      esbuild: {
        drop: isBuild ? ['console', 'debugger'] : []
      },
      resolve: {
        alias: [
          {
            find: 'vue',
            replacement: 'vue/dist/vue.runtime.esm-bundler.js'
          },
          {
            find: /@\//,
            replacement: `${pathResolve('src')}/`
          }
        ]
      },
      build: {
        rollupOptions: {
          output: {
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/_entry-[name]-[hash].js',
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            manualChunks: {
              vue: ['vue', 'pinia']
            }
          }
        }
      },
      plugins: [uni()]
    }

    const mergedConfig = mergeConfig(commonConfig, uniConfig)

    return mergeConfig(mergedConfig, options)
  })
}
