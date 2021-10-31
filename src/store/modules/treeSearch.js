import axios from "axios";
export default {
    namespaced: true,
    state: {
        brands: [],
        searchByTitle: '',
        searchCapitalize: false,
        sortBool: true,
        filterSort: [],
        editBrand: '',
        createBrandInput: {
            title: '',
            main: false
        }
    },
    getters: {
        getBrands: state => state.brands,
        getSearchByTitle: state => state.searchByTitle,
        getFlags: state => (key) => state[key],
        getFilterSort: state => state.filterSort,
        getCreateBrandInput: state => (field) => state.createBrandInput[field],
        getCreateBrand: state => state.createBrandInput
    },
    mutations: {
        setCreateBrandInput(state, { field, value }) {
          state.createBrandInput[field] = value
        },
        setBrands (state, value) {
            state.brands = value;
        },
        setSearchByTitle (state, value) {
            state.searchByTitle = value
        },
        setReadOnly (state, value) {
          state.filterSort.find(item => item._id === value._id).readOnly = false
        },
        setEditBrand (state, { id, field, value }) {
            state.filterSort.find(item => item._id === id)[field] = value
        },
        setFilteredBrands(state) {
            if (state.brands) {
              const brandsCopy = [...state.brands]
              let sortedData;
              let sortByMainLetter;
              if (state.sortBool) {
                  sortedData = brandsCopy.sort((a, b) => a.title.localeCompare(b.title))
              } else {
                  sortedData = brandsCopy.sort((a, b) => b.title.localeCompare(a.title))
              }

              if (state.searchCapitalize) {
                  sortedData = brandsCopy.filter(({title}) => title.includes(state.searchByTitle));
                  sortByMainLetter = sortedData.map((item) => ({
                      ...item,
                      firstLetter: item.title[0],
                      readOnly: true
                  }));
              } else {
                  sortedData = brandsCopy.filter(({title}) => title.toLowerCase().includes(state.searchByTitle.toLowerCase()));
                  sortByMainLetter = sortedData.map((item) => ({
                      ...item,
                      firstLetter: item.title[0].toLowerCase(),
                      readOnly: true
                  }));
              }
              const isUpper = str => str === str.toUpperCase();
              const filteredBrands = sortByMainLetter.reduce((acc, item) => {
                  if (!acc[item['firstLetter']]) { acc[item['firstLetter']] = []; }
                  acc[item['firstLetter']].push(item);
                  for (let key in acc) {
                      if (state.searchCapitalize && !isUpper(key)) {
                          delete acc[key]
                      }
                  }
                  return acc;
              }, {});
              state.filterSort = filteredBrands
            }
        },
        setFlags (state, { key, bool }) {
            state[key] = bool
        }
    }
    ,
    actions: {
        async getAllBrands ({ commit }) {
            const { data } = await axios.get('https://recruting-test-api.herokuapp.com/api/v1/brands');
            commit('setBrands', data);
        },
        async editBrandById(_, body) {
            const data = await axios.put(`https://recruting-test-api.herokuapp.com/api/v1/brand/${body.id}`, {
                title: body.title,
                main: body.model
            });
            if (data.status === 202) {
                alert('edited, reload page')
            } else {
                alert('smth went wrong')
            }
        },
        async deleteBrandById(_, id) {
            const data = await axios.delete(`https://recruting-test-api.herokuapp.com/api/v1/brand/${id}`)
            if (data.status === 204) {
                alert('deleted, reload page')
            } else {
                alert('smth went wrong')
            }
        },
        async createBrandMethod ({ getters }) {
            const data = await axios.post('https://recruting-test-api.herokuapp.com/api/v1/brands', getters.getCreateBrand)
            if (data.status === 201) {
                alert(`title: ${data.data.title} successfully created!`)
            } else {
                alert('smth went wrong')
            }
        }
    }
}