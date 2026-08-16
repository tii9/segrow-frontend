import TopNavbar from "~/components/navbar/TopNavbar";
import AccountSettings from "~/features/profile/components/AccountSettings";

const SettingsPage = async () => {
  const respose = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    },
  );
  const user = await respose.json();

  console.log(user);

  return (
    <div className="min-h-screen pb-20">
      <TopNavbar header="Pengaturan Akun" />
      <div className="overflow-y-hidden px-4">
        <AccountSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
