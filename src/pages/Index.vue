<template>
  <q-page class="q-pa-lg row justify-center items-start" id="page-top">
    <div class="col-xs-12 row flex-center" v-if="imagesList">
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
    <spinner v-else />
  </q-page>
</template>

<script>
import ImageCard from "src/components/ImageCard.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import Spinner from "src/components/Spinner.vue";

export default {
  name: "PageIndex",
  components: {
    ImageCard,
    Spinner,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("user", ["bearerToken"]),
    ...mapState("images", ["maxPages"]),
    ...mapGetters("images", ["imagesList"]),
  },
  methods: {
    ...mapActions("images", ["GetImages"]),
    changePage() {
      this.GetImages({ page: this.currentPage });
      const ele = document.getElementById("page-top");
      const target = getScrollTarget(ele);
      const scrollTarget = getScrollHeight(ele);
      setScrollPosition(target, scrollTarget - 80, 300);
    },
  },
  watch: {
    bearerToken() {
      if (this.bearerToken) {
        this.GetImages({ page: 1 });
      }
    },
  },
};
</script>
