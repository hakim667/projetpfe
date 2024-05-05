const Input = ({ value, setValue, numeric, password, placeholder }) => {
	return (
		<input
			placeholder={placeholder}
			type={numeric ? "number" : password ? "password" : "text"}
			value={value}
			onChange={(event) => setValue(event.target.value)}
			className=" bg-white text-base md:text-xl w-full rounded-2xl px-3 py-2"
		/>
	);
};

export default Input;
