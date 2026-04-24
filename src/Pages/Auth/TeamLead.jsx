import { useState } from "react";
import { RegisterLeaderApi } from "../../Api/authApi";
import { showSuccess, showError } from "../../Components/UI/Toast";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import Card from "../../Components/UI/Card";

export default function RegisterLeader() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    image: null,
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0] ?? null;
      if (file) {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(URL.createObjectURL(file));
      } else {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
      }

      setForm((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email.trim())) newErrors.email = "Enter a valid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.qualification.trim()) newErrors.qualification = "Qualification is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("Name", form.name);
      formData.append("Email", form.email);
      formData.append("Password", form.password);
      formData.append("Qualification", form.qualification);
      formData.append("ProfileImg", form.image);

      const res = await RegisterLeaderApi(formData);


      if (res?.isSuccess) {
        showSuccess(res.message || "Registered successfully");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          qualification: "",
          image: null,
        });
        if (preview) {
          URL.revokeObjectURL(preview);
          setPreview(null);
        }
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        setErrors({});
      } else {

        const msg = res?.message || "Registration failed";
        setErrors({ general: msg });
        showError(msg);
      }
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
          setErrors({ general: "Registration failed!" });
          showError("Registration failed!");
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10 animate-slideDown">
        <div className="flex flex-col items-center mb-8">
          <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent flex items-center gap-2 tracking-tight mb-2">
            <svg className="w-10 h-10 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            CollabHub
          </span>
          <p className="text-zinc-400">Join as a Team Leader and start managing projects.</p>
        </div>

        <Card hover={false} className="p-8 md:p-10 border-zinc-800/80">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="md:col-span-2 mb-4 text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-sm text-center">
                {errors.general}
              </div>
            )}

            <div>
              <Input
                type="text"
                name="name"
                label="Name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                error={errors.name}
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
              />
            </div>

            <div className="md:col-span-2">
              <Input
                type="text"
                name="qualification"
                label="Qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="Enter your qualification"
                error={errors.qualification}
              />
            </div>

            <div>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={errors.password}
              />
            </div>

            <div>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <label className="block text-zinc-300 text-sm font-medium mb-1.5 ml-1">Profile Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 transition-all cursor-pointer"
              />
              {errors.image && <p className="text-red-400 text-xs font-medium ml-1 flex items-center gap-1 mt-1.5"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.image}</p>}
              {preview && (
                <div className="mt-4 p-2 border border-zinc-800 rounded-xl inline-block bg-zinc-900/50">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex items-center justify-between mt-2 mb-4 border-b border-zinc-800/50 pb-6">
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
            </div>

            <div className="md:col-span-2 flex flex-col items-center">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full py-3.5 mb-6"
              >
                {loading ? "Registering..." : "Register Leader"}
              </Button>

              <div className="text-center text-zinc-400 text-sm">
                Already have an account? <a href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">Sign in</a>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
