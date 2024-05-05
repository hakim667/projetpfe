import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getDecisions = async () => {
	return await getDocs(collection(db, "decisions")).then(res => {
        let temp = []
        if ( res ) res.forEach(doc => {
            temp.push(doc.data());
        });
        return temp;
    }).then(res => {
        return res.filter(decision => decision.etat === "Validated");
    })
};

export default getDecisions;
