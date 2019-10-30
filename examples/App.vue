<template>
  <div id="app">
    <div class="app-wrapper">
      <SimpleColorPicker :color="color" @colorChange="colorChanged" />
    </div>
  </div>
</template>

<script>
import SimpleColorPicker from "../src/simpleColorPicker/ColorPicker.vue";

export default {
  name: "app",
  components: {
    SimpleColorPicker
  },
  data() {
    return {
      color: {
        type: "cmyk",
        channels: [0, 0, 0, 0]
      }
    };
  },
  methods: {
    colorChanged(color) {
      this.color = color;
    }
  }
};
</script>

<style lang="scss" src="./_app.scss">
