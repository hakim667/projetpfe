import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../firebaseConfig";

const deleteUser = async (username) => {
    return await deleteDoc(doc(db, "users", username)).then(() => {
        return {
            status: true,
        };
    }).catch((err) => {
        return {
            status: false,
            error: err,
        };
    })
}


export default deleteUser