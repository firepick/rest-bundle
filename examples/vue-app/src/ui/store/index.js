import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
    },  
    getters: {
        stateData: (state) => ((stateType,stateName) => {
            var typeData = state[stateType];
            return typeData == null || stateName == null 
                ? typeData 
                : typeData[stateName];
        }),
    },
    mutations: {
        registerData(state, data) {
            let stateType = data.stateType || "UNKNOWN_stateType";
            state[stateType] || Vue.set(state, stateType, {});
            Vue.set(state[stateType], data.stateName, data);
            debug && console.log("store.registerData", stateType, data.stateName);
            data.stateId = Object.keys(state[stateType]).length;
        },
    },
});
