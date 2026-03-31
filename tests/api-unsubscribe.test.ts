import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/unsubscribe";
import { createMockRequest, createMockResponse } from "./helpers/apiTestUtils";

test("unsubscribe rejects non-GET requests", async () => {
    const req = createMockRequest({ method: "POST" });
    const { response, state } = createMockResponse();

    await handler(req, response);

    assert.equal(state.statusCode, 405);
    assert.match(String(state.sentBody), /Method not allowed/);
});

test("unsubscribe validates token before network work", async () => {
    const originalUrl = process.env.SUPABASE_URL;
    const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";

    const req = createMockRequest({
        method: "GET",
        query: {},
    });
    const { response, state } = createMockResponse();

    try {
        await handler(req, response);
    } finally {
        if (originalUrl) {
            process.env.SUPABASE_URL = originalUrl;
        } else {
            delete process.env.SUPABASE_URL;
        }

        if (originalKey) {
            process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
        } else {
            delete process.env.SUPABASE_SERVICE_ROLE_KEY;
        }
    }

    assert.equal(state.statusCode, 400);
    assert.match(String(state.sentBody), /Missing link/);
});
