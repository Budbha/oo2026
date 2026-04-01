interface IPasswordChecker {
    check(password: string): string;
}


export class PasswordChecker implements IPasswordChecker {
    check(password: string): string {
        if (password.length < 6) {
            return "weak";
        }

        let hasUpper = /[A-Z]/.test(password);
        let hasLower = /[a-z]/.test(password);
        let hasDigit = /[0-9]/.test(password);

        if (password.length >= 8 && hasUpper && hasLower && hasDigit) {
            return "strong";
        }

        return "medium";
    }
}