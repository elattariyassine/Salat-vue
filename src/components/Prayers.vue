<template>
  <div>
    <b-skeleton-table
      :rows="6"
      :columns="2"
      :table-props="{ bordered: true, striped: true }"
      v-if="isLoading"
    ></b-skeleton-table>
    <b-list-group v-if="!isLoading">
      <b-list-group-item
        :variant="nextPrayer === 'Fajr' ? 'dark' : ''"
        class="d-flex align-items-center"
      >
        <b-avatar
          variant="info"
          icon="brightness-alt-high"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">Al-fajr</span>
        <h2>{{ prayers.fajr }}</h2>
      </b-list-group-item>
      <b-list-group-item
        :variant="nextPrayer === 'Dhuhr' ? 'dark' : ''"
        class="d-flex align-items-center"
      >
        <b-avatar variant="info" icon="brightness-high" class="mr-3"></b-avatar>
        <span class="mr-auto">Al-zuhr</span>
        <h2>{{ prayers.duhr }}</h2>
      </b-list-group-item>
      <b-list-group-item
        :variant="nextPrayer === 'Asr' ? 'dark' : ''"
        class="d-flex align-items-center"
      >
        <b-avatar variant="info" icon="brightness-low" class="mr-3"> </b-avatar>
        <span class="mr-auto">Al-'asr</span>
        <h2>{{ prayers.asr }}</h2>
      </b-list-group-item>
      <b-list-group-item
        :variant="nextPrayer === 'Maghrib' ? 'dark' : ''"
        class="d-flex align-items-center"
      >
        <b-avatar
          variant="info"
          icon="brightness-alt-high"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">Al-maghrib</span>
        <h2>{{ prayers.maghrib }}</h2>
      </b-list-group-item>
      <b-list-group-item
        :variant="nextPrayer === 'Isha' ? 'dark' : ''"
        class="d-flex align-items-center"
      >
        <b-avatar
          variant="info"
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
        duhr: "",
        asr: "",
        maghrib: "",
        isha: "",
      },
      nextPrayer: "",
    };
  },
  created() {
    this.fetchData(this.city, this.country);
  },
  methods: {
    fetchData(city, country) {
      this.isLoading = true;
      axios
        .get(
          `${process.env.VUE_APP_ROOT_API}timingsByCity?city=${city}&country=${country}&method=8`
        )
        .then((res) => {
          this.getTodaysPrayerTimes({ ...res });
          this.$emit("apiResponse", res, this.isLoading, this.nextPrayer);
          this.prayers.fajr = res["data"]["data"]["timings"].Fajr;
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
            // this.$emit("failedFetching", err);
            this.fetchData(this.city, this.country);
          }, 5000);
        });
    },
    getTodaysPrayerTimes({
      data: {
        data: { timings },
      },
    }) {
      console.warn("inside methode that gives next prayer");
      delete timings.Imsak;
      delete timings.Midnight;
      delete timings.Sunrise;
      delete timings.Sunset;
      const timingsTolistOrdered = [
        { salat: "Fajr", time: timings.Fajr },
        { salat: "Dhuhr", time: timings.Dhuhr },
        { salat: "Asr", time: timings.Asr },
        { salat: "Maghrib", time: timings.Maghrib },
        { salat: "Isha", time: timings.Isha },
      ];
      const nextPrayers = [];
      timingsTolistOrdered.forEach((el) => {
        const [hours, minute] = el.time.split(":");
        if (new Date().getHours() < parseInt(hours)) {
          nextPrayers.push(el.salat);
          console.log("next prayer is " + el.salat);
        } else if (new Date().getHours() == parseInt(hours)) {
          if (new Date().getMinutes() <= parseInt(minute)) {
            nextPrayers.push(el.salat);
          }
        }
      });
      if (nextPrayers[0] == undefined) nextPrayers.push("Fajr");
      console.warn(nextPrayers);
      this.nextPrayer = nextPrayers[0];
    },
  },
  watch: {
    city(newCity) {
      this.fetchData(newCity, this.city);
    },
  },
};
</script>