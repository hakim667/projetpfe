import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import addUser from "@/api/admin/addUser";
import structures from "./structures";

const AddUser = ({ handleClose, availableUsernames }) => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("none");
    const [laStructure, setLaStructure] = useState(structures[0]);
	const [loading, setLoading] = useState(false);
	const handleAdd = async () => {
		if ( nom === "" || prenom === "" || password === "" || type === "none" || laStructure === "Choisissez la structure"){
			alert("Please fill all the fields");
			return;
		}
		let tempNom = nom.toLowerCase().trim()
		let tempPrenom = prenom.toLowerCase().trim()
		let username = tempNom + "." + tempPrenom;
		if ( availableUsernames.includes(username) ){
			alert("User with the same username already exists");
			return;
		}
		setLoading(true)
		await addUser(tempNom, tempPrenom, password, type, laStructure).then(res=>{
			if ( res.status ) {
				handleClose();
			} else {
				alert(res.error.message)
			}
		}).finally(()=>{
			setLoading(false)
		})
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
				Add New User
			</h1>
			<div className=" w-[90%] flex flex-col gap-4">
				<Input placeholder="Nom" value={nom} setValue={setNom} />
				<Input placeholder="Prenom" value={prenom} setValue={setPrenom} />
				<Input placeholder="Password" value={password} setValue={setPassword} />
				<select className=" w-full h-10 rounded-2xl text-xl pl-2" onChange={(e)=>setType(e.target.value)}>
					<option value="none">Agent or Signatorie</option>
					<option value="agent">Agent</option>
					<option value="signatorie">Signatorie</option>
				</select>
				<select className=" w-full h-10 rounded-2xl text-xl pl-2" onChange={(e)=>setLaStructure(e.target.value)}>
					{
						structures.map((structure, index) => (
							<option key={index} value={structure}>{structure}</option>
						))
					}
				</select>
			</div>
			<div className=" w-[40%]">
				<Button text="Add" loading={loading} onClick={handleAdd} />
			</div>
		</>
	);
};

export default AddUser;
