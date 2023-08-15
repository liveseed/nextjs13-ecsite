import React from "react";

import Image from "next/image";
import { TProduct } from "@/types";
import CartButton from "@/components/CartButton";
const fetchProduct = async (id: string): Promise<TProduct | undefined> => {
	const response = await fetch(`http://localhost:3000/api/products/${id}`);
	if (response.ok) return await response.json();
};


export default async function page({ params }: { params: { slug: string } }) {
	const product = await fetchProduct(params.slug);
	return (
		<section className=" pt-12 ">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-4 lg:gap-8">
				<div className="border rounded-md">
					<Image
						src={product?.image!}
						width={300}
						height={400}
						alt="product"
						className="w-full h-[440px] rounded-md object-center object-fill"
					/>
				</div>
				<div className="space-y-5 flex flex-col justify-center"> 
					<h1>{product?.title}</h1>
					<h2 className="text-violet-500">${product?.price}</h2>
					<CartButton pd={product!}/>
					<div>

					<h4>Product Description: </h4>
					<p>{product?.description}</p>
					</div>
				</div>
			</div>
		</section>
	);
}