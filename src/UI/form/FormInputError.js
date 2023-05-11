import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const FormInputError = (props) => {
    return (
        <Alert color="failure" icon={HiInformationCircle} className="mb-5">
            {props.children}
        </Alert>
    );
  };
  
  export default FormInputError;
  