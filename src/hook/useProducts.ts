import { useState, useEffect } from "react";

type Color = "white" | "black" | "gray";
export interface Product {
  id: number;
  title: string;
  price: number;
  color: Color[];
}

export interface ApiResults {
  count: number;
  data: Product[];
}

// Product の state と更新ロジックを持つフック
const useProducts = (keyword: string | null) => {
  const [products, setProducts] = useState<Product[]>([]);

  // このカスタムフックを利用しているコンポーネントがマウントされたら Product を取得する。
  useEffect(() => {
    console.log("search keyword: %s", keyword);

    const fetchAll = async () => {
      const response = await fetch(
        `https://next-api-mock-git-main-thirosue.vercel.app/api/products?keyword=${
          keyword || ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const results = (await response.json()) as ApiResults;
      console.log(keyword, results);
      setProducts(results.data);
    };

    fetchAll();
  }, [keyword]);

  return { products };
};

export default useProducts;
