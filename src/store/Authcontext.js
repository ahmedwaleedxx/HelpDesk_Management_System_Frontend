import { createContext } from "react";

const Authcontext = createContext({
    token: '' || localStorage.getItem("token"),
    userId: '' || localStorage.getItem("userId"),
    login: (token,userId) => {},
    logout: () => {}
});

export default Authcontext;