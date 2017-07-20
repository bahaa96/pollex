import firebase, { firebaseRef, GithubProvider, FacebookProvider, TwitterProvider } from "../firebase/"
import { storeUser, removeCurrentUser, getCurrentUser, storePolls} from "LocalStorage"

export let startAddPolls = ()=>{
    return (dispatch, getState) => {
        dispatch(toggleArePollsLoading())
        let { uid } = getCurrentUser() || getState().auth
        return firebaseRef.child(`${ uid }/polls`).once("value").then(snapshot => {
            let polls = snapshot.val()
            if ( polls ) {
                polls = Object.keys(polls).map(key => {
                    return {
                        ...polls[key],
                        id: key
                    }
                })
                dispatch(addPolls(polls))
                storePolls(polls)
            }

            dispatch(toggleArePollsLoading())
        }).catch( e => e)

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
        let { uid } = getCurrentUser() || getState().auth
        let newPoll = firebaseRef.child(`${uid}/polls`).push(poll)
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

export let startUpdatePoll = (uid, id, updates)=>{
    return (dispatch, getState) => {
        firebaseRef.child(`${uid}/polls/${id}`).update({
            ...updates
        }).then(()=> {
            dispatch(updatePoll(id, updates))
        }).catch(e => e)
    }
}

export let startUpAVote = (uid, pollId, optionId, currentVotes) =>{
    return (dispatch, getState) => {
        firebaseRef.child(`${ uid }/polls/${ pollId }/options/${ optionId }`).update({
            votes: ++currentVotes
        })
        .then(() => {
            dispatch(upAVote(pollId, optionId))
        }).catch(e => e)
    }
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
        let { uid } = getCurrentUser() || getState().auth
        firebaseRef.child(`${uid}/polls/${id}`).remove().then(()=> {
            dispatch(removePoll(id))
            window.location.href = "/polls"
        }).catch(e => e)
    }
}

export let toggleArePollsLoading = () =>{
    return {
        type: "TOGGLE_ARE_POLLS_LOADING"
    }
}

export let setSearchText = (text) => {
    return {
        type: "SET_SEARCH_TEXT",
        text
    }
}

export let startLogin = (provider, redirectTo)=> {
    return (dispatch, getState) =>{
        switch (provider) {
            case "Facebook":
                return firebase.auth().signInWithPopup(FacebookProvider).then(res => {
                    dispatch(setCurrentUser(res.user))
                    storeUser(res.user)
                }).catch(e => console.log(e.message))
            case "Github":
                return firebase.auth().signInWithPopup(GithubProvider).then(res => {
                    dispatch(setCurrentUser(res.user))
                    storeUser(res.user)
                }).catch(e => console.log(e.message))
            case "Twitter":
                return firebase.auth().signInWithPopup(TwitterProvider).then(res => {
                    dispatch(setCurrentUser(res.user))
                    storeUser(res.user)
                }).catch(e => console.log(e.message))
        }
    }
}

export let startLogout = ()=> {
    return (dispatch, getState) =>{
        return firebase.auth().signOut().then(()=>{
            removeCurrentUser()
            dispatch(logout())
        }).catch(e => e)
    }
}


export let setSortOption = (option) => ({
    type: "SET_SORT_OPTION",
    option
})

export let setCurrentUser = ({ displayName, photoURL, uid }) => ({
    type: "SET_CURRENT_USER",
    user: { displayName, uid, photoURL }
})

export let logout = () => ({
    type: "LOGOUT"
})

