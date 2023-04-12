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
    <Sure
      v-if="clear"
      :title="'New'"
      @handleSure="commitNew"
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
      @handleNew="handleNew"
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
      clear: false,
      id: "",
    };
  },
  methods: {
    handleCopy(id) {
      if (this.checkIfEmpty()) {
        this.$emit("handleCopy", id);
      } else {
        this.id = id;
        this.copy = true;
      }
    },
    commitCopy() {
      this.copy = false;
      this.$emit("handleCopy", this.id);
      this.id = "";
    },
    handleEdit(id) {
      if (this.checkIfEmpty()) {
        this.$emit("handleEdit", id);
      } else {
        this.id = id;
        this.edit = true;
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
    commitNew() {
      this.clear = false;
      this.$emit("toggleCreate");
      this.$emit("handleClear");
    },
    handleNew() {
      if (this.checkIfEmpty()) {
        this.$emit("handleClear");
        this.$emit("toggleCreate");
      } else {
        this.clear = true;
      }
    },
    toggleSure() {
      this.id = "";
      this.edit = false;
      this.copy = false;
      this.clear = false;
    },
    checkIfEmpty() {
      let shell = { ...this.shell };
      let empty = { ...this.empty };
      let result = true;

      shell.kopare = this.shell.kopare.kopare_id;
      shell.saljare = this.shell.saljare.saljare_id;
      shell.arbetstyp = this.shell.arbetstyp.arbetstyp_id;

      empty.kopare = "";
      empty.saljare = "";
      empty.arbetstyp = "";

      let shellArr = Object.entries(shell);
      let emptyArr = Object.entries(empty);

      for (let i = 0; i < shellArr.length; i += 1) {
        if (
          shellArr[i][0] != emptyArr[i][0] ||
          shellArr[i][1] != emptyArr[i][1]
        ) {
          result = false;
        }
      }

      return result;
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
