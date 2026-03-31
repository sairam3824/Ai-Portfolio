export type ApiRequest = {
    method?: string;
    body?: unknown;
    headers: Record<string, string | string[] | undefined>;
    query?: Record<string, string | string[] | undefined>;
};

export type ApiResponse = {
    status: (code: number) => ApiResponse;
    json: (body: unknown) => ApiResponse;
    send: (body: unknown) => ApiResponse;
};
