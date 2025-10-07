import OrdersList from "@/containers/user-pages/orders/orders-list";

export default function OrdersPage() {
  return (
    <main className={"max-w-300 mx-auto"}>
      <h1 className={"text-3xl lg:text-4xl text-center m-8 md:m-10 lg:m-12 mt-10"}>
        Your orders
      </h1>
      <OrdersList />
    </main>
  );
}