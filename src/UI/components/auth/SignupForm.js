import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextInput from "../../form/Textinput";
import FormInputError from "../../form/FormInputError";
import { Alert } from "flowbite-react";

const SignUpForm = () => {
    const [ error, setError ] = useState(null);
    const { register, handleSubmit, formState } = useForm();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const submitHandler = async (formData) => {
        try{
            const response = await fetch('https://supsys.azurewebsites.net/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.error) || Error(responseData.message);
            }
            setSuccess(true);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Something went wrong, please try again.');
        }
    };
    return (
    <div>
        {error && <FormInputError>{error}</FormInputError>}
        {success && (
            <Alert 
                color="success"
            >
                Account created successfully!, You are going to be redirected to the login page.
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
                    {formState.errors.email && (
                        <FormInputError>
                        Please enter a valid Email address
                        </FormInputError>
                    )}
                    <TextInput
                        label="password"
                        type="password"
                        placeholder="Enter your password..."
                        register={register}
                        validation={{ required: true }}
                    />
                    {formState.errors.password && (
                        <FormInputError>
                            Please enter a valid password
                        </FormInputError>
                    )}
                    <TextInput
                        label="name"
                        type="text"
                        placeholder="Enter your full name..."
                        register={register}
                        validation={{ required: true }}
                    />
                    {formState.errors.name && (
                        <FormInputError>
                            Please enter a valid name
                        </FormInputError>
                    )}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded bg-center"
                >
                    Sign Up
                </button>
            </form>
            <p className="text-2x text-slate-50 font-bold text-center">Have an account already? <a href="/login" className="text-bold text-white underline hover:text-blue-300 italic">Login now</a></p>
        </div>
    );
};

export default SignUpForm;