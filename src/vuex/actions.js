// test
export const increment = ({ commit }) => {
    commit('INCREMENT')
}
export const decrement = ({ commit }) => {
    commit('DECREMENT')
}

export const updateScore = ({ commit,sc }) => {
    commit("updateScore",sc)
}

