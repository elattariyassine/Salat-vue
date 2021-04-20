<template>
  <b-container class="bv-example-row">
    <b-form-select
      v-model="selectedCountryByCode"
      @change="HandleSelectedCountry"
      :options="options"
    ></b-form-select>
    <div class="mt-3">
      Selected: <strong>{{ selectedCountryFullName }}</strong>
    </div>
  </b-container>
</template>

<script>
import * as countries from "../helpers/countries";

export default {
  data() {
    return {
      selectedCountryByCode: "MA",
      selectedCountryFullName: "",
      options: countries.countries,
    };
  },
  created() {
    console.log(this.GetCountryFullNameByCode);
  },
  methods: {
    HandleSelectedCountry() {
      this.selectedCountryFullName = this.GetCountryFullNameByCode;
    },
  },
  computed: {
    GetCountryFullNameByCode() {
      return this.options.find(
        (country) => country.value == this.selectedCountryByCode
      ).text;
    },
  },
};
</script>