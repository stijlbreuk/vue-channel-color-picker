# Vue Channel Color Picker

<p align="center">
  <img src="https://raw.githubusercontent.com/stijlbreuk/vue-channel-color-picker/master/images/channel-picker-example.gif" alt="Example"/>
</p>

<p align="center">

<a href="https://www.npmjs.com/package/vue-channel-color-picker">
    <img src="https://img.shields.io/npm/v/vue-channel-color-picker.svg" alt="Version"/>
</a>
<a href="https://www.npmjs.com/package/vue-channel-color-picker">
    <img src="https://img.shields.io/npm/dt/vue-channel-color-picker.svg" alt="Downloads"/>
</a>
<a href="https://www.npmjs.com/package/vue-channel-color-picker">
    <img src="https://img.shields.io/npm/l/vue-channel-color-picker.svg" alt="License"/>
</a>
<a href="https://www.npmjs.com/package/vue-channel-color-picker">
    <img src="https://img.badgesize.io/https://unpkg.com/vue-channel-color-picker" alt="Size"/>
</a>

</p>

<p align="center">
An easy to use channel based RGB, CMYK & Graytone color picker.
</p>

## Demo

### Basic

<a href="https://codesandbox.io/s/vue-channel-color-picker-do7xu?fontsize=14" target="_blank"><img src="https://codesandbox.io/static/img/play-codesandbox.svg"/></a>

## Installation

```
npm install --save vue-channel-color-picker
```

## Usage

ES6 modules

```HTML
<template>
  <div id="app">
    <div class="app-wrapper">
      <channel-color-picker :color="color" @color-change="colorChanged" />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
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
```

Register ChannelColorPicker component globally.

```Javascript
// main.js
import Vue from 'vue';

import VueChannelColorPicker from 'vue-channel-color-picker';

import App from './App.vue';

Vue.use(VueChannelColorPicker);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
```

CommonJS

```JavaScript
const VueChannelColorPicker = require('vue-channel-color-picker');
```

In a script tag, this loads the component using the global Vue instance.

```HTML
<script src="https://unpkg.com/vue-channel-color-picker"></script>
```

### Properties

`color: object`\
The color object in `RGB`, `CMYK` or `Gray` and its channels.

```Javascript
{
  type: "cmyk",
  channels: [0, 0, 0, 0]
}
```

```Javascript
{
  type: "rgb",
  channels: [0, 0, 0]
}
```

```Javascript
{
  type: "gray",
  channels: [0]
}
```

`colorPreset: Array`\
Adds some pre-defined colors.\
Color given can be any css-valid color String.\
Or, ofcourse, a type + channel.

- Note that maximum 18 colors can be shown at the time

```Javascript
[
  'red',
  '#ffaaa',
  'rgb(255, 255, 255)',
  {
    type: "cmyk",
    channels: [0, 0, 0, 0]
  }
]
```

### Events

`@color-change`\
Triggered when the color has been changed, returns the color object.

## Contributing

Checkout [GitHub issues](https://github.com/stijlbreuk/vue-channel-color-picker/issues) for any issues we need some help with.

```bash
# Serve with hot reload (default at localhost:8080)
vue serve --open src/channelColorPicker/ColorPicker.vue

# Build all variants
npm run bundle
```

## License

[MIT](https://github.com/stijlbreuk/vue-channel-color-picker/blob/master/LICENSE)
