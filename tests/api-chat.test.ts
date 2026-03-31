import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/chat";
import { assertJsonBody, createMockRequest, createMockResponse } from "./helpers/apiTestUtils";

test("chat rejects non-POST requests", async () => {
    const req = createMockRequest({ method: "GET" });
    const { response, state } = createMockResponse();

    await handler(req, response);

    assert.equal(state.statusCode, 405);
    assert.deepEqual(assertJsonBody<{ error: string }>(state.jsonBody), {
        error: "Method not allowed",
    });
});

test("chat returns service unavailable without OPENAI_API_KEY", async () => {
    const originalApiKey = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    const req = createMockRequest({
        method: "POST",
        body: { message: "Tell me about Sai Ram." },
        headers: { "x-forwarded-for": "127.0.0.1" },
    });
    const { response, state } = createMockResponse();

    try {
        await handler(req, response);
    } finally {
        if (originalApiKey) {
            process.env.OPENAI_API_KEY = originalApiKey;
        }
    }

    assert.equal(state.statusCode, 503);
    assert.deepEqual(assertJsonBody<{ error: string }>(state.jsonBody), {
        error: "Service unavailable",
    });
});
