import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = params.get("session_id");

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      Swal.fire("Error", "Invalid Payment Session!", "error");
      navigate("/dashboard/profile");
      return;
    }

    const verifyPayment = async () => {
      try {
        // 1) Fetch Stripe Session
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/checkout-session/${sessionId}`
        );
        const session = res.data;

        if (session.payment_status !== "paid") {
          Swal.fire("Payment Failed", "Payment not completed!", "error");
          navigate("/dashboard/profile");
          return;
        }

        // 2) Store success in DB & get payment info back
        const store = await axios.post(
          `${import.meta.env.VITE_API_BASE}/payment/success`,
          {
            email: session.customer_email,
            session_id: sessionId,
          }
        );

        // save in state for showing UI
        setPayment({
          session_id: sessionId,
          email: session.customer_email,
          amount: 1000,
          currency: "BDT",
          date: new Date().toLocaleString(),
        });

        // 3) Make future profile refresh
        localStorage.setItem("refreshProfile", "true");

      } catch (err) {
        Swal.fire("Payment Error", "Could not verify payment!", "error");
        navigate("/dashboard/profile");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!payment) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 p-6">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>

      <div className="border p-6 rounded shadow w-full max-w-lg bg-white">
        <p><b>Transaction ID:</b> {payment.session_id}</p>
        <p><b>Email:</b> {payment.email}</p>
        <p>
          <b>Amount:</b> {payment.amount} {payment.currency}
        </p>
        <p><b>Time:</b> {payment.date}</p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/dashboard/profile")}
      >
        Go to Profile
      </button>
    </div>
  );
};

export default PaymentSuccess;
