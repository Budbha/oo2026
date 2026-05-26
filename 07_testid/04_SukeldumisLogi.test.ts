import { SukeldumisLogi } from "./04_SukeldumisLogi";
let logobj: SukeldumisLogi;

// This runs before every test
// One test might change the log,
// if we don't have this next test would start with modified data.
beforeEach(() => {
    logobj = new SukeldumisLogi();
});

test("empty init", () => {
    expect(logobj.getLogContent()).toBe("");
});

test("simple input", () => {
    logobj.lisaSukeldumine("Esimene", 12, 35);
    expect(logobj.getLogContent()).toBe("Esimene: 12m, 35min");
});

test("multiple input", () => {
    logobj.lisaSukeldumine("Esimene", 12, 35);
    logobj.lisaSukeldumine("Teine", 15, 40);

    expect(logobj.getLogContent()).toBe(
        "Esimene: 12m, 35min\nTeine: 15m, 40min"
    );
});

test("clear log", () => {
    logobj.lisaSukeldumine("Esimene", 12, 35);
    logobj.clearLog();

    expect(logobj.getLogContent()).toBe("");
});

test("dive count", () => {
    logobj.lisaSukeldumine("Esimene", 12, 35);
    logobj.lisaSukeldumine("Teine", 15, 40);

    expect(logobj.getDiveCount()).toBe(2);
});

test("safe depth", () => {
    expect(logobj.isSafeDepth(18)).toBe(true);
});

test("too deep is not safe", () => {
    expect(logobj.isSafeDepth(30)).toBe(false);
});

test("empty name gives error", () => {
    expect(() => {
        logobj.lisaSukeldumine("", 12, 35);
    }).toThrow("Nimi ei tohi olla tühi");
});