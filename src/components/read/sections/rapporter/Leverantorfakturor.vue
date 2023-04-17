<template>
  <div class="instance header">
    <div class="buttonContainer">
      <!-- <abbr title="Create a new row">
        <button class="button" @click="$emit('toggleCreate')">
          <span class="material-icons check">add</span>
        </button>
      </abbr> -->
      <abbr title="Upload a new row">
        <button class="button" @click="$emit('toggleUpload')">
          <span class="material-icons check">upload</span>
        </button>
      </abbr>
      <abbr title="Download seleced items">
        <button class="button" @click="handleDownload">
          <span class="material-icons check">download</span>
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
      <p>Internpris, kr</p>
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
              {{ inst.text + " | " + inst.info }}
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
            {{ Math.round(inst.inpris / inst.perioder) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createMonths from "@/assets/scripts/transform/createMonths";
import checkMonth from "@/assets/scripts/checkMonth";
import leverantor from "@/assets/scripts/csv/leverantor";

export default {
  name: "Rapport-leverantor",
  props: {
    category: Boolean,
    instances: Array,
    title: Boolean,
    saljare: Array,
    kopare: Array,
    arbetstyp: Array,
    now: String,
    search: String,
    filters: Object,
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
        "data:text/csv;charset=utf-8," + leverantor(data, this.now);

      window.open(encodeURI(csvContent));
    },
    checkFilters(inst) {
      const start = this.filters.start;
      const slut = this.filters.slut;
      const saljare = this.filters.saljare;
      const kopare = this.filters.kopare;
      const arbetstyp = this.filters.arbetstyp;
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
        parseFloat(inst.totalt) < parseFloat(min) ||
        parseFloat(inst.totalt) > parseFloat(max ? max : 1000000000)
      ) {
        result = false;
      }
      if (saljare && saljare != inst.saljare.saljare_id && result) {
        result = false;
      }
      if (kopare && kopare != inst.kopare.kopare_id && result) {
        result = false;
      }
      if (arbetstyp && arbetstyp != inst.arbetstyp.arbetstyp_id && result) {
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
@import "@/assets/css/rapporter.css";

.maxResultContainer {
  width: 85vw;
}

.checkboxContainer {
  border-right: 5px solid rgb(44, 44, 64);
  min-height: 5vh;
  min-width: 5vh;
}

.valueContainer {
  min-height: 5vh;
  max-height: 5vh;
  min-width: 6vw;
  font-size: 14px;
}

.idContainer {
  min-width: 5vw;
}
</style>
