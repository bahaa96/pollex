import { firebaseRef } from "../firebase/"

export let startAddPolls = ()=>{
    return (dispatch, getState) => {
        dispatch(toggleAreTodosLoading())

        firebaseRef.child("polls").on("value", snapshot => {
            let polls = snapshot.val()
            dispatch(addPolls(Object.keys(polls).map(key => {
                return {
                    ...polls[key],
                    id: key
                }
            })))
            dispatch(toggleAreTodosLoading())
        })

    }
}

export let addPolls = (polls)=> {
    return {
        type: "ADD_POLLS",
        polls
    }
}

export let addPoll = (poll)=>{
    return {
        type: "ADD_POLL",
        poll
    }
}

export let startAddPoll = (poll)=>{
    return (dispatch, getState) =>{
        let newPoll =firebaseRef.child("polls").push(poll)
        newPoll.then(()=>{
            dispatch(addPoll({
                ...poll,
                id: newPoll.key

            }))
        }).catch(e => e)
    }
}

export let updatePoll = (id, updates) =>{
    return {
        type: "UPDATE_POLL",
        id,
        updates
    }
}

export let startUpdatePoll = (id, updates)=>{
    firebaseRef.child(`polls/${id}`).update({
        ...updates
    }).then(()=> {
        dispatch(updatePoll(id, updates))
    }).catch(e => e)
}

export let upAVote = (pollId, optionId) =>{
    return {
        type: "UP_A_VOTE",
        pollId,
        optionId
    }
}

export let removePoll = (id) =>{
    return {
        type: "REMOVE_POLL",
        id
    }
}

export let startRemovePoll = (id)=>{
    return (dispatch, getState) =>{
        firebaseRef.child(`polls/${id}`).remove().then(()=> {
            dispatch(removePoll(id))
        }).catch(e => e)
    }
}

export let toggleAreTodosLoading = () =>{
    return {
        type: "TOGGLE_ARE_TODOS_LOADING"
    }
}

export let setSearchText = (text) => {
    return {
        type: "SET_SEARCH_TEXT",
        text
    }
}