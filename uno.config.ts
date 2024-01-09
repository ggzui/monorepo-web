import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [presetUno({ dark: 'class' })],
  transformers: [transformerDirectives()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'wh-screen': 'w-screen h-screen',
    'flex-col': 'flex flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-center': 'flex justify-center items-center'
  },
  theme: {
    colors: {
      primary: 'rgb(var(--primary-color))'
    }
  }
})
