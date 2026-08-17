import TopNavbar from "~/components/navbar/TopNavbar";
import CheckoutSection from "~/features/checkout/components/CheckoutSection";

const CheckoutPage = async () => {
  return (
    <div className="pb-22 min-h-screen">
      <TopNavbar header="Checkout" />

      <CheckoutSection />
    </div>
  );
};

export default CheckoutPage;
