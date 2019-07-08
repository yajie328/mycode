<template>
    <div>
        store
          {{this.$store.state.num}}
          <countA></countA>
          <countB></countB>
    </div>
</template>
<script>
import countA from './counterA';
import countB from './counterB';
export default {
    components:{
        countA,
        countB
    },
}
</script>
