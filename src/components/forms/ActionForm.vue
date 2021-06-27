<template>
  <form class="form" @submit.prevent="onSubmit" autocomplete="off">
    <div class="form-control">
      <label for="name">Nome</label>
      <div class="form-field">
        <input type="text" v-model="form.name" />
      </div>
    </div>

    <div class="form-control">
      <label for="cep">CEP</label>
      <div class="form-field">
        <input type="text" name="cep" v-model="form.postalCode" />
      </div>
    </div>

    <div class="form-control">
      <label for="category">Categoria</label>
      <div class="form-field">
        <input type="text" name="category" v-model="form.category" />
      </div>
    </div>

    <div class="form-control">
      <label for="description">Descrição</label>
      <div class="form-field text-area-field">
        <textarea rows="10" name="description" v-model="form.description" />
      </div>
    </div>

    <div class="form-control">
      <label for="localization">Localização</label>
      <div class="form-field">
        <input type="text" name="localization" v-model="form.localization" />
      </div>
    </div>

    <div class="form-control">
      <label for="contact">Contato</label>
      <div class="form-field">
        <input type="text" name="contact" v-model="form.contact" />
      </div>
    </div>

    <div class="form-control">
      <label for="image">Image {{ uploadProgress }}</label>
      <div class="form-field" v-if="!uploadedImage">
        <input type="file" name="image" @change="uploadImage" />
      </div>
      <img :src="uploadedImage" class="preview" />
    </div>

    <div class="form-control form-control-button">
      <button class="primary">Cadastrar</button>
    </div>
  </form>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { createAction } from "@/collections/donations";
import { storageRef } from "@/main";
import firebase from "firebase";

export default {
  name: "ActionForm",
  setup() {
    const user = firebase.auth()?.currentUser;
    const form = reactive({
      name: "",
      postalCode: "",
      category: "",
      user: "",
      description: "",
      localization: "",
      contact: "",
      image: "",
      createdAt: "",
    });

    const uploadedImage = ref();
    const uploadProgress = ref(0);

    const onSubmit = async () => {
      const response = await createAction({
        ...form,
        user: user.uid,
        image: `${uploadedImage.value}`,
        createdAt: new Date().getTime(),
      });
      alert("Cadastrado com sucesso");
      uploadedImage.value = null;
      return response;
    };

    const uploadImage = async (e) => {
      const imageData = e.target.files[0];

      const uploadTask = storageRef
        .child(`images/${imageData.name}.jpg`)
        .put(imageData);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          uploadProgress.value =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + uploadProgress.value + "% done");
        },
        function (e) {
          alert(e);
        },
        async () => {
          uploadedImage.value = await uploadTask.snapshot.ref.getDownloadURL();
        }
      );
    };

    return { form, uploadedImage, uploadProgress, onSubmit, uploadImage };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/utils";
</style>
