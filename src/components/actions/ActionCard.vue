<template>
  <div class="card">
    <div class="category">
      {{ state?.category }}
    </div>
    <div class="card-title">
      {{ state?.name }}
    </div>
    <div class="card-image" @click="seeAction(state)">
      <img :src="state?.image" alt="" srcset="" />
    </div>
    <div class="description">
      <div class="location">
        <span class="material-icons-outlined">map</span>
        <span>{{ state?.localization }}</span>
      </div>
      <div class="save" v-if="showSaveButton()" @click="likeAction()">
        <span class="material-icons-outlined">bookmark_border</span>
        <span>salvar</span>
      </div>
      <div
        class="save"
        v-if="showDeleteButton()"
        @click="deleteAction(state?.id)"
      >
        <span class="material-icons-outlined">delete</span>
        <span>excluir</span>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { deleteActions } from "@/collections/donations";
import { likeActions } from "@/collections/user";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase";
export default {
  name: "ActionCard",
  emits: ["deleted"],
  props: {
    action: {
      id: String,
      name: String,
      cep: String,
      picture: String,
      category: String,
      user: String,
      description: String,
      localization: String,
      contact: String,
    },
    user: {},
  },
  setup(props, context) {
    const state = ref(props.action);
    const route = useRoute();
    const router = useRouter();
    const deleteAction = async (actionId) => {
      try {
        await deleteActions(actionId);
        context.emit("deleted");
      } catch (e) {
        alert(e);
      }
    };

    const likeAction = async () => {
      try {
        return await likeActions(firebase.auth()?.currentUser.uid, state.value);
      } catch (e) {
        alert(e);
      }
    };
    const seeAction = async (action) => {
      const id = action.id;
      router.push({ name: "Action", params: { id, teste: id } });
    };

    const showDeleteButton = () =>
      !!props.user &&
      props.user.uid === state.value.user &&
      route.name == "MyActions";

    const showSaveButton = () =>
      !!props.user &&
      props.user.uid !== state.value.user &&
      route.name == "Actions";
    return {
      state,
      showDeleteButton,
      showSaveButton,
      deleteAction,
      likeAction,
      seeAction,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/utils";
.card {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  background: $card-background;
  max-width: calc(100vw - 20%);
  width: calc(100vw - 20%);
  border-radius: 5%;
  padding: 5% !important;
  margin-top: 10% !important;
  margin-bottom: 1% !important;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.486);

  .category,
  .card-title,
  .card-image {
    width: 100%;
    margin-top: 0.5% !important;
    margin-bottom: 1% !important;
  }
  .category {
    color: #797272;
    font-weight: lighter;
    font-size: 12px;
  }
  .card-image {
    img {
      width: 100%;
      border-radius: 5%;
    }
  }

  .description,
  .location,
  .save {
    font-size: 12px;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
    width: auto;
  }

  .description {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
