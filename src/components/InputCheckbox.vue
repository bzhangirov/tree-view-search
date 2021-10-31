<template>
  <label :for="id" :class="[{ 'disabled': disabled }]">
    <input
        type="checkbox"
        :id="id"
        name="main"
        :checked="stateValue"
        @change="$emit('change', !stateValue)"
        :disabled="disabled"
    />
    <span>{{ stateValue }}</span>
  </label>
</template>

<script>
export default {
  name: 'InputCheckbox',
  model: {
    prop: 'stateValue',
    event: 'change',
  },
  props: {
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    stateValue: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
label {
  margin: 0;
  height: 28px;
}
.disabled {
   pointer-events: none;
 }
label input[type="checkbox"] {
  font-size: 30px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
label:checked {
   background: #86bc24;
 }

label:after {
   position: absolute;
   content: "";
   width: 28px;
   height: 28px;
   border-radius: 50%;
   background: #fff;
   -webkit-transform: scale(0.7);
   transform: scale(0.7);
   left: 0;
   -webkit-transition: all 0.2s ease-in-out;
   transition: all 0.2s ease-in-out;
 }

label:checked:after {
   left: calc(100% - 28px);
 }

span {
  cursor: pointer;
}
</style>
