"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import getDescisionsToValidate from "@/api/getDescisionsToValidate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import validateDecision from "@/api/validateDecision";
import rejectDecision from "@/api/rejectDecision";
import DecisionDetails from "@/components/DecisionDetails";

const Page = () => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState([null, null]);
    const [current, setCurrent] = useState(null);
    const [decisions, setDecisions] = useState([]);
    useEffect(() => {
        getDescisionsToValidate().then(res => {
            setDecisions(res);
        });
    }, [refresh]);
    const onClickValidate = async (index) => {
        setLoading([index,'validate']);
        await validateDecision(decisions[index]).then(res => {
            if ( res.status ) {
                alert(res.message);
            } else {
                alert(res.error);
            }
        }).finally(() => {
            setRefresh(!refresh);
            setLoading([null,null]);
        });
    }
    const onClickReject = async (index) => {
        setLoading([index,'reject']);
        await rejectDecision(decisions[index]).then(res => {
            if ( res.status ) {
                alert(res.message);
            } else {
                alert(res.error);
            }
        }).finally(() => {
            setRefresh(!refresh);
            setLoading([null,null]);
        });
    }
    const getArrayData = (decision) => {
        let temp = [];
        temp.push({
            title: "Structure",
            detail: decision.structure
        })
        temp.push({
            title: "User Role",
            detail: decision.type
        })
        temp.push({
            title: "Classification Code",
            detail: decision.classificationCode
        })
        temp.push({
            title: "Subject",
            detail: decision.subject
        })
        temp.push({
            title: "Articles",
            detail: decision.articles
        })
        temp.push({
            title: "Expected Outcome",
            detail: decision.expectedOutcome
        })
        temp.push({
            title: "Content",
            detail: decision.content
        })
        return temp;        
    }
    const handleClickInfo = (index) => {
        setCurrent(index);
    }
    const handleClose = (index) => {
        setCurrent(null);
    }
    return (
		<div className=" bg-background h-screen flex flex-col">
			<Header />
			<div className=" h-[90%] flex flex-col items-center pt-4">
				<div className=" w-[95%] h-[70%] flex flex-col gap-4 ">
					<h1 className=" text-2xl font-bold">Consult decisions :</h1>
					<div className=" max-h-[90%] w-full flex flex-col">
		                <div className=" w-full h-full flex flex-col border border-black">
                            <div className=" flex flex-row p-1 bg-white font-bold text-base justify-around">
                                <p className=" w-[23%] text-center">User</p>
                                <div className=" w-[1px] h-full bg-black"></div>
                                <p className=" w-[23%] text-center">Reference Code</p>
                                <div className=" w-[1px] h-full bg-black"></div>
                                <p className=" w-[23%] text-center">Type</p>
                                <div className=" w-[1px] h-full bg-black"></div>
                                <p className=" w-[23%] text-center">Action</p>
                                <div className=" w-[1px] h-full bg-black"></div>
                                <p className=" w-[6%]"></p>
                            </div>
                            {
                                decisions.map((decision, index) =>{
                                    return (
                                        <div key={index} className={` flex flex-row p-1 font-bold text-base ${index%2 === 0?" bg-background bg-opacity-50":"bg-white"} justify-around`}>
                                            <p className=" w-[23%] p-1 break-words">{decision.username.split(".").join(" ")}</p>
                                            <div className=" w-[1px] h-full bg-black"></div>
                                            <p className=" w-[23%] p-1 break-words">{decision.referenceCode}</p>
                                            <div className=" w-[1px] h-full bg-black"></div>
                                            <p className=" w-[23%] p-1 break-words">{decision.type}</p>
                                            <div className=" w-[1px] h-full bg-black"></div>
                                            <div className=" w-[23%] p-1 flex flex-row gap-4">
                                                <div className=" flex-1">
                                                    <Button
                                                        color="#8bc34a"
                                                        text="Validate"
                                                        onClick={()=>{onClickValidate(index)}}
                                                        loading={loading[0] === index && loading[1] === 'validate'}
                                                    />
                                                </div>
                                                <div className=" flex-1">
                                                    <Button
                                                        color="#c02942"
                                                        text="Reject"
                                                        onClick={()=>{onClickReject(index)}}
                                                        loading={loading[0] === index && loading[1] === 'reject'}
                                                    />
                                                </div>
                                            </div>
                                            <div className=" w-[1px] h-full bg-black"></div>
                                            <div className=" w-[6%] flex justify-center items-center">
                                                <FontAwesomeIcon icon={faCircleInfo} size="2x" className=" cursor-pointer p-1" onClick={()=>handleClickInfo(index)} />
                                                <DecisionDetails display={index === current} data={getArrayData(decision)} handleClose={handleClose} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
