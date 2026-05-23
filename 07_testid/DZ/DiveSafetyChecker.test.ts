import { DiveSafetyChecker } from "../DiveSafetyChecker";

let checker: DiveSafetyChecker;

beforeEach(() => {
    checker = new DiveSafetyChecker();
});

test("safe dive", () => {
    expect(checker.check(10, 220)).toBe("safe");
});

test("warning because depth is more than 18", () => {
    expect(checker.check(25, 220)).toBe("warning");
});

test("warning because air is less than 200", () => {
    expect(checker.check(10, 150)).toBe("warning");
});

test("danger because depth is more than 40", () => {
    expect(checker.check(45, 220)).toBe("danger");
});

test("danger because air is less than 100", () => {
    expect(checker.check(10, 80)).toBe("danger");
});