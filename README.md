# Vue Simple ColorPicker

<p align="center">
  <img src="[RAW GITHUB USER CONTENT LINK]" alt="Example"/>
</p>

<p align="center">

<a href="https://www.npmjs.com/package/vue-simple-color-picker">
    <img src="https://img.shields.io/npm/v/vue-simple-color-picker.svg" alt="Version"/>
</a>
<a href="https://www.npmjs.com/package/vue-simple-color-picker">
    <img src="https://img.shields.io/npm/dt/vue-simple-color-picker.svg" alt="Downloads"/>
</a>
<a href="https://www.npmjs.com/package/vue-simple-color-picker">
    <img src="https://img.shields.io/npm/l/vue-simple-color-picker.svg" alt="License"/>
</a>
<a href="https://www.npmjs.com/package/vue-simple-color-picker">
    <img src="https://img.badgesize.io/https://unpkg.com/vue-simple-color-picker" alt="Size"/>
</a>

</p>

<p align="center">
A plainly simple RGB, CMYK & Graytone color-picker.
</p>

## Demo

### Basic

<a href="[CODE SANDBOX LINK]" target="_blank"><img src="https://codesandbox.io/static/img/play-codesandbox.svg"/></a>

## Installation

```
npm install --save vue-simple-color-picker
```

## Usage

ES6 modules

```HTML
<template>
  <div id="app">
    <div class="app-wrapper">
      <SimpleColorPicker :color="color" @colorChange="colorChanged" />
    </div>
  </div>
</template>

<script>
import SimpleColorPicker from "vue-simple-color";

export default {
  name: "App",
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
```

Register SimpleColorPicker component globally.

```Javascript
// main.js
import Vue from 'vue';

import VueSimpleColorPicker from 'vue-simple-color-picker';

import App from './App.vue';

Vue.use(VueSimpleColorPicker);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
```

CommonJS

```JavaScript
const SimpleColorPicker = require('vue-simple-color-picker');
```

In a script tag, this loads the component using the global Vue instance.

```HTML
<script src="https://unpkg.com/vue-simple-color-picker"></script>
```

### Properties

`color: object`
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

### Events

`@colorChange`
Triggered when the color has been changed, returns the color object.

## Contributing

Checkout [GitHub issues](https://github.com/stijlbreuk/[GITHUB REPOSITORY NAME]/issues) for any issues we need some help with.

```bash
# Serve with hot reload (default at localhost:8080)
vue serve --open src/simpleColorPicker/ColorPicker.vue

# Build all variants
npm run bundle
```

## License

[MIT](https://github.com/stijlbreuk/[GITHUB REPOSITORY NAME]/blob/master/readme.md)
