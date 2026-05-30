// This class stores scientific publication data
class Publication {
    private title: string;
    private authors: string[];
    private qualityScore: number;
    private summary: string;

    constructor(
        title: string,
        authors: string[],
        qualityScore: number,
        summary: string
    ) {
        this.title = title;
        this.authors = authors;
        this.qualityScore = qualityScore;
        this.summary = summary;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthors(): string[] {
        return this.authors;
    }

    getScore(): number {
        return this.qualityScore;
    }

    getSummary(): string {
        return this.summary;
    }

    // Returns all important information about one publication
    getDetails(): string {
        return (
            "Title: " + this.title +
            "\nAuthors: " + this.authors.join(", ") +
            "\nQuality score: " + this.qualityScore +
            "\nSummary: " + this.summary
        );
    }

    // Checks whether the title or author contains the search text
    matchesQuery(query: string): boolean {
        const normalizedQuery = query.toLowerCase().trim();

        const titleMatches =
            this.title.toLowerCase().includes(normalizedQuery);

        const authorMatches =
            this.authors.some(author =>
                author.toLowerCase().includes(normalizedQuery)
            );

        return titleMatches || authorMatches;
    }
}


// This class stores a history of user actions
class AccessLog {
    private entries: string[];

    constructor() {
        this.entries = [];
    }

    // Adds a new action to the history
    addEntry(userName: string, action: string): void {
        const timestamp = new Date().toLocaleString();

        this.entries.push(
            timestamp + " | " + userName + " | " + action
        );
    }

    getEntries(): string[] {
        return this.entries;
    }

    // Returns a text version that can later be shown on the HTML page
    getFormattedEntries(): string {
        if (this.entries.length === 0) {
            return "No actions recorded";
        }

        return this.entries.join("\n");
    }
}


// Abstract base class for all user roles
abstract class User {
    protected userId: number;
    protected name: string;
    protected email: string;
    protected accessLog: AccessLog;

    constructor(
        userId: number,
        name: string,
        email: string,
        accessLog: AccessLog
    ) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.accessLog = accessLog;
    }

    login(): string {
        const message = this.name + " logged in";

        this.accessLog.addEntry(
            this.name,
            "logged in as " + this.getRole()
        );

        return message;
    }

    logout(): string {
        const message = this.name + " logged out";

        this.accessLog.addEntry(
            this.name,
            "logged out"
        );

        return message;
    }

    getUserId(): number {
        return this.userId;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    // Every subclass must provide its own role and permissions
    abstract getRole(): string;

    abstract getPermissions(): string[];
}


// Viewer can only browse publications and view details
class Viewer extends User {
    getRole(): string {
        return "Viewer";
    }

    getPermissions(): string[] {
        return [
            "View all publications",
            "View publication details"
        ];
    }

    browsePublications(publications: Publication[]): string {
        this.accessLog.addEntry(
            this.name,
            "viewed all publications"
        );

        return formatPublicationList(publications);
    }

    viewPublicationDetails(publication: Publication): string {
        this.accessLog.addEntry(
            this.name,
            "viewed publication: " + publication.getTitle()
        );

        return publication.getDetails();
    }
}


// Researcher can search, filter and save publications
class Researcher extends User {
    private savedPublications: Publication[];

    constructor(
        userId: number,
        name: string,
        email: string,
        accessLog: AccessLog
    ) {
        super(userId, name, email, accessLog);

        this.savedPublications = [];
    }

    getRole(): string {
        return "Researcher";
    }

    getPermissions(): string[] {
        return [
            "View all publications",
            "Search publications",
            "Filter publications by score",
            "Save publications",
            "View saved publications"
        ];
    }

    browsePublications(publications: Publication[]): string {
        this.accessLog.addEntry(
            this.name,
            "viewed all publications"
        );

        return formatPublicationList(publications);
    }

    searchPublications(
        publications: Publication[],
        query: string
    ): Publication[] {
        this.accessLog.addEntry(
            this.name,
            'searched publications: "' + query + '"'
        );

        return publications.filter(publication =>
            publication.matchesQuery(query)
        );
    }

    filterByScore(
        publications: Publication[],
        minimumScore: number
    ): Publication[] {
        this.accessLog.addEntry(
            this.name,
            "filtered publications with minimum score: " + minimumScore
        );

        return publications.filter(publication =>
            publication.getScore() >= minimumScore
        );
    }

    savePublication(publication: Publication): string {
        const alreadySaved =
            this.savedPublications.includes(publication);

        if (alreadySaved) {
            return (
                "Publication is already saved: " +
                publication.getTitle()
            );
        }

        this.savedPublications.push(publication);

        this.accessLog.addEntry(
            this.name,
            "saved publication: " + publication.getTitle()
        );

        return (
            "Publication saved: " +
            publication.getTitle()
        );
    }

    viewSavedPublications(): string {
        this.accessLog.addEntry(
            this.name,
            "viewed saved publications"
        );

        if (this.savedPublications.length === 0) {
            return "No saved publications";
        }

        return formatPublicationList(this.savedPublications);
    }
}


// Admin can view users and the action history
class Admin extends User {
    getRole(): string {
        return "Admin";
    }

    getPermissions(): string[] {
        return [
            "View users",
            "View access logs"
        ];
    }

    viewUsers(users: User[]): string {
        this.accessLog.addEntry(
            this.name,
            "viewed user list"
        );

        if (users.length === 0) {
            return "No users found";
        }

        return users
            .map((user, index) =>
                (index + 1) + ". " +
                user.getName() + " | " +
                user.getRole() + " | " +
                user.getEmail()
            )
            .join("\n");
    }

    viewAllLogs(): string {
        this.accessLog.addEntry(
            this.name,
            "viewed access logs"
        );

        return this.accessLog.getFormattedEntries();
    }
}


// Helper function used to display a publication list
function formatPublicationList(
    publications: Publication[]
): string {
    if (publications.length === 0) {
        return "No publications found";
    }

    return publications
        .map((publication, index) =>
            (index + 1) + ". " +
            publication.getTitle() +
            " | Score: " +
            publication.getScore()
        )
        .join("\n");
}


// Shared action history
const accessLog = new AccessLog();


// Test publications
const publications: Publication[] = [
    new Publication(
        "Artificial Intelligence in Education",
        ["Anna Smith", "John Brown"],
        8,
        "A study about the use of artificial intelligence in schools."
    ),

    new Publication(
        "Cybersecurity Trends",
        ["Maria Green"],
        9,
        "An overview of modern cybersecurity risks."
    ),

    new Publication(
        "Digital Learning Platforms",
        ["Daniel White"],
        6,
        "A study about online education platforms."
    ),

    new Publication(
        "Data Protection in Healthcare",
        ["Anna Smith"],
        7,
        "A study about protecting sensitive medical data."
    )
];


// Test users
const users: User[] = [
    new Admin(
        1,
        "Maria",
        "maria@example.com",
        accessLog
    ),

    new Researcher(
        2,
        "Daniel",
        "daniel@example.com",
        accessLog
    ),

    new Viewer(
        3,
        "Anna",
        "anna@example.com",
        accessLog
    )
];


// Later the HTML page will store the logged-in user here
let currentUser: User | null = null;
