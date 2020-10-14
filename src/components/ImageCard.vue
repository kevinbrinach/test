<template>
  <q-card class="my-card cursor-pointer" @click="popup = true">
    <img :src="image.cropped_picture" />
    <q-dialog v-model="popup" full-width :full-height="$q.screen.gt.sm">
      <popup :imageId="image.id" :index="index" />
    </q-dialog>
  </q-card>
</template>

<script>
import ErrorSnackbar from "./ErrorSnackbar.vue";
import Popup from "./Popup.vue";

export default {
  name: "ImageCard",
  components: {
    Popup,
    ErrorSnackbar,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      popup: false,
    };
  },
};
</script>

<style>
.my-card {
  height: auto;
}
</style>