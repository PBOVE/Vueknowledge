/**
*
*  @author ZTiger
*
*/


<template>
  <div id="know-fourzerofour">
    <img src="../../assets/images/404.jpg" alt />
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
#know-fourzerofour img {
  display: block;
  margin: auto;
}
@media screen and (max-height: 650px) {
  #know-fourzerofour img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>