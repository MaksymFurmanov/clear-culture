export default function PasswordChangeTemplate({ link }: {
  link: string
}) {
  return (
    <div>
      <h1>Your change password link:</h1>
      <a href={link}>{link}</a>
    </div>
  );
}