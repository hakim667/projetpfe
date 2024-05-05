import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DataGrid = ({columns, data}) => {
	return (
		<div className=" w-full h-full flex flex-col border border-black">
			<div className=" flex flex-row p-1 justify-between bg-white">
				{
					columns.map((column, index) => {
						return (
							<>
								<h1 key={index} style={{width:column.width, textAlign:column.center?"center":null}} className=" font-bold text-base p-2">
									{column.headerName}
								</h1>
								{
									index !== (columns.length-1) &&
									<div key={index*2+1} className=" w-[1px] h-full bg-black">

									</div>
								}
							</>
						);
					})
				}
			</div>
			<div className=" w-full flex flex-col gap-2 overflow-y-scroll hide-scrollbar">
			{
				data.map((row, index) => {
					return (
						<div key={index} className={` w-full flex flex-row px-1 items-center justify-between ${index%2 === 0?" bg-background bg-opacity-50":"bg-white"}`}>
							{
								columns.map((column, index2) => {
									if ( column.field === "actions" ) return (
										<>
											<div key={index2} style={{width:column.width}} className=" flex flex-row justify-evenly">
												{
													column.actions.map((action, index3) => {
														return (
															<div key={index3}>
																<FontAwesomeIcon className=" cursor-pointer" color="#F48404" icon={action.icon} onClick={()=>{action.onClick(index)}} />
															</div>
														);
													
													})
												}
											</div>
											{
												index2 !== (columns.length-1) &&
												<div key={index2*2+1} className=" w-[1px] h-full bg-black">
			
												</div>
											}
										</>
									)
									else return (
									<>
										<p key={index} style={{width:column.width, textAlign:column.center?"center":null}} className=" p-2 break-words">
											{row[column.field]}
										</p>
										{
											index2 !== (columns.length-1) &&
											<div  key={index*2+1} className=" w-[1px] h-full bg-black"></div>
										}
									</>
									);
								})
							}
						</div>
					);
				})
			}
			</div>
		</div>
	);
};

export default DataGrid;
