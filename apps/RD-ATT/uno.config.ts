import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig, presetIcons } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

const { presetWeappAttributify } = extractorAttributify()

export default defineConfig({
  presets: [
    presetWeapp(),
    presetWeappAttributify(),
    presetIcons({
      scale: 1,
      warn: true,
      extraProperties: {
        display: 'inline-block'
      },
      collections: {
        local: FileSystemIconLoader('./src/static/svg')
      }
    })
  ],
  transformers: [transformerDirectives(), transformerClass()],
  theme: {
    colors: {
      primary: 'var(--primary-color)'
    }
  },
  shortcuts: [
    {
      'wh-full': 'w-full h-full',
      'wh-screen': 'w-screen h-screen',
      'flex-col': 'flex flex-col',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-center': 'flex justify-center items-center'
    }
  ]
})
