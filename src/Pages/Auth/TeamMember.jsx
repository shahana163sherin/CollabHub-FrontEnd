import { useForm } from "react-hook-form";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { RegisterMemberApi } from "../../Api/authApi";
import { showError, showSuccess } from "../../Components/UI/Toast";

export default function RegisterMember() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await RegisterMemberApi(formData);

      if (res?.isSuccess) {
        showSuccess(res.message || "Member registered successfully!");
        reset();
      } else {
        showError(res.message || "Registration failed!");
      }

    } catch (err) {
      const backendError =
        err?.response?.data?.message ||
        err?.response?.data?.errors ||
        "Something went wrong";

      showError(backendError);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register Member</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <Input
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <div>
          <label className="font-medium">Profile Image</label>
          <input
            type="file"
            {...register("image")}
            className="border p-2 rounded-md"
          />
        </div>

        <Button type="submit">Register Member</Button>
      </form>
    </div>
  );
}
