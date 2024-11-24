import { Outlet } from "react-router-dom";
import { Card } from "../ui/card";

function AuthLayout() {
    return ( 
        <div className="flex min-h-screen w-screen">
            <div className="hidden lg:flex justify-center items-center bg-black w-1/2">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Welcome to AgriBasket</h1>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8" style={{backgroundColor: '#e5e4f2'}}>
                <Card className="px-6 md:px-20 py-20 shadow-lg">
                <Outlet/>
                </Card>
            </div>
        </div>
     );
}

export default AuthLayout;
