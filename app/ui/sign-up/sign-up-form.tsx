import PasswordInput from "@/app/ui/password-input";

export default function SignUpForm() {
  return (
    <form className={"flex flex-col w-2/3 mt-4 mx-auto"}>
      <label className="block">
        Phone number:
      </label>
      <input className={"mt-2 py-3 px-4 bg-gray-200 rounded-xl"}
             placeholder={"Phone"}
      />

      <PasswordInput name={"password"}>
        Password
      </PasswordInput>

      <PasswordInput>
        Reset password
      </PasswordInput>

      <button className={"block mt-8 py-3 px-16 bg-black rounded-full text-white"}>
        Log In
      </button>
    </form>
  );
}