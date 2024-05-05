import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import deleteUser from "./deleteUser";

const editUserInfo = async (nom, prenom, username, password, type, structure, deletable) => {
    let tempUsername = nom + '.'+ prenom;
    if ( tempUsername  === username ){
        return await setDoc(doc(db, "users", username), {
            nom: nom,
            prenom: prenom,
            username: username,
            password: password,
            type: type,
            structure: structure,
            deletable: deletable,
        }).then(() => {
            return {
                status: true,
            };
        }).catch((err) => {
            return {
                status: false,
                error: err,
            };
        });
    } else {
        console.log(2);
        return await deleteUser(username).then(async (res) => {
            if ( res.status ){
                return await setDoc(doc(db, "users", tempUsername), {
                    nom: nom,
                    prenom: prenom,
                    username: tempUsername,
                    password: password,
                    structure: structure,
                    type: type,
                    deletable: deletable,
                }).then(() => {
                    return {
                        status: true,
                    };
                }).catch((err) => {
                    return {
                        status: false,
                        error: err,
                    };
                });
            }else{
                return res;
            }
        }).catch((err) => {
            return {
                status: false,
                error: err,
            };
        });
    }
};

export default editUserInfo;
