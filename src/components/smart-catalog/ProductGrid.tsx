import React from "react";
import Image from "next/image";

export function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.price}</p>
        </div>
      ))}
    </div>
  );
}