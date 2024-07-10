<script setup lang="ts">
import NavIcon from "./navbar/nav-icon.vue";
import IconLang from "@/components/icons/icon-lang.vue";
import IconDown from "@/components/icons/icon-down.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { currentLang, langNames, langs } from "../utils/i18n.ts";
import NavMenu from "@/components/navbar/nav-menu.vue";
import NavNarrowMenu from "@/components/navbar/nav-narrow-menu.vue";
import IconMenu from "@/components/icons/icon-menu.vue";

let isTop = ref(window.scrollY <= 0);

const button = ref<InstanceType<typeof HTMLDivElement>>();

function handleScroll() {
    isTop.value = window.scrollY <= 0;
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <nav
        class="fixed top-0 left-0 right-0 z-50 transition-shadow bg-background-light-10 dark:bg-background-dark-80"
        :class="isTop ? '' : 'nav-top'"
    >
        <div
            class="max-w-7xl flex flex-row items-center mx-auto px-4 py-2 gap-4 text-gray-800 dark:text-gray-200 text-base"
        >
            <nav-icon />
            <div class="ml-auto flex-row gap-3 justify-center hidden lg:flex">
                <nav-menu>
                    <template #button>
                        {{ $t("navbar.software") }}
                        <icon-down />
                    </template>
                    <template #menu>
                        <a
                            role="button"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                            href="/software/leaves"
                        >
                            Leaves
                        </a>
                    </template>
                </nav-menu>

                <nav-menu>
                    <template #button>
                        <icon-lang />
                        <icon-down />
                    </template>
                    <template #menu>
                        <div class="text-sm font-black p-1.5 pl-3 w-full">
                            {{ langNames[currentLang] }}
                        </div>
                        <a
                            v-for="lang in langs.filter((i) => i != currentLang)"
                            role="button"
                            :key="lang"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                            :href="`?lang=${lang}`"
                        >
                            {{ langNames[lang] }}
                        </a>
                    </template>
                </nav-menu>
            </div>
            <div
                class="ml-auto narrow-button md:hidden"
                title="Toggle nav"
                ref="button"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                @click="
                    button?.setAttribute(
                        'aria-expanded',
                        button?.getAttribute('aria-expanded') == 'true' ? 'false' : 'true'
                    )
                "
            >
                <icon-menu />
            </div>
            <div class="narrow-menu background p-6 border-gray-300 dark:border-zinc-600">
                <div class="flex flex-col gap-1 p-2">
                    <nav-narrow-menu>
                        <template #button>
                            {{ $t("navbar.software") }}
                            <icon-down />
                        </template>
                        <template #menu>
                            <a
                                role="button"
                                class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                                href="/software/leaves"
                            >
                                Leaves
                            </a>
                        </template>
                    </nav-narrow-menu>
                    <hr class="m-2">
                    <nav-narrow-menu>
                        <template #button>
                            <icon-lang />
                            <icon-down />
                        </template>
                        <template #menu>
                            <div class="text-sm font-black p-1.5 pl-3 w-full">
                                {{ langNames[currentLang] }}
                            </div>
                            <a
                                v-for="lang in langs.filter((i) => i != currentLang)"
                                role="button"
                                :key="lang"
                                class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                                :href="`?lang=${lang}`"
                            >
                                {{ langNames[lang] }}
                            </a>
                        </template>
                    </nav-narrow-menu>
                </div>
            </div>
        </div>
    </nav>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.nav-top {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
        var(--tw-shadow);
}

.narrow-menu {
    position: absolute;
    top: 3rem;
    left: 0;
    height: calc(100vh - 3rem);
    width: 100vw;
    transition:
        opacity 0.25s,
        visibility 0.25s,
        transform 0.25s;
    border-top-width: 2px;
    --tw-border-opacity: 1;
}

.narrow-button[aria-expanded="false"] + .narrow-menu {
    visibility: hidden;
    opacity: 0;
    transform: translateY(0);
}

.narrow-button[aria-expanded="true"] + .narrow-menu {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}
</style>
