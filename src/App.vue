<template>
  <div id="main">
    <NavBar />
    <hr />
    <Main />
  </div>
</template>

<script>
import NavBar from "./components/Navbar";
import Main from "./components/Main";

export default {
  components: {
    NavBar,
    Main,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap");
#main {
  font-family: "Source Sans Pro", sans-serif;
}
</style>