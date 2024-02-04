import { Component } from "vue";
import { t } from "@/utils/i18n.ts";
import PageIndex from "@/pages/page-index.vue";
import PageDownloads from "@/pages/page-downloads.vue";
import PageNotFound from "@/pages/page-not-found.vue";

const route: {
    [key: string]: { type: "page", component: Component, title: string } | { type: "redirect", url: string }
} = {
    "/": {
        type: "page",
        component: PageIndex,
        title: `${t("title.home")} | LeavesMC`
    },
    "/downloads/": {
        type: "page",
        component: PageDownloads,
        title: `${t("title.downloads")} | LeavesMC`
    },
    "/404/": {
        type: "page",
        component: PageNotFound,
        title: `${t("title.404")} | LeavesMC`
    }
};
export default route;