import { PasswordChecker } from "../04_PasswordChecker";

let checker: PasswordChecker;

beforeEach(() => {
    checker = new PasswordChecker();
});

test("short password is weak", () => {
    expect(checker.check("123")).toBe("weak");
});

test("simple 6-letter password is medium", () => {
    expect(checker.check("abcdef")).toBe("medium");
});

test("password with letters and number but not strong enough is medium", () => {
    expect(checker.check("abc123")).toBe("medium");
});

test("strong password", () => {
    expect(checker.check("Abcd1234")).toBe("strong");
});

test("strong password needs uppercase lowercase and digit", () => {
    expect(checker.check("PASSWORD1")).toBe("medium");
});