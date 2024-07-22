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
  <header class="d-flex p-3">
    <div class="container">
      <div class="row justify-content-between">
        <div class="logo">
          <img src="../assets/logo-boolflix.png" alt="Logo-Boolflix">
        </div>

        <div class="insert d-flex">
          <!-- v-model.trim(TRIM RIPULISCE GLI SPAZI VUOTI ALL'INIZIO E ALLA FINE DELLA STRINGA) -->
          <input ref="searchInput" @keyup.enter="$emit('search')" v-model.trim="store.apiParams.query" type="text" class="form-control" placeholder="Cerca un film">

          <select @change="$emit('search')" v-model="store.type" class="form-select ms-3">
            <option value="all" selected>Tutti</option>
            <option value="movie">Film</option>
            <option value="tv">Serie tv</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '../style/vars.scss' as *; 
header{
  background-image: linear-gradient(black, $bg-color);
 .logo{
   width: 150px;
   img{
     width: 100%;
   }
 }
 .insert{
   width: 500px;
   input{
     width: 300px;
   }
   select{
     width: 110px;
   }
 }
} 
</style>