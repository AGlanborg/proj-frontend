<template>
  <div class="instance header">
    <div class="valueContainer">
      <p> RST nummer för säljare </p>
    </div>
    <div class="valueContainer">
      <p> Copernicus nummer för säljare </p>
    </div>
    <div class="valueContainer">
      <p> Kontaktperson för säljare </p>
    </div>
    <div class="valueContainer">
      <p> Namn för säljare </p>
    </div>
    <div class="valueContainer">
      <p> RST nummer för köpare </p>
    </div>
    <div class="valueContainer">
      <p> Copernicus nummer för köpare </p>
    </div>
    <div class="valueContainer">
      <p> Kontaktperson för köpare </p>
    </div>
    <div class="valueContainer">
      <p> Namn för köpare </p>
    </div>
    <div class="valueContainer">
      <p> Tillverkare </p>
    </div>
    <div class="valueContainer">
      <p> Förkortning för arbetstyp </p>
    </div>
    <div class="valueContainer idContainer">
      <p> Antal Poster </p>
    </div>
    <div class="valueContainer">
      <p> Typ </p>
    </div>
    <div class="valueContainer">
      <p> Leverantör </p>
    </div>
    <div class="headerTextContainer">
      <p> Text på internfaktura </p>
    </div>
    <div class="headerTextContainer">
      <p> Kontaktinfo </p>
    </div>
    <div class="valueContainer">
      <p> Valuta </p>
    </div>
    <div class="valueContainer">
      <p> Antal licenser </p>
    </div>
    <div class="valueContainer">
      <p> Inpris ex. moms </p>
    </div>
    <div class="valueContainer">
      <p> Procent (%) </p>
    </div>
    <div class="valueContainer">
      <p> Fakturanummer </p>
    </div>
    <div class="headerTextContainer">
      <p> Kommentar </p>
    </div>
    <div class="valueContainer">
      <p> Periodisering Start </p>
    </div>
    <div class="valueContainer">
      <p> Periodisering Slut </p>
    </div>
    <div class="valueContainer">
      <p> Faktureringsperiod </p>
    </div>
  </div>
  <div class="resultContent" :class="title ? 'minResults' : ''">
    <div v-for="inst in rows" v-bind:key="inst.id">
      <div class="instance">
        <div class="valueContainer">
          <p>
            {{ inst.saljare.rst }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.saljare.cop }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.saljare.kontakt }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.saljare.namn }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.kopare.rst }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.kopare.cop }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.kopare.kontakt }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.kopare.namn }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.arbetstyp.tillverkare }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.arbetstyp.arbetstyp }}
          </p>
        </div>
        <div class="valueContainer idContainer">
          <p>
            {{ inst.header.antal }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.typ }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.leverantor }}
          </p>
        </div>
        <div class="textContainer">
          <div class="text">
            <p>
              {{ inst.header.text }}
            </p>
          </div>
        </div>
        <div class="textContainer">
          <div class="text">
            <p>
              {{ inst.header.info }}
            </p>
          </div>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.valuta }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.mangd }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.inprisex }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.procent }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.fakturanum }}
          </p>
        </div>
        <div class="textContainer">
          <div class="text">
            <p>
              {{ inst.header.kommentar }}
            </p>
          </div>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.start }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.slut }}
          </p>
        </div>
        <div class="valueContainer">
          <p>
            {{ inst.header.now }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload-file",
  props: {
    rows: [],
  },
};
</script>

<style scoped>
.valueContainer,
.headerTextContainer {
  border-radius: 0;
  max-height: 5vh;
}

.header {
  z-index: 10;
}

.resultContent {
  margin: 0;
}
</style>
