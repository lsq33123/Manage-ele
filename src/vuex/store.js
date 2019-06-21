import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    userInfo:{
        name: 'lsq',
        age: 9,
        address:'广州',
        flike: 'sing',
        score:98
    }
}

//定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    updateScore(state, score) {
        state.userInfo.score = score
    }
}

const actions = {
    updateScore(context, score = 0) {
        console.log(context)
        return context.commit('updateScore', score)
    },
}

const getters = {
    getterScore(state) {
        return state.score
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
