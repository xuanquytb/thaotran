import React, { useRef, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../Store/Context/AuthContext";
import { OrderContext } from "../../../../Store/Context/OrderContext";

export default function Paypal({ dataInput }) {
    const [info, setInfo] = useState(dataInput);
    console.log(dataInput);
    const paypal = useRef();
    const history = useHistory();
    const {
        authState: { user },
    } = useContext(AuthContext);
    const {
        orderState: { orders },
        createOrderPayOnline,
    } = useContext(OrderContext);
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Order Thao Tran",
                                amount: {
                                    currency_code: "USD",
                                    value: (
                                        (info.sumMoney + 35000) /
                                        23000
                                    ).toFixed(2),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    const infoPayment = {
                        idCard: user[0].idCard,
                        idCustomer: user[0].id,
                        address: user[0].address,
                        sumPayment: info.sumMoney + 35000,
                        idPayment: info.idPayment,
                    };
                    await createOrderPayOnline(infoPayment);
                    history.push({
                        pathname: "/success",
                        state: { info: infoPayment },
                    });
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}
