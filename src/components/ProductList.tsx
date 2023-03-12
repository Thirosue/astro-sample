import { useState } from "react";
import { Product } from "./Product";
import useProducts from "../hook/useProducts";

export const ProductList = () => {
  const [showAll, setShowAll] = useState(false);
  const { products } = useProducts(
    new URLSearchParams(window.location.search).get("keyword")
  );

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.length > 0 ? (
        <>
          {products.slice(0, showAll ? 100 : 8).map((item, i) => (
            <Product
              key={i}
              {...item}
              href={`https://thirosue.github.io/hosting-image2/astro-sample/product/${item.id}/main.jpeg`}
            />
          ))}
          {products.length > 8 && !showAll && (
            <a
              href="#"
              onClick={() => setShowAll(true)}
              className="font-medium text-blue-600 hover:underline"
            >
              Read more
            </a>
          )}
        </>
      ) : (
        <div className="text-center text-2xl">No products found...</div>
      )}
    </div>
  );
};
