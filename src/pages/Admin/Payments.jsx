import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../provider/ThemeContext";
import { motion } from "framer-motion";

const AdminPayments = () => {
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
        axios.get("http://localhost:5000/admin/payments"),
        axios.get("http://localhost:5000/admin/payments/summary"),
      ]);

      setPayments(paysRes.data || []);
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
      className={`p-6 md:p-10 transition ${
        dark ? "bg-[#0b0b0c] text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Payments</h1>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className={`rounded-xl p-6 border shadow ${
              dark
                ? "bg-[#131314] border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <p className="text-lg font-semibold mb-1">Total Premium Revenue</p>
            <p className="text-3xl font-bold text-yellow-400">
              {summary.totalRevenue} BDT
            </p>
          </div>

          <div
            className={`rounded-xl p-6 border shadow ${
              dark
                ? "bg-[#131314] border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <p className="text-lg font-semibold mb-1">Premium Users</p>
            <p className="text-3xl font-bold text-green-400">
              {summary.premiumUsers}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Payments Table */}
      <div
        className={`rounded-xl border shadow overflow-x-auto ${
          dark
            ? "bg-[#131314] border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <table
          className={`table ${
            dark ? "text-gray-200 [&_tr:hover]:!bg-[#1a1a1c]" : ""
          }`}
        >
          <thead
            className={`uppercase text-sm ${
              dark ? "bg-[#19191a] text-gray-400" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th>Email</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => (
              <tr key={pay._id}>
                <td>{pay.email}</td>
                <td className="capitalize font-semibold">{pay.type}</td>
                <td className="font-medium">{pay.amount} BDT</td>
                <td>{pay.method}</td>
                <td>
                  {new Date(pay.date).toLocaleDateString("en-GB")}{" "}
                  {new Date(pay.date).toLocaleTimeString()}
                </td>
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
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 opacity-60">
                  No payments yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
