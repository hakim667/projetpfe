'use client';
import Header from "@/components/Header";
import usernameCookies from "@/api/cookies/username";
import roleCookies from "@/api/cookies/role";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter()
	const [username, setUsername] = useState(null)
	const [role, setRole] = useState("")
	useEffect(() => {
		setRole(roleCookies.get())
		setUsername(usernameCookies.get()?.split(".").join(" "))
		if ( roleCookies.get() === "" || usernameCookies.get()?.split(".").join(" ") === ""){
			router.replace('/login')
		}
	},[])
	const options = {
		"":[],
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
				name:"Consult All Decisions",
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
				name:"Consult All Decisions",
				link:"/consult-decisions"
			},
			{
				name:"Validate Decisions",
				link:"/validate-decisions"
			}
		],
		admin:[
			{
				name:"Edit Users",
				link:"/admin"
			}
		
		]
	}
	return (
		<main className="h-screen">
			<Header />
			<div className="flex justify-center items-center h-[90%] bg-background">
				<div className=" w-[95%] h-full flex flex-col gap-4 pt-4	">
					<h1 className=" w-full text-3xl font-bold">Welcome {username}</h1>
					<div className=" w-full flex flex-row gap-4 justify-center">
						{
							options[role].map((option, index) => {
								return (
									<div key={index} className=" w-64 h-12 flex justify-center items-center bg-primary rounded-2xl shadow-lg text-white">
										<a href={option.link} className=" w-full h-full flex justify-center items-center">
											<p className=" text-xl font-bold">{option.name}</p>
										</a>
									</div>
								)
							}
							)
						}
					</div>
				</div>
			</div>
		</main>
	);
}