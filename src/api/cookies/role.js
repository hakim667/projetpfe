import Cookies from 'js-cookie';

const roleCookies = {
    get: ()=>getCookies(),
    set: (role)=>setCookies(role),
    remove: ()=>removeCookies()
}

const getCookies = () => {
    try{
        return JSON.parse(Cookies.get("role"));
    } catch (e) {
        return "";
    }
}

const setCookies = (email) => {
    Cookies.set("role", JSON.stringify(email), { expires: 1 });
}
const removeCookies = () => {
    Cookies.remove("role");
}

export default roleCookies;