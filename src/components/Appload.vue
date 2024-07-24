<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Caricamento...</p>
  </div>
</template>

<script>
export default {
  name: 'Appload',
}
</script>

<style lang="scss" scoped>
@use '../style/vars' as *;
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: $text-color;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

p {
  margin-top: 20px;
  font-size: 18px;
  color: $text-color;
}
</style>