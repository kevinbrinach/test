// Quasar manages snackbar-styled components as a function
<template></template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: "There was an error. Please try again.",
    },
  },
  data() {
    return {
      message: this.msg,
    };
  },
  methods: {
    showMessage() {
      this.$q.notify({
        type: "negative",
        message: this.message,
        icon: "fas fa-times",
      });
    },
  },
  mounted() {
    this.showMessage();
  },
};
</script>