"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const products = [
	{
		image: "/images/Main-Product-mastraid-oil.jpg",
		sku: "A000034",
		name: "Deshi Mustard Oil",
		price: "1550",
	},
	{
		image: "/images/Offer-Product-shahi-mosla.jpg",
		sku: "A000227",
		name: "শাহী মসলা/Shahi Masala 50gm",
		price: "Free",
	},
	{
		image: "/images/Offer-product-kala-bhuna.jpg",
		sku: "A000226",
		name: "Kala Bhuna Masala-50gm",
		price: "Free",
	},
];

const ProductTable = () => {
	return (
		<div className="w-full mx-auto px-4 py-8">
			<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
				Product List
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Image</TableHead>
						<TableHead>SKU</TableHead>
						<TableHead>Name</TableHead>
						<TableHead className="text-right">Price(BDT)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product, index) => (
						<TableRow key={index}>
							<TableCell>
								<Image
									src={product.image}
									alt={product.name}
									width={50}
									height={50}
									className="object-contain rounded"
								/>
							</TableCell>
							<TableCell>{product.sku}</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell className="text-right font-semibold">
								{product.price}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ProductTable;
