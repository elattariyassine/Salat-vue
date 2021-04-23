<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col md="6" offset-md="3">
        <b-row>
          <b-col md="6">
            <b-form-select
              v-model="selectedCountryByCode"
              @change="HandleSelectedCountry"
              :options="options"
            ></b-form-select>
          </b-col>
          <b-col md="6">
            <b-form-select
              @change="HandleCity"
              v-model="selectedCity"
              :options="citiesForGivenCountry"
            ></b-form-select>
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

export default {
  components: {
    Prayers,
    RetryAlert,
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
  },
};
</script>

<style scoped>
#justToCenterTheAlert {
  text-align: center;
}
</style>