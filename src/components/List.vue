<template>
<div class="list-container">
  <div v-for="(item, label, index) in filteredList"
       :key="index">
    <div>{{ label.toUpperCase() }} ({{ item.length }})</div>
    <div class="list-item" v-for="(brand, index1) in item" :key="index1">
      <div class="list">
        <div class="list-item">
           - <Input :class="[{'notEditable': !brand.readOnly }]"
                    v-model="brand.title"
                    :readonly="brand.readOnly" />
          (main: <InputCheckbox :disabled="brand.readOnly"
                                :id="brand._id"
                                v-model="brand.main" />)
          <button v-if="brand.readOnly"
                  @click="editValueMethod(item, brand)">Edit</button>
          <button v-else
                  @click="editedValueMethod(item, brand)">save</button>
          <button @click="cancelEdit(item, brand._id)" v-if="!brand.readOnly">Cancel edit</button>
          <button @click="deleteBrand(brand._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import Input from "./Input";
import InputCheckbox from "./InputCheckbox";
export default {
  name: "List",
  props: ['filteredList'],
  components: {
    Input,
    InputCheckbox
  },
  data: () => ({
    isEdit: false,
    save: true,
    savedBrand: {}
  }),
  computed: {

  },
  methods: {
    ...mapActions('treeSearch', [
      'deleteBrandById',
      'editBrandById'
    ]),
    cancelEdit(event, id) {
      event.find((i) => i._id === id).readOnly = true;
    },
    editValueMethod(event, brand) {
      event.find((i) => i._id === brand._id).readOnly = false;
    },
    async editedValueMethod(event, brand) {
      const body = {
        id: brand._id,
        title: brand.title,
        model: brand.main
      };
      await this.editBrandById(body)
      event.find((i) => i._id === brand._id).readOnly = true;
    },
    async deleteBrand (id) {
      await this.deleteBrandById(id);
    }
  }
}
</script>

<style scoped>
.list-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  border: 2px solid black;
}
.list {
  display: flex;
  align-items: flex-start;

}
.list-title {
  margin-right: 5px;
}
.list-item {
  display: flex;
  height: 50px;
}
button {
  height: 21px;
}
</style>