import expect from "expect"
import configMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import firebase, { firebaseRef } from "../../firebase"

import * as actions from "actions"
import { polls } from "../base"

let createMockStore = configMockStore([ thunk ])

describe("Actions", ()=> {
    it("Should return ADD_POLLS", () => {
        expect(actions.addPolls(polls)).toEqual({
            type: "ADD_POLLS",
            polls
        })
    })
    it("Should return ADD_POLL", () => {
        expect(actions.addPoll(polls[0])).toEqual({
            type: "ADD_POLL",
            poll: polls[0]
        })
    })
    it("Should return UPDATE_POLL", ()=> {
        let id = 1
        let updates = {
            votes: 1,
            title: "Hello Hello "
        }
        expect(actions.updatePoll(id, updates)).toEqual({
            type: "UPDATE_POLL",
            id,
            updates
        })
    })
    it("Should return REMOVE_POLL", ()=> {
        let id = polls[0].id
        expect(actions.removePoll(id)).toEqual({
            type: "REMOVE_POLL",
            id
        })
    })
    it("Should return UP_A_VOTE", ()=> {
        let pollId = polls[0].id
        let optionId = Object.keys(polls[0].options)[0]
        expect(actions.upAVote(pollId, optionId)).toEqual({
            type: "UP_A_VOTE",
            pollId,
            optionId
        })
    })
    it("Should return TOGGLE_ARE_POLLS_LOADING", ()=> {
        expect(actions.toggleArePollsLoading()).toEqual({
            type: "TOGGLE_ARE_POLLS_LOADING"
        })
    })
    it("Should return SET_SEARCH_TEXT", ()=> {
        expect(actions.setSearchText("text")).toEqual({
            type: "SET_SEARCH_TEXT",
            text: "text"
        })
    })
    it("Should return SET_SORT_OPTION", ()=> {
        expect(actions.setSortOption("option")).toEqual({
            type: "SET_SORT_OPTION",
            option: "option"
        })
    })
    it("Should return LOGOUT", ()=>{
        expect(actions.logout()).toEqual({
            type: "LOGOUT"
        })
    })
    it("Should return SET_CURRENT_USER", ()=> {
        let user = {
            uid: 3251354,
            displayName: "geekbahaa",
            photoURL: "URL"
        }
        expect(actions.setCurrentUser(user)).toEqual({
            type: "SET_CURRENT_USER",
            user
        })
    })
    describe("Tests with firebase", () => {
        let uid, testPollRef, pollsRef

        beforeEach(done => {
            let credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN)
            firebase.auth().signInWithCredential(credential).then(user => {
                uid = user.uid
                pollsRef = firebaseRef.child(`${ uid }/polls`)

                return pollsRef.remove()
            }).then(() => {
                testPollRef = pollsRef.push()
                return testPollRef.set(polls[0])
            }).then(() => done()).catch(done)
        })

        afterEach(done => {
            return pollsRef.remove().then(() => done()).catch(() => done());
        })

        it("Should add Polls and dispatch ADD_POLLS", (done) => {
            let store = createMockStore({ auth : { uid } })
            return store.dispatch(actions.startAddPolls()).then(() => {
                // expect(store.getActions()[0]).toEqual({
                //     type: "TOGGLE_ARE_POLLS_LOADING"
                // })
                // expect(store.getActions()[1]).toInclude({
                //     type: "ADD_POLLS"
                // })
                expect(store.getActions()).toBe(3)
                // expect(store.getActions()[2]).toEqual({
                //     type: "TOGGLE_ARE_POLLS_LOADING"
                // })
            }).catch(done)


        })
    })


})