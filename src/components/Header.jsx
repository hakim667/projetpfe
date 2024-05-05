import Image from "next/image";
import React from "react";
import Logo from "../../public/Logo.png";
import { useState, useEffect } from "react";
import roleCookies from "@/api/cookies/role";
import { useRouter } from "next/navigation";

const Header = () => {
	const router = useRouter();
	const [role, setRole] = useState("");
	const options = {
		"":[],
		admin:[{
			name:"Edit Users",
			link:"/admin"
		}],
		agent:[
			{
				name:"Create Decision",
				link:"/create-decision"
			},
			{
				name:"My Decisions",
				link:"/my-decisions"
			},
			{
				name:"Consult Decisions",
				link:"/consult-decisions"
			}
		],
		signatorie:[
			{
				name:"Create Decision",
				link:"/create-decision"
			},
			{
				name:"My Decisions",
				link:"/my-decisions"
			},
			{
				name:"Consult Decisions",
				link:"/consult-decisions"
			},
			{
				name:"Validate Decisions",
				link:"/validate-decisions"
			}
		]
	}
	useEffect(() => {
		setRole(roleCookies.get());
	}, []);
	const onClickLogo = () => {
		router.push("/");
	}
	return (
		<div className=" w-full flex flex-row h-[10%] bg-primary justify-between pl-2 pr-8">
			<div className=" h-full aspect-square flex justify-center items-center">
				<Image
					onClick={onClickLogo}
					src={Logo}
					className=" cursor-pointer aspect-square h-3/4 w-3/4"
					alt="Logo"
				/>
			</div>
			<div className=" flex flex-row gap-4">
				{
					options[role].map((option, index) => {
						return (
							<a key={index} href={option["link"]} className=" h-full flex justify-center items-center text-white font-bold">
								{option["name"]}
							</a>
						);
					})
				}
			</div>
		</div>
	);
};

export default Header;
