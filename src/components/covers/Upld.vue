<template>
  <div class="removeContainer successContainer" v-if="success">
    <div class="success">
      <h2>Success!</h2>
      <p>Innehållet har tillagts nu i databasen</p>
      <button class="button" @click="handleClose">Close</button>
    </div>
  </div>
  <div class="removeContainer successContainer" v-if="error">
    <div class="success">
      <h2>ERROR</h2>
      <p>Något gick fel i API</p>
      <button class="button" @click="error = !error">Close</button>
    </div>
  </div>
  <div class="removeContainer successContainer" v-if="idk">
    <div class="success">
      <h2>Fel</h2>
      <p>Något gick fel någonstans</p>
      <button class="button" @click="idk = !idk">Close</button>
    </div>
  </div>
  <div class="removeContainer">
    <div class="remove">
      <div class="textareaContainer">
        <div>
          <label for="text" class="textareaLabel"> {{ title }} </label>
          <textarea
            id="text"
            :class="red ? 'redTextarea' : ''"
            v-model="text"
            @input="red = false"
          >
          </textarea>
        </div>
      </div>
      <div>
        <div>
          <label for="file" class="fileText"> Välj fil nedan </label>
          <input
            type="file"
            id="file"
            accept=".csv"
            @change="handleFile($event)"
          />
        </div>
        <div class="downloadContainer">
          <div>
            <p class="explainText">Ladda ner Mall</p>
            <button class="button" @click="handleMall">Download</button>
            <div class="redText">
              <p v-if="red">Innehållet följer inte mallen</p>
            </div>
          </div>
          <div>
            <p class="explainText">Ladda ner Exempel</p>
            <button class="button" @click="handleExample">Download</button>
          </div>
          <div>
            <p class="explainText">Öppna Instruktioner</p>
            <a href="./Instruktioner.pdf" target="_blank">
              <button class="button">Open</button>
            </a>
          </div>
        </div>
        <div class="instanceContainer">
          <div class="buttonContainer">
            <button
              class="button upload"
              :class="!text || red ? 'disabled' : ''"
              @click="handleUpload"
            >
              UPLOAD
            </button>
            <button class="button" @click="$emit('toggleUpload')">BACK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upload from "@/assets/scripts/transform/csv";
import mall from "@/assets/scripts/csv/mall";
import exmaple from "@/assets/scripts/csv/example";

export default {
  name: "Read-upload",
  emits: ["toggleUpload", "reload"],
  data() {
    return {
      text: "",
      title: "",
      red: false,
      error: false,
      success: false,
      idk: false,
    };
  },
  methods: {
    async handleFile(event) {
      const txt = event.target.files.item(0);

      this.text = await txt.text();

      this.title =
        "Följande är innehållet av filen " + event.target.files.item(0).name;

      this.red = false;
    },
    async handleUpload() {
      if (this.text && !this.red) {
        try {
          const content = await upload(this.text);
          if (content.title.toUpperCase() == "INVALID CONTENT") {
            this.red = true;
          } else if (content.title.toUpperCase() == "ERROR") {
            this.error = true;
          } else if (content.title.toUpperCase() == "SUCCESS") {
            this.success = true;
          } else {
            this.idk = true;
          }
        } catch (e) {
          this.idk = true;
        }
      }
    },
    handleMall() {
      let csvContent = "data:text/csv;charset=utf-8," + mall();

      window.open(encodeURI(csvContent));
    },
    handleExample() {
      let csvContent = "data:text/csv;charset=utf-8," + exmaple();

      window.open(encodeURI(csvContent));
    },
    handleClose() {
      this.text = "";
      this.title = "";
      this.red = false;
      this.error = false;
      this.success = false;

      this.$emit("reload");
      this.$emit("toggleUpload");
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  background-color: rgb(55, 55, 75);
  margin-top: 2vh;
}

textarea {
  background-color: rgba(0, 0, 0, 0.4);
  height: 30vh;
  width: 75vw;
  margin: 10px 0 0;
}

.removeContainer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  z-index: 5;
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

.buttonContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 20px 0;
}

.button {
  background-color: rgb(55, 55, 75);
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

.upload {
  background-color: rgb(50, 200, 50);
}

.instanceContainer {
  width: 70vw;
  margin: 0 5vw;
  border-radius: 20px;
}

.fileText {
  display: block;
  font-size: 25px;
}

.textareaContainer {
  display: flex;
  justify-content: center;
  height: 35vh;
  width: 100%;
}

.textareaLabel {
  display: block;
  text-align: left;
  height: 25px;
  margin-top: 25px;
}

.explainText {
  margin: 2vh 0vw 10px;
  width: 12.5vw;
}

.disabled {
  background-color: rgba(0, 0, 0, 0.4);
  cursor: default;
}

.redTextarea {
  outline: 5px solid rgb(200, 50, 50);
}

.redText {
  color: rgb(200, 50, 50);
  margin: 10px 0 0;
  height: 20px;
}

.redText > p {
  margin: 0;
}

.successContainer {
  z-index: 6;
}

.success {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(44, 44, 64);
  height: 30vh;
  width: 40vw;
  border-radius: 30px;
}

.downloadContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2.5vh;
}
</style>
