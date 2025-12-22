import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ThemeContext } from "../provider/ThemeContext";

const PaymentSuccess = () => {
  const { dark } = useContext(ThemeContext);
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
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/checkout-session/${sessionId}`
        );
        const session = res.data;

        if (session.payment_status !== "paid") {
          Swal.fire("Payment Failed", "Payment not completed!", "error");
          navigate("/dashboard/profile");
          return;
        }

        await axios.post(`${import.meta.env.VITE_API_BASE}/payment/success`, {
          email: session.customer_email,
          session_id: sessionId,
        });

        setPayment({
          session_id: sessionId,
          email: session.customer_email,
          amount: 1000,
          currency: "BDT",
          date: new Date().toLocaleString(),
        });

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
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-6 transition ${
        dark ? "bg-[#0B0B0B] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <CheckCircle
          size={80}
          className={dark ? "text-green-400" : "text-green-600"}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl font-extrabold mb-8 text-center ${
          dark ? "text-green-400" : "text-green-600"
        }`}
      >
        Payment Successful!
      </motion.h1>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`rounded-2xl border shadow-lg p-6 w-full max-w-lg backdrop-blur-md ${
          dark
            ? "bg-[#111]/80 border-[#222]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="space-y-2 font-medium text-sm">
          <p>
            <span className="font-semibold opacity-70">Transaction ID:</span>{" "}
            {payment.session_id}
          </p>
          <p>
            <span className="font-semibold opacity-70">Email:</span>{" "}
            {payment.email}
          </p>
          <p>
            <span className="font-semibold opacity-70">Amount:</span>{" "}
            {payment.amount} {payment.currency}
          </p>
          <p>
            <span className="font-semibold opacity-70">Time:</span>{" "}
            {payment.date}
          </p>
        </div>

        <button
          className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
            dark
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          onClick={() => navigate("/dashboard/profile")}
        >
          Go to Profile
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
