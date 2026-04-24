import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile, ViewProfile, clearMessages } from "../../Store/ProfileSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../../Components/UI/Card";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import Modal from "../../Components/UI/Modal";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function EditMyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error, successMessage } = useSelector(
    (state) => state.profile
  );

  const [form, setForm] = useState({
    name: "",
    qualification: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Load profile
  useEffect(() => {
    dispatch(ViewProfile());
    return () => dispatch(clearMessages());
  }, [dispatch]);

  // Set data
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        qualification: data.qualification || "",
      });

      if (data.profileImage) {
        setPreviewImage(`data:image/png;base64,${data.profileImage}`);
      }
    }
  }, [data]);

  // Toast Notifications
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => navigate("/leader/profile"), 1500);
    }

    if (error) toast.error(error);
  }, [successMessage, error, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("qualification", form.qualification);
    if (imageFile) fd.append("profileImage", imageFile);

    dispatch(EditProfile(fd));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 animate-slideDown">

      <Card className="p-8 md:p-10 border-zinc-800/80 relative overflow-hidden text-center">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-8">
          Edit Your Profile
        </h2>

        {/* Image Preview & Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4 cursor-pointer group/img shrink-0" onClick={() => previewImage && setIsImageModalOpen(true)}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-zinc-800 shadow-xl group-hover/img:scale-105 group-hover/img:ring-4 ring-emerald-500/30 transition-all duration-300"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold border-4 border-zinc-700 border-dashed shadow-inner">
                <PhotoIcon className="w-10 h-10" />
              </div>
            )}
            {previewImage && (
              <div className="absolute inset-0 rounded-full bg-zinc-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            )}
          </div>

          <label className="group relative cursor-pointer">
            <Input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="absolute opacity-0 w-0 h-0"
            />
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 text-emerald-400 font-medium rounded-lg hover:bg-zinc-700 transition-colors border border-emerald-500/20 group-hover:border-emerald-500/50">
              <PhotoIcon className="w-5 h-5" />
              Change Photo
            </div>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-sm mx-auto text-left relative z-10">

          {/* Name */}
          <div className="animate-slideDown" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <Input
              name="name"
              label="Full Name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="e.g. John Doe"
              required
            />
          </div>

          {/* Qualification */}
          <div className="animate-slideDown" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <Input
              name="qualification"
              label="Qualification"
              value={form.qualification}
              onChange={handleChange}
              type="text"
              placeholder="e.g. B.Tech Computer Science"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4 animate-slideDown" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full py-3.5"
            >
              {loading ? "Saving Changes..." : "Save Profile"}
            </Button>
          </div>

          <div className="mt-2 text-center animate-slideDown" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Button variant="ghost" type="button" onClick={() => navigate("/leader/profile")} className="text-zinc-400 hover:text-zinc-200">
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      {/* Image View Modal (reused logic) */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Profile Photo"
      >
        <div className="flex justify-center p-4">
          {previewImage && (
            <img
              src={previewImage}
              alt="Profile Full Size"
              className="w-full max-w-sm rounded-2xl object-contain shadow-2xl"
            />
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={() => setIsImageModalOpen(false)}>Close</Button>
        </div>
      </Modal>

    </div>
  );
}
