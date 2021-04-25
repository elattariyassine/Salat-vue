<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col md="6" offset-md="3">
        <b-row>
          <b-col md="6">
            <model-select
              v-model="selectedCountryByCode"
              @input="HandleSelectedCountry"
              :options="options"
            ></model-select>
          </b-col>
          <b-col md="6">
            <model-select
              @input="HandleCity"
              v-model="selectedCity"
              :options="citiesForGivenCountry"
            ></model-select>
          </b-col>
        </b-row>
        <hr />
        <b-skeleton
          v-if="!isLoading"
          animation="wave"
          height="2.5rem"
          width="100%"
        ></b-skeleton>
        <!-- </b-card> -->
        <div id="justToCenterTheAlert">
          <b-alert v-if="isLoading" show variant="info">
            {{ hijriDate }} -
            <h5>
              <b-badge
                v-b-tooltip.hover
                title="Next prayer is also shown as the active item in the list below"
                variant="warning"
                >Next Prayer is {{ nextPrayer }}
              </b-badge>
            </h5>
            <hr />
            <vue-countdown :time="time" v-slot="{ hours, minutes, seconds }">
              Time Remaining for next prayer： -
              <span v-if="hours != 0">{{ hours }} hours, </span>
              <span v-if="minutes != 0">{{ minutes }} minutes, </span>
              {{ seconds }} seconds.
            </vue-countdown>
          </b-alert>
        </div>
        <!-- </b-row> -->
        <hr />
        <RetryAlert :retry="retryRequest" />
        <b-row>
          <b-col>
            <Prayers
              @failedFetching="retryFetching"
              @apiResponse="loadApiResponseFromChild"
              @currentPrayerNameAndTime="feedCountDown"
              :country="selectedCountryFullName"
              :city="selectedCity"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import * as data from "../helpers/countries";
import cities from "../helpers/cities.json";
import Prayers from "./Prayers";
import RetryAlert from "./Alert";
import { ModelSelect } from "vue-search-select";

export default {
  components: {
    Prayers,
    RetryAlert,
    ModelSelect,
  },
  citiesJson: cities,
  data() {
    return {
      selectedCountryByCode: "MA",
      selectedCountryFullName: "",
      selectedCity: "",
      options: data.countries,
      citiesForGivenCountry: [],
      retryRequest: false,
      hijriDate: "",
      isLoading: false,
      nextPrayer: "",
      leftMinutesToNextPrayer: 0,
    };
  },
  created() {
    this.selectedCountryFullName = this.GetCountryFullNameByCode;
    this.loadCities();
    this.selectedCity = "Youssoufia";
  },
  methods: {
    HandleSelectedCountry() {
      this.selectedCountryFullName = this.GetCountryFullNameByCode;
      this.citiesForGivenCountry = this.$options.citiesJson.filter(
        (countryObject) =>
          countryObject.country === this.selectedCountryFullName
      );
      this.loadCities();
    },
    loadCities() {
      this.citiesForGivenCountry = [];
      this.loadCitiesForGivenCountry.forEach((city) => {
        this.citiesForGivenCountry.push({
          text: city.name,
          value: city.name,
        });
      });
      this.selectedCity = this.citiesForGivenCountry[1].value;
    },
    HandleCity(city) {
      this.selectedCity = city;
    },
    retryFetching() {
      //here i receive the error message as a paramer but because i dont need it i remove it but it can be added
      this.retryRequest = !this.retryRequest;
    },
    loadApiResponseFromChild(response, isLoading, nextPrayer) {
      this.hijriDate = `${response["data"]["data"]["date"]["gregorian"]["weekday"].en}, ${response["data"]["data"]["date"]["hijri"].day} ${response["data"]["data"]["date"]["hijri"].month.en} ${response["data"]["data"]["date"]["hijri"].year}, ${response["data"]["data"]["date"].readable}`;
      this.isLoading = isLoading;
      this.nextPrayer = nextPrayer;
    },
    feedCountDown(nextSalat) {
      const [hours, minutes] = nextSalat.time.split(":");
      const nextPrayerTime = new Date();
      nextPrayerTime.setHours(hours);
      nextPrayerTime.setMinutes(minutes);
      const dateNow = new Date();

      let diff = (nextPrayerTime.getTime() - dateNow.getTime()) / 1000;
      diff /= 60;
      this.leftMinutesToNextPrayer = Math.abs(Math.round(diff));
      // console.warn(res);
    },
  },
  computed: {
    GetCountryFullNameByCode() {
      return this.options.find(
        (country) => country.value == this.selectedCountryByCode
      ).text;
    },
    loadCitiesForGivenCountry() {
      return this.$options.citiesJson.filter(
        (obj) => obj.country === this.selectedCountryFullName
      );
    },
    time() {
      return this.leftMinutesToNextPrayer * 60 * 1000;
    },
  },
};
</script>

<style scoped>
#justToCenterTheAlert {
  text-align: center;
}
</style>