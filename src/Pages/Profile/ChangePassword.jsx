import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword, clearMessages } from "../../Store/ProfileSlice";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../Components/UI/Toast";
import Card from "../../Components/UI/Card";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { KeyIcon } from "@heroicons/react/24/outline";

export default function ChangeMyPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(
    (state) => state.profile
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showError("New password and confirm password do not match.");
      return;
    }

    dispatch(
      ChangePassword({
        currentPassword: oldPassword,
        newPassword,
        confirmPassword,
      })
    );
  };

  useEffect(() => {
    if (successMessage) showSuccess(successMessage);
    if (error) showError(error?.message || "Something went wrong");

    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [successMessage, navigate]);

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 animate-slideDown flex justify-center items-center min-h-[calc(100vh-100px)]">
      <Card className="w-full p-8 md:p-10 border-zinc-800/80 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 mb-4 shadow-inner">
            <KeyIcon className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-100 mb-2">
            Security Settings
          </h2>
          <p className="text-zinc-400 text-sm max-w-xs">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">

          <div className="animate-slideDown" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <Input
              type="password"
              label="Current Password"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="animate-slideDown" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <Input
              type="password"
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="animate-slideDown" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <Input
              type="password"
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 animate-slideDown" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full py-3.5"
            >
              {loading ? "Updating Security..." : "Change Password"}
            </Button>
          </div>

          <div className="mt-2 text-center animate-slideDown" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <Button variant="ghost" type="button" onClick={() => navigate("/leader/profile")} className="text-zinc-400 hover:text-zinc-200">
              Back to Profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
