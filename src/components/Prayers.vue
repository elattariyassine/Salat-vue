<template>
  <div>
    <!-- <h1>prayer time</h1>
    <p>{{ country }} - {{ city }}</p> -->
    <b-skeleton-table
      :rows="5"
      :columns="2"
      :table-props="{ bordered: true, striped: true }"
      v-if="isLoading"
    ></b-skeleton-table>
    <b-list-group v-if="!isLoading">
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar
          variant="success"
          icon="brightness-alt-high"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">Al-fajr</span>
        <h2><b-badge>04:24</b-badge></h2>
      </b-list-group-item>
      <b-list-group-item>
        <b-avatar
          variant="success"
          icon="brightness-alt-high-fill"
          class="mr-3"
        ></b-avatar>
        Sunrise
      </b-list-group-item>
      <b-list-group-item>
        <b-avatar
          variant="success"
          icon="brightness-high"
          class="mr-3"
        ></b-avatar>
        Al-zuhr
      </b-list-group-item>
      <b-list-group-item>
        <b-avatar variant="success" icon="brightness-low" class="mr-3">
        </b-avatar>
        Al-'asr:
      </b-list-group-item>
      <b-list-group-item>
        <b-avatar
          variant="success"
          icon="brightness-alt-high"
          class="mr-3"
        ></b-avatar>
        Al-maghrib
      </b-list-group-item>
      <b-list-group-item>
        <b-avatar
          variant="success"
          icon="brightness-low-fill"
          class="mr-3"
        ></b-avatar>
        Al-'isha
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: ["country", "city"],
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    console.log("env " + process.env.VUE_APP_ROOT_API);
  },
};
</script>