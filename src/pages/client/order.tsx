import Payment from "@/components/client/order/payment";
import { Steps } from "antd";
import OrderDetail from "components/client/order";
import { useState } from "react";

const OrderPage = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    return (
        <>
            <div style={{ background: "#efefef", padding: "20px 0" }}>
                <div
                    className="order-container"
                    style={{ maxWidth: 1440, margin: "0 auto" }}
                >
                    <div className="order-steps">
                        <Steps
                            size="small"
                            current={currentStep}
                            items={[
                                {
                                    title: "Đơn hàng",
                                },
                                {
                                    title: "Đặt hàng",
                                },
                                {
                                    title: "Thanh toán",
                                },
                            ]}
                        />
                    </div>
                    {currentStep === 0 && (
                        <OrderDetail setCurrentStep={setCurrentStep} />
                    )}
                    {currentStep === 1 && (
                        <Payment setCurrentStep={setCurrentStep} />
                    )}
                </div>
            </div>
        </>
    );
};
export default OrderPage;
