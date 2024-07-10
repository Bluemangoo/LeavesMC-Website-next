import route from "./route.ts";
import { Component, ShallowRef, shallowRef } from "vue";
import PageRedirect from "@/pages/page-redirect.vue";
import { changeLocale } from "@/utils/i18n.ts";
import { removeTrail } from "@/utils/string.ts";

class AJump {
    constructor() {
        let url = this.url;
        let path = this.path;
        let r = route?.[path] ?? route?.[removeTrail(path, "/")] ?? route["/404"];
        while (r.type == "redirect") {
            url = r.url;
            path = url.split("?")[0];
            // noinspection HttpUrlsUsage
            if (url.startsWith("http://") || url.startsWith("https://")) {
                window.location.replace(url);
            }

            r = route?.[path] ?? route?.[removeTrail(path, "/")] ?? route["/404"];
        }
        this.title = r.title;
        this.component = shallowRef(r.component);
        if (this.url != url) {
            this.url = url;
            window.history.replaceState("", "", this.url);
        }

        const that = this;
        document.body.addEventListener("click", function (event) {
            const target = <HTMLElement>event.target;
            const a = target.closest("a");
            if (a) {
                event.preventDefault();
                that.to(a);
            }
        });

        window.addEventListener("popstate", function () {
            that.url = window.location.pathname + window.location.search;
            that.path = window.location.pathname;
            that.update();
        });
    }

    url: string = window.location.pathname + window.location.search;
    path: string = window.location.pathname;
    component: ShallowRef<Component>;
    title: string = "";

    to(element: HTMLAnchorElement) {
        const url = element.getAttribute("href");
        if (!url) {
            return;
        }
        this.toUrl(url);
    }

    toUrl(url: string) {
        // noinspection HttpUrlsUsage
        if (url.startsWith("http://") || url.startsWith("https://")) {
            window.open(url);
        } else {
            if (url.startsWith("?")) {
                url = window.location.pathname + url;
            }
            if (url.startsWith(".")) {
                url = window.location.pathname + url.substring(1);
            }
            window.history.pushState("", "", url);
            this.url = url;
            this.path = url.split("?")[0];
            this.update();
        }
    }

    update() {
        this.getComponent(this.url);

        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get("lang");

        if (lang) {
            changeLocale(lang);
            urlParams.delete("lang");
            const newUrl = `${removeTrail(window.location.pathname, "/")}${urlParams.size == 0 ? "" : "?" + urlParams.toString()}`;
            console.log(newUrl);
            window.history.replaceState("", "", newUrl || "/");
        }
        document.title = this.title;
    }

    protected getComponent(url: string): void {
        let r = route?.[this.path] ?? route?.[removeTrail(this.path, "/")] ?? route["/404"];
        while (r.type == "redirect") {
            url = r.url;
            const path = url.split("?")[0];
            // noinspection HttpUrlsUsage
            if (url.startsWith("http://") || url.startsWith("https://")) {
                this.title = "Redirecting | LeavesMC";
                this.component.value = PageRedirect;
                window.location.replace(url);
                return;
            }
            r = route?.[path] ?? route?.[removeTrail(path, "/")] ?? route["/404"];
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
