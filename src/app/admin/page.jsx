"use client";
import { useState, useEffect } from "react";
import DataGrid from "@/components/DataGrid";
import Header from "@/components/Header";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import getUsers from "@/api/admin/getUsers";
import deleteUser from "@/api/admin/deleteUser";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const Page = () => {
	const [refresh, setRefresh] = useState(false);
	const columns = [
		{ field: "id", headerName: "ID", width: "5%", center: true },
		{ field: "nom", headerName: "Nom", width: "13%" },
		{ field: "prenom", headerName: "Prenom", width: "13%" },
		{ field: "username", headerName: "Username", width: "13%" },
		{ field: "password", headerName: "Password", width: "13%" },
		{
			field: "type",
			headerName: "Account Type",
			width: "13%",
			center: true,
		},
		{
			field: "structure",
			headerName: "Structure",
			width: "13%",
			center: true,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: "10%",
			center: true,
			actions: [
				{
					type: "edit",
					icon: faPen,
					onClick: (index) => onClickEdit(index),
				},
				{
					type: "delete",
					icon: faTrash,
					onClick: (index) => onClickDelete(index),
				},
			],
		},
	];
	const [availableUsernames, setAvailableUsernames] = useState([]);
	const [etat, setEtat] = useState(null);
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState(null);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getUsers().then((res) => {
			if ( res.status ){
				let temp = []
				let temp2 = []
				res.data.forEach((elt)=>{
					temp.push({...elt, id: temp.length+1})
					temp2.push(elt.username)
				})
				setUsers(temp);
				setAvailableUsernames(temp2);
			} else alert("Error: " + res.error);
		});
	}, [refresh]);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const onClickEdit = (index) => {
		let temp = availableUsernames.filter((elt) => elt !== users[index].username);
		setAvailableUsernames(temp);
		setCurrent(users[index]);
		setEtat("edit");
		handleOpen();
		console.log("edit " + index);
	};
	const onClickDelete = async (index) => {
		if ( users[index].deletable){
			await deleteUser(users[index].username).then((res) => {
				if (res.status) {
					alert("User deleted successfully");
					setRefresh(!refresh);
				} else alert("Error: " + res.error);
			});
		}else{
			alert("You can't delete this user")
		}
	};
	const onClickAddUser = () => {
		setEtat("add");
		handleOpen();
	};
	return (
		<div className=" bg-background h-screen flex flex-col">
			<Header />
			<div className=" h-[90%] flex flex-col items-center pt-4">
				<div className=" w-[95%] h-[70%] flex flex-col gap-4 ">
					<h1 className=" text-2xl font-bold">Current users :</h1>
					<div className=" max-h-[90%] w-full">
						<DataGrid columns={columns} data={users} />
					</div>
				</div>
				<div className=" w-full h-[30%] flex justify-center">
					<div className=" w-[20%] pt-6">
						<Button text="Add User" onClick={onClickAddUser} />
						{etat === "add" ? (
							<div
								style={{ display: open ? "flex" : "none" }}
								className=" absolute top-0 left-0 w-screen h-screen bg-white bg-opacity-50 justify-center items-center"
							>
								<div className=" relative w-[50%] h-[60%] bg-background rounded-3xl flex flex-col items-center py-6 gap-6">
									<AddUser
										availableUsernames={availableUsernames}
										handleClose={() => {
											handleClose();
											setEtat(null);
											setRefresh(!refresh);
										}}
									/>
								</div>
							</div>
						) : etat === "edit" ? (
							<div style={{ display: open ? "flex" : "none" }} className=" absolute top-0 left-0 w-screen h-screen bg-white bg-opacity-50 justify-center items-center">
								<div className=" relative w-[50%] h-[60%] bg-background rounded-3xl flex flex-col items-center py-6 gap-6">
									<EditUser
										availableUsernames={availableUsernames}
										user={current}
										handleClose={() => {
											handleClose();
											setEtat(null);
											setCurrent(null);
											setRefresh(!refresh);
										}}
									/>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
