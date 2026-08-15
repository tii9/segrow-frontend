import TopNavbar from "~/components/navbar/TopNavbar";
import AccountSettings from "~/features/profile/components/AccountSettings";

const SettingsPage = () => {
  return (
    <div className="-mb-24 min-h-dvh">
      <TopNavbar header="Pengaturan Akun" />
      <div className="overflow-y-hidden px-4">
        <AccountSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
