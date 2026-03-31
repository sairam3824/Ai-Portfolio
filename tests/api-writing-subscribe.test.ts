import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/blog-subscribe";
import { assertJsonBody, createMockRequest, createMockResponse } from "./helpers/apiTestUtils";

test("writing subscribe rejects non-POST requests", async () => {
    const req = createMockRequest({ method: "GET" });
    const { response, state } = createMockResponse();

    await handler(req, response);

    assert.equal(state.statusCode, 405);
    assert.deepEqual(assertJsonBody<{ error: string }>(state.jsonBody), {
        error: "Method not allowed",
    });
});

test("writing subscribe validates email input before external calls", async () => {
    const req = createMockRequest({
        method: "POST",
        body: { email: "not-an-email" },
    });
    const { response, state } = createMockResponse();

    await handler(req, response);

    assert.equal(state.statusCode, 400);
    assert.deepEqual(assertJsonBody<{ error: string }>(state.jsonBody), {
        error: "Please provide a valid email address",
    });
});
