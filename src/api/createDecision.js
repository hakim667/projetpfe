import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import usernameCookies from "./cookies/username";
import roleCookies from "./cookies/role";
import structureCookies from "./cookies/structure";

const createDecision = async (type, classificationCode, referenceCode, expectedOutcome, articles, subject, content) => {
	const username = usernameCookies.get()
    const userType = roleCookies.get()
    const structure = structureCookies.get()
    return await addDoc(collection(db,"decisions"),{
        type,
        classificationCode,
        referenceCode,
        expectedOutcome,
        articles,
        subject,
        content,
        username,
        userType,
        structure,
        etat: "In validation"
    }).then(res=>{
        return {
            status: true,
            message: "Decision created successfully"
        }
    }).catch(err=>{
        return {
            status: true,
            message: err
        }
    });
};

export default createDecision;
