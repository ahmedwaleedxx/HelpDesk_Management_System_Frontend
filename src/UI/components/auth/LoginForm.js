import { useContenxt } from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/Authcontext';
import { Alert,TextInput,Button } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

const SignInForm = () => {
    const { register, handleSubmit, formState } = useForm();
    const authContxt = useContenxt(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (formData) => {
        try{
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const responseData = await response.json();

            if(!response.ok){
                throw new Error(responseData.message);
            }
            authContxt.login(responseData.userId, responseData.token, responseData.userType);
            navigate('/tickets');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <form 
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col justify-center items-center"
        >

            <TextInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                register={register}
                validation={{ required: true }}
            />
            {formState.errors.email && (
            <Alert color="failure" icon={HiInformationCircle}>Email is required</Alert>
            )}

            <TextInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                register={register}
                validation={{ required: true }}
            />
            {formState.errors.password && (
            <Alert color="failure" icon={HiInformationCircle}>Password is required</Alert>
            )}

            <Button
                type="submit"
                color="primary"
                className="w-1/2 mx-auto"
                disabled={!formState.isValid}
            >
                Sign In
            </Button>
        </form>
    );
};

export default SignInForm;