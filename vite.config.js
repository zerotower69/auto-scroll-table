import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createStyleImportPlugin,VxeTableResolve} from "vite-plugin-style-import"
import {createHtmlPlugin } from "vite-plugin-html"

// https://vitejs.dev/config/

export default defineConfig({
  base:"/auto-scroll-table/",
  plugins: [
      vue(),
    createStyleImportPlugin({resolves:[VxeTableResolve()]}),
      createHtmlPlugin({
        inject:{
          data:{
            title:"vue3+vxe-table自滚动的表格组件",
            keywords:"vue3,table vxe-table"
          }
        }
      })
  ],
  server:{
    hmr:true
  },
  build:{
    target: "es2015", // 浏览器兼容性
    cssTarget: "chrome79", // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
    chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）。
    outDir: "auto-scroll-table", // 指定输出路径
    assetsDir: "static", // 指定生成静态资源的存放路径（相对于 build.outDir）。
    manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
  },
})
