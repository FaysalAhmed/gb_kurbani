"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getBaseUrl } from "../helper/getBaseUrl";
import OrderSummary from "./OrderSummary";

const FormSchema = z.object({
	name: z.string().min(1, "নাম অবশ্যই প্রদান করতে হবে"),
	// phone: z.string().regex(/^[0-9]+$/, "ফোন নাম্বার অবশ্যই প্রদান করতে হবে"),
	phone: z
		.string()
		.regex(
			/^(\+88)?01[0-9]{9}$/,
			"ফোন নাম্বার অবশ্যই প্রদান করতে হবে (যেমন: +8801XXXXXXXXX বা 01XXXXXXXXX)"
		),

	address: z.string().min(1, "এড্রেস প্রদান করুন"),
	location: z.enum(["dhaka", "chattogram", "others"], {
		errorMap: () => ({ message: "অনুগ্রহ করে লোকেশন নির্বাচন করুন" }),
	}),
});

type FormData = z.infer<typeof FormSchema>;

const CheckoutForm = () => {
	const deliveryCharges = {
		dhaka: 70,
		chattogram: 70,
		others: 130,
		null: 0,
	} as const;

	type Location = keyof typeof deliveryCharges; // "dhaka" | "chattogram" | "others" | "null"

	const [selectedLocation, setSelectedLocation] = useState<Location>("null");
	const [selectedCharge, setSelectedCharge] = useState<number>(
		deliveryCharges["null"]
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },

		clearErrors,
	} = useForm<FormData>({
		resolver: zodResolver(FormSchema),
	});

	const nuportOrderProductsDetails = [
		{
			productId: "A000034",
			quantity: 1,
		},
		{
			productId: "A000227",
			quantity: 1,
		},
		{
			productId: "A000226",
			quantity: 1,
		},
	];

	const handleSubmitForm = async (formData: FormData) => {
		setIsLoading(true);
		try {
			const reqCheckoutBodyForNuport = {
				distributorAdvancePayment: 0,
				products: nuportOrderProductsDetails,
				discountAmount: 300,
				distributor: {
					name: formData.name,
					phone: formData.phone,
					address: formData.address,
				},
				deliveryCharge: selectedCharge,
				// additionalNotes: "Premium Customer Campaign 1",
			};

			await axios.post(`${getBaseUrl(true)}/nuport`, reqCheckoutBodyForNuport);

			toast({
				title: "অর্ডার সফলভাবে সম্পন্ন হয়েছে",
				description: "আপনার অর্ডার গ্রহণ করা হয়েছে।",
			});
		} catch (error: any) {
			toast({
				title: "অর্ডার ব্যর্থ হয়েছে",
				description:
					error?.response?.data?.message || "দয়া করে আবার চেষ্টা করুন।",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Auto-clear errors after 3 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			if (Object.keys(errors).length > 0) {
				clearErrors();
			}
		}, 4000);
		return () => clearTimeout(timer);
	}, [errors, clearErrors]);
	return (
		<form
			onSubmit={handleSubmit(handleSubmitForm)}
			className="w-full lg:max-w-[900px] mx-auto space-y-4 p-4"
		>
			<div>
				<Label htmlFor="name">নাম</Label>
				<Input
					id="name"
					{...register("name")}
					className="mt-1 placeholder:text-xs"
					placeholder="আপনার নাম লিখুন"
				/>
				{errors.name && (
					<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
				)}
			</div>

			<div>
				<Label htmlFor="phone">ফোন নাম্বার</Label>
				<Input
					id="phone"
					type="tel"
					inputMode="numeric"
					{...register("phone")}
					className="mt-1 placeholder:text-xs"
					placeholder="০১৭০০০০০০০০"
				/>
				{errors.phone && (
					<p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
				)}
			</div>

			<div>
				<Label>ডেলিভারি চার্জ</Label>
				<RadioGroup
					{...register("location")}
					className="flex flex-col gap-4 mt-2"
					value={selectedLocation}
					onValueChange={(value: Location) => {
						const charge = deliveryCharges[value];
						setSelectedLocation(value);
						setSelectedCharge(charge);
					}}
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="dhaka" id="dhaka" />
						<Label htmlFor="dhaka">ঢাকা সিটি 70.00</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="chattogram" id="chattogram" />
						<Label htmlFor="chattogram">চট্টগ্রাম সিটি 70.00</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="others" id="others" />
						<Label htmlFor="others">
							ঢাকা এবং চট্টগ্রাম সিটির বাহিরে 130.00
						</Label>
					</div>
				</RadioGroup>
				{errors.location && (
					<p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
				)}
			</div>

			<div>
				<Label htmlFor="address">এড্রেস</Label>
				<Textarea
					id="address"
					{...register("address")}
					className="mt-1 placeholder:text-xs"
					placeholder="আপনার ডেলিভারির ঠিকানা লিখুন"
				/>
				{errors.address && (
					<p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
				)}
			</div>
			<div className="my-12">
				<OrderSummary deliveryCharge={selectedCharge} />
			</div>

			<div className="ct-flex-center ">
				<Button
					type="submit"
					className="w-80 bg-[#F68821] hover:bg-[#F68821]/90 rounded"
					disabled={isLoading}
				>
					{isLoading ? "অপেক্ষা করুন..." : "সাবমিট করুন"}
				</Button>
			</div>
		</form>
	);
};

export default CheckoutForm;
