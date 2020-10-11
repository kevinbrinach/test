<template>
  <q-card class="my-card cursor-pointer" @click="popup = true">
    <img :src="image.cropped_picture" />
    <q-dialog v-model="popup" full-width :full-height="$q.screen.gt.sm">
      <popup :imageId="image.id" :index="index" />
    </q-dialog>
  </q-card>
</template>

<script>
import Popup from "./Popup.vue";

export default {
  name: "ImageCard",
  components: {
    Popup,
  },
  props: {
    image: Object,
    index: Number,
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