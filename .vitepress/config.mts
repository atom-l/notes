import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Atom-L",
  description: "瞎话一箩筐",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/notes/favicon.svg' }]
  ],
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',

    sidebar: {
      '/lua/': [
        {
          text: 'Lua的底层实现',
          items: [
            { text: '字符串', link: '/lua/string-implementation' },
            { text: '表', link: '/lua/table-implementation' },
            { text: '函数和闭包', link: '/lua/function-implementation' },
            { text: '虚拟机', link: '/lua/virtual-machine' },
            { text: 'GC', link: '/lua/gc' }
          ]
        }
      ],
      '/linear-algebra/': [
        {
          text: '线性代数',
          items: [
            { text: '向量空间', link: '/linear-algebra/vector-spaces' },
            { text: '有限维向量空间', link: '/linear-algebra/finite-dimensional-vector-spaces' }
          ]
        }
      ]
    },

    outline: {
      label: '目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/atom-l/notes' }
    ]
  },
  base: '/notes/'
})
