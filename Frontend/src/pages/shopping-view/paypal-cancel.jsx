import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import paymentCancelled from "../../assets/credit-card.gif"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



function PaypalCancelPage() {
    const navigate = useNavigate()

    return ( 
        <div className="flex justify-center items-center min-h-screen shadow-lg">
            <div className="mt-20">
                    <img className="mx-auto" src={paymentCancelled} alt="paymentProcessing" height={250} width={300} />
                    <div className="flex justify-center">
                    <p>Payment Cancelled</p>
                    </div>
                    <div className="flex justify-center mt-4">
                    <Button className="mx-auto" onClick={() => navigate('/')} >Home</Button>
                    </div>
        </div>
        </div>
     );
}

export default PaypalCancelPage;