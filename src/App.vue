<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <div class="nav-left">
        <a href="https://v3.ru.vuejs.org/" target="_blank" class="nav-link nav-link--vue"></a>
        <span class="nav-plus">+</span>
        <a href="http://catostrovsky.ru/" target="_blank" class="nav-link nav-link--cat"></a>
        <span class="nav-plus">=</span>
        <a href="/" class="nav-link"><span class="nav-link--sitename">DECODER</span><span class="blinking">_</span></a>
      </div>
      <div class="nav-right">
        <a href="#" class="button button--ligth">How it works?</a>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
</style>
