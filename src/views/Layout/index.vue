<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import CeilNav from './components/CeilNav.vue'


</script>

<template>
<LayoutHeader></LayoutHeader>
<CeilNav></CeilNav>
<LayoutNav></LayoutNav>
<RouterView></RouterView>
<LayoutFooter></LayoutFooter>
</template>

<style lang="scss" scoped>

</style>
