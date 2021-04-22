<template>
  <div>
    <b-modal ref="my-modal" hide-footer title="About calculation method">
      <div class="d-block text-center">
        <p>
          Prayer times
          <b-badge
            v-b-tooltip.hover
            title="Methods identify various schools of thought about how to compute the timings"
            variant="primary"
            >calculation method</b-badge
          >
          used is Muslim World League.
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
  },
  mounted() {
    this.showModal();
  },
};
</script>