<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>Error fetching data, retrying in {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <!-- <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button> -->
  </div>
</template>

<script>
export default {
  props: ["retry"],
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  watch: {
    retry() {
      console.log("IM INSIDE RETRY IN ALERT !!!!!!!!!!");
      this.showAlert();
    },
  },
};
</script>
