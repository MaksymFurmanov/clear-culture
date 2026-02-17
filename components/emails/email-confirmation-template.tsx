export default function EmailConfirmationTemplate({ link }: { link: string }) {
  return (
    <div className={"flex justify-center"}>
      <h2 className={"text-xl"}>Email confirmation</h2>
      <p className={"text-lg"}>Click <a href={link}>here</a> to confirm</p>
    </div>
  );
}