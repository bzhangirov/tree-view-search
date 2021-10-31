<template>
  <div class="input-block">
    <input
        :id="id"
        :class="{ 'noEdit': readonly }"
        v-model="model"
        :type="type"
        :readonly="readonly"
        :placeholder="placeholder"
        :style="customStyle"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    />

  </div>
</template>

<script>
export default {
  name: 'IndexOwnInput',
  model: {
    prop: 'stateValue',
    event: 'change',
  },
  props: {
    id: {
      type: String,
    },
    type: {
      type: String,
      default() {
        return 'text';
      },
    },
    readonly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    placeholder: {
      type: [String, Number],
    },
    customStyle: {
      type: Object,
    },
    stateValue: {
      type: [String, Number, Boolean],
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    }
  },
  computed: {
    model: {
      get() {
        return this.stateValue;
      },
      set(value) {
        this.$emit('change', value);
      },
    }
  },
};
</script>

<style scoped>
.noEdit {
  border: none;
  width: 100%;
  pointer-events: none;
}
</style>
