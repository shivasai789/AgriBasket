import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import paymentProcessing from "../../assets/payment-app.gif"



function PaypalReturnPage() {

    const dispath = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    useEffect(() => {

        if (payerId && paymentId){
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))

            dispath(capturePayment({
                paymentId,
                payerId,
                orderId
            })).then(data => {
                if(data?.payload?.success){
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/shop/payment-success'
                }
            })
        }

    },[payerId,paymentId,dispath])

    console.log(payerId,paymentId,'paymentId');
    

    return ( 
        <div className="flex justify-center items-center min-h-screen">
            <div className="mt-20">
                    <img className="mx-auto" src={paymentProcessing} alt="paymentProcessing" height={250} width={250} />
                    <p>Proccessing Payment... Please wait</p>
        </div>
        </div>
     );
}

export default PaypalReturnPage;