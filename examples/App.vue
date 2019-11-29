<template>
  <div id="app">
    <div class="app-wrapper">
      <ChannelColorPicker
        :color="color"
        :color-preset="colorPreset"
        @color-change="colorChanged"
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
          100
        ]
      },
      colorPreset: [
        'red',
        '#fffaaa',
        '#fffaaa',
        '#fffaaa',
        '#fffaaa',
        '#fffaaa',
        '#fffaaa',
        '#fffaaa',
        '#fffaaa',
        '#fffaaa',
        'rgb(150, 150, 150)',
        {
          type: 'cmyk',
          channels: [
            30,
            10,
            50,
            40
          ]
        }
      ]
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
