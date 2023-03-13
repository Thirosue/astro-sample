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

export async function getProducts() {
  const response = await fetch(
    "https://next-api-mock-git-main-thirosue.vercel.app/api/products",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resutls = (await response.json()) as ApiResults;
  return resutls.data;
}
