<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import CeilNav from './components/CeilNav.vue'

import Home from '@/views/Home/index.vue'

</script>

<template>
<LayoutHeader></LayoutHeader>
<CeilNav></CeilNav>
<LayoutNav></LayoutNav>
<Home></Home>
<LayoutFooter></LayoutFooter>
</template>

<style lang="scss" scoped>

</style>
