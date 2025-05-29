import Image from "next/image";

const BrandLogo = () => {
	return (
		<div className="w-full my-6">
			<Image
				src="/images/gb-final-logo-primary.png"
				alt="brand logo"
				width={150}
				height={150}
				className="object-contain mx-auto"
			/>
		</div>
	);
};

export default BrandLogo;
