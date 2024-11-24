
import { useNavigate } from "react-router-dom";
import paymentSuccess from "../../assets/verified.gif"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentSuccessPage() {
    const navigate = useNavigate()

    return ( 
        <div className="flex justify-center items-center min-h-screen" style={{
            boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)"
          }}>
            <div className="mt-20">
                    <img className="mx-auto" src={paymentSuccess} alt="paymentProcessing" height={250} width={300} />
                    <div className="flex justify-center">
                    <p>Payment Successfull !</p>
                    </div>
                    <div className="flex justify-center mt-4">
                    <Button className="mx-auto" onClick={() => navigate('/')} >Home</Button>
                    </div>
        </div>
        </div>
     );
}

export default PaymentSuccessPage;