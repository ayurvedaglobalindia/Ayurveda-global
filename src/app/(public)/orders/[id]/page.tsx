import OrderDetailClient from "./OrderDetailClient";

export function generateStaticParams() {
  return [
    { id: "ORD-20241215-ABC1" },
    { id: "ORD-20241210-XYZ2" },
    { id: "ORD-20241205-DEF3" },
  ];
}

export default function OrderDetailPage() {
  return <OrderDetailClient />;
}
