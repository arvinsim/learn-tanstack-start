import { createServerFileRoute } from "@tanstack/react-start/server";
import { z } from "zod";

// Define TypeScript interfaces for OpenAPI schema
export interface User {
	id: number;
	name: string;
	email: string;
	role: "admin" | "user" | "moderator";
	createdAt: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface OpenApiInfo {
	openapi: string;
	info: {
		title: string;
		version: string;
		description: string;
	};
	paths: Record<string, unknown>;
	components: {
		schemas: Record<string, unknown>;
	};
}

// Sample user data
const users: User[] = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		role: "admin",
		createdAt: "2024-01-15T09:30:00Z",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane.smith@example.com",
		role: "user",
		createdAt: "2024-02-20T14:15:00Z",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob.johnson@example.com",
		role: "moderator",
		createdAt: "2024-03-10T11:45:00Z",
	},
];

// OpenAPI 3.0 specification for this endpoint
const openApiSpec: OpenApiInfo = {
	openapi: "3.0.0",
	info: {
		title: "Users API",
		version: "1.0.0",
		description:
			"A simple API for managing users with OpenAPI 3.0 specification",
	},
	paths: {
		"/api/users": {
			get: {
				summary: "Get all users",
				description: "Retrieve a list of all users in the system",
				responses: {
					"200": {
						description: "Successful response",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: { type: "boolean" },
										data: {
											type: "array",
											items: { $ref: "#/components/schemas/User" },
										},
									},
								},
							},
						},
					},
				},
			},
			post: {
				summary: "Create a new user",
				description: "Add a new user to the system",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["name", "email", "role"],
								properties: {
									name: { type: "string" },
									email: { type: "string", format: "email" },
									role: {
										type: "string",
										enum: ["admin", "user", "moderator"],
									},
								},
							},
						},
					},
				},
				responses: {
					"201": {
						description: "User created successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: { type: "boolean" },
										data: { $ref: "#/components/schemas/User" },
										message: { type: "string" },
									},
								},
							},
						},
					},
					"400": {
						description: "Bad request",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										success: { type: "boolean" },
										error: { type: "string" },
									},
								},
							},
						},
					},
				},
			},
		},
	},
	components: {
		schemas: {
			User: {
				type: "object",
				required: ["id", "name", "email", "role", "createdAt"],
				properties: {
					id: { type: "integer", format: "int64" },
					name: { type: "string" },
					email: { type: "string", format: "email" },
					role: {
						type: "string",
						enum: ["admin", "user", "moderator"],
					},
					createdAt: { type: "string", format: "date-time" },
				},
			},
		},
	},
};

// Zod schema for validation
const CreateUserSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Valid email is required"),
	role: z.enum(["admin", "user", "moderator"]),
});

export const ServerRoute = createServerFileRoute("/api/users").methods({
	// GET endpoint - retrieve all users
	GET: async ({ request }) => {
		const url = new URL(request.url);
		const format = url.searchParams.get("format");

		// Return OpenAPI spec if requested
		if (format === "openapi") {
			return Response.json(openApiSpec, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		// Return users data
		const response: ApiResponse<User[]> = {
			success: true,
			data: users,
		};

		return Response.json(response, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	},

	// POST endpoint - create a new user
	POST: async ({ request }) => {
		try {
			const body = await request.json();

			// Validate input using Zod
			const validatedData = CreateUserSchema.parse(body);

			// Create new user
			const newUser: User = {
				id: users.length + 1,
				name: validatedData.name,
				email: validatedData.email,
				role: validatedData.role,
				createdAt: new Date().toISOString(),
			};

			// Add to users array (in a real app, this would be saved to a database)
			users.push(newUser);

			const response: ApiResponse<User> = {
				success: true,
				data: newUser,
				message: "User created successfully",
			};

			return Response.json(response, {
				status: 201,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			const response: ApiResponse<never> = {
				success: false,
				error:
					error instanceof z.ZodError
						? `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
						: "Invalid request data",
			};

			return Response.json(response, {
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
	},
});
