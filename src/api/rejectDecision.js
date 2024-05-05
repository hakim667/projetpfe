import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const rejectDecision = async (decision) => {
	let temp = {...decision};
	delete temp.id;
	if ( decision.score ){
		if ( decision.score === -1 ){
			return await setDoc(doc(db, "decisions", decision.id), {
				...temp,
				etat:"Rejected"
			}).then(() => {
				return {
					status:true,
					message:"Decision rejected successfully"
				}
			}).catch((error) => {
				return {
					status:false,
					error:error
				}
			});
		}else{
			temp.score -= 1;
			return await setDoc(doc(db, "decisions", decision.id), {
				...temp
			}).then(() => {
				return {
					status:true,
					message:"Decision rejected successfully, waiting for another signatorie"
				}
			}).catch((error) => {
				return {
					status:false,
					error:error
				}
			});
		}
	}else{
		temp.score = -1;
		return await setDoc(doc(db, "decisions", decision.id), {
			...temp
		}).then(() => {
			return {
				status:true,
				message:"Decision rejected successfully, waiting for another signatorie"
			}
		}).catch((error) => {
			return {
				status:false,
				error:error
			}
		});
	}
};

export default rejectDecision;
