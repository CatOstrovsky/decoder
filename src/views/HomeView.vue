<template>
  <main>
    <h1 class="text-center">What decoder is?</h1>
    <p class="text-center">It's an opensource tool to encode/decode your information.
      Put your text and pick some encode options.
      Then decoder will process you information and output decoded string.
      You can combine different encode methods. Use a drag and drop feature to sort the encode methods. <br>
      <span class="text-bold">Note:</span> The encoded string will have a different value depends on active sorting
    </p>
    <p class="text-center text-bold">Enough words! Let's try to encode something!</p>

    <p class="text-center" style="color:red;" v-if="rules.length === 0">
      <i class="fa-solid fa-triangle-exclamation"></i> Add any rule from the rules list below
    </p>

    <draggable
      v-model="rules"
      group="rules"
      class="rules"
      item-key="id">
      <template #item="{ element, index }">
        <div class="rules-item">
          <span class="rules-item-number"><i class="fa-sharp fa-solid fa-arrow-down"></i></span>
          {{ rulesConfig[element.type]?.title ?? "No found"}}

          <div class="rules-item-controls">
            <a href="#" @click.prevent="editRule(element)" v-if="!!element.config"><i class="fa-sharp fa-solid fa-pen"></i></a>
            <a href="#" @click.prevent="removeRule(index)"><i class="fa-sharp fa-solid fa-trash"></i></a>
          </div>
        </div>
      </template>
    </draggable>

    <div class="app">
      <div class="app-input">
        <div class="app-input-text">
          <textarea name="" v-model="decoded" id="input-decoded" cols="30" rows="10" style="resize: none;"></textarea>
          <label for="input-decoded">DECODED</label>

          <button class="button button--fluid mt-3" @click.prevent="encode">
            <i class="fa-sharp fa-solid fa-lock"></i>
            Encode
          </button>
        </div>
        <div class="app-input-text">
          <textarea name="" v-model="encoded" id="input-encoded" cols="30" rows="10" style="resize: none;"></textarea>
          <label for="input-encoded">ENCODED</label>

          <button class="button button--fluid mt-3" @click.prevent="decode">
            <i class="fa-sharp fa-solid fa-lock-open"></i>
            Decode
          </button>
        </div>
      </div>
    </div>

    <div class="rules-list">
      <h2 class="text-center">Avalible rules</h2>
      <ul class="rules-to-add">
        <li v-for="(rule, type) in rulesConfig" class="rules-to-add__item">
          <div class="rules-to-add__item--left">
            <p class="rules-to-add__item__title">{{ rule.title }}</p>
            <div v-html="rule.description" class="rules-to-add__item__description"></div>
          </div>
          <div class="rules-to-add__item--right">
            <a href="#" class="button button--ligth" @click.prevent="addRule(type)">Add</a>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, inject, markRaw } from "vue"
import modalReplaceConfig from "@/components/modal-replace-config.vue"
import modalCaesarConfig from "@/components/modal-caesar-config.vue"
import draggable from 'vuedraggable'

const $modals = inject("$modals")();
function replaceAt(string, index, replacement) {
  return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}

let rules = ref([ ]);
const rulesConfig = ref({
  b64 : {
    title: "Base 64",
    description: "In computer programming, Base64 is a group of binary-to-text encoding schemes that represent binary data (more specifically, a sequence of 8-bit bytes) in sequences of 24 bits that can be represented by four 6-bit Base64 digits.",
    encode(str, config) {
      return window.btoa(unescape(encodeURIComponent(str)));
    },
    decode(str, config) {
      return decodeURIComponent(escape(window.atob(str)));
    }
  },
  replace : {
    title: "Replace letter",
    description: "A class of encryption methods that come down to creating an encryption table according to a certain algorithm, in which for each plaintext letter there is a single ciphertext letter associated with it. Encryption itself consists in replacing letters according to the table. To decrypt, it is enough to have the same table, or to know the algorithm by which it is generated.",
    componentEdit: markRaw(modalReplaceConfig),
    encode(str, config) {
      if(!!config?.replaceRules?.length > 0)
        for(let rule of config.replaceRules)
          str = str.replaceAll(rule.k, rule.v)

      return str;
    },
    decode(str, config) {
      if(!!config?.replaceRules?.length > 0)
        for(let rule of config.replaceRules)
          str = str.replaceAll(rule.v, rule.k)

      return str;
    }
  },
  caesar: {
    title: "Caesar's method",
    description: "In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.",
    componentEdit: markRaw(modalCaesarConfig),
    encode(str, config) {
      let output = str;
      for(let index = 0;index < output.length; index++) {
        let letter = output[index];
        output = replaceAt(output, index, String.fromCharCode(letter.charCodeAt() + (config?.moveTo ?? 10)));
      }

      return output;
    },
    decode(str, config) {
      let output = str;
      for(let index = 0;index < output.length; index++) {
        let letter = output[index];
        output = replaceAt(output, index, String.fromCharCode(letter.charCodeAt() - (config?.moveTo ?? 10)));
      }

      return output;
    }
  }
});

let decoded = ref("");
let encoded = ref("");

function addRule(ruleType) {
  rules.value.push({ id: Math.random() * 10000, type: ruleType, config: !!rulesConfig.value[ruleType]?.componentEdit ? {} : null})
}

function editRule(rule) {
  $modals.show({
    component: rulesConfig.value[rule.type].componentEdit,
    data: {
      rule,
      save(config) {
        rule.config = config;
      }
    },
    width: 500
  });
}

function removeRule(index) {
  rules.value.splice(index, 1)
}

function encode() {
  let output = decoded.value;
  for(let rule of rules.value) {
    output =  rulesConfig.value[rule.type].encode(output, rule.config)
  }
  encoded.value = output;
}

function decode() {
  let output = encoded.value;
  for(let i = rules.value.length - 1;i >= 0; i--) {
    let rule = rules.value[i];
    output =  rulesConfig.value[rule.type].decode(output, rule.config)
  }
  decoded.value = output;
}
</script>

<style scoped lang="scss">
.rules-to-add {
  &__item {
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    &--left {
      flex-grow: 1;
    }
    &--right {
      flex-grow: 0;
    }

    .button {
      display: inline-block;
    }

    &__title {
      margin: 0px;
      margin-bottom: 5px;
      font-weight: bold;
    }

    &__description {
      margin-bottom: 5px;
      padding-right: 15px;
    }
  }
}

.app {
  &-input {
    display: flex;
    justify-content: space-between;

    &-text {
      width: calc(50% - 7.5px);
      position: relative;

      label {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 13px;
        background: #41b883;
        color: #fff;
        padding: 5px;
        border-radius: 0 7px 0 7px;
      }

      textarea {
        width: 100%;
      }
    }
  }
}

.rules {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  &-item {
    $item : &;

    border: 1px #41b883 solid;
    background: #41b883;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: grab;
    color: #fff;
    font-weight: normal;
    position: relative;
    padding: 9px 10px 9px 30px;

    &.sortable-ghost {
      opacity: .4;
    }

    &-number {
      position: absolute;
      left: 2px;
      width: 23px;
      height: 23px;
      background: white;
      display: block;
      border-radius: 50%;
      text-align: center;
      color: #41b883;
      top: 70%;
      font-weight: bold;
      font-size: 13px;
      line-height: 20px;
      border: 1px #41b883 solid;
    }

    &:last-child {
      #{$item}-number {
       display: none;
      }
    }
    
    &-controls {
      position: absolute;
      right: 0px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      top: 50%;
      transform: translateY(-50%);

      a {
        color: #fff;
        margin-right: 10px;
        font-size: 14px;
        transition: all .25s ease;

        &:hover {
          opacity: .6;
        }
      }
    }
  }
}
</style>