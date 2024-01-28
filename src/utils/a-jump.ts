import route from "./route.ts";
import { Component, ShallowRef, shallowRef } from "vue";

export default class {
    constructor() {
        const r = route?.[this.url] ?? route?.[this.url + "/"] ?? route["/404/"];
        this.title = r.title;
        this.component = shallowRef(r.component);

        const that = this;
        document.body.addEventListener("click", function(event) {
            const target = <HTMLElement>event.target;
            const a = target.closest("a");
            if (a) {
                event.preventDefault();
                that.to(a);
            }
        });

        window.addEventListener("popstate", function() {
            that.url = window.location.pathname;
            that.update();
        });
    }

    url: string = window.location.pathname;
    component: ShallowRef<Component>;
    title: string;

    to(element: HTMLAnchorElement) {
        const url = element.getAttribute("href");
        if (!url) {
            return;
        }
        // noinspection HttpUrlsUsage
        if (url.startsWith("http://") || url.startsWith("https://")) {
            window.open(url);
        } else {
            window.history.pushState("", "", url);
            this.url = url;
            this.update();
        }
    }

    update() {
        this.getComponent(this.url);
        document.title = this.title;
    }

    getComponent(url: string) {
        const r = route?.[url] ?? route?.[url + "/"] ?? route["/404/"];
        this.title = r.title;
        this.component.value = r.component;
    }
}