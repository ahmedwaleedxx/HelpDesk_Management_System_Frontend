import { Textarea, Label,TextInput,Alert,Button } from "flowbite-react";
import React, {useState, useEffect, useContext} from "react";
import { useForm } from "react-hook-form";
import FormInputError from "../UI/form/FormInputError";
import { BsPatchCheckFill } from "react-icons/bs";
import Authcontext from "../store/Authcontext";
function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}
const CreateTicket = () => {
    const authcontext = useContext(Authcontext);
    const { register, handleSubmit, formState } = useForm();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState([]);
    const token = localStorage.getItem('token') || authcontext.token;
    const submitHandler = async (formData) => {
        try{
            const response = await fetch('https://supsys.azurewebsites.net/api/ticket/create', {
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
            setSuccessMessage(responseData.message + "! One of the support agents will contact with you shortly.");
            await timeout(1000);
        }
        catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        if(localStorage.getItem('token') === null){
            window.location.href = "/login";
        }
    }, []);

    return  (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width : "100%"
        }}>
             {error && <FormInputError>{error}</FormInputError>}
             {success && (
                <Alert
                color={success}
                icon={BsPatchCheckFill}
                className="bg-green-500 text-white mb-3"
                >
                {successMessage}
                </Alert>
            )}
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-2 bg-white" style={{
                    width: "500px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                }}>
                    <div className="mb-5 block">
                    <Label htmlFor="title" className="text-black font-bold">Title</Label>
                    </div>
                    <TextInput
                        id="title"
                        type="text"
                        placeholder="Title"
                        {...register("title", { required: true })}
                    />
                    {formState.errors.title && (
                        <FormInputError>
                            Title is required
                        </FormInputError>
                    )}
                    <div className="mb-2 block">
                    <Label htmlFor="description" className="text-black font-bold">Description</Label>
                    </div>
                    <Textarea
                        id="description"
                        type="text"
                        placeholder="Description"
                        {...register("description", { required: true })}
                        rows={5}
                    />
                    {formState.errors.description && (
                        <FormInputError>
                            Description is required
                            </FormInputError>
                        )}
                    <Button
                        type="submit"
                        >
                        Create Ticket
                    </Button>
                </div>
            </form>         
        </div>
    );
};

export default CreateTicket;
