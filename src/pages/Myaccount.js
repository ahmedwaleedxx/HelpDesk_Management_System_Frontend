import React, {useContext,useState,useEffect} from 'react';
import { Alert,Tabs,TextInput,Label,Button } from 'flowbite-react';
import { BsPatchCheckFill } from 'react-icons/bs';
import {HiUserCircle,HiInformationCircle} from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import FormInputError from '../UI/form/FormInputError';
import Authcontext from '../store/Authcontext';
import { RiLockPasswordFill } from 'react-icons/ri';

const Myaccount = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState([]);
    const [user, setUser] = useState([]);
    const authcontext = useContext(Authcontext);
    const token = localStorage.getItem('token') || authcontext.token;
    const { register, handleSubmit, formState } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, formState: formState2 } = useForm();
    const submitHandler = async (formData) => {
        try{
            const response = await fetch('https://supsys.azurewebsites.net/api/user/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData)
            });
            const responseData = await response.json();
            if(!response.ok){
                if(responseData.error){
                throw new Error(responseData.error);
                }else{
                throw new Error(responseData.message);
                }
            }
            setSuccess(true);
            setSuccessMessage(responseData.message);
        }catch (err) {
            setError(err.message);
        }
    }
    const submitHandlerPassword = async (formData) => {
        try{
            const response = await fetch('https://supsys.azurewebsites.net/api/user/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData)
            });
            const responseData = await response.json();
            if(!response.ok){
                if(responseData.error){
                throw new Error(responseData.error);
                }else{
                throw new Error(responseData.message);
                }
            }
            setSuccess(true);
            setSuccessMessage(responseData.message);
        }catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token') === null){
            window.location.href = "/login";
        }
        const fetchUser = async () => {
            try{
                const response = await fetch('https://supsys.azurewebsites.net/api/user/getUser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                const responseData = await response.json();
                if(!response.ok){
                    if(responseData.error){
                    throw new Error(responseData.error);
                    }else{
                    throw new Error(responseData.message);
                    }
                }
                setUser(responseData);
            }catch (err) {
                setError(err.message);
            }
        }
        fetchUser();
    }, [token]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }} className="gap-2">
             {error && 
                <Alert color="failure" icon={HiInformationCircle} rounded={true} withBorderAccent={true}>
                             {error}
                </Alert>
             }
             {success && (
                <Alert
                color={success}
                icon={BsPatchCheckFill}
                className="bg-green-500 text-white"
                withBorderAccent={true}
                >
                {successMessage}
                </Alert>
            )}
            <div className="bg-white">
            <Tabs.Group>
                    <Tabs.Item 
                        title="Account"
                        icon={HiUserCircle}
                    >
                        <div className=" bg-white" style={{
                            display: "flex",
                            flexDirection: "column",
                            width : "100%",
                            padding: "40px",
                            gap: "20px"
                        }}>
                            <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="flex flex-col bg-white" style={{
                                    width: "500px",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                                    paddingLeft: "20px",
                                    paddingRight: "20px"
                                }}>
                                    <div className="mb-5 block">
                                        <Label htmlFor="name">Name</Label>
                                    </div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        defaultValue={user.name}
                                        {...register("name", { required: true })}
                                        className="mb-5"
                                    />
                                    {formState.errors.name && <FormInputError>New Name is required</FormInputError>}
                                    <div className="mb-5 block">
                                    <Label htmlFor="email">Email</Label>
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        defaultValue={user.email}
                                        {...register("email", { required: true })}
                                        className="mb-5"
                                    />
                                    {formState.errors.email && <FormInputError>New Email is required</FormInputError>}
                                    <Button
                                        type="submit"
                                        className="align-self-center"
                                        disabled={!formState.isValid}
                                    >
                                        Update
                                    </Button>
                                </div>
                                </form>
                        </div>
                    </Tabs.Item>
                    <Tabs.Item title="Password" icon={RiLockPasswordFill}>
                    <div className=" bg-white" style={{
                            display: "flex",
                            flexDirection: "column",
                            width : "100%",
                            padding: "40px",
                            gap: "20px"
                        }}>
                            <form onSubmit={handleSubmit2(submitHandlerPassword)}>
                            <div className="flex flex-col bg-white" style={{
                                    width: "500px",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                                    paddingLeft: "20px",
                                    paddingRight: "20px"
                                }}>
                                    <div className="mb-5 block">
                                        <Label htmlFor="password">New Password</Label>
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        placeholder="New Password"
                                        {...register2("password", { required: true })}
                                        className="mb-5"
                                    />
                                    {formState2.errors.password && <FormInputError>New Password is required</FormInputError>}
                                    <Button
                                        type="submit"
                                        className=""
                                        style={{
                                            width: "50%",
                                            marginLeft: "25%",
                                        }}
                                    >
                                        Update
                                    </Button>
                                </div>
                                </form>
                    </div>
                    </Tabs.Item>
            </Tabs.Group>
            </div>
        </div>
        

    );
        





};


export default Myaccount;