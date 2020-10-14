<template>
  <q-page class="q-pa-lg row justify-center items-start" id="page-top">
    <transition name="slide-transition" v-if="imagesList">
      <div class="col-xs-12 row flex-center">
        <image-card
          class="col-xs-12 col-sm-6 col-md-3 col-lg-2 q-ma-sm"
          v-for="(image, index) in imagesList"
          :key="index"
          :image="image"
          :index="index"
        />
        <div class="q-pa-lg flex flex-center full-width">
          <q-pagination
            v-model="currentPage"
            :max="maxPages"
            :input="true"
            @click="changePage"
          >
          </q-pagination>
        </div>
      </div>
    </transition>
    <spinner v-else />
    <error-snackbar
      v-if="errorGettingToken || errorGettingImagesList"
      :msg="errorMessage"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ImageCard from "src/components/ImageCard.vue";
import Spinner from "src/components/Spinner.vue";
import ErrorSnackbar from "src/components/ErrorSnackbar.vue";

export default {
  name: "PageIndex",
  components: {
    ImageCard,
    Spinner,
    ErrorSnackbar,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("user", ["bearerToken", "errorGettingToken"]),
    ...mapState("images", ["maxPages", "errorGettingImagesList"]),
    ...mapGetters("images", ["imagesList"]),
    errorMessage() {
      if (this.errorGettingToken) {
        return "There was an error in the authentication. Try again, if this error persists contact an admin";
      } else if (this.errorGettingImagesList) {
        return "Error retrieving images. Refresh the page to try again";
      }
    },
  },
  methods: {
    ...mapActions("images", ["GetImages"]),
    changePage() {
      this.GetImages({ page: this.currentPage });
    },
  },
  watch: {
    bearerToken() {
      if (this.bearerToken) {
        this.GetImages({ page: this.currentPage });
      }
    },
  },
};
</script>

<style>
.slide-transition-enter-active {
  transition: all 0.5s ease;
}
.slide-transition-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-transition-enter,
.slide-transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>