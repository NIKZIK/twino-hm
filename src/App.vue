<template>
  <div class="h-full" id="app">
    <GroupList />
  </div>
</template>

<script>
import GroupList from "./components/GroupList.vue";
import "./index.css";

export default {
  name: "App",
  components: {
    GroupList,
  },
};
</script>