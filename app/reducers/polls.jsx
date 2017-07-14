export default (state = [], action) => {
    switch (action.type) {
        case "ADD_POLLS":
            return [
                ...action.polls
            ]
        case "ADD_POLL":
            return [
                ...state,
                action.poll
            ]
        case "UPDATE_POLL":
            return state.map(el => {
                if (Number(action.id) === el.id){
                    return {
                        ...el,
                        ...action.updates
                    }
                }else {
                    return el
                }
            })
        case "REMOVE_POLL":
            return state.filter(el => {
                return el.id !== action.id
            })
        case "UP_A_VOTE":
            return state.map(el => {
                if (el.id === Number(action.pollId)){
                    return {
                        ...el,
                        options: {
                            ...el.options,
                            [action.optionId]: {
                                ...el.options[action.optionId],
                                votes: el.options[action.optionId].votes + 1
                            }

                        }
                    }
                }else {
                    return el
                }
            })
        case "LOGOUT":
            return []
        default :
            return state
    }
}
