// pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        const { data: session } = await axios.get(
          `http://localhost:5000/checkout-session/${sessionId}`
        );

        await axios.post("http://localhost:5000/payment/success", {
          email: session.customer_email,
          session_id: sessionId,
        });

        setLoading(false);

        // 🟢 redirect & refresh state
        setTimeout(() => navigate("/dashboard/profile"), 1500);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  return loading ? (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center text-white">
      <h1>Payment Done! Redirecting...</h1>
    </div>
  );
};

export default PaymentSuccess;
