<template>
  <div class="createContent">
    <div class="createTitleContainer">
      <h2 class="createTitle">
        Leverantörs<wbr />faktura &#38; administrations<wbr />kostnader, OH
      </h2>
    </div>
    <div class="createForm">
      <label for="valuta"> Valuta </label>
      <select
        id="valuta"
        :value="shell.valuta"
        @change="$emit('onValuta', $event.target.value)"
      >
        <option>SEK</option>
      </select>
      <label for="mangd"> Antal licenser </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="mangd"
        :value="shell.mangd"
        @input="$emit('onMangd', $event.target.value)"
      />
      <label for="inprisex"> Inpris ex. moms </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="inprisex"
        :value="shell.inprisex"
        @input="$emit('onInprisex', $event.target.value)"
      />
      <label for="inprisin"> Inpris inkl. moms </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="inprisin"
        disabled
        :value="shell.inprisin"
      />
      <label for="procent"> Procent (%) </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="procent"
        :value="shell.procent"
        @input="$emit('onProcent', $event.target.value)"
      />
      <label for="oh"> OH </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="oh"
        disabled
        :value="shell.oh"
      />
      <label for="totalt"> Totalt, SEK, inkl. moms och OH </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="totalt"
        disabled
        :value="shell.totalt"
      />
      <label for="fakturanum"> Fakturanummer </label>
      <input
        type="text"
        lang="sv"
        id="fakturanum"
        placeholder="..."
        :value="shell.fakturanum"
        @input="$emit('onFakturanum', $event.target.value)"
      />
      <label for="kommentar"> Kommentar </label>
      <input
        type="text"
        lang="sv"
        id="kommentar"
        placeholder="..."
        :value="shell.kommentar"
        @input="$event.target.value('onKommentar', $event.target.value)"
      />
    </div>
    <div class="newForm"></div>
  </div>
</template>

<script>
export default {
  name: "Create-oh",
  props: {
    shell: Object,
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
