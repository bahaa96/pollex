import { firebaseRef } from "./index.js"

export default (uid, id) => {
    return firebaseRef.child(`${ uid }/polls/${ id }`).once("value")
}