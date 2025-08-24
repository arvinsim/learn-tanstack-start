import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("https://localhost/msw/coffee", () => {
		return HttpResponse.json([
			{
				name: "Foobar",
				ingredients: [{ name: "Foamed Milk", value: 100, color: "red" }],
			},
		]);
	}),
];
