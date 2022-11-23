<script>
export default {
  name: 'Appcards',
  props: {
    card: Object
  }  
}
</script>

<template>
  <!-- o stampa il titolo del film/serie o, nel caso in cui non trovasse il "title", stampa per nome. -->
  <div> {{card.title || card.name}} </div>

</template>

<style>

</style>