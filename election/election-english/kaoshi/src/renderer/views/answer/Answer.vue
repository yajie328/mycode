<template>
    <div class="answerWrap">
        <aside class="aside">
            <ul>
            <router-link to="/answer/lookinto" tag="li">问卷调查</router-link>
            <router-link to="/answer/listen" tag="li">听力测试</router-link>
            <router-link to="/answer/spoken" tag="li">口语测试</router-link>
            <router-link to="/answer/major" tag="li">专业测试</router-link>
            </ul>
        </aside>
        <section class="detail">
            <router-view></router-view>
        </section>
    </div>
</template>
<style <style lang="scss" scoped>

.answerWrap{
    display:flex;
    flex:1;
}
.aside{
    width:200px;
}
</style>


