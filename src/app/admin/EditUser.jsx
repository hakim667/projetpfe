import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import editUserInfo from "@/api/admin/editUserInfo";
import structures from "./structures";

const EditUser = ({ handleClose, user, availableUsernames }) => {
    const [nom, setNom] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [password, setPassword] = useState(user.password);
    const [type, setType] = useState(user.type);
    const [laStructure, setLaStructure] = useState(user.structure);
	const [loading, setLoading] = useState(false);
	const handleEdit = async () => {
		if ( nom === "" || prenom === "" || password === "" || type === "none" || laStructure === structures[0] ){
			alert("Please fill all the fields");
			return;
		}
		let tempNom = nom.toLowerCase().trim()
		let tempPrenom = prenom.toLowerCase().trim()
		if ( availableUsernames.includes(tempNom + "." + tempPrenom) ) {
			alert("User with the same username already exists");
			return;
		}
		setLoading(true);
		console.log(nom, prenom, user.nom +'.'+ user.prenom , password, type, laStructure, user.deletable);
		await editUserInfo(nom, prenom, user.nom +'.'+ user.prenom , password, type, laStructure, user.deletable).then((res) => {
			console.log(res);
			setLoading(false)
			if (res.status) {
				alert("User Edited Successfully");
			} else {
				alert("An error occured");
			}
		})
		handleClose();
	}
	return (
		<>
			<FontAwesomeIcon
				icon={faX}
				className=" absolute top-4 right-4 cursor-pointer"
				size="2x"
				color="#CD0000"
				onClick={handleClose}
			/>
			<h1 className=" w-full text-2xl font-bold text-center">
				Edit User
			</h1>
			<div className=" w-[90%] flex flex-col gap-4">
				<Input placeholder="Nom" value={nom} setValue={setNom} />
				<Input placeholder="Prenom" value={prenom} setValue={setPrenom} />
				<Input placeholder="Password" value={password} setValue={setPassword} />
				<select defaultValue={type} className=" w-full h-10 rounded-2xl text-xl pl-2" onChange={e=>setType(e.target.value)}>
					<option value="none">Agent or Signatorie</option>
					<option value="agent">Agent</option>
					<option value="signatorie">Signatorie</option>
				</select>
				<select defaultValue={laStructure} className=" w-full h-10 rounded-2xl text-xl pl-2" onChange={(e)=>setLaStructure(e.target.value)}>
					{
						structures.map((structure, index) => (
							<option key={index} value={structure}>{structure}</option>
						))
					}
				</select>
			</div>
			<div className=" w-[40%]">
				<Button text="Save" loading={loading} onClick={handleEdit} />
			</div>
		</>
	);
};

export default EditUser;
