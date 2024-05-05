import { db } from "../../firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

const login = async ( username, password ) => {
    return await getDocs(collection(db, 'users')).then((snapshot) => {
        let data = []
        snapshot.forEach((doc) => {
            data.push(doc.data())
        })
        return data
    }).then((data) => {
        let user = data.find((user) => user.username === username)
        if (user){
            if (user.password !== password){
                return {
                    status:false,
                    message:'Password is incorrect'
                }
            }
            return {
                status:true,
                data:user
            }
        } else {
            return {
                status:false,
                message:'User not found'
            }
        }
    }).catch((error) => {
        return {
            status:false,
            message:error
        }
    })
}

export default login