export class DiveSafetyChecker {

    check(depth: number, air: number): string {
        if (depth > 40 || air < 100) {
            return "danger";
        }

        if (depth > 18 || air < 200) {
            return "warning";
        }

        return "safe";
    }
}