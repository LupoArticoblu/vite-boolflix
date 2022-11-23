<script>
import {store} from '../data/store.js';

export default {
  name: 'Appheader',
  data(){
    return{
      store,
    }
  }
};
</script>

<template>
  <header class="d-flex justify-content-between p-3">
    <div class="container">
      <div class="row">
        <div class="logo">
          <img src="../assets/logo-boolflix.png" alt="Logo-Boolflix">
        </div>

        <div class="d-flex">
          <!-- v-model.trim(TRIM RIPULISCE GLI SPAZI VUOTI ALL'INIZIO E ALLA FINE DELLA STRINGA) -->
          <input @keyup.enter="$emit('search')" v-model.trim="store.apiParams.query" type="text" class="form-control" placeholder="Cerca un film">

          <select @change="$emit('search')" v-model="store.typeofsearch" class="form-select ms-3">
            <option value="">all</option>
            <option value="movie">film</option>
            <option value="tv">serie tv</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>

<style>

</style>