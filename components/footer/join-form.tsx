export default function JoinForm() {
  return (
    <form className={"flex flex-col items-center w-1/2 max-w-70 translate-y-12"}>
      <h3 className={"text-2xl mb-3 md:text-3xl"}>
        Join us
      </h3>
      <label/>
      <input placeholder={"Your email"}
             className={"bg-white border border-black rounded-xl px-4 py-1 mb-4 w-full md:text-base"}
      />
      <button className={"block bg-dark-blue text-white rounded-full cursor-pointer w-fit px-12 py-1"}>
        Send
      </button>
    </form>
  );
}