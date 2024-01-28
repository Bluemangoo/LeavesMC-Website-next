import { createI18n } from "vue-i18n";
import en from "@/languages/en.json";
import zh from "@/languages/zh.json";
import zhMeme from "@/languages/zh-MEME.json";

const navLang = navigator.language;
const localLang = (navLang === "zh-CN" || navLang === "en-US") ? navLang : false;
const storeLang = localStorage.getItem("language");
let lang = storeLang || localLang || ("en-US");
if (!storeLang) {
    localStorage.setItem("language", lang);
}
const i18n = createI18n({
    locale: lang,
    fallbackLocale: "en",
    messages: {
        en,
        zh,
        "zh-MEME": zhMeme
    }
});

const t = (...args: string[]): string => {
    return (i18n.global.t as Function)(...args);
};

function changeLocale(lang: "en" | "zh" | "zh-MEME") {
    i18n.global.locale = lang;
    localStorage.setItem("language", lang);
}

export { i18n, t, changeLocale };