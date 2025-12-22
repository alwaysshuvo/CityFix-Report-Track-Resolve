import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeContext";
import { motion } from "framer-motion";
import { FaCoins, FaUsers } from "react-icons/fa";

const Payments = () => {
  const { dark } = useContext(ThemeContext);

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    premiumUsers: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [paysRes, summaryRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE}/admin/payments`),
        axios.get(`${import.meta.env.VITE_API_BASE}/admin/payments/summary`),
      ]);

      const list = Array.isArray(paysRes.data)
        ? paysRes.data
        : paysRes.data?.payments || [];

      setPayments(list);
      setSummary(summaryRes.data || {});
    } catch (err) {
      console.log("Payment Load Error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      className={`p-6 md:p-10 transition-all min-h-screen ${
        dark ? "bg-[#0e0e0f] text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          💳 Payments Overview
        </h1>

        <div className="grid sm:grid-cols-2 gap-4">
          <div
            className={`rounded-xl p-6 border shadow flex flex-col gap-1 ${
              dark ? "bg-[#171718] border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            <span className="text-lg font-semibold flex items-center gap-2">
              <FaCoins /> Total Revenue
            </span>
            <span className="text-3xl font-bold text-yellow-400">
              ৳{summary.totalRevenue?.toLocaleString() || 0}
            </span>
          </div>

          <div
            className={`rounded-xl p-6 border shadow flex flex-col gap-1 ${
              dark ? "bg-[#171718] border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            <span className="text-lg font-semibold flex items-center gap-2">
              <FaUsers /> Premium Users
            </span>
            <span className="text-3xl font-bold text-green-400">
              {summary.premiumUsers || 0}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <div
        className={`rounded-xl border shadow overflow-x-auto ${
          dark ? "bg-[#181819] border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <table
          className={`table w-full text-sm ${
            dark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          <thead
            className={`uppercase text-xs ${
              dark ? "bg-[#202022] text-gray-400" : "bg-gray-200 text-gray-600"
            }`}
          >
            <tr>
              <th>Email</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => {
              const ts = new Date(pay.date);
              const formattedDate =
                ts.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }) +
                ", " +
                ts.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

              return (
                <tr
                  key={pay._id}
                  className={`${
                    dark ? "hover:bg-[#222224]" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="max-w-[200px] truncate">{pay.email}</td>
                  <td className="font-semibold">৳{pay.amount}</td>
                  <td className="capitalize">{pay.method}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        pay.status === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {payments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 opacity-60">
                  No payments yet 💤
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
