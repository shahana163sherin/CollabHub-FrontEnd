import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {ChangePassword, clearMessages } from "../../Store/ProfileSlice";
import { useNavigate } from "react-router-dom";

export default function ChangeMyPassword() {
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector(
    (state) => state.profile
  );
const navigate=useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const GoToHome = () =>{
    setTimeout(()=>{
      navigate("/");
    },1500);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    dispatch(ChangePassword({ oldPassword, newPassword }));
  };

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      {successMessage && (
        <p className="text-green-600 mb-2">{successMessage}</p>
      )}

      {error && <p className="text-red-600 mb-2">{error.message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded"onClick={GoToHome}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
