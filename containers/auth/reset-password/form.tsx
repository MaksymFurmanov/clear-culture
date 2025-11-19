export default function ResetPasswordForm() {
  return (
    <form className={"flex flex-col w-2/3 mt-4 mx-auto"}>
      <label className="block">
        Your email address:
      </label>
      <input className={"mt-2 px-4 py-3 bg-gray-200 rounded-xl"}
             placeholder={"Email"}
      />
      <button className={"block mt-6 px-10 py-3 bg-black text-white rounded-full cursor-pointer"}>
        Recover Password
      </button>
    </form>
  );
}