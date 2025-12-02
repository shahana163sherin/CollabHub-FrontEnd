import { useState } from "react";
import { loginApi } from "../../Api/authApi";
import { showError, showSuccess } from "../../Components/UI/Toast";
import { useNavigate } from "react-router-dom";
import  {jwtDecode}  from "jwt-decode";

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
      const token=res.data.accessToken;
      const decoded=jwtDecode(token);
      localStorage.setItem("accessToken",token);
      localStorage.setItem("role",decoded.role);
      // localStorage.setItem("user",JSON.stringify(res.user));
      localStorage.setItem("userId",decoded.nameid);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-7 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="md:col-span-2 flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((s) => !s)}
            />
            <span className="text-gray-700 text-sm">Show Password</span>
          </div>

        {/* Submit */}
        <button
          disabled={loading}
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-medium transition 
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Forgot password */}
        <p className="text-center mt-4">
          <a href="/forgot_password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
}
