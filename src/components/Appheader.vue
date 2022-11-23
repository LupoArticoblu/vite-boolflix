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
          <input type="text" class="form-control" placeholder="Cerca un film">

          <select v-model="typeToSearch" class="form-select ms-3">
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