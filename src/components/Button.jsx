import ClipLoader from "react-spinners/ClipLoader";

const Button = ({text, onClick, loading, color}) => {
    if ( loading ) {
        return <div style={{backgroundColor:color?color:null}} className=" bg-primary h-10 md:h-12 w-full text-base md:text-xl rounded-2xl font-bold py-2 flex justify-center">
            <ClipLoader
                size={30}
                cssOverride={{borderWidth:3}}
                color={"#fff"}
            />
        </div>
    }else{
        return <button style={{backgroundColor:color?color:null}} className=" bg-primary text-white h-10 md:h-12 w-full text-base md:text-xl rounded-2xl font-bold py-2" onClick={onClick}>
            {text}
        </button>;
    }
};

export default Button;
