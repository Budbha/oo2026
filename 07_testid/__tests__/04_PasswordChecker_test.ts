import { PasswordChecker } from "../04_PasswordChecker";

let checker: PasswordChecker;

// запускается перед каждым тестом
beforeEach(() => {
    checker = new PasswordChecker();
});

test('short password', () => {
    expect(checker.check("123")).toBe("weak");
});

test('only lowercase letters', () => {
    expect(checker.check("abcdef")).toBe("medium");
});

test('letters + numbers but short', () => {
    expect(checker.check("abc123")).toBe("medium");
});

test('strong password', () => {
    expect(checker.check("Abcd1234")).toBe("strong");
});

test('no lowercase', () => {
    expect(checker.check("PASSWORD1")).toBe("medium");
});

test('no uppercase', () => {
    expect(checker.check("password1")).toBe("medium");
});

test('no digit', () => {
    expect(checker.check("Password")).toBe("medium");
});