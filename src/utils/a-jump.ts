import route from "./route.ts";
import { Component, ShallowRef, shallowRef } from "vue";
import PageRedirect from "@/pages/page-redirect.vue";

class AJump {
    constructor() {
        let url = this.url;
        let r = route?.[this.url] ?? route?.[this.url + "/"] ?? route["/404/"];
        while (r.type == "redirect") {
            url = r.url;
            // noinspection HttpUrlsUsage
            if (url.startsWith("http://") || url.startsWith("https://")) {
                window.location.replace(url);
            }
            r = route?.[r.url] ?? route?.[r.url + "/"] ?? route["/404/"];
        }
        this.title = r.title;
        this.component = shallowRef(r.component);
        if (this.url != url) {
            this.url = url;
            window.history.replaceState("", "", this.url);
        }

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
    title: string = "";

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

    toUrl(url: string) {
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

    protected getComponent(url: string): void {
        let r = route?.[this.url] ?? route?.[this.url + "/"] ?? route["/404/"];
        while (r.type == "redirect") {
            url = r.url;
            // noinspection HttpUrlsUsage
            if (url.startsWith("http://") || url.startsWith("https://")) {
                this.title = "Redirecting | LeavesMC";
                this.component.value = PageRedirect;
                window.location.replace(url);
                return;
            }
            r = route?.[r.url] ?? route?.[r.url + "/"] ?? route["/404/"];
        }
        this.title = r.title;
        this.component.value = r.component;
        if (this.url != url) {
            this.url = url;
            window.history.replaceState("", "", this.url);
        }
    }
}

const aJump = new AJump();
export default aJump;