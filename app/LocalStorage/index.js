export let storeUser = ({ displayName, photoURL, uid }) => {
    try {
        let stringifiedUser = JSON.stringify({ displayName, photoURL, uid })
        localStorage.setItem("user", stringifiedUser)
    }catch (e) {}
}

export let getCurrentUser = () => {
    let storageUser;
    try {
        storageUser = localStorage.getItem("user")
    }catch (e) {}
    return JSON.parse(storageUser) || undefined
}

export let removeCurrentUser = () =>{
    try {
        localStorage.removeItem("user")
    }catch (e) {}
}
export let storePolls = (polls) => {
    try {
        let stringifiedPolls = JSON.stringify(polls)
        localStorage.setItem("polls", stringifiedPolls)
    }catch (e) {}
}

export let getPolls = () => {
    let storagePolls;
    try {
        storagePolls = localStorage.getItem("polls")
    }catch (e) {}
    return JSON.parse(storagePolls) || undefined
}

export let setVotes = (uid, pollId)=> {
    let votes = getVotes() || {}
    votes[uid] = {
        ...votes[uid],
        [pollId]: true
    }
    let votesString = JSON.stringify(votes)
    localStorage.setItem("votes", votesString)
}

export let getVotes = () => {
    try {
        return JSON.parse(localStorage.getItem("votes"))
    }catch(e) {

    }
}