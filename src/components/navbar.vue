<script setup lang="ts">
import NavToggleButton from "@/components/navbar/nav-toggle-button.vue";
import NavIcon from "./navbar/nav-icon.vue";
import IconLang from "@/components/icons/icon-lang.vue";
import IconDown from "@/components/icons/icon-down.vue";
</script>

<template>
    <nav
        class="fixed top-0 left-0 right-0 z-50 transition-shadow bg-background-light-10 dark:bg-background-dark-80 shadow-lg">
        <div
            class="max-w-7xl flex flex-row items-center mx-auto px-4 py-2 gap-4 text-gray-800 dark:text-gray-200 text-base">
            <nav-toggle-button />
            <nav-icon />
            <div class="gap-6">
                <div class="p-2 flex items-center link-hover" role="button">
                    {{ $t("navbar.software") }}
                    <icon-down />
                </div>
            </div>

            <div class="gap-6 ml-auto">
                <div class="p-2 flex items-center" role="button" aria-haspopup="true" aria-expanded="false" aria-label="Change Language">
                    <icon-lang />
                    <icon-down />
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>