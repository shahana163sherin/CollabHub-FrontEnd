import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile, ViewProfile, clearMessages } from "../../Store/ProfileSlice";
import { useNavigate } from "react-router-dom";

export default function EditMyProfile() {
  const dispatch = useDispatch();
  const { data, loading, error, successMessage } = useSelector((state) => state.profile);
const navigate=useNavigate();
  // Form fields
  const [form, setForm] = useState({ name: "", phone: "" });
  
  // Image handling
  const [imageFile, setImageFile] = useState(null);      // File to send
  const [previewImage, setPreviewImage] = useState(null); // For preview

  // Fetch profile on mount
  useEffect(() => {
    dispatch(ViewProfile());
    return () => dispatch(clearMessages());
  }, [dispatch]);

  // Populate form when data arrives
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        email: data.email || "",
      });
      setPreviewImage(data.profileImage); // base64 from backend
    }
  }, [data]);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Preview selected image
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("qualification", form.qualification);
    if (imageFile) fd.append("profileImage", imageFile);

    dispatch(EditProfile(fd));
  };

  const GoToProfile =()=>{
    setTimeout(()=>{
      navigate("/leader/profile");
    },1500);

  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {/* Success / Error */}
      {successMessage && <div className="bg-green-600 text-white p-3 rounded mb-3">{successMessage}</div>}
      {error && <div className="bg-red-600 text-white p-3 rounded mb-3">{error}</div>}

      {/* Image preview */}
      {previewImage && (
        <div className="mb-4">
          <img src={previewImage} alt="Preview" className="w-32 h-32 rounded-full object-cover border" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Qualification</label>
          <input
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            type="text"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input type="file" onChange={handleImageChange} className="border p-1 rounded" accept="image/*" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded"onClick={GoToProfile}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
