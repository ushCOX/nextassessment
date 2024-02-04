"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?_page=${currentPage}&_limit=${perPage}`
        );
        const data = await response.json();
        const productsWithImageUrl = await Promise.all(
          data.products.map(async (product: any) => {
            const imageResponse = await fetch(product.imageUrl);
            const blob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(blob);
            return { ...product, imageUrl };
          })
        );
        setProducts(productsWithImageUrl as never[]);
        setTotalPages(Math.ceil(data.total / perPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, perPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="text-center">
{/*       <p className="text-xl">
        <u className="pb-7  text-blue-900">Product List</u>
      </p> */}
      <nav className="px-4 py-4 bg-blue-800 text-white text-center">
        <ul className="flex">
            <li className="mx-2 cursor-pointer hover:text-blue-200">Home</li>
            <li className="mx-2 cursor-pointer hover:text-blue-200">Category</li>
        </ul>
    </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item: { id: string; title: string; imageUrl: string }) => (
          <div key={item.id} className="bg-white p-4 shadow">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <img src={item.imageUrl} alt={item.title} className="mt-2" />
          </div>
        ))}
      </div>

      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
