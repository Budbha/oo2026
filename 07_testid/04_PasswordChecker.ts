interface IPasswordChecker {
    check(password: string): string;
}


export class PasswordChecker {
    check(password: string): string {
        if (password.length < 6) {
            return "weak";
        }

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);

        if (password.length >= 8 && hasUpper && hasLower && hasDigit) {
            return "strong";
        }

        return "medium";
    }
}