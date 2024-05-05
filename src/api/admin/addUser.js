import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const addUser = async (nom, prenom, password, type, structure) => {
	let username = nom + "." + prenom;
	return await setDoc(doc(db, "users", username), {
		nom,
		prenom,
		username,
		password,
		type,
        structure,
        deletable: true,
	}).then(() => {
        return {
            status: true,
        };
    })
    .catch((err) => {
        return {
            status: false,
            error: err,
        };
    });
};

export default addUser;
