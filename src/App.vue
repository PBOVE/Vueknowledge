<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app{
  font-family:  -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  /* font-family:"webfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale; */
}
@font-face {
  font-family: 'webfont';
  font-display: swap;
  src: url('//at.alicdn.com/t/webfont_g6czjyj26m.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/webfont_g6czjyj26m.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/webfont_g6czjyj26m.woff2') format('woff2'),
  url('//at.alicdn.com/t/webfont_g6czjyj26m.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/webfont_g6czjyj26m.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/webfont_g6czjyj26m.svg#Alibaba-PuHuiTi-Regular') format('svg'); /* iOS 4.1- */
}
</style>

