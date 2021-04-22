<template>
  <div id="main">
    <OpeningModal />
    <Ribbon />
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main";
import OpeningModal from "./components/OpeningModal";
import Ribbon from "./components/Ribbon";

export default {
  components: {
    Main,
    OpeningModal,
    Ribbon,
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