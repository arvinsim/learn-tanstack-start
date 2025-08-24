import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("/api/coffee", () => {
		return HttpResponse.json([
			{
				name: "Foobar",
				ingredients: [{ name: "Foamed Milk", value: 100, color: "red" }],
			},
		]);
	}),
];
