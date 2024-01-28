<script setup lang="ts">
import AJump from "@/utils/a-jump.ts";
import Navbar from "@/components/navbar.vue";

const aJump = new AJump();
aJump.update();
</script>

<template>
    <navbar />
    <div class="mt-12 w-full max-w-7xl mx-auto p-4 flex">
        <component v-bind:is="aJump.component.value"></component>
    </div>
</template>

<style>
</style>