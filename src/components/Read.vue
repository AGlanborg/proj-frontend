<template>
  <div class="main">
    <Remove
      v-if="remove"
      :instances="instances"
      :selectedRemove="selectedRemove"
      @handleRemove="handleRemove"
    />
    <Categories
      :remove="remove"
      :category="category"
      :sellers="sellers"
      :selectedSeller="selectedSeller"
      :buyers="buyers"
      :selectedBuyer="selectedBuyer"
      :workTypes="workTypes"
      :selectedWorkType="selectedWorkType"
      :amounts="amounts"
      :selectedAmount="selectedAmount"
      :formats="formats"
      :selectedFormat="selectedFormat"
      @toggleCategory="toggleCategory"
    />
    <Search
      :category="category"
      :instances="instances"
      :remove="remove"
      :create="create"
      @handleRemove="handleRemove"
      @toggleCreate="$emit('toggleCreate')"
    />
  </div>
</template>

<script>
import Categories from "./read/Categories.vue";
import Search from "./read/Search.vue";
import Remove from "./read/Remove.vue";

export default {
  name: "Main-read",
  components: {
    Categories,
    Search,
    Remove,
  },
  props: {
    create: Boolean
  },
  data() {
    return {
      category: false,
      remove: false,
      selectedRemove: 0,
      sellers: [
        {
          id: 1234,
          text: "Arla",
        },
        {
          id: 2345,
          text: "Flora",
        },
        {
          id: 3456,
          text: "Lätta",
        },
      ],
      selectedSeller: 0,
      buyers: [
        {
          id: 1234,
          text: "ICA",
        },
        {
          id: 2345,
          text: "COOP",
        },
        {
          id: 3456,
          text: "Willys",
        },
      ],
      selectedBuyer: 0,
      workTypes: [
        {
          id: 1234,
          text: "Smörgås",
        },
        {
          id: 2345,
          text: "Stekpanna",
        },
        {
          id: 3456,
          text: "Ugnform",
        },
      ],
      selectedWorkType: 0,
      amounts: [
        {
          id: 1234,
          text: "2",
        },
        {
          id: 2345,
          text: "3",
        },
        {
          id: 3456,
          text: "4",
        },
      ],
      selectedAmount: 0,
      formats: [
        {
          id: 1,
          text: "Period-vis",
        },
        {
          id: 2,
          text: "Månad-vis",
        },
        {
          id: 3,
          text: "År-vis",
        },
      ],
      selectedFormat: 2,
      instances: [
        {
          checked: false,
          seller: "Arla",
          buyer: "ICA",
          workType: "Ugnform",
          amount: 1,
          cost: 10000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 1,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "Willys",
          workType: "Smörgås",
          amount: 10,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          cost: 100000,
          id: 2,
        },
        {
          checked: false,
          seller: "Lätta",
          buyer: "COOP",
          workType: "Ugnform",
          amount: 100,
          cost: 1000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 3,
        },
        {
          checked: false,
          seller: "Flora",
          buyer: "COOP",
          workType: "Stekpanna",
          amount: 1000,
          cost: 10000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 4,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "ICA",
          workType: "Ugnform",
          amount: 1,
          cost: 10000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 5,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "Willys",
          workType: "Smörgås",
          amount: 10,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          cost: 100000,
          id: 6,
        },
        {
          checked: false,
          seller: "Lätta",
          buyer: "COOP",
          workType: "Ugnform",
          amount: 100,
          cost: 1000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 7,
        },
        {
          checked: false,
          seller: "Flora",
          buyer: "COOP",
          workType: "Stekpanna",
          amount: 1000,
          cost: 10000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 8,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "ICA",
          workType: "Ugnform",
          amount: 1,
          cost: 10000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 9,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "Willys",
          workType: "Smörgås",
          amount: 10,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          cost: 100000,
          id: 10,
        },
        {
          checked: false,
          seller: "Lätta",
          buyer: "COOP",
          workType: "Ugnform",
          amount: 100,
          cost: 1000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 11,
        },
        {
          checked: false,
          seller: "Flora",
          buyer: "COOP",
          workType: "Stekpanna",
          amount: 1000,
          cost: 10000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 12,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "ICA",
          workType: "Ugnform",
          amount: 1,
          cost: 10000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 13,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "Willys",
          workType: "Smörgås",
          amount: 10,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          cost: 100000,
          id: 14,
        },
        {
          checked: false,
          seller: "Lätta",
          buyer: "COOP",
          workType: "Ugnform",
          amount: 100,
          cost: 1000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 15,
        },
        {
          checked: false,
          seller: "Flora",
          buyer: "COOP",
          workType: "Stekpanna",
          amount: 1000,
          cost: 10000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 16,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "ICA",
          workType: "Ugnform",
          amount: 1,
          cost: 10000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 17,
        },
        {
          checked: false,
          seller: "Arla",
          buyer: "Willys",
          workType: "Smörgås",
          amount: 10,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          cost: 100000,
          id: 18,
        },
        {
          checked: false,
          seller: "Lätta",
          buyer: "COOP",
          workType: "Ugnform",
          amount: 100,
          cost: 1000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 19,
        },
        {
          checked: false,
          seller: "Flora",
          buyer: "COOP",
          workType: "Stekpanna",
          amount: 1000,
          cost: 10000000,
          text: "Support, Adobe renewal 3 yrs commit\nAcrobat Pro DC - Americas\nPeriod 2019-06-30 - 2020-06-29, Payment 1 of 3 years",
          id: 20,
        },
      ],
    };
  },
  methods: {
    toggleCategory() {
      this.category ? (this.category = false) : (this.category = true);
    },
    handleRemove(id) {
      this.remove ? (this.remove = false) : (this.remove = true);
      this.selectedRemove
        ? (this.selectedRemove = 0)
        : (this.selectedRemove = id);
    },
  },
};
</script>

<style>
.main {
  display: flex;
  flex-direction: row;
  width: 100vw;
  overflow: hidden;
}

body {
  overflow: hidden;
}
</style>
