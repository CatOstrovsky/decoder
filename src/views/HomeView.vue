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

    <draggable
      v-model="myArray"
      group="rules"
      class="rules"
      item-key="id">
      <template #item="{ element, index }">
        <div class="rules-item">
          <span class="rules-item-number"><i class="fa-sharp fa-solid fa-arrow-down"></i></span>
          {{element.name}}

          <div class="rules-item-controls">
            <a href="#"><i class="fa-sharp fa-solid fa-pen"></i></a>
            <a href="#"><i class="fa-sharp fa-solid fa-trash"></i></a>
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
  </main>
</template>

<script setup>
import { ref, reactive } from "vue"

import draggable from 'vuedraggable'

let myArray = ref([
  { id: 0, name: "Base64" },
  { id: 1, name: "Replace letters" },
  { id: 2, name: "Base64" },
  { id: 3, name: "MD5" }
]);
let decoded = ref("");
let encoded = ref("");

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

function encode() {
  encoded.value = utf8_to_b64(decoded.value);
}

function decode() {
  decoded.value = b64_to_utf8(encoded.value);
}
</script>

<style scoped lang="scss">
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