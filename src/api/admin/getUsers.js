import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const getUsers = async () => {
    return await getDocs(collection(db, "users")).then((querySnapshot) => {
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        });
        return {
            status: true,
            data: users,
        }
    }).catch((err) => {
        return {
            status: false,
            error: err,
        };
    });
}

export default getUsers