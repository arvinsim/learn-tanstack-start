import { CoffeesIndex } from "@/routes/msw.coffee";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";

describe("CoffeeIndex", () => {
	it("render coffee types", async () => {
		// Mock the API call for this specific test instead of global setup
		server.use(
			http.get("/api/coffee", () => {
				return HttpResponse.json([
					{
						name: "Foobar",
						ingredients: [{ name: "Foamed Milk", value: 100, color: "red" }],
					},
				]);
			})
		);

		const queryClient = new QueryClient();
        render(
          <QueryClientProvider client={queryClient}>
			<CoffeesIndex />
		  </QueryClientProvider>
		)

		await waitFor(() => {
			expect(screen.getByText('Foobar')).toBeInTheDocument();
		});
	});
});
