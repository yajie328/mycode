<template>
    <div>
        title {{type}}
        <h1 v-if="type===1">h1</h1>
        <h1 v-if="type===2">h2</h1>
    </div>
</template>
<script>
export default {
    props: ['type']
}
</script>

