<template>
  <b-container class="bv-example-row">
    <b-form-select v-model="selectedCountry" :options="options"></b-form-select>
    <div class="mt-3">
      Selected: <strong>{{ selectedCountry }}</strong>
    </div>
  </b-container>
</template>

<script>
import * as countries from "../helpers/countries";
export default {
  data() {
    return {
      selectedCountry: "MA",
      options: countries.countries,
    };
  },
  created() {
    let countryName = countries.countries.find(
      (country) => country.value == this.selectedCountry
    ).text;
    console.log(countryName);
  },
};
</script>