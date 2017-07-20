export let user  = {
    uid: 1234,
    displayName: 'geekbahaa',
    photoURL: "photoURL"
}

export let polls = [
    {
        id: 1,
        title: "Whats your favorite color ?",
        votes: 1,
        options: {
            1: {
                title: "cyan",
                votes: 0
            },
            2: {
                title: "Clay",
                votes: 1
            }
        },
        createdAt: 123
    },
    {
        id: 2,
        title: "Whats your favorite nickname ?",
        votes: 9,
        options: {
            1: {
                title: "cody",
                votes: 3
            },
            2: {
                title: "eddy",
                votes: 6
            }
        },
        createdAt: 123
    }
]