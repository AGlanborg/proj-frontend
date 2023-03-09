<template>
  <div class="instanceContainer">
    <div class="instance header">
      <div class="checkboxContainer">
        <abbr title="Select all">
          <div class="checkbox" @click="toggleAll">
            <span class="material-icons check" v-if="all"> check </span>
          </div>
        </abbr>
      </div>
      <div class="valueContainer">
        <p>Säljare</p>
      </div>
      <div class="valueContainer">
        <p>Köpare</p>
      </div>
      <div class="valueContainer">
        <p>Arbetstyp</p>
      </div>
      <div class="valueContainer">
        <p>Antal</p>
      </div>
      <div class="valueContainer">
        <p>Konstnad</p>
      </div>
      <div class="headerTextContainer">
        <p>Text</p>
      </div>
      <div class="buttonContainer">
        <abbr title="Download seleced items">
          <div class="button">
            <span class="material-icons check">download</span>
          </div>
        </abbr>
        <abbr title="Upload a new row">
          <div class="button">
            <span class="material-icons check">upload</span>
          </div>
        </abbr>
        <abbr title="Create a new row">
          <div class="button">
            <span class="material-icons check">add</span>
          </div>
        </abbr>
      </div>
    </div>
    <div class="instance" v-for="inst in instances" v-bind:key="inst.id">
      <div class="checkboxContainer">
        <abbr title="Select row">
          <div class="checkbox" @click="toggleCheckbox(inst.id)">
            <span class="material-icons check" v-if="checked.includes(inst.id)">
              check
            </span>
          </div>
        </abbr>
      </div>
      <div class="valueContainer">
        <p>
          {{ inst.seller }}
        </p>
      </div>
      <div class="valueContainer">
        <p>
          {{ inst.buyer }}
        </p>
      </div>
      <div class="valueContainer">
        <p>
          {{ inst.workType }}
        </p>
      </div>
      <div class="valueContainer">
        <p>
          {{ inst.amount }}
        </p>
      </div>
      <div class="valueContainer">
        <p>
          {{ inst.cost }}
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
          <div class="button">
            <span class="material-icons check">content_copy</span>
          </div>
        </abbr>
        <abbr title="Edit row">
          <div class="button">
            <span class="material-icons check">edit</span>
          </div>
        </abbr>
        <abbr title="Delete row">
          <div class="button" @click="handleRemove(inst.id)">
            <span class="material-icons check">delete</span>
          </div>
        </abbr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Read-results",
  props: {
    category: Boolean,
    instances: Array,
  },
  data() {
    return {
      checked: [],
      all: false
    };
  },
  methods: {
    toggleCheckbox(id) {
      if (this.checked.includes(id)) {
        this.checked.splice(this.checked.indexOf(id), 1);
      } else {
        this.checked.push(id);
      }

      this.checkAll()
    },
    checkAll() {
      const list = this.instances.map(inst => inst.id)

      if (list.every(inst => this.checked.includes(inst))) {
        this.all = true
      } else {
        this.all = false
      }

      return this.all
    },
    toggleAll() {
      if (this.checkAll()) {
        this.checked = []
        this.all = false
      } else {
        const list = this.instances.map(inst => inst.id)
        this.checked = list
        this.all = true
      }
    },
    handleRemove(id) {
      this.$emit("handleRemove", id);
    },
  },
};
</script>

<style scoped>
@import "material-icons/iconfont/material-icons.css";

abbr {
  text-decoration: none;
}

.inctanceContainer {
  display: flex;
  flex-direction: column;
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
  height: 5vh;
  width: 6vw;
  font-size: 18px;
}

.valueContainer p {
  margin: 0;
  line-height: 0;
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
