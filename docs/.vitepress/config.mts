import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AiPrism",
  description: "Dissecting AI from Every Angle.",

  lastUpdated: true,
  cleanUrls: true,

  outDir: '../dist',

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          {text: '首页', link: '/'},
          { text: '关于', link: '/zh/about' }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          {text: 'Home', link: '/en/'},
          { text: 'About', link: '/en/about' }
        ]
      }
    }
  },

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Digital2Slave' }
    ],

    sidebar: {
      '/zh/': [
        {
          text: '模型',
          items: [
            { text: '模型总览', link: '/zh/models/' }
          ]
        },
        {
          text: '工程',
          items: [
            { text: '工程实践', link: '/zh/engineering/' }
          ]
        },
        {
          text: '系统',
          items: [
            { text: '系统设计', link: '/zh/systems/' }
          ]
        },
        {
          text: '端侧 AI',
          items: [
            { text: 'Edge AI', link: '/zh/edge/' }
          ]
        },
        {
          text: '札记',
          items: [
            { text: '技术札记', link: '/zh/notes/' }
          ]
        }
      ],

      '/en/': [
        {
          text: 'Models',
          items: [
            { text: 'Overview', link: '/en/models/' }
          ]
        },
        {
          text: 'Engineering',
          items: [
            { text: 'Practices', link: '/en/engineering/' }
          ]
        },
        {
          text: 'Systems',
          items: [
            { text: 'Design', link: '/en/systems/' }
          ]
        },
        {
          text: 'Edge AI',
          items: [
            { text: 'Mobile & Edge', link: '/en/edge/' }
          ]
        },
        {
          text: 'Notes',
          items: [
            { text: 'Notes', link: '/en/notes/' }
          ]
        }
      ]
    }
  }
})
