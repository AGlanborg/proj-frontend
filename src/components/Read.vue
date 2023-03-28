<template>
  <div class="main">
    <Remove
      v-if="remove"
      :instances="instances"
      :selectedRemove="selectedRemove"
      @handleRemove="handleRemove"
      @reload="$emit('reload')"
    />
    <Upld
      v-if="upload"
      @toggleUpload="upload = !upload"
      @reload="$emit('reload')"
    />
    <Sure
      v-if="copy"
      :title="'Copy'"
      @handleSure="commitCopy"
      @toggleSure="toggleSure"
    />
    <Sure
      v-if="edit"
      :title="'Edit'"
      @handleSure="commitEdit"
      @toggleSure="toggleSure"
    />
    <Search
      :instances="instances"
      :create="create"
      :saljare="saljare"
      :kopare="kopare"
      :arbetstyp="arbetstyp"
      :now="now"
      @handleCopy="handleCopy"
      @handleEdit="handleEdit"
      @handleRemove="handleRemove"
      @toggleUpload="upload = !upload"
      @toggleCreate="$emit('toggleCreate')"
    />
  </div>
</template>

<script>
import Search from "./read/Search.vue";
import Remove from "./covers/Remove.vue";
import Upld from "./covers/Upld.vue";
import Sure from "./covers/Sure.vue";

export default {
  name: "Main-read",
  components: {
    Search,
    Remove,
    Upld,
    Sure,
  },
  props: {
    create: Boolean,
    now: String,
    instances: Array,
    shell: Object,
    saljare: Array,
    kopare: Array,
    arbetstyp: Array,
    empty: Object,
  },
  data() {
    return {
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
        this.id = id;
        this.copy = true;
      } else {
        this.$emit("handleCopy", id);
      }
    },
    commitCopy() {
      this.copy = false;
      this.$emit("handleCopy", this.id);
      this.id = "";
    },
    handleEdit(id) {
      if (this.shell != this.empty) {
        this.id = id;
        this.edit = true;
      } else {
        this.$emit("handleEdit", id);
      }
    },
    commitEdit() {
      this.edit = false;
      this.$emit("handleEdit", this.id);
      this.id = "";
    },
    handleRemove(id) {
      this.remove = !this.remove;
      this.selectedRemove
        ? (this.selectedRemove = 0)
        : (this.selectedRemove = id);
    },
    toggleSure() {
      this.id = "";
      this.edit = false;
      this.copy = false;
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
