import { CoffeeCard } from "@/components/CoffeeCard";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { CoffeeVariant } from "./api.coffee";

export const Route = createFileRoute("/msw/coffee")({
	component: CoffeesIndex,
});

export function CoffeesIndex() {
	const { data: coffeeData = [], refetch } = useQuery<CoffeeVariant[]>({
		queryKey: ["coffee"],
		queryFn: () => fetch("/api/coffee").then((res) => res.json()),
	});

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black p-4 text-white">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{coffeeData.map((coffee) => (
					<CoffeeCard key={coffee.name} coffee={coffee} />
				))}
			</div>
		</div>
	);
}
