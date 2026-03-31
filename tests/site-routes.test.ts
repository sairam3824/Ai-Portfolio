import test from "node:test";
import assert from "node:assert/strict";
import { API_PATHS, ROUTE_PATHS, getLegacyWritingPath, getWritingPath } from "../shared-data/siteRoutes";
import { buildPortfolioAssistantSystemPrompt } from "../shared-data/chatContext";

test("writing routes resolve to canonical and legacy paths", () => {
    assert.equal(ROUTE_PATHS.writing, "/writing");
    assert.equal(ROUTE_PATHS.legacyWriting, "/blogs");
    assert.equal(getWritingPath("openai-codex"), "/writing/openai-codex");
    assert.equal(getLegacyWritingPath("openai-codex"), "/blogs/openai-codex");
    assert.equal(API_PATHS.writingSubscribe, "/api/writing-subscribe");
});

test("chat prompt is generated from shared portfolio context", () => {
    const prompt = buildPortfolioAssistantSystemPrompt();

    assert.match(prompt, /Sai Ram Maruri/);
    assert.match(prompt, /Main writing index: https:\/\/saiii\.in\/writing/);
    assert.match(prompt, /GitHub: https:\/\/github\.com\/sairam3824/);
});
