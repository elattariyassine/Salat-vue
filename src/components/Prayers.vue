<template>
  <div>
    <b-skeleton-table
      :rows="6"
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
        <h2>{{ prayers.fajr }}</h2>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar
          variant="success"
          icon="brightness-alt-high-fill"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">Sunrise</span>
        <h2>{{ prayers.sunrise }}</h2>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar
          variant="success"
          icon="brightness-high"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">Al-zuhr</span>
        <h2>{{ prayers.duhr }}</h2>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="success" icon="brightness-low" class="mr-3">
        </b-avatar>
        <span class="mr-auto">Al-'asr</span>
        <h2>{{ prayers.asr }}</h2>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar
          variant="success"
          icon="brightness-alt-high"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">Al-maghrib</span>
        <h2>{{ prayers.maghrib }}</h2>
      </b-list-group-item>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar
          variant="success"
          icon="brightness-low-fill"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">Al-'isha</span>
        <h2>{{ prayers.isha }}</h2>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["country", "city"],
  data() {
    return {
      isLoading: false,
      prayers: {
        fajr: "",
        sunrise: "",
        duhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      },
    };
  },
  created() {
    this.fetchData(this.city, this.country);
  },
  methods: {
    fetchData(city, country) {
      console.log("trying 1 it might work...");
      this.isLoading = true;
      axios
        .get(
          `${process.env.VUE_APP_ROOT_API}timingsByCity?city=${city}&country=${country}&method=8`
        )
        .then((res) => {
          this.prayers.fajr = res["data"]["data"]["timings"].Fajr;
          this.prayers.sunrise = res["data"]["data"]["timings"].Sunrise;
          this.prayers.duhr = res["data"]["data"]["timings"].Dhuhr;
          this.prayers.asr = res["data"]["data"]["timings"].Asr;
          this.prayers.maghrib = res["data"]["data"]["timings"].Maghrib;
          this.prayers.isha = res["data"]["data"]["timings"].Isha;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$emit("failedFetching", err);
          setTimeout(() => {
            this.$emit("failedFetching", err);
            this.fetchData(this.city, this.country);
          }, 5000);
        });
    },
  },
  watch: {
    city(newCity) {
      this.fetchData(newCity, this.city);
    },
  },
};
</script>