import { useState } from "react";
import { loginApi } from "../../Api/authApi";
import { showError, showSuccess } from "../../Components/UI/Toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import Card from "../../Components/UI/Card";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.password.trim()) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await loginApi(form);
      const token = res.data.accessToken;
      console.log("Token:", token);
      const decoded = jwtDecode(token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", decoded.role);
      // localStorage.setItem("user",JSON.stringify(res.user));
      localStorage.setItem("userId", decoded.nameid);
      console.log(decoded);

      // ⭐ Backend error handling like RegisterLeader
      if (!res?.isSuccess) {
        if (res?.errors) {
          setErrors(res.errors);
        }
        showError(res.message || "Login failed");
        setLoading(false);
        return;
      }

      // ⭐ Success
      showSuccess(res.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setTimeout(() => {
        navigate("/leaderdashboard");
      }, 1500);


    } catch (err) {

      const resp = err?.response?.data;
      if (resp) {

        if (resp.errors) {
          const mapped = {};
          Object.keys(resp.errors).forEach((key) => {

            const normalized = key.charAt(0).toLowerCase() + key.slice(1);

            mapped[normalized] = Array.isArray(resp.errors[key])
              ? resp.errors[key][0]
              : resp.errors[key];
          });
          setErrors(mapped);
        } else if (resp.message) {

          setErrors({ general: resp.message });
          showError(resp.message);
        } else {
          setErrors({ general: "Login failed!" });
          showError("Login failed!");
        }
      } else {
        setErrors({ general: "Something went wrong. Check your network." });
        showError("Something went wrong. Check your network.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 px-4 py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-slideDown">
        <div className="flex flex-col items-center mb-8">
          {/* CollabHub SVG Logo */}
          <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent flex items-center gap-2 tracking-tight mb-2">
            <svg className="w-10 h-10 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            CollabHub
          </span>
          <p className="text-zinc-400">Welcome back! Please login to your account.</p>
        </div>

        <Card hover={false} className="p-8 md:p-10 border-zinc-800/80">
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-sm text-center">
                {errors.general}
              </div>
            )}
            {/* Email */}
            <div className="mb-5">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <input
                  id="showPassword"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((s) => !s)}
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-900/50 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-zinc-950"
                />
                <label htmlFor="showPassword" className="text-zinc-400 text-sm cursor-pointer select-none">
                  Show Password
                </label>
              </div>

              <a href="/forgot_password" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              disabled={loading}
              type="submit"
              variant="primary"
              className="w-full py-3.5"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Registration Links */}
            <div className="mt-8 text-center text-zinc-400 text-sm border-t border-zinc-800/50 pt-6">
              Don't have an account? <br className="sm:hidden" />
              <span className="inline-flex gap-3 sm:gap-2 mt-2">
                <a href="/registerLeader" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">Lead</a>
                <span className="text-zinc-600">|</span>
                <a href="/registerMember" className="font-semibold text-teal-400 hover:text-teal-300 transition-colors">Member</a>
              </span>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
