import CommonForm from "./../../components/common/form";
import { useState } from "react";
import { Link, } from "react-router-dom";
import {loginFormControls} from './../../config/index';
import { loginUserAction } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const initialState = {
    email: '',
    password: ''
}

function AuthLogin() {
    const [formData,setFormData] = useState(initialState)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const {toast} = useToast()

    function onSubmit(event) {
        event.preventDefault()
        dispatch(loginUserAction(formData)).then((data)=>{
            if(data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
            }
            else{
                toast({
                    variant: "destructive",
                    title: data?.payload?.message,
                })
            }
        })
    }

    return ( 
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                <p className="mt-2">Didn&apos;t have an account
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
                    Register
                    </Link>
                </p>
            </div>
            <CommonForm 
            formControls={loginFormControls}
            buttonText={'Sign In'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            />
        </div>
     );
}

export default AuthLogin;