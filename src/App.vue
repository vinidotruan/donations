<template>
  <header v-if="showHeaderOrFooter">
    <span> Doações </span>
    <span class="material-icons"> search </span>
  </header>
  <div class="content">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <footer class="footer" v-if="showHeaderOrFooter">
    <div class="footer-icons">
      <router-link :to="{ name: 'Home' }">
        <div class="item" :class="{ active: route.name == 'Home' }">
          <span class="material-icons-outlined"> person </span>
        </div>
      </router-link>

      <router-link :to="{ name: 'Actions' }">
        <div class="item" :class="{ active: route.name == 'Actions' }">
          <span class="material-icons-outlined"> window </span>
        </div>
      </router-link>

      <router-link :to="{ name: 'Login' }">
        <div class="item" :class="{ active: route.name == 'Login' }">
          <span class="material-icons-outlined"> bookmark </span>
        </div>
      </router-link>
      <router-link :to="{ name: 'MyActions' }">
        <div class="item" :class="{ active: route.name == 'MyActions' }">
          <span class="material-icons-outlined"> toc </span>
        </div>
      </router-link>
    </div>
  </footer>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";
export default {
  name: "App",
  setup() {
    const showHeaderOrFooter = ref(true);
    const route = useRoute();
    showHeaderOrFooter.value = route.name != "Login" && route.name != "Signup";
    watch(
      () => route.name,
      () => {
        console.log("Nome da rota:", route.name);
        if (route.name != "Login" && route.name != "Signup") {
          showHeaderOrFooter.value = true;
        } else {
          showHeaderOrFooter.value = false;
        }
      }
    );

    return { route, showHeaderOrFooter };
  },
};
</script>
<style lang="scss">
@import "assets/styles/utils";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
