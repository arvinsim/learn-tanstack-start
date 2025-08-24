// src/components/CoffeeCard.tsx
import type { CoffeeVariant } from "../data/coffeeData";
import { IngredientPieChart } from "./IngredientPieChart";

interface CoffeeCardProps {
	coffee: CoffeeVariant;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
	return (
		<div className="border rounded-lg shadow-lg p-6 bg-gray-200 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">{coffee.name}</h2>

			<IngredientPieChart data={coffee.ingredients} />

			<div className="w-full mt-4">
				<h3 className="font-semibold text-lg mb-2 text-gray-700">
					Ingredients:
				</h3>
				<ul className="space-y-2">
					{coffee.ingredients.map((ingredient) => (
						<li key={ingredient.name} className="flex items-center">
							<span
								className="w-4 h-4 rounded-full mr-3 border border-gray-300"
								style={{ backgroundColor: ingredient.color }}
							></span>
							<span className="text-gray-600 flex-grow">{ingredient.name}</span>
							<span className="font-medium text-gray-800">
								{ingredient.value}%
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
