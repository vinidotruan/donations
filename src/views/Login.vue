<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/heart.png" alt="" srcset="" />
      <span>DoaAção</span>
    </div>
    <LoginForm v-if="route.name === 'Login'" />
    <SignupForm v-if="route.name === 'Signup'" />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import LoginForm from "../components/forms/LoginForm.vue";
import SignupForm from "../components/forms/SignupForm.vue";
export default {
  components: { LoginForm, SignupForm },
  name: "Login",
  setup() {
    const route = useRoute();
    console.log("Login view loaded");

    return { route };
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
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
}
</style>
