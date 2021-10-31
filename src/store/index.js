import Vue from 'vue';
import Vuex from 'vuex';

import treeSearch from './modules/treeSearch';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        treeSearch
    }
})