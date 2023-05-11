import React, {useContext, useState}  from "react";
import Authcontext from "../../../store/Authcontext";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { BsPatchCheckFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import TextInput from "../../form/Textinput";

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}
const SigninForm = () => {
    const { register, handleSubmit, formState } = useForm();
    const navigate = useNavigate();
    const authcontext = useContext(Authcontext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState([]);

    const submitHandler = async (formData) => {
        try{
            const response = await fetch('https://supsys.azurewebsites.net/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
            authcontext.login(responseData.jwt, responseData.userId);
            localStorage.setItem('token', responseData.jwt);
            localStorage.setItem('userId', responseData.userId);
            setSuccess(true);
            setSuccessMessage(responseData.message + "! You are going to be redirected to the my tickets page.");
            await timeout(500);
            navigate('/mytickets');
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div className="justify-evenly flex flex-col">
            {error && (
                <Alert color="failure" icon={HiInformationCircle} rounded={true} onDismiss={true} withBorderAccent={true}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert
                    color="success"
                    icon={BsPatchCheckFill}
                >
                    {successMessage}
                </Alert>
            )}
            <h5 className="text-lg justify-center text-center text-white py-9" style={{
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                fontSize: '30px',
            }}>Please submit your account info</h5>
            <form className="flex flex-col p-10 gap-5 bg-gray-800 h-fit" onSubmit={handleSubmit(submitHandler)} style={
                {
                    borderRadius: "40px"
                }
            }>
                <TextInput
                    label="email"
                    type="email"
                    placeholder="Enter your email address..."
                    register={register}
                    validation={{ required: true }}
                />
                {formState.errors.email && <p className="text-red-400 font-bold">Email is required</p>}

                <TextInput
                    label="password"
                    type="password"
                    placeholder="Enter your password..."
                    register={register}
                    validation={{ required: true }}
                />
                {formState.errors.password && <p className="text-red-500 font-bold">Password is required</p>}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign In
                </button>
            </form>
            <p className="text-2x text-white font-bold text-center"> To register <a href="/signup" className="text-bold text-white underline hover:text-blue-300 italic">Click here</a></p>
        </div>
    );
};

export default SigninForm;