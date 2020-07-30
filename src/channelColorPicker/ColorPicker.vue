<template>
  <!-- eslint-disable max-len -->
  <div
    class="sb-color_picker"
    tabIndex="0"
    @focusin="focusIn"
    @focusout="focusOut"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <div
      ref="currentColor"
      class="sb-color_picker-current"
      :class="{'is-open': open, 's_disabled': disabled}"
    >
      <div
        class="sb-color_picker-current-color"
        :style="{background: currentColor.rgb().string()}"
      ></div>
      <div
        class="sb-color_picker-current-icon"
        :class="{'s_disabled': disabled}"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6667 7.50001L9.99999 14.1667L3.33332 7.50001L4.51166 6.32167L9.99999 11.81L15.4883 6.32167"
          />
        </svg>
      </div>
    </div>
    <transition name="open-color-picker">
      <div
        v-if="open"
        class="sb-color_picker-picker"
      >
        <ul class="sb-color_picker-picker-list" v-if="types.length > 1">
          <li
            v-for="(type, index) in types"
            :key="`color-type-${index}`"
            :class="{'is-active': type.toLowerCase() === activeType}"
            @click="activeType = type.toLowerCase()"
          >
            {{ type }}
          </li>
        </ul>
        <Picker
          :force-color="forceColor"
          :type="activeType.toLowerCase()"
          :color="currentColor"
          @color-change="changeColor"
        />
        <ColorValues
          :color="getColorValues"
          :type="activeType.toLowerCase()"
          @color-change="forceColorChange($event, true)"
        />
        <div
          v-if="colorPreset"
          class="sb-color_picker-preset"
        >
          <span>Global colors:</span>
          <div class="sb-color_picker-preset_wrapper">
            <template v-for="(bgColor, index) in colorPresetColors">
              <div
                v-if="index < 14"
                :key="`color-preset-${index}`"
                class="sb-color_picker-preset_color"
                @click="forceColorChange(bgColor)"
              >
                <span
                  :style="{background: bgColor.rgb().string()}"
                ></span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Color from 'color';
import Picker from './picker/Picker.vue';
import ColorValues from './colorValues/ColorValues.vue';

export default {
  components: {
    Picker,
    ColorValues
  },
  props: {
    gray: {
      type: Boolean,
      default: true
    },
    rgb: {
      type: Boolean,
      default: true
    },
    cmyk: {
      type: Boolean,
      default: true
    },
    colorTypes: {
      type: [Array, String],
      default: () => []
    },
    colorPreset: {
      type: Array,
      default: null
    },
    color: {
      type: [
        String,
        Object
      ],
      default() {
        return {
          type: 'rgb',
          channels: [
            0,
            0,
            0
          ]
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: true,
      activeType: this.color.type,
      forceColor: false,
      colorCache: null,
      clicked: null,
      canClick: null,
      focused: null,
    };
  },
  computed: {
    types(){
      const types = [
        'Gray',
        'RGB',
        'CMYK'
      ];

      let colorTypes = this.colorTypes;
      if(!Array.isArray(colorTypes)){
        colorTypes = [colorTypes];
      }

      if(!colorTypes.length){
        return types;
      }

      const hasActiveType = colorTypes.some(colorType =>
        colorType.toLowerCase() === this.activeType.toLowerCase()
      );
      if(!hasActiveType){
        const typeIndex = types.findIndex(type =>
          type.toLowerCase() === this.activeType.toLowerCase()
        );
        colorTypes.push(types[typeIndex]);
      }

      return types.filter(type =>
        colorTypes.some(colorType =>
          colorType.toLowerCase() === type.toLowerCase()
        )
      );
    },
    currentColor() {
      return this.getCurrentColor(this.color);
    },
    getColorValues() {
      if (this.activeType === 'cmyk') {
        return this.currentColor
          .cmyk()
          .round()
          .object();
      }

      if (this.activeType === 'rgb') {
        return this.currentColor
          .rgb()
          .round()
          .object();
      }

      const gray = this.getGrayScale(this.currentColor);
      return {
        gray
      };
    },
    colorPresetColors() {
      return this.colorPreset.map((color) => {
        if (color.type) {
          return this.getCurrentColor(color);
        }

        return Color(color);
      });
    }
  },
  watch: {
    activeType(_newType, _oldType) {
      const newType = _newType.toLowerCase();
      const oldType = _oldType.toLowerCase();

      if (newType === 'gray') {
        this.setCachedColor(oldType);
        this.changeColor(this.currentColor);
      } else if (oldType === 'gray') {
        this.getCachedColor(newType);
      }
    },
    open(val) {
      this.$emit('is-open', val);
    }
  },
  methods: {
    getCurrentColor(color) {
      if (color.type === 'gray') {
        return Color.hsv({
          h: 0,
          s: 0,
          v: 100 - color.channels[0]
        });
      }

      return Color[color.type](color.channels);
    },
    mouseDown(e) {
      this.clicked = true;
      this.canClick = true;

      if (this.focused
        && this.focused !== e.currentTarget) {
        // force mouse up when comming from another focussed element
        this.clicked = false;
      }
    },
    mouseUp(e) {
      this.clicked = false;

      if (!this.$refs.currentColor.contains(e.target)) {
        return;
      }

      if (this.canClick) {
        // blur the color-picker
        e.currentTarget.blur();
      }
    },
    focusIn(e) {
      this.open = true;
      this.focused = e.target;

      // skip mouseup when focus has been set
      if (this.clicked) {
        this.canClick = false;
      }
    },
    focusOut(e) {
      // use a timeout so we check the targets after the focusin event
      setTimeout(() => {
        if (e.target === this.focused) {
          this.open = false;
          this.focused = null;
        }
      }, 0);
    },
    setCachedColor() {
      this.colorCache = this.currentColor.rgb();
    },
    getCachedColor() {
      const cache = this.colorCache;

      // get the value (brightness) and set it to the new color
      const currentColor = this.currentColor.hsv().object();
      const newColor = Color(cache)
        .hsv()
        .object();
      newColor.v = currentColor.v;

      this.forceColorChange(newColor);
    },
    forceColorChange(color, input) {
      let colorChange = color;
      this.forceColor = true;
      if (this.activeType === 'gray') {
        colorChange = {
          h: 0,
          s: 0,
          v: 100 - this.getGrayScale(color)
        };
      }
      this.changeColor(Color(colorChange), input);

      this.$nextTick(() => {
        this.forceColor = false;
      });
    },
    changeColor(color, input) {
      let channels;
      if (this.activeType === 'gray') {
        const gray = this.getGrayScale(color, input);
        channels = [
          gray
        ];
      } else {
        channels = color[this.activeType]()
          .round()
          .array();
      }

      this.$emit('color-change', {
        type: this.activeType,
        channels
      });
    },
    getGrayScale(color) {
      return 100 - color.hsv().round().object().v;
    }
  }
};
</script>

<style lang="scss" src="./_colorPicker.scss" />
