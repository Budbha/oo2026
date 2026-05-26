"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SukeldumisLogi = void 0;
var SukeldumisLogi = /** @class */ (function () {
    function SukeldumisLogi() {
        this.sukeldumised = [];
    }
    SukeldumisLogi.prototype.lisaSukeldumine = function (nimi, sugavus, kestus) {
        if (nimi.trim() === "") {
            throw new Error("Nimi ei tohi olla tühi");
        }
        if (sugavus <= 0) {
            throw new Error("Sügavus peab olema suurem kui 0");
        }
        if (kestus <= 0) {
            throw new Error("Kestus peab olema suurem kui 0");
        }
        this.sukeldumised.push({
            nimi: nimi,
            sugavus: sugavus,
            kestus: kestus
        });
    };
    SukeldumisLogi.prototype.getLogContent = function () {
        if (this.sukeldumised.length === 0) {
            return "";
        }
        return this.sukeldumised
            .map(function (s) { return "".concat(s.nimi, ": ").concat(s.sugavus, "m, ").concat(s.kestus, "min"); })
            .join("\n");
    };
    SukeldumisLogi.prototype.clearLog = function () {
        this.sukeldumised = [];
    };
    SukeldumisLogi.prototype.getDiveCount = function () {
        return this.sukeldumised.length;
    };
    SukeldumisLogi.prototype.isSafeDepth = function (sugavus) {
        return sugavus > 0 && sugavus <= 18;
    };
    return SukeldumisLogi;
}());
exports.SukeldumisLogi = SukeldumisLogi;
// Näitprogramm HTML jaoks
var logobj = new SukeldumisLogi();
function lisaSukeldumineLehele() {
    var nimiInput = document.getElementById("nimi");
    var sugavusInput = document.getElementById("sugavus");
    var kestusInput = document.getElementById("kestus");
    var output = document.getElementById("output");
    var info = document.getElementById("info");
    var nimi = nimiInput.value;
    var sugavus = Number(sugavusInput.value);
    var kestus = Number(kestusInput.value);
    try {
        logobj.lisaSukeldumine(nimi, sugavus, kestus);
        output.innerText = logobj.getLogContent();
        if (logobj.isSafeDepth(sugavus)) {
            info.innerText = "Sügavus on algajale ohutu.";
        }
        else {
            info.innerText = "Sügavus ei ole algajale ohutu.";
        }
        nimiInput.value = "";
        sugavusInput.value = "";
        kestusInput.value = "";
    }
    catch (error) {
        if (error instanceof Error) {
            info.innerText = error.message;
        }
    }
}
function puhastaLogi() {
    var output = document.getElementById("output");
    var info = document.getElementById("info");
    logobj.clearLog();
    output.innerText = logobj.getLogContent();
    info.innerText = "Logi puhastatud.";
}
if (typeof window !== "undefined") {
    window.lisaSukeldumineLehele = lisaSukeldumineLehele;
    window.puhastaLogi = puhastaLogi;
}
