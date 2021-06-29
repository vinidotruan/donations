<template>
  <div class="actions">
    <div v-for="action in actions" :key="action.id" class="action-card">
      <ActionCard
        :action="action"
        :user="user"
        @deleted="getActions(route.name)"
      />
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
import {
  getAllActions,
  getMyActions,
  getFavoriteActions,
} from "@/collections/donations";
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
    const user = firebase?.auth()?.currentUser;
    const getActions = async (param) => {
      actions.value = [];
      if (param === "Actions") {
        actions.value = await getAllActions();
      } else if (param === "MyActions" && user) {
        actions.value = await getMyActions(user.uid);
      } else if (param === "Favorites" && user) {
        const response = await getFavoriteActions(user.uid);
        actions.value = response.favorites;
      } else {
        actions.value = await getAllActions();
      }
    };

    getActions(route.name);
    watch(
      () => route.name,
      () => {
        getActions(route.name);
      }
    );

    return { actions, route, user, getActions };
  },
};
</script>
