<template>
  <q-card>
    <q-img
      class="image"
      v-if="imageDetails"
      alt="QZoom with scale"
      :src="imageDetails.full_picture"
    />

    <Spinner v-else />
    <q-btn color="red" dense size="lg" class="button" flat v-close-popup
      >&times;</q-btn
    >
    <q-btn
      class="left-button"
      color="secondary"
      icon="fas fa-chevron-left"
      flat
      :disable="currentIndex === 0"
      @click="previousImage"
    />
    <q-btn
      class="right-button"
      color="secondary"
      icon="fas fa-chevron-right"
      flat
      @click="nextImage"
      :disable="currentIndex + 1 === arrayLength"
    />
    <q-card-section
      class="description text-red-8"
      :class="$q.screen.gt.sm ? 'text-h6' : 'text-body'"
      v-if="imageDetails"
    >
      <div>Author: {{ imageDetails.author }}</div>
      <div>
        Camera:
        {{ imageDetails.camera }}
      </div>
      <div class="row col-12 justify-center">
        Hashtags: {{ imageDetails.tags }}
      </div>
    </q-card-section>
    <q-btn
      unelevated
      icon="fas fa-share-alt"
      class="share-button"
      @click="showShare = true"
    />
    <q-dialog v-model="showShare" v-if="imageDetails">
      <q-card class="q-pa-md">
        <div>
          Share via url:
          <span class="text-bold">{{ imageDetails.full_picture }}</span>
        </div>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import Spinner from "./Spinner";

import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Popup",
  props: {
    imageId: String,
    index: Number,
  },
  components: {
    Spinner,
  },
  data() {
    return {
      currentImageId: null,
      currentIndex: null,
      showShare: false,
    };
  },
  computed: {
    ...mapGetters("images", ["imagesList"]),
    ...mapState("images", ["arrayLength", "imageDetails", "imageLoaded"]),
  },
  methods: {
    ...mapActions("images", ["GetImage"]),
    nextImage() {
      this.currentIndex++;
    },
    previousImage() {
      this.currentIndex--;
    },
  },
  mounted() {
    this.currentImageId = this.imageId;
    this.currentIndex = this.index;
  },
  watch: {
    currentIndex() {
      this.currentImageId = this.imagesList[this.currentIndex].id;
      this.GetImage({ imageId: this.currentImageId });
    },
  },
};
</script>

<style>
.button {
  position: absolute;
  right: 20px;
  top: 20px;
}
.image {
  width: 100%;
  height: auto;
}

.description {
  position: fixed;
  bottom: 10px;
}

.right-button {
  position: fixed;
  top: 50%;
  right: 25px;
}
.left-button {
  position: fixed;
  top: 50%;
  left: 25px;
}
.info {
  position: absolute;
  top: 10px;
}
.hashtags {
  position: absolute;
  bottom: 10px;
}
.share-button {
  position: fixed;
  bottom: 40px;
  right: 50px;
  color: rgb(0, 255, 64);
}
</style>