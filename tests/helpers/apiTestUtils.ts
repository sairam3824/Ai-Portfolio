import assert from "node:assert/strict";
import type { ApiRequest, ApiResponse } from "../../api/types";

type JsonBody = unknown;

export const createMockRequest = (overrides: Partial<ApiRequest> = {}): ApiRequest => ({
    method: "GET",
    body: undefined,
    headers: {},
    query: {},
    ...overrides,
});

export const createMockResponse = () => {
    const state: {
        statusCode: number;
        jsonBody?: JsonBody;
        sentBody?: unknown;
    } = {
        statusCode: 200,
    };

    const response: ApiResponse = {
        status(code: number) {
            state.statusCode = code;
            return response;
        },
        json(body: unknown) {
            state.jsonBody = body;
            return response;
        },
        send(body: unknown) {
            state.sentBody = body;
            return response;
        },
    };

    return { response, state };
};

export const assertJsonBody = <T>(value: unknown): T => {
    assert.equal(typeof value, "object");
    assert.notEqual(value, null);
    return value as T;
};
