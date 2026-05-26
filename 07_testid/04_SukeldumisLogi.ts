export interface SukeldumisLogiLiides {
    lisaSukeldumine(nimi: string, sugavus: number, kestus: number): void;
    getLogContent(): string;
    clearLog(): void;
    getDiveCount(): number;
    isSafeDepth(sugavus: number): boolean;
}

type Sukeldumine = {
    nimi: string;
    sugavus: number;
    kestus: number;
};

export class SukeldumisLogi implements SukeldumisLogiLiides {
    private sukeldumised: Sukeldumine[] = [];

    lisaSukeldumine(nimi: string, sugavus: number, kestus: number): void {
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
    }

    getLogContent(): string {
        if (this.sukeldumised.length === 0) {
            return "";
        }

        return this.sukeldumised
            .map(s => `${s.nimi}: ${s.sugavus}m, ${s.kestus}min`)
            .join("\n");
    }

    clearLog(): void {
        this.sukeldumised = [];
    }

    getDiveCount(): number {
        return this.sukeldumised.length;
    }

    isSafeDepth(sugavus: number): boolean {
        return sugavus > 0 && sugavus <= 18;
    }
}


// Näitprogramm HTML jaoks

const logobj = new SukeldumisLogi();

function lisaSukeldumineLehele(): void {
    const nimiInput = document.getElementById("nimi") as HTMLInputElement;
    const sugavusInput = document.getElementById("sugavus") as HTMLInputElement;
    const kestusInput = document.getElementById("kestus") as HTMLInputElement;

    const output = document.getElementById("output") as HTMLPreElement;
    const info = document.getElementById("info") as HTMLParagraphElement;

    const nimi = nimiInput.value;
    const sugavus = Number(sugavusInput.value);
    const kestus = Number(kestusInput.value);

    try {
        logobj.lisaSukeldumine(nimi, sugavus, kestus);

        output.innerText = logobj.getLogContent();

        if (logobj.isSafeDepth(sugavus)) {
            info.innerText = "Sügavus on algajale ohutu.";
        } else {
            info.innerText = "Sügavus ei ole algajale ohutu.";
        }

        nimiInput.value = "";
        sugavusInput.value = "";
        kestusInput.value = "";
    } catch (error) {
        if (error instanceof Error) {
            info.innerText = error.message;
        }
    }
}

function puhastaLogi(): void {
    const output = document.getElementById("output") as HTMLPreElement;
    const info = document.getElementById("info") as HTMLParagraphElement;

    logobj.clearLog();

    output.innerText = logobj.getLogContent();
    info.innerText = "Logi puhastatud.";
}

if (typeof window !== "undefined") {
    (window as any).lisaSukeldumineLehele = lisaSukeldumineLehele;
    (window as any).puhastaLogi = puhastaLogi;
}