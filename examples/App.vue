<template>
  <div id="app">
    <div class="app-wrapper">
      <ChannelColorPicker
        :color="color"
        @colorChange="colorChanged"
      />
    </div>
  </div>
</template>

<script>
import ChannelColorPicker from '../src/channelColorPicker/ColorPicker.vue';

export default {
  name: 'App',
  components: {
    ChannelColorPicker
  },
  data() {
    return {
      color: {
        type: 'cmyk',
        channels: [
          0,
          0,
          0,
          0
        ]
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
