import React from 'react';

export default function Notifications({ products }) {
  const lowStock = products.filter(p => p.quantity < p.lowStockThreshold);

  return (
    <div className="mb-6">
      {lowStock.length > 0 && (
        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-4 rounded">
          <p className="font-semibold mb-2">⚠️ Low Stock Alert</p>
          <ul className="list-disc pl-5">
            {lowStock.map(p => (
              <li key={p.id}>{p.name} (Qty: {p.quantity})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
