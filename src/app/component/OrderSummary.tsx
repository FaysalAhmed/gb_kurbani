interface OrderSummaryProps {
	deliveryCharge: number;
}
const OrderSummary: React.FC<OrderSummaryProps> = ({ deliveryCharge }) => {
	const subTotal = 1550 + deliveryCharge;
	return (
		<div className="flex flex-col items-end w-full lg:max-w-[900px] mx-auto mt-10 space-y-2">
			<div className="flex justify-between w-full">
				<span className="text-gray-700 font-medium">সাবটোটাল</span>
				<span className="text-gray-700 font-medium">Tk 1550</span>
			</div>
			<div className="flex justify-between w-full">
				<span className="text-gray-700 font-medium">ডেলিভারি চার্জ</span>
				<span className="text-gray-700 font-medium">Tk {deliveryCharge}</span>
			</div>
			<div className="flex justify-between w-full border-t pt-2 mt-2">
				<span className="text-black font-bold">সর্বমোট</span>
				<span className="text-black font-bold">Tk {subTotal}</span>
			</div>
		</div>
	);
};

export default OrderSummary;
