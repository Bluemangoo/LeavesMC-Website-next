<script setup lang="ts">
import aJump from "@/utils/a-jump.ts";
import IconLeaves from "@/components/icons/icon-leaves.vue";
</script>

<template>
    <div class="block">
        <div class="flex w-full min-h-[100vh]">
            <div class="pb-12 m-auto">
                <div class="flex flex-col lg:flex-row-reverse lg:ml-12 lg:mr-24 pl-4 pr-4">
                    <IconLeaves
                        class="w-44 h-44 min-w-44 min-h-44 lg:w-60 lg:h-60 lg:mt-auto lg:mb-auto ml-auto mr-auto mb-6 lg:ml-40 lg:mr-32" />
                    <div class="text-center lg:text-left w-auto max-w-[36rem] lg:w-[36rem]">
                        <h1 translate="no" class="text-5xl font-black title">
                            LeavesMC
                        </h1>
                        <p class="text-5xl font-black mt-5 whitespace-pre-wrap">
                            {{ $t("index.text.description1") }}
                        </p>
                        <p class="text-xl font-[550] mt-8 whitespace-pre-wrap">
                            {{ $t("index.text.description2") }}
                        </p>
                        <div class="mt-16 flex gap-4 ml-auto mr-auto lg:ml-0 lg:mr-0">
                            <button
                                class="ml-auto lg:ml-0 pt-1.5 pb-1.5 pl-6 pr-6 text-white bg-green-500 rounded-3xl transition-colors hover:bg-green-400 dark:hover:bg-green-600"
                                @click="aJump.toUrl('/downloads')">
                                {{ $t("index.button.downloads") }}
                            </button>

                            <button
                                class="mr-auto lg:mr-0 pt-1.5 pb-1.5 pl-6 pr-6 border-gray-300 dark:border-zinc-500 border-2 rounded-3xl transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
                                @click="aJump.toUrl('https://docs.leavesmc.org')">
                                {{ $t("index.button.document") }}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    background: linear-gradient(120deg, #43e5a0 10%, #126945);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

:root {
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #FFCC00 30%, #FFFF00);
}
</style>
