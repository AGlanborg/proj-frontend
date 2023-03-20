<template>
  <div class="removeContainer">
    <div class="remove">
      <div>
        <h2 class="title">{{ title }}-varning</h2>
        <p class="subtitle">Du har information i 'Create' sparat</p>
        <p class="mainText">
          Du kommer ta bort det som är inmatat om du fortsätter
        </p>
      </div>
      <div>
        <p class="sureText">Är du säker på att du vill fortsätta?</p>
        <div class="buttonContainer">
            <button class="button delete" @click="$emit('handleSure')">{{ title }}</button>
            <button class="button" @click="$emit('toggleSure')">BACK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Read-sure",
  props: {
    title: String,
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
  justify-content: space-around;
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
  padding-bottom: 1vh;
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

.sureText {
  font-size: 25px;
  margin-bottom: 5vh;
}
</style>
