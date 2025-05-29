import BrandLogo from "./component/BrandLogo";
import OrderSummary from "./component/OrderSummary";
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
			<OrderSummary />
		</div>
	);
}
