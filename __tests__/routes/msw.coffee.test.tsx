import { CoffeesIndex } from "@/routes/msw.coffee";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("CoffeeIndex", () => {
	it("render coffee types", async () => {
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
