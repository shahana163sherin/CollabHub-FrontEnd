import { useState } from "react";
import { RegisterMemberApi } from "../../Api/authApi";
import { showSuccess, showError } from "../../Components/UI/Toast";
import { useNavigate } from "react-router-dom";

export default function RegisterMember() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
 const navigate=useNavigate();
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
      formData.append("ProfileImg", form.image);

      const res = await RegisterMemberApi(formData);

      
      if (res?.isSuccess) {
        showSuccess(res.message || "Registered successfully");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          image: null,
        });
        if (preview) {
          URL.revokeObjectURL(preview);
          setPreview(null);
        }
         setTimeout(()=>{
            navigate("/login");
        },1500);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg shadow-blue-300/50 hover:shadow-xl transition-shadow duration-300 p-8 md:p-10">
        <div className="flex flex-col items-center mb-6">
          <img
            src="src/assets/Images/Adobe Express - file.jpg"
            alt="Logo"
            className="h-16 w-16 object-contain mb-2"
          />
          <span className="text-3xl font-bold text-center relative">
            <span className="text-gray-800">Collab</span>
            <span className="text-blue-500 ml-1 animate-pulse">Hub</span>
          </span>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="md:col-span-2 text-red-600 text-sm mb-1">{errors.general}</div>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border-0 shadow-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-0 shadow-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border-0 shadow-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full border-0 shadow-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border-0 shadow-sm p-2 rounded-lg"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover mt-2 rounded-md border"
              />
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

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 transition-all"
            >
              {loading ? "Registering..." : "Register Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
