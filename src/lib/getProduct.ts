type Color = "white" | "black" | "gray";

export interface Product {
  id: number;
  title: string;
  price: number;
  color: Color[];
}

export async function getProduct(id: string | undefined) {
  const response = await fetch(
    `https://next-api-mock-git-main-thirosue.vercel.app/api/product?id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 404) {
    return null;
  }
  const product = (await response.json()) as Product;
  return product;
}
