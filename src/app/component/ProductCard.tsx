import Image from "next/image";

const ProductCard = () => {
	return (
		<div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded overflow-hidden mx-auto p-4 gap-6">
			<div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
				<Image
					src="/images/Free-Product-Offer-Image.jpg"
					alt="Deshi Mustard Oil"
					width={300}
					height={300}
					className="object-contain"
				/>
			</div>
			<div className="flex-1 space-y-4">
				<h2 className="text-xl font-semibold text-gray-900">
					Deshi Mustard Oil/দেশি সরিষার তেল (৫ লিটার)
				</h2>
				<p className="text-gray-700 max-w-[600px] text-justify text-sm leading-relaxed">
					এই কুরবানির ঈদে গরু বা খাসির মাংসের স্বাদ, রং, গন্ধ ও স্বাস্থ্যকর
					বৈশিষ্ট্য রাখতে খাঁটি সরিষার তেলের কোন বিকল্প নেই। "নোবরেসেন্স"-এর
					দেশি ঘানির সরিষা থেকে তৈরি শতভাগ খাঁটি ভোজ্য সরিষার তেল। কোন ধরনের
					কেমিক্যাল মেশানো হয়নি। অ্যান্টিঅক্সিডেন্ট ও ভিটামিন ই-সম্পৃক্ত এই
					সরিষার তেল স্বাস্থ্যের জন্য উপকারী এবং হৃদযন্ত্রের জন্যও সহায়ক।
				</p>
			</div>
		</div>
	);
};

export default ProductCard;
