// src/components/IngredientPieChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Ingredient } from "../data/coffeeData";

interface IngredientPieChartProps {
	data: Ingredient[];
}

export function IngredientPieChart({ data }: IngredientPieChartProps) {
	return (
		<div style={{ width: "100%", height: 200 }}>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						labelLine={false}
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
						nameKey="name"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${entry.name}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip formatter={(value) => `${value}%`} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
