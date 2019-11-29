<template>
  <div
    class="sb-picker"
    :class="[`is-${type}`, {'is-small' : type === 'gray'}]"
  >
    <div class="sb-picker_saturation">
      <div
        ref="saturation"
        class="sb-picker_saturation_container"
        @mousedown.prevent="saturationDown"
        @touchstart.prevent="saturationDown"
      >
        <div
          class="sb-picker_saturation_container_background"
          :style="{'background-color': type !== 'gray' ? hueBg : null}"
        >
        </div>
        <div
          class="sb-picker_saturation_container_pointer"
          :style="{
            top: `${saturationTop}%`,
            left: type === 'gray' ? grayLeft : `${saturationLeft}%`,
            background: color.rgb().string()
          }"
        ></div>
      </div>
    </div>
    <transition name="hue-fade">
      <div
        v-if="type !== 'gray'"
        class="sb-picker_hue"
      >
        <div
          ref="hue"
          class="sb-picker_hue_container"
          @mousedown.prevent="hueDown"
          @touchstart.prevent="hueDown"
        >
          <div class="sb-picker_hue_container_background"></div>
          <div
            class="sb-picker_hue_container_pointer"
            :style="{left: `${hueLeft}%`, background: hueBg}"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Color from 'color';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: Object,
      required: true
    },
    forceColor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hsv: null,
      grayLeft: 0,
      saturationLeft: 0,
      saturationTop: 0
    };
  },
  computed: {
    hueBg() {
      if (!this.hsv) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return `hsl(${this.hsv.h}, 100%, 50%)`;
    },
    hueLeft() {
      if (!this.hsv) {
        return;
      }
      // eslint-disable-next-line consistent-return
      return (this.hsv.h * 100) / 360;
    }
  },
  watch: {
    color(color) {
      this.setColor(color);
    }
  },
  mounted() {
    this.setColor(this.color);
  },
  methods: {
    setBodyCursor(cursor) {
      document.body.style.cursor = cursor ? 'pointer' : null;
    },
    setColor(color) {
      if (color.model === 'cmyk') {
        if (color.color[3] === 100) {
          // eslint-disable-next-line no-param-reassign
          color = Color({
            c: color.color[0],
            m: color.color[1],
            y: color.color[2],
            k: 99.9
          });
        }
      }

      const hsv = color.hsv().object();

      if (this.hsv) {
        this.hsv.s = hsv.s;
        this.hsv.v = hsv.v;

        if (this.forceColor) {
          this.hsv.h = hsv.h;

          this.saturationTop = (hsv.v * -1) + 100;
          this.saturationLeft = hsv.s;
        }

        return;
      }

      this.saturationTop = (hsv.v * -1) + 100;
      this.saturationLeft = hsv.s;

      this.hsv = hsv;
    },
    saturationDown(e) {
      this.saturationChange(e);
      document.addEventListener('mousemove', this.saturationChange);
      document.addEventListener('mouseup', this.saturationUp);

      document.addEventListener('touchmove', this.saturationChange);
      document.addEventListener('touchend', this.saturationUp);

      this.setBodyCursor(true);
    },
    saturationChange(e) {
      const { saturation } = this.$refs;
      const saturationWidth = saturation.clientWidth || saturation.offsetWidth;
      const saturationHeight = saturation.clientHeight || saturation.offsetHeight;
      const xOffset = saturation.getBoundingClientRect().left;
      const yOffset = saturation.getBoundingClientRect().top;
      const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
      let leftPos = clientX - xOffset;
      let topPos = clientY - yOffset;

      if (leftPos < 0) {
        leftPos = 0;
      } else if (leftPos > saturationWidth) {
        leftPos = saturationWidth;
      }
      if (topPos < 0) {
        topPos = 0;
      } else if (topPos > saturationHeight) {
        topPos = saturationHeight;
      }

      const s = (leftPos * 100 / saturationWidth);
      const v = (-(topPos * 100 / saturationHeight) + 100);

      // set the color
      this.hsv.v = v;
      this.hsv.s = s;

      // set the pointer (using colors to dictate the position can mess up due to color conversion!)
      this.saturationLeft = s;
      this.saturationTop = (v * -1) + 100;

      // use a separated gray pointer so the horizontal position does not interfere
      this.grayLeft = `${leftPos}px`;

      this.$emit('color-change', Color(this.hsv));
    },
    saturationUp() {
      document.removeEventListener('mousemove', this.saturationChange);
      document.removeEventListener('mouseup', this.saturationUp);

      document.removeEventListener('touchmove', this.saturationChange);
      document.removeEventListener('touchend', this.saturationUp);
      this.setBodyCursor(false);
    },
    hueDown(e) {
      this.hueChange(e);
      document.addEventListener('mousemove', this.hueChange);
      document.addEventListener('mouseup', this.hueUp);

      document.addEventListener('touchmove', this.hueChange);
      document.addEventListener('touchend', this.hueUp);
      this.setBodyCursor(true);
    },
    hueChange(e) {
      const { hue } = this.$refs;
      const hueWidth = hue.clientWidth || hue.offsetWidth;
      const xOffset = hue.getBoundingClientRect().left;
      const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
      const left = clientX - xOffset;
      let h;
      let percent;

      if (left < 0) {
        h = 0;
      } else if (left >= hueWidth) {
        h = 359;
      } else {
        percent = (left * 100 / hueWidth);
        h = (360 * percent / 100);
      }

      this.hsv.h = h;
      this.$emit('color-change', Color(this.hsv));
    },
    hueUp() {
      document.removeEventListener('mousemove', this.hueChange);
      document.removeEventListener('mouseup', this.hueUp);

      document.removeEventListener('touchmove', this.hueChange);
      document.removeEventListener('touchend', this.hueUp);

      this.setBodyCursor(false);
    }
  }
};
</script>

<style lang="scss" src="./_picker.scss" />
