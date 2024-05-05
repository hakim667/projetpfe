import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const validateDecision = async (decision) => {
	let temp = {...decision};
	delete temp.id;
	if ( decision.score ){
		if ( decision.score === 1 ){
			return await setDoc(doc(db, "decisions", decision.id), {
				...temp,
				etat:"Validated"
			}).then(() => {
				return {
					status:true,
					message:"Decision validated successfully"
				}
			}).catch((error) => {
				return {
					status:false,
					error:error
				}
			});
		}else{
			temp.score += 1;
			return await setDoc(doc(db, "decisions", decision.id), {
				...temp
			}).then(() => {
				return {
					status:true,
					message:"Decision validated successfully, waiting for another signatorie"
				}
			}).catch((error) => {
				return {
					status:false,
					error:error
				}
			});
		}
	}else{
		temp.score = 1;
		return await setDoc(doc(db, "decisions", decision.id), {
			...temp
		}).then(() => {
			return {
				status:true,
				message:"Decision validated successfully, waiting for another signatorie"
			}
		}).catch((error) => {
			return {
				status:false,
				error:error
			}
		});
	}
};

export default validateDecision;
