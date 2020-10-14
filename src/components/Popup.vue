<template>
  <q-card>
    <transition name="fade-transition" v-if="imageDetails">
      <q-img
        class="image"
        alt="QZoom with scale"
        :src="imageDetails.full_picture"
      />
    </transition>

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
    <transition name="fade-transition" v-if="imageDetails">
      <q-card-section
        class="description text-red-8"
        :class="$q.screen.gt.sm ? 'text-h6' : 'text-body'"
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
    </transition>
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
    <error-snackbar
      v-if="errorGettingImage"
      :msg="'There was an error retrieving this image. Please try with another one'"
    />
  </q-card>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ErrorSnackbar from "./ErrorSnackbar.vue";
import Spinner from "./Spinner";

export default {
  name: "Popup",
  props: {
    imageId: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Spinner,
    ErrorSnackbar,
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
    ...mapState("images", [
      "arrayLength",
      "imageDetails",
      "imageLoaded",
      "errorGettingImage",
    ]),
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
  color: rgba(5, 180, 49, 0.719);
}
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 0.5s;
}
.fade-transition-enter,
.fade-transition-leave-to {
  opacity: 0;
}
</style>