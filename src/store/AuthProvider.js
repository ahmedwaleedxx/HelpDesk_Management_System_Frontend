import AuthContext from './Authcontext.js';

import { useState } from 'react';

const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const authcontext = {
        token: token,
        userId: id,
        login: (token,userId) => {
            if(token === null){
                setToken(localStorage.getItem("token"));
                setId(localStorage.getItem("userId"));
            }
            setId(userId);
            setToken(token);
        },
        logout: () => {
            setToken(null);
            setId(null);
        }
    };
    return (
        <AuthContext.Provider value={authcontext}>
            {props.children}
        </AuthContext.Provider>
    )
    };

export default AuthProvider;