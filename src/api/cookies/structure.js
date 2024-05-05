import Cookies from 'js-cookie';

const structureCookies = {
    get: ()=>getCookies(),
    set: (structure)=>setCookies(structure),
    remove: ()=>removeCookies()
}

const getCookies = () => {
    try{
        return JSON.parse(Cookies.get("structure"));
    } catch (e) {
        return "";
    }
}

const setCookies = (email) => {
    Cookies.set("structure", JSON.stringify(email), { expires: 1 });
}
const removeCookies = () => {
    Cookies.remove("structure");
}

export default structureCookies;