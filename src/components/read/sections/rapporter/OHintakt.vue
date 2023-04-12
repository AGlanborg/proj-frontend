<template>
  <div class="instance header">
    <div class="buttonContainer">
      <!-- <abbr title="Create a new row">
        <button class="button" @click="$emit('toggleCreate')">
          <span class="material-icons check">add</span>
        </button>
      </abbr> -->
      <abbr title="Download seleced items">
        <button class="button" @click="handleDownload">
          <span class="material-icons check">download</span>
        </button>
      </abbr>
      <abbr title="Upload a new row">
        <button class="button" @click="$emit('toggleUpload')">
          <span class="material-icons check">upload</span>
        </button>
      </abbr>
    </div>
    <div class="checkboxContainer">
      <abbr title="Select all">
        <button class="checkbox" @click="toggleAll">
          <span class="material-icons check" v-if="all"> check </span>
        </button>
      </abbr>
    </div>
    <div class="valueContainer idContainer">
      <p>Id</p>
    </div>
    <div class="valueContainer">
      <p>Fakturerings<wbr />period</p>
    </div>
    <div class="valueContainer">
      <p>Köpare projektkod</p>
    </div>
    <div class="headerTextContainer">
      <p>Text På Internfaktura</p>
    </div>
    <div class="valueContainer">
      <p>Inpris, kr</p>
    </div>
    <div class="valueContainer">
      <p>Internfaktura per period, kr</p>
    </div>
    <div class="valueContainer">
      <p>Periodisering Start</p>
    </div>
    <div class="valueContainer">
      <p>Periodisering Slut</p>
    </div>
    <div class="valueContainer">
      <p>Periodisering antal månader</p>
    </div>
    <div class="valueContainer" v-for="month in months" v-bind:key="month">
      <p>{{ month }}</p>
    </div>
  </div>
  <div class="resultContent" :class="title ? 'minResults' : ''">
    <div v-for="inst in instances" v-bind:key="inst.main_id">
      <div class="instance" v-if="checkFilters(inst)">
        <div class="buttonContainer">
          <abbr title="Create copy of row">
            <button class="button" @click="$emit('handleCopy', inst.main_id)">
              <span class="material-icons check">content_copy</span>
            </button>
          </abbr>
          <abbr title="Edit row">
            <button class="button" @click="$emit('handleEdit', inst.main_id)">
              <span class="material-icons check">edit</span>
            </button>
          </abbr>
          <abbr title="Delete row">
            <button class="button" @click="$emit('handleRemove', inst.main_id)">
              <span class="material-icons check">delete</span>
            </button>
          </abbr>
        </div>
        <div class="checkboxContainer">
          <abbr title="Select row">
            <button class="checkbox" @click="toggleCheckbox(inst.main_id)">
              <span
                class="material-icons check"
                v-if="checked.includes(inst.main_id)"
              >
                check
              </span>
            </button>
          </abbr>
        </div>
        <div class="valueContainer idContainer">
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
          <p v-if="inst.kopare.name">
            {{ inst.kopare.rst }}
          </p>
          <p v-else>
            {{ inst.kopare.copernicus }}
          </p>
        </div>
        <div class="textContainer">
          <div class="text">
            <p>
              {{ inst.text }}
            </p>
          </div>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.inpris }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.internfakt }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.start }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.slut }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.perioder }}
          </p>
        </div>
        <div class="valueContainer" v-for="month in months" v-bind:key="month">
          <p v-if="checkMonth(inst.start, inst.slut, month)">
            {{ getAmount(inst.oh, inst.perioder) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createMonths from "@/assets/scripts/transform/createMonths";
import checkMonth from "@/assets/scripts/checkMonth";
import ohintakt from "@/assets/scripts/csv/ohintakt";

export default {
  name: "Rapport-OHintakt",
  props: {
    category: Boolean,
    instances: Array,
    title: Boolean,
    saljare: Array,
    kopare: Array,
    arbetstyp: Array,
    now: String,
    filters: Object,
    search: String,
  },
  emits: [
    "handleCopy",
    "handleEdit",
    "handleRemove",
    "toggleUpload",
    "toggleCreate",
  ],
  data() {
    return {
      checked: [],
      all: false,
      months: [],
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
      const list = this.instances.map((inst) => inst.main_id);

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
        const list = this.instances.map((inst) => inst.main_id);
        this.checked = list;
        this.all = true;
      }
    },
    getAmount(oh, perioder) {
      return parseFloat(oh / perioder).toFixed(2);
    },
    checkMonth(start, slut, month) {
      return checkMonth(start, slut, month);
    },
    handleDownload() {
      let data = [];

      for (let i = 0; i < this.instances.length; i += 1) {
        if (this.checked.includes(this.instances[i].main_id)) {
          data.push({ ...this.instances[i] });
        }
      }

      let csvContent =
        "data:text/csv;charset=utf-8," + ohintakt(data, this.now);

      window.open(encodeURI(csvContent));
    },
    checkFilters(inst) {
      const start = this.filters.start;
      const slut = this.filters.slut;
      const kopare = this.filters.kopare;
      const min = this.filters.min;
      const max = this.filters.max;
      let result = true;

      if (start && slut) {
        result = checkMonth(start, slut, inst.now);
      } else if (start && !slut) {
        result = checkMonth(start, "9999-99", inst.now);
      } else if (!start && slut) {
        result = checkMonth("1000-01", slut, inst.now);
      }
      if (
        parseFloat(inst.inpris) < parseFloat(min) ||
        parseFloat(inst.inpris) > parseFloat(max ? max : 1000000000)
      ) {
        result = false;
      }
      if (kopare && kopare != inst.kopare.kopare_id && result) {
        result = false;
      }
      if (!inst.text.includes(this.search)) {
        result = false;
      }

      return result;
    },
  },
  mounted() {
    this.months = createMonths(this.instances, this.now);
  },
  watch: {
    instances() {
      this.months = createMonths(this.instances, this.now);
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
  height: 70vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: 0.5s;
}

.minResults {
  height: 60vh;
}

.instance {
  display: flex;
  flex-direction: row;
  min-height: 5vh;
}

.instance:nth-child(even) > .checkboxContainer,
.instance:nth-child(even) > .buttonContainer,
.instance:nth-child(even) > .valueContainer {
  background-color: rgb(60, 60, 100);
}

.instance:nth-child(even) > .textContainer {
  background-color: rgb(57, 57, 95);
}

.header > .checkboxContainer,
.header > .buttonContainer,
.header > .valueContainer,
.header > .headerTextContainer {
  border-bottom: 5px solid rgb(44, 44, 64);
}

.checkboxContainer,
.buttonContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 5vh;
}

.checkboxContainer {
  border-right: 5px solid rgb(44, 44, 64);
  height: 5vh;
  min-width: 5vh;
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
  min-width: 10vw;
  font-size: 18px;
  flex-shrink: -5;
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
  min-height: 5vh;
  min-width: 20vw;
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
  overflow-wrap: break-all;
  width: 100%;
  line-height: 15px;
  margin: 0;
}

.text > p::-webkit-scrollbar {
  display: none;
}

.buttonContainer {
  min-width: 8vw;
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
  min-height: 5vh;
  min-width: 20vw;
  padding: 0 10px;
}

.headerTextContainer > p {
  display: inline;
  margin: 0;
}

.idContainer {
  min-width: 5vw;
}
</style>
