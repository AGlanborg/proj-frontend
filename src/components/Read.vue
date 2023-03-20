<template>
  <div class="main">
    <Remove
      v-if="remove"
      :instances="instances"
      :selectedRemove="selectedRemove"
      @handleRemove="handleRemove"
    />
    <Upld v-if="upload" @toggleUpload="upload = !upload" />
    <Sure v-if="copy" :title="'Copy'" @handleSure="commitCopy" @toggleSure="toggleSure" />
    <Sure v-if="edit" :title="'Edit'" @handleSure="commitEdit" @toggleSure="toggleSure" />
    <Categories :category="category" @toggleCategory="category = !category" />
    <Search
      :category="category"
      :instances="instances"
      :remove="remove"
      :create="create"
      @handleCopy="handleCopy"
      @handleEdit="handleEdit"
      @handleRemove="handleRemove"
      @toggleUpload="upload = !upload"
      @toggleCreate="$emit('toggleCreate')"
    />
  </div>
</template>

<script>
import Categories from "./read/Categories.vue";
import Search from "./read/Search.vue";
import Remove from "./read/Remove.vue";
import Upld from "./read/Upld.vue";
import Sure from "./read/Sure.vue"

export default {
  name: "Main-read",
  components: {
    Categories,
    Search,
    Remove,
    Upld,
    Sure,
  },
  props: {
    create: Boolean,
    instances: Array,
    shell: Object,
    empty: Object,
  },
  data() {
    return {
      category: false,
      remove: false,
      upload: false,
      copy: false,
      edit: false,
      id: "",
    };
  },
  methods: {
    handleCopy(id) {
      if (this.shell != this.empty) {
        this.id = id
        this.copy = true
      } else {
        this.$emit("handleCopy", id);
      }
    },
    commitCopy() {
      this.copy = false
      this.$emit("handleCopy", this.id)
      this.id = ""
    },
    handleEdit(id) {
      if (this.shell != this.empty) {
        this.id = id
        this.edit = true
      } else {
        this.$emit("handleEdit", id);
      }
    },
    commitEdit() {
      this.edit = false
      this.$emit("handleEdit", this.id)
      this.id = ""
    },
    handleRemove(id) {
      this.remove ? (this.remove = false) : (this.remove = true);
      this.selectedRemove
        ? (this.selectedRemove = 0)
        : (this.selectedRemove = id);
    },
    toggleSure() {
      this.id = ""
      this.edit = false
      this.copy = false
    }
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
