<template>
  <div class="removeContainer">
    <div class="remove">
      <div>
        <h2 class="title">VARNING</h2>
        <p class="subtitle">Du försöker radera en rad från databasen</p>
        <p class="mainText">Är du säker på att det är vad du vill göra?</p>
      </div>
      <div class="instanceContainer">
        <div class="detailsContainer">
          <div class="detail">
            <p v-if="instance.saljare.name == '1'">
              {{ instance.saljare.rst }}
            </p>
            <p v-else >
              {{ instance.saljare.copernicus }}
            </p>
          </div>
          <div class="detail">
            <p v-if="instance.kopare.name == '1'">
              {{ instance.kopare.rst }}
            </p>
            <p v-else >
              {{ instance.kopare.copernicus }}
            </p>
          </div>
          <div class="detail">
            <p>
              {{ instance.arbetstyp.arbetstyp }}
            </p>
          </div>
          <div class="detail">
            <p>
              {{ instance.antal }}
            </p>
          </div>
          <div class="detail">
            <p>
              {{ instance.totalt }}
            </p>
          </div>
        </div>
        <div class="textContainer">
          <p>
            {{ text }}
          </p>
        </div>
      </div>
      <div class="buttonContainer">
        <button class="button delete" @click="handleDelete">DELETE</button>
        <button class="button" @click="$emit('handleRemove')">BACK</button>
      </div>
    </div>
  </div>
</template>

<script>
import remove from '@/assets/scripts/requests/remove'

export default {
  name: "Read-delete",
  props: {
    instances: Array,
    selectedRemove: Number,
  },
  data() {
    return {
      instance: {
        main_id: "",
        saljare: {
          saljare_id: "",
          rst: "",
          copernicus: "",
          kontakt: "",
          name: "",
        },
        kopare: {
          kopare_id: "",
          rst: "",
          copernicus: "",
          kontakt: "",
          name: "",
        },
        arbetstyp: {
          arbetstyp_id: "",
          arbetstyp: "",
          tillverkare: "",
        },
        antal: "1",
        typ: "",
        leverantor: "",
        text: "",
        info: "Vid frågor maila Licensdesken xxx@xxx.se",
        valuta: "SEK",
        mangd: "1",
        inprisex: "0",
        inprisin: "0",
        procent: "5",
        oh: "0",
        totalt: "0",
        fakturanum: "",
        kommentar: "",
        inpris: "0",
        start: "",
        slut: "",
        perioder: "0",
        internfakt: "0",
        upfront: "0",
        rest: "0",
        intakt: "0",
        scan: "0",
        now: "",
      },
      text: "",
    };
  },
  methods: {
    async handleDelete() {
      let obj = {}

      obj.tabel = 'main'
      obj.id = this.selectedRemove

      await remove({data: obj}, 'main')

      this.$emit('reload')
      this.$emit('handleRemove')
    }
  },
  mounted() {
    this.instance = this.instances.find(
      (inst) => inst.main_id == this.selectedRemove
    );

    this.text = this.instance.text.replaceAll("\n", ". ");
  },
};
</script>

<style scoped>
.removeContainer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  z-index: 10;
  height: 100vh;
  width: 100vw;
}

.remove {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: rgba(44, 44, 64);
  border-radius: 5px;
  height: 80vh;
  width: 80vw;
}

.title {
  font-size: 40px;
}

.subtitle {
  font-size: 30px;
  padding-bottom: 2vh;
}

.mainText {
  font-size: 20px;
  margin: 0;
}

.buttonContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.button {
  background-color: rgb(55, 55, 75);
  padding: 20px;
  margin-bottom: 50px;
  border-radius: 5px;
  cursor: pointer;
}

.delete {
  background-color: rgb(200, 50, 50);
}

.instanceContainer {
  width: 70vw;
  margin: 0 5vw;
  border-radius: 20px;
}

.detailsContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 5vh;
  background-color: rgb(55, 55, 75);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.detail {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 15px;
  flex-grow: 1;
}

.detail:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.3);
}

.detail:first-child {
  border-top-left-radius: 20px;
}

.detail:last-child {
  border-top-right-radius: 20px;
}

.detail > p {
  display: block;
  margin: 0;
  font-size: 20px;
}

.textContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
  height: 5vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.textContainer > p {
  margin: 0;
  font-size: 20px;
}
</style>
