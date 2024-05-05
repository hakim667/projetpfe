import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const DecisionDetails = ({display, data, handleClose}) => {
  return (
    <div style={{display:display?"flex":"none"}} className=' bg-white absolute top-0 left-0 w-screen h-screen justify-center items-center bg-opacity-50'>
        <div className=' relative bg-background w-[70%] h-[80%] flex flex-col rounded-3xl '>
            <div className=' w-full h-[10%] flex justify-center items-center'>
                <h1 className=' w-full text-center text-2xl font-bold'>Decision details</h1>
            </div>
            <FontAwesomeIcon
				icon={faX}
				className=" absolute top-4 right-4 cursor-pointer"
				size="2x"
				color="#CD0000"
				onClick={handleClose}
			/>
            <div className=' h-[90%] flex flex-col overflow-y-scroll items-center hide-scrollbar'>
                {
                    data.map((detail, index) => {
                        return (
                            <div key={index} className=' w-[90%]'>
                                <h1 className=' w-full text-xl underline font-normal'>{detail.title} :</h1>
                                <p className='  w-full indent-4'>{detail.detail}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default DecisionDetails