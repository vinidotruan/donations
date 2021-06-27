<template>
  <div class="home base-column-100">
    <ActionForm />
  </div>
</template>

<script>
import ActionForm from "../components/forms/ActionForm.vue";
export default {
  components: { ActionForm },
  name: "Home",
  setup() {},
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/utils";
.home {
  width: 100%;
}
</style>
