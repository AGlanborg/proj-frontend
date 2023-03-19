<template>
  <div class="main">
    <Remove
      v-if="remove"
      :instances="instances"
      :selectedRemove="selectedRemove"
      @handleRemove="handleRemove"
    />
    <Upload
      v-if="upload"
      @toggleUpload="toggleUpload"
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
      @toggleCategory="toggleCategory"
    />
    <Search
      :category="category"
      :instances="instances"
      :remove="remove"
      :create="create"
      @handleRemove="handleRemove"
      @toggleUpload="toggleUpload"
      @toggleCreate="$emit('toggleCreate')"
    />
  </div>
</template>

<script>
import Categories from "./read/Categories.vue";
import Search from "./read/Search.vue";
import Remove from "./read/Remove.vue";
import Upload from "./read/Upld.vue";

import * as get from "@/assets/scripts/requests/get"

export default {
  name: "Main-read",
  components: {
    Categories,
    Search,
    Remove,
    Upload,
  },
  props: {
    create: Boolean
  },
  data() {
    return {
      category: false,
      remove: false,
      upload: false,
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
      instances: [],
    };
  },
  methods: {
    toggleCategory() {
      this.category = !this.category;
    },
    handleRemove(id) {
      this.remove ? (this.remove = false) : (this.remove = true);
      this.selectedRemove
        ? (this.selectedRemove = 0)
        : (this.selectedRemove = id);
    },
    toggleUpload() {
      this.upload = !this.upload
    }
  },
  async mounted() {
    const content = await get.all()
    this.instances = content
  }
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
