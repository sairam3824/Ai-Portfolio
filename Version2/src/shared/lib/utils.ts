type ClassNameValue = string | false | null | undefined;

export function cn(...inputs: ClassNameValue[]) {
    return inputs.filter(Boolean).join(" ");
}
