
<template>
  <div class="sb-color-values">
    <div
      v-for="(prop, index) in types"
      class="sb-color-values_container"
      :key="`color-values-${index}`"
    >
      <input min="0" :max="max" :value="currentColor[prop]" @keydown="blockInput" @input="setValue($event, prop)" type="number"/>
      <span>{{prop.toUpperCase()}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    color: Object
  },
  computed: {
    currentColor(){
      return this.color;
    },
    max(){
      if(this.type === 'rgb'){
        return 255;
      }

      return 100;
    },
    types(){
      if(this.type === 'gray'){
        return [this.type];
      }

      return this.type;
    }
  },
  data(){
    return {
      blockedChars: [
        'e',
        '+',
        '-'
      ]
    }
  },
  methods: {
    blockInput(e){
      if(this.blockedChars.includes(e.key)){
        e.preventDefault();
      }
    },
    setValue(e, prop){
      let value = parseInt(e.currentTarget.value);

      //prevent empty input
      if(!value){
        value = 0;
        //have to set currentTarget directly due too reactivity delay
        e.currentTarget.value = 0;
      }

      //never exceed max value
      if(value > this.max){
        value = this.max;
        e.currentTarget.value = this.max;
      }
      //never exceed min value
      if(value < 0){
        value = 0;
        e.currentTarget.value = 0;
      }
      
      this.currentColor[prop] = parseInt(value);
      this.$emit('colorChange', this.currentColor);
    }
  }
}
</script>

<style lang="scss" src="./_colorValues.scss" />