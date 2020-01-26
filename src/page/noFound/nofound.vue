/**
*
*  @author ZTiger
*
*/


<template>
  <div id="know-fourzerofour">
    <a  ondragstart='return false;' href='javascript:void(0);'><img src="../../assets/images/404.jpg" /></a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style  scoped>
#know-fourzerofour {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
}
#know-fourzerofour a {
  display: block;
  margin: auto;
  user-select: none;
}
@media screen and (max-height: 650px) {
  #know-fourzerofour a {
    width: 100%;
    height: 100%;
  }
}
</style>