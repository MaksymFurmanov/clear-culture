import { Order } from "@/types";

const orders: Order[] = [
  {
    id: "0",
    user_id: "1",
    created_date: "12.05.2025",
    price: 200,
    delivery: 3.5,
    status: "Processing"
  },
  {
    id: "1",
    user_id: "1",
    created_date: "14.05.2025",
    processed_date: "15.05.2025",
    shipped_date: "16.05.2025",
    price: 100,
    delivery: 3.5,
    status: "Shipped"
  },
];

export default orders;