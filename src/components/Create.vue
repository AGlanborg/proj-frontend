<template>
  <div class="createContainer">
    <div class="titleContainer">
      <h2 class="title" @click="toggleTitle">
        Create<span class="material-icons" :class="title ? 'open' : ''"
          >keyboard_arrow_up</span
        >
      </h2>
    </div>
    <div class="explain" :class="title ? 'expand' : ''">
      <p class="explainText" :class="title ? 'visible' : 'hidden'">
        Under denna rubrik kan lägga till fler rader i databasen. Varje fält är
        kategoriserad och namngiven. Vissa fält är fler-val.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main-create",
  data() {
    return {
      title: false,
    };
  },
  methods: {
    toggleTitle() {
      this.title ? (this.title = false) : (this.title = true);
    },
  },
};
</script>

<style scoped>
.createContainer {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-shadow: -10px 0 15px rgba(0, 0, 0, 0.5);
  height: 100vh;
}

.createContainer::-webkit-scrollbar {
  display: none;
}

.titleContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 10vh;
  width: 100%;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  height: 60px;
  width: 285px;
  padding-left: 40px;
  font-size: 40px;
  margin: 0;
  line-height: 0;
}

.material-icons {
  user-select: none;
  margin: 0;
  margin-left: 5px;
  font-size: 40px;
  line-height: 0;
  transition: 0.5s;
}

.open {
  transform: rotate(180deg);
}

.explain {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  width: 55vw;
  margin: 0 10%;
  padding: 0 1vw;
  border-radius: 10px;
  height: 0;
  transition: 0.5s;
}

.explain::-webkit-scrollbar {
  display: none;
}

.expand {
  height: 7.5vh;
}

.explainText {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}
</style>
