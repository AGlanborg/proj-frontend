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
      :category="category"
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
