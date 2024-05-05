import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getDescisionsToValidate = async () => {
	return await getDocs(collection(db, "decisions")).then(res => {
        let temp = []
        if ( res ) res.forEach(doc => {
            temp.push({...doc.data(), id:doc.id});
        });
        return temp;
    }).then(res => {
        return res.filter(decision => decision.etat === "In validation");
    })
};

export default getDescisionsToValidate;
