<template>
  <div class="tree-view">
    <div class="sort-container">
      <button :class="['btn', { 'sort-on': sortBool }]"
              @click="sortBool = true">A-Z</button>
      <button :class="[{ 'sort-on': !sortBool }]"
              @click="sortBool = false">Z-A</button>
    </div>
    <button class="create-brand-btn" @click="createBrand = !createBrand">Create brand</button>
    <div class="create-brand" v-if="createBrand">
      title: <Input v-model="createTitle"/>
      main click bool: <InputCheckbox v-model="createMain"/>
      <button @click="createBrandMethod()">Create brand</button>
    </div>
    <Input v-model="title"
           @input="setFilteredBrands()"
           placeholder="Search" />
    <div class="caps-container">
      <button :class="['caps-btn', { 'caps-on': searchCapitalize }]"
              @click="searchCapitalize = !searchCapitalize">Aa</button>
      <div v-text="capsOnText"></div>
    </div>
    <List :filtered-list="getFilterSort" :isCaps="searchCapitalize"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Input from "./Input";
import InputCheckbox from "./InputCheckbox";
import List from "./List";
export default {
  name: 'TreeView',
  components: {
    Input,
    List,
    InputCheckbox
  },
  data: () => ({
    createBrand: false
  }),
  computed: {
    ...mapGetters('treeSearch', [
        'getBrands',
        'getSearchByTitle',
        'getFlags',
        'getFilterSort',
        'getCreateBrandInput'
    ]),
    title: {
      get () {
        return this.getSearchByTitle
      },
      set(value) {
        this.setSearchByTitle(value)
      }
    },
    searchCapitalize: {
      get () {
        return this.getFlags('searchCapitalize')
      },
      set(value) {
        this.setFlags({ key: 'searchCapitalize', bool: value })
      }
    },
    createTitle: {
      get () {
        return this.getCreateBrandInput('title')
      },
      set(value) {
        this.setCreateBrandInput({ field: 'title', value: value })
      }
    },
    createMain: {
      get () {
        return this.getCreateBrandInput('main')
      },
      set(value) {
        this.setCreateBrandInput({ field: 'main', value: value })
      }
    },
    sortBool: {
      get () {
        return this.getFlags('sortBool')
      },
      set(value) {
        this.setFlags({ key: 'sortBool', bool: value })
      }
    },
    capsOnText() {
      return this.searchCapitalize ? '(поиск с учетом регистра включен)' : '(поиск с учетом регистра выключен)'
    }
  },
  created() {
    this.getAllBrands()
  },
  methods: {
    ...mapMutations('treeSearch', [
        'setSearchByTitle',
        'setFilteredBrands',
        'setFlags',
        'setCreateBrandInput'
    ]),
    ...mapActions('treeSearch', [
      'getAllBrands',
      'createBrandMethod'
    ]),
    // async createBrandMethod () {
    //   await this.createBrand()
    // }
  }
}
</script>

<style scoped>
.tree-view {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.caps-btn {
  background: #fff;
  padding: 5px;
}

.caps-container {
  margin-top: 10px;
}

.sort-container {
  margin-bottom: 10px;
}

.caps-on {
  background-color: aquamarine;
}

.sort-on {
  background-color: aqua;
}

.sort-container .btn {
  margin-right: 10px;
}

.create-brand-btn {
  margin-bottom: 20px;
}

.create-brand {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
</style>
