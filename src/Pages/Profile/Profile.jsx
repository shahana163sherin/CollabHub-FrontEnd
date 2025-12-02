import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ViewProfile } from "../../Store/ProfileSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
const navigate=useNavigate();
  const { data, loading, error, successMessage } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(ViewProfile());
  }, [dispatch]);

  // Loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-lg">
        Loading...
      </div>
    );

  // Error
  if (error)
    return (
      <div className="text-red-600 text-center text-lg">
        Error: {error}
      </div>
    );

  // Still no data? (rare case)
  if (!data) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-600 text-white p-3 mb-4 rounded-md">
          {successMessage}
        </div>
      )}

      {/* <h1 className="text-2xl font-bold mb-4">Leader Dashboard</h1> */}

      {/* Basic profile info */}
      <div className="flex items-center gap-4">
        <img
          src={`data:image/png;base64,${data.profileImage}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <p className="text-xl font-semibold">{data.name}</p>
          <p className="text-gray-700">{data.email}</p>
            <p><strong>Qualification:</strong> {data.qualification}</p>
        </div>
      </div>
  <button onClick={()=>navigate("/leader/editProfile")}>EditProfile</button>
  <button onClick={()=>navigate("/leader/change-password")}>Change Password</button>
      {/* Extra profile data */}
      {/* <div className="mt-6">
        <p><strong>Qualification:</strong> {data.qualification}</p> */}
        {/* <p><strong>Role:</strong> {data.role}</p>
        <p><strong>Created Date:</strong> {data.createdOn}</p> */}
      {/* </div> */}
    </div>
  );
}
