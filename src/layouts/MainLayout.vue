<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Agile Engine test </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MainLayout",
  methods: {
    ...mapActions("user", ["GetBearerToken"]),
  },
  created() {
    this.GetBearerToken();
  },
};
</script>
