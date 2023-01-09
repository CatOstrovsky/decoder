<template>
  <div>
    <p class="modal-title">Replace letters rules</p>

    <ul class="replace-rules">
      <li class="replace-rules-item" v-for="(rule, index) in replaceRules" :key="'arr-rule'+index">
        <input type="text"
               v-model="rule.k">
        ->
        <input type="text"
               v-model="rule.v">

        <a href="#" @click.prevent="replaceRules.splice(index, 1)"><i class="fa-solid fa-trash"></i></a>
      </li>
    </ul>

    <p class="text-center text-italic" v-if="replaceRules.length === 0">Add a new rules to replace some letters</p>

    <div class="buttons">
      <a href="#" class="button button--fluid text-center" v-if="replaceRules.length > 0" @click.prevent="save">Save</a>
      <a href="#" class="button button--ligth" @click="addRule" :class="{'button--fluid text-center' : replaceRules.length === 0 }">
        {{ replaceRules.length === 0 ? "Add a new rule" : "+" }}
      </a>
    </div>
  </div>
</template>

<script setup>
const $modals = inject("$modals")();
import {defineProps, inject, ref, toRaw} from "vue"
const props = defineProps({
  data: {
    type: [Array, Object],
    required: true
  }
});

let replaceRules = ref([]);
if(!!props?.data?.rule?.config?.replaceRules) {
  replaceRules.value = [...props?.data?.rule?.config?.replaceRules.map(i => Object.assign({}, i))];
}

function addRule() {
  replaceRules.value.push({k: "", v: ""})
}

function save() {
  props.data.save({ replaceRules: replaceRules.value });
  $modals.close();
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  justify-content: center;
  .button {
    margin-right: 15px;
    &:last-child {
      margin-right: 0px;
    }
  }
}

.replace-rules {
  margin: 0 -9px;
  margin-bottom: 15px;

  &-item {
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    align-items: center;

    input {
      width: 100%;
      margin: 0px 10px;
      border: 1px #c7c7c7 solid;
      padding: 5px 7px;
      font-size: 16px;
    }
  }
}

</style>