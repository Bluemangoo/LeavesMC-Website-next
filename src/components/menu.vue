<script setup lang="ts">
defineProps<{
    items?: any[]
}>();
</script>

<template>
    <div>
        <div class="items">
            <template v-if="items" v-for="item in items" :key="item.text">
                <div>
                    {{ item }}
                </div>
            </template>
            <slot />
        </div>
    </div>
</template>

<style scoped>
</style>