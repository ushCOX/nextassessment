"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
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


    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-700 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
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
