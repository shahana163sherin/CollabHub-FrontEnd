export default function Input({name,type="text",placeholder,register,error}) {
    return(
        <div className="flex flex-col gap-1 w-full">

            <input type={type}placeholder={placeholder}
            {...register(name)}
            className="border p-2 rounded-md focus:outline-blue-500"/>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}