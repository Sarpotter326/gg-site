import React from 'react';
import products from '../data/gg_catalog_with_images.json';

// group products by a given key
const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    acc[item[key]] = acc[item[key]] || [];
    acc[item[key]].push(item);
    return acc;
  }, {});

export default function Catalog() {
  const categories = groupBy(products, 'category');
  return (
    <div className="max-w-6xl mx-auto p-4">
      {Object.entries(categories).map(([cat, items]) => (
        <section key={cat} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{cat}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
              <div key={item.id} className="border rounded-lg p-4 flex flex-col items-center">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover mb-2" />
                ) : (
                  <div className="w-full h-40 bg-gray-200 mb-2 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="mt-1 font-semibold">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
