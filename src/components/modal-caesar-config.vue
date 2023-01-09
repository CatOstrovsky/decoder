<template>
  <div>
    <p class="modal-title">Caesar encryption config</p>
    <input type="number" placeholder="Move letters to X chars" v-model="moveTo">
    <a href="#" class="button button--fluid text-center" @click.prevent="save">Save</a>

    <ul class="alphabet">
      <li v-for="code in alphabet">
        {{ String.fromCharCode(code) }}
        -
        {{ String.fromCharCode(code + moveTo) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const $modals = inject("$modals")();
import {defineProps, inject, ref, toRaw, reactive} from "vue"
const props = defineProps({
  data: {
    type: [Array, Object],
    required: true
  }
});

let moveTo = ref(10);
if(!!props?.data?.rule?.config?.moveTo) {
  moveTo = toRaw(props?.data?.rule?.config?.moveTo);
}

function save() {
  props.data.save({ moveTo: moveTo });
  $modals.close();
}

let alphabet = reactive([]);
for(let i = 1040; i < 1072; i++) {
  alphabet.push(i);
}

</script>

<style scoped lang="scss">
input {
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px lighten(#000, 60%) solid;
  border-radius: 5px;
}

.alphabet {
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0px;
  li {
    padding: 2px;
    border: 1px #c7c7c7 solid;
    font-family: monospace;
    width: 46px;
    display: inline-block;
    text-align: center;
    line-height: 15px;
    height: 20px;
  }
}

</style>