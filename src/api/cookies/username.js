import Cookies from 'js-cookie';

const usernameCookies = {
    get: ()=>getCookies(),
    set: (username)=>setCookies(username),
    remove: ()=>removeCookies()
}

const getCookies = () => {
    try{
        return JSON.parse(Cookies.get("username"));
    } catch (e) {
        return "";
    }
}

const setCookies = (email) => {
    Cookies.set("username", JSON.stringify(email), { expires: 1 });
}
const removeCookies = () => {
    Cookies.remove("username");
}

export default usernameCookies;