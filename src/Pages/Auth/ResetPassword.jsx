import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ResetPasswordApi } from "../../Api/authApi";
import { showError, showSuccess } from "../../Components/UI/Toast";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Minimum 6 characters";
    if (!form.confirmPassword) errs.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      const res = await ResetPasswordApi({ email, token, newPassword: form.password });
      if (res.isSuccess) {
        showSuccess("Password reset successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        showError(res.message);
      }
    } catch {
      showError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input
          type="password"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
