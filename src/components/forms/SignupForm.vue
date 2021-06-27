<template>
  <form class="form" @submit.prevent="onSubmit" autocomplete="off">
    <div class="form-control">
      <label for="email">Email</label>
      <div class="form-field">
        <input type="text" v-model="form.email" />
      </div>
    </div>

    <div class="form-control">
      <label for="password">Senha</label>
      <div class="form-field">
        <input type="password" v-model="form.password" />
      </div>
    </div>

    <div class="form-control form-control-button">
      <button class="primary">Cadastrar</button>
    </div>
  </form>
</template>

<script>
import { reactive } from "@vue/reactivity";
import firebase from "firebase";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "SignUp",
  setup() {
    const form = reactive({ email: "", password: "" });
    const store = useStore();
    const router = useRouter();

    const onSubmit = async () => {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(form.email, form.password);
        store.dispatch("setLoggedUser", form.email);
        router.push({ name: "Home" });
        return response;
      } catch {
        alert("Erro ao cadastrar");
      }
    };

    return { onSubmit, form, router };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/utils";

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  img {
    width: 100px;
  }
  span {
    font-size: 24px;
  }
}

.small-text {
  text-align: center;
  font-size: 12px;
  font-weight: lighter;

  a {
    color: $blue-three;
  }
}
</style>
