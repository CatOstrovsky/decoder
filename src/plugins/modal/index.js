import modals from "@/plugins/modal/components/modals.vue"
import {provide} from "vue";

export default {
    install(app, config) {
        app.component("modals", modals);
        app.provide("$modals", () => app.config.globalProperties.$modals);
    }
}