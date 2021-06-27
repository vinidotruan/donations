<template>
  <div class="actions">
    <div v-for="action in actions" :key="action.id" class="action-card">
      <action-card :action="action" :user="user" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../assets/styles/utils";

.actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: $list-background;
  height: 100%;
  .action-card {
    display: flex;
    justify-content: center;
  }
}
</style>
<script>
import ActionCard from "../components/actions/ActionCard.vue";
import { getAllActions, getMyActions } from "@/collections/donations";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import firebase from "firebase";
import { watch } from "@vue/runtime-core";

export default {
  components: { ActionCard },
  name: "Actions",
  setup() {
    const actions = ref();
    const route = useRoute();
    const user = firebase.auth().currentUser;
    const getActions = (param) => {
      actions.value = [];
      if (param !== "Actions") {
        getMyActions(user.uid).then((response) => {
          actions.value = response;
        });
      } else {
        getAllActions().then((response) => {
          actions.value = response;
        });
      }
    };

    getActions(route.name);
    watch(
      () => route.name,
      () => {
        getActions(route.name);
      }
    );

    return { actions, route, user };
  },
};
</script>
