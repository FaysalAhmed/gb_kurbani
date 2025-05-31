import BrandLogo from "./component/BrandLogo";
import CheckoutForm from "./component/CheckoutForm";
import ProductCard from "./component/ProductCard";
import ProductOfferDetails from "./component/ProductOfferDetails";
import ProductTable from "./component/ProductTable";

export default function Home() {
	return (
		<div className="ct-container">
			<BrandLogo />
			<ProductCard />
			<ProductOfferDetails />
			<ProductTable />
			<CheckoutForm />
		</div>
	);
}
