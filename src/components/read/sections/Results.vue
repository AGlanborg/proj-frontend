<template>
  <div class="instanceContainer">
    <div class="instance header">
      <div class="checkboxContainer">
        <abbr title="Select all">
          <button class="checkbox" @click="toggleAll">
            <span class="material-icons check" v-if="all"> check </span>
          </button>
        </abbr>
      </div>
      <div class="valueContainer">
        <p>Id</p>
      </div>
      <div class="valueContainer">
        <p>Fakturerings<wbr>period</p>
      </div>
      <div class="valueContainer">
        <p>Leverantör</p>
      </div>
      <div class="valueContainer">
        <p>Köpare</p>
      </div>
      <div class="valueContainer">
        <p>Arbetstyp</p>
      </div>
      <div class="valueContainer noWrap">
        <p>Antal Poster</p>
      </div>
      <div class="valueContainer">
        <p>Kostnad</p>
      </div>
      <div class="headerTextContainer">
        <p>Text</p>
      </div>
      <div class="buttonContainer">
        <abbr title="Download seleced items">
          <button class="button">
            <span class="material-icons check">download</span>
          </button>
        </abbr>
        <abbr title="Upload a new row">
          <button class="button" @click="$emit('toggleUpload')">
            <span class="material-icons check">upload</span>
          </button>
        </abbr>
        <abbr title="Create a new row">
          <button class="button" @click="$emit('toggleCreate')">
            <span class="material-icons check">add</span>
          </button>
        </abbr>
      </div>
    </div>
    <div
      class="resultContent"
      :class="title ? 'maxTitleContainer' : 'minTitleContainer'"
    >
      <div class="instance" v-for="inst in instances" v-bind:key="inst.id">
        <div class="checkboxContainer">
          <abbr title="Select row">
            <button class="checkbox" @click="toggleCheckbox(inst.id)">
              <span
                class="material-icons check"
                v-if="checked.includes(inst.id)"
              >
                check
              </span>
            </button>
          </abbr>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.main_id }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.now }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.saljare }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.kopare }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.arbetstyp }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.antal }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.totalt }}
          </p>
        </div>
        <div class="textContainer">
          <div class="text">
            <p>
              {{ inst.text }}
            </p>
          </div>
        </div>
        <div class="buttonContainer">
          <abbr title="Create copy of row">
            <button class="button">
              <span class="material-icons check">content_copy</span>
            </button>
          </abbr>
          <abbr title="Edit row">
            <button class="button">
              <span class="material-icons check">edit</span>
            </button>
          </abbr>
          <abbr title="Delete row">
            <button class="button" @click="handleRemove(inst.id)">
              <span class="material-icons check">delete</span>
            </button>
          </abbr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search-results",
  props: {
    category: Boolean,
    instances: Array,
    title: Boolean,
  },
  data() {
    return {
      checked: [],
      all: false,
    };
  },
  methods: {
    toggleCheckbox(id) {
      if (this.checked.includes(id)) {
        this.checked.splice(this.checked.indexOf(id), 1);
      } else {
        this.checked.push(id);
      }

      this.checkAll();
    },
    checkAll() {
      const list = this.instances.map((inst) => inst.id);

      if (list.every((inst) => this.checked.includes(inst))) {
        this.all = true;
      } else {
        this.all = false;
      }

      return this.all;
    },
    toggleAll() {
      if (this.checkAll()) {
        this.checked = [];
        this.all = false;
      } else {
        const list = this.instances.map((inst) => inst.id);
        this.checked = list;
        this.all = true;
      }
    },
    handleRemove(id) {
      this.$emit("handleRemove", id);
    },
  },
};
</script>

<style scoped>
abbr {
  text-decoration: none;
}

.inctanceContainer {
  display: flex;
  flex-direction: column;
}

.maxResultContainer {
  width: 85vw;
}

.resultContent {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 70vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.resultContent::-webkit-scrollbar {
  display: none;
}

.instance {
  display: flex;
  flex-direction: row;
  height: 5vh;
}

.instance:nth-child(even) {
  background-color: rgb(60, 60, 100);
}

.header {
  border-bottom: 5px solid rgb(44, 44, 64);
}

.checkboxContainer,
.buttonContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.checkboxContainer {
  border-right: 5px solid rgb(44, 44, 64);
  height: 5vh;
  width: 5vh;
}

.checkbox,
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(44, 44, 64);
  width: 2.5vh;
  height: 2.5vh;
  min-width: 25px;
  min-height: 25px;
  border-radius: 5px;
}

.check {
  user-select: none;
  font-size: 2vh;
}

.valueContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5vh;
  width: 6vw;
  min-width: 100px;
  font-size: 18px;
}

.noWrap {
  white-space: nowrap;
}

.valueContainer p {
  text-align: center;
  margin: 0;
  line-height: 20px;
}

.textContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  height: 5vh;
  padding: 0 10px;
}

.text {
  display: flex;
  flex-direction: row;
  height: 4vh;
}

.text > p {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: inline-block;
  white-space: pre-line;
  width: 100%;
  line-height: 15px;
  margin: 0;
}

.text > p::-webkit-scrollbar {
  display: none;
}

.buttonContainer {
  width: 8vw;
}

.button {
  width: 3vh;
  height: 3vh;
}

.headerTextContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
}

.headerTextContainer > p {
  display: inline;
  margin: 0;
}
</style>
