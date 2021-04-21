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
        <RetryAlert :retry="retryRequest" />
        <b-row>
          <b-col>
            <Prayers
              @failedFetching="retryFetching"
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
    };
  },
  created() {
    this.selectedCountryFullName = this.GetCountryFullNameByCode;
    this.loadCities();
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
    retryFetching(error) {
      console.log("this is error in parent " + error);
      this.retryRequest = !this.retryRequest;
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