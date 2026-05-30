var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// This class stores scientific publication data
var Publication = /** @class */ (function () {
    function Publication(title, authors, qualityScore, summary) {
        this.title = title;
        this.authors = authors;
        this.qualityScore = qualityScore;
        this.summary = summary;
    }
    Publication.prototype.getTitle = function () {
        return this.title;
    };
    Publication.prototype.getAuthors = function () {
        return this.authors;
    };
    Publication.prototype.getScore = function () {
        return this.qualityScore;
    };
    Publication.prototype.getSummary = function () {
        return this.summary;
    };
    // Returns all important information about one publication
    Publication.prototype.getDetails = function () {
        return ("Title: " + this.title +
            "\nAuthors: " + this.authors.join(", ") +
            "\nQuality score: " + this.qualityScore +
            "\nSummary: " + this.summary);
    };
    // Checks whether the title or author contains the search text
    Publication.prototype.matchesQuery = function (query) {
        var normalizedQuery = query.toLowerCase().trim();
        var titleMatches = this.title.toLowerCase().includes(normalizedQuery);
        var authorMatches = this.authors.some(function (author) {
            return author.toLowerCase().includes(normalizedQuery);
        });
        return titleMatches || authorMatches;
    };
    return Publication;
}());
// This class stores a history of user actions
var AccessLog = /** @class */ (function () {
    function AccessLog() {
        this.entries = [];
    }
    // Adds a new action to the history
    AccessLog.prototype.addEntry = function (userName, action) {
        var timestamp = new Date().toLocaleString();
        this.entries.push(timestamp + " | " + userName + " | " + action);
    };
    AccessLog.prototype.getEntries = function () {
        return this.entries;
    };
    // Returns a text version that can later be shown on the HTML page
    AccessLog.prototype.getFormattedEntries = function () {
        if (this.entries.length === 0) {
            return "No actions recorded";
        }
        return this.entries.join("\n");
    };
    return AccessLog;
}());
// Abstract base class for all user roles
var User = /** @class */ (function () {
    function User(userId, name, email, accessLog) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.accessLog = accessLog;
    }
    User.prototype.login = function () {
        var message = this.name + " logged in";
        this.accessLog.addEntry(this.name, "logged in as " + this.getRole());
        return message;
    };
    User.prototype.logout = function () {
        var message = this.name + " logged out";
        this.accessLog.addEntry(this.name, "logged out");
        return message;
    };
    User.prototype.getUserId = function () {
        return this.userId;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    return User;
}());
// Viewer can only browse publications and view details
var Viewer = /** @class */ (function (_super) {
    __extends(Viewer, _super);
    function Viewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Viewer.prototype.getRole = function () {
        return "Viewer";
    };
    Viewer.prototype.getPermissions = function () {
        return [
            "View all publications",
            "View publication details"
        ];
    };
    Viewer.prototype.browsePublications = function (publications) {
        this.accessLog.addEntry(this.name, "viewed all publications");
        return formatPublicationList(publications);
    };
    Viewer.prototype.viewPublicationDetails = function (publication) {
        this.accessLog.addEntry(this.name, "viewed publication: " + publication.getTitle());
        return publication.getDetails();
    };
    return Viewer;
}(User));
// Researcher can search, filter and save publications
var Researcher = /** @class */ (function (_super) {
    __extends(Researcher, _super);
    function Researcher(userId, name, email, accessLog) {
        var _this = _super.call(this, userId, name, email, accessLog) || this;
        _this.savedPublications = [];
        return _this;
    }
    Researcher.prototype.getRole = function () {
        return "Researcher";
    };
    Researcher.prototype.getPermissions = function () {
        return [
            "View all publications",
            "Search publications",
            "Filter publications by score",
            "Save publications",
            "View saved publications"
        ];
    };
    Researcher.prototype.browsePublications = function (publications) {
        this.accessLog.addEntry(this.name, "viewed all publications");
        return formatPublicationList(publications);
    };
    Researcher.prototype.searchPublications = function (publications, query) {
        this.accessLog.addEntry(this.name, 'searched publications: "' + query + '"');
        return publications.filter(function (publication) {
            return publication.matchesQuery(query);
        });
    };
    Researcher.prototype.filterByScore = function (publications, minimumScore) {
        this.accessLog.addEntry(this.name, "filtered publications with minimum score: " + minimumScore);
        return publications.filter(function (publication) {
            return publication.getScore() >= minimumScore;
        });
    };
    Researcher.prototype.savePublication = function (publication) {
        var alreadySaved = this.savedPublications.includes(publication);
        if (alreadySaved) {
            return ("Publication is already saved: " +
                publication.getTitle());
        }
        this.savedPublications.push(publication);
        this.accessLog.addEntry(this.name, "saved publication: " + publication.getTitle());
        return ("Publication saved: " +
            publication.getTitle());
    };
    Researcher.prototype.viewSavedPublications = function () {
        this.accessLog.addEntry(this.name, "viewed saved publications");
        if (this.savedPublications.length === 0) {
            return "No saved publications";
        }
        return formatPublicationList(this.savedPublications);
    };
    return Researcher;
}(User));
// Admin can view users and the action history
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.getRole = function () {
        return "Admin";
    };
    Admin.prototype.getPermissions = function () {
        return [
            "View users",
            "View access logs"
        ];
    };
    Admin.prototype.viewUsers = function (users) {
        this.accessLog.addEntry(this.name, "viewed user list");
        if (users.length === 0) {
            return "No users found";
        }
        return users
            .map(function (user, index) {
            return (index + 1) + ". " +
                user.getName() + " | " +
                user.getRole() + " | " +
                user.getEmail();
        })
            .join("\n");
    };
    Admin.prototype.viewAllLogs = function () {
        this.accessLog.addEntry(this.name, "viewed access logs");
        return this.accessLog.getFormattedEntries();
    };
    return Admin;
}(User));
// Helper function used to display a publication list
function formatPublicationList(publications) {
    if (publications.length === 0) {
        return "No publications found";
    }
    return publications
        .map(function (publication, index) {
        return (index + 1) + ". " +
            publication.getTitle() +
            " | Score: " +
            publication.getScore();
    })
        .join("\n");
}
// Shared action history
var accessLog = new AccessLog();
// Test publications
var publications = [
    new Publication("Artificial Intelligence in Education", ["Anna Smith", "John Brown"], 8, "A study about the use of artificial intelligence in schools."),
    new Publication("Cybersecurity Trends", ["Maria Green"], 9, "An overview of modern cybersecurity risks."),
    new Publication("Digital Learning Platforms", ["Daniel White"], 6, "A study about online education platforms."),
    new Publication("Data Protection in Healthcare", ["Anna Smith"], 7, "A study about protecting sensitive medical data.")
];
// Test users
var users = [
    new Admin(1, "Maria", "maria@example.com", accessLog),
    new Researcher(2, "Daniel", "daniel@example.com", accessLog),
    new Viewer(3, "Anna", "anna@example.com", accessLog)
];
// Later the HTML page will store the logged-in user here
var currentUser = null;
