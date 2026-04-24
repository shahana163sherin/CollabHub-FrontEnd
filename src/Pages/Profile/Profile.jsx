import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ViewProfile } from "../../Store/ProfileSlice";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import Modal from "../../Components/UI/Modal";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const { data, loading, error, successMessage } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(ViewProfile());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-lg text-zinc-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mr-3"></div>
        Loading Profile...
      </div>
    );

  if (error)
    return (
      <div className="text-red-400 text-center text-lg mt-10 p-4 bg-red-500/10 border border-red-500/20 rounded-xl max-w-md mx-auto">
        Error: {error}
      </div>
    );

  if (!data) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 animate-slideDown">

      {/* Success Message */}
      {successMessage && (
        <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 p-4 mb-6 rounded-xl shadow-lg flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {successMessage}
        </div>
      )}

      {/* Card */}
      <Card className="flex flex-col items-center text-center p-8 md:p-12 relative overflow-hidden group">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>

        {/* Profile Image */}
        <div className="relative mb-6 cursor-pointer group/img" onClick={() => setIsImageModalOpen(true)}>
          {data.profileImage ? (
            <img
              src={`data:image/png;base64,${data.profileImage}`}
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-zinc-800 shadow-2xl transition-transform duration-300 group-hover/img:scale-105 group-hover/img:ring-4 ring-emerald-500/30"
            />
          ) : (
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-5xl shadow-2xl transition-transform duration-300 group-hover/img:scale-105 group-hover/img:ring-4 ring-emerald-500/30">
              {data?.name?.charAt(0).toUpperCase() || "L"}
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-zinc-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </div>
        </div>

        {/* User Info */}
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-2 tracking-tight">{data.name}</h2>
        <p className="text-emerald-400 font-medium mb-6 text-lg">{data.email}</p>

        <div className="bg-zinc-800/50 rounded-xl p-4 w-full max-w-sm mb-8 border border-zinc-700/50">
          <p className="text-zinc-400 text-sm uppercase tracking-wider mb-1">Qualification</p>
          <p className="text-zinc-100 font-semibold text-lg">{data.qualification || "Not specified"}</p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-sm flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 border-blue-500/50 shadow-blue-900/40"
            onClick={() => navigate("/leader/editProfile")}
          >
            Edit Profile
          </Button>

          <Button
            variant="outline"
            className="flex-1 py-3 text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            onClick={() => navigate("/leader/change-password")}
          >
            Change Password
          </Button>
        </div>
      </Card>

      {/* Image View Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Profile Photo"
      >
        <div className="flex justify-center p-4">
          {data.profileImage ? (
            <img
              src={`data:image/png;base64,${data.profileImage}`}
              alt="Profile Full Size"
              className="w-full max-w-sm rounded-2xl object-contain shadow-2xl"
            />
          ) : (
            <div className="w-full max-w-sm aspect-square rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-8xl shadow-2xl">
              {data?.name?.charAt(0).toUpperCase() || "L"}
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={() => setIsImageModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}
