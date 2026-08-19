import TopNavbar from "~/components/navbar/TopNavbar";
import OrderListSection from "~/features/order/components/OrderListSection";

const OrderHistoryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar header="Pesanan" />

      <section className="mx-auto mt-4 px-4 pb-4">
        <OrderListSection />
      </section>
    </div>
  );
};

export default OrderHistoryPage;
