import { createServerFileRoute } from "@tanstack/react-start/server";
export interface Ingredient {
	name: string;
	value: number; // Represents the proportional part
	color: string;
}

export interface CoffeeVariant {
	name: string;
	ingredients: Ingredient[];
}

export const coffeeData: CoffeeVariant[] = [
	{
		name: "Espresso",
		ingredients: [{ name: "Espresso", value: 100, color: "#4a2c2a" }],
	},
	{
		name: "Americano",
		ingredients: [
			{ name: "Espresso", value: 33, color: "#4a2c2a" },
			{ name: "Hot Water", value: 67, color: "#1e90ff" },
		],
	},
	{
		name: "Macchiato",
		ingredients: [
			{ name: "Espresso", value: 67, color: "#4a2c2a" },
			{ name: "Milk Foam", value: 33, color: "#f5f5dc" },
		],
	},
	{
		name: "Cappuccino",
		ingredients: [
			{ name: "Espresso", value: 33, color: "#4a2c2a" },
			{ name: "Steamed Milk", value: 33, color: "#fff8e7" },
			{ name: "Milk Foam", value: 34, color: "#f5f5dc" },
		],
	},
	{
		name: "Flat White",
		ingredients: [
			{ name: "Espresso", value: 33, color: "#4a2c2a" },
			{ name: "Steamed Milk", value: 67, color: "#fff8e7" },
		],
	},
	{
		name: "Mocha",
		ingredients: [
			{ name: "Espresso", value: 20, color: "#4a2c2a" },
			{ name: "Chocolate", value: 20, color: "#6b2c00" },
			{ name: "Steamed Milk", value: 40, color: "#fff8e7" },
			{ name: "Whipped Cream", value: 20, color: "#ffffff" },
		],
	},
];

export const ServerRoute = createServerFileRoute("/api/coffee").methods({
	GET: () => {
		return Response.json(coffeeData);
	},
	// POST: async ({ request }) => {
	// 	const name = await request.json();
	// 	const todo = {
	// 		id: todos.length + 1,
	// 		name,
	// 	};
	// 	todos.push(todo);
	// 	return Response.json(todo);
	// },
});
