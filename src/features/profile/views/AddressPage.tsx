import TopNavbar from "~/components/navbar/TopNavbar";
import AddressGroup from "~/features/profile/components/address/AddressGroup";

const AddressPage = () => {
  return (
    <div className="min-h-screen pb-36">
      <TopNavbar header="Alamat Pengiriman" />
      <div className="px-4 pt-6 ">
        <AddressGroup />
      </div>
    </div>
  );
};

export default AddressPage;
