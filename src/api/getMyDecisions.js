import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import usernameCookies from "./cookies/username";

const getMyDecisions = async () => {
    const username = usernameCookies.get();
    return await getDocs(collection(db, "decisions")).then(res => {
        let temp = []
        if ( res ) res.forEach(doc => {
            temp.push(doc.data());
        });
        return temp;
    }).then(res => {
        return res.filter(decision => decision.username === username);
    })
}

export default getMyDecisions