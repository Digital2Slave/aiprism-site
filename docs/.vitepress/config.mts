import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AiPrism',
  description: 'Dissecting AI from Every Angle.',

  head: [
    ['link', { rel: 'icon', href: '/favicon1.png' }],
    ['meta', { property: 'og:title', content: 'AiPrism' }],
    ['meta', { property: 'og:description', content: 'Dissecting AI from Every Angle' }],
    ['meta', { property: 'og:image', content: '/og.png' }]
  ],

  lastUpdated: true,
  cleanUrls: true,

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '关于', link: '/about' }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'About', link: '/en/about' }
        ]
      }
    }
  },

  themeConfig: {
    logo: {
      light: '/logo1.png',
      dark: '/logo.png'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Digital2Slave' }
    ],

    sidebar: {
      '/': [
        {
          text: '模型',
          items: [{ text: '模型总览', link: '/models/' }]
        },
        {
          text: '工程',
          items: [{ text: '工程实践', link: '/engineering/' }]
        },
        {
          text: '系统',
          items: [{ text: '系统设计', link: '/systems/' }]
        },
        {
          text: '端侧 AI',
          items: [{ text: 'Edge AI', link: '/edge/' }]
        },
        {
          text: '札记',
          items: [{ text: '技术札记', link: '/notes/' }]
        }
      ],

      '/en/': [
        {
          text: 'Models',
          items: [{ text: 'Overview', link: '/en/models/' }]
        },
        {
          text: 'Engineering',
          items: [{ text: 'Practices', link: '/en/engineering/' }]
        },
        {
          text: 'Systems',
          items: [{ text: 'Design', link: '/en/systems/' }]
        },
        {
          text: 'Edge AI',
          items: [{ text: 'Mobile & Edge', link: '/en/edge/' }]
        },
        {
          text: 'Notes',
          items: [{ text: 'Notes', link: '/en/notes/' }]
        }
      ]
    }
  }
})
