<template>
  <div>
    <div class="modal-wrapper" v-show="stack.length > 0">
      <div class="modal" v-for="(modal, index) in stack"
      :style="{ zIndex : 100 + index, width: modal.width+'px' ?? 'auto' }">
        <a href="#" @click.prevent="close(index)" class="modal-close"><i class="fa-regular fa-circle-xmark"></i></a>

        <div class="modal-content-wrapper">
          <component v-if="!!modal.component" :is="modal.component" :data="modal.data ?? null"/>

          <p class="modal-title" v-if="!!modal.title" v-html="modal.title"></p>
          <div class="modal-content" v-if="!!modal.content" v-html="modal.content.replaceAll('\n', '<br/>')"></div>

          <div class="modal-buttons" v-if="!!modal.buttons && modal.buttons.length > 0">
            <a v-for="button in modal.buttons"
               href="#"
               :class="button.class ?? ''"
               class="button"
               @click.prevent="button.handler">{{ button.text }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue"

const stack = reactive([]);
function show(config) {
  stack.push(config)
}

function close(index) {
  stack.splice(index, 1);
}

// Define global props
const instance = getCurrentInstance();
instance.appContext.config.globalProperties.$modals = {
  show,
  close() {
    if(stack.length > 0) {
      close(stack.length - 1);
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  min-height: 150px;
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  max-width: 100%;
  padding-right: 0px;

  &-content-wrapper {
    max-height: 80vh;
    overflow: auto;
    padding-right: 15px;

  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-image: linear-gradient(180deg, #1a9138 0%, #0a3223 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
  }

  &-buttons {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;

    .button {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-title {
    font-weight: bold;
    font-size: 19px;
    margin: 0 0 20px;
    text-align: center;
  }

  &-content {
    font-size: 16px;
    margin: 0 0 20px;
  }

  &-close {
    position: absolute;
    right: 0px;
    top: 0px;
    background: #fff;
    border-radius: 50%;
    font-size: 24px;
    transform: translate(50%, -50%);
  }

  &-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #20202057;
    height: 100%;
  }
}
</style>