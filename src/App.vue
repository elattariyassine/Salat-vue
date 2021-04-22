<template>
  <div id="main">
    <OpeningModal />
    <div class="ribbon ribbon-top-right"><span>Github</span></div>
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main";
import OpeningModal from "./components/OpeningModal";

export default {
  components: {
    Main,
    OpeningModal,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap");
#main {
  font-family: "Source Sans Pro", sans-serif;
  margin-top: 15px;
}
</style>