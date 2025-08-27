// Test setup file for Vitest
// Add any global test configuration here
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server.ts";
import "@testing-library/jest-dom";

// Mock ResizeObserver for recharts
global.ResizeObserver = class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
} as unknown as typeof ResizeObserver;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
