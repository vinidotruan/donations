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
      <button class="primary">Entrar</button>
    </div>

    <div class="form-control small-text">
      <span> Não tem uma conta ainda?</span>
      <router-link :to="{ name: 'Signup' }"> Entre agora</router-link>
    </div>
  </form>
</template>

<script>
import firebase from "firebase";
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "LoginForm",
  setup() {
    const form = reactive({ email: "", password: "" });
    const router = useRouter();
    const onSubmit = async () => {
      try {
        console.log(form.email);
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(form.email, form.password);
        localStorage.setItem("session", response);
        router.push({ name: "Actions" });
        return response;
      } catch (e) {
        console.log(e);
        alert("Não foi possível logar");
      }
    };

    return { onSubmit, form };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/utils";

.small-text {
  text-align: center;
  font-size: 12px;
  font-weight: lighter;

  a {
    color: $blue-three;
  }
}
</style>
