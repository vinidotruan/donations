<template>
  <div class="loader"></div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Loader",
  setup() {
    const visible = ref(false);
    const show = () => {
      visible.value = true;
    };

    return { visible, show };
  },
};
</script>
<style lang="scss" scoped></style>
