// 生产阶段的插件
const prodPlugins = []
if (process.env.NODE_ENV === 'production') { // 生产环境
  prodPlugins.push('transform-remove-console') // 生产环境去除console的插件
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ...prodPlugins
  ]
}
