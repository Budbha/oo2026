class LibraryItem{
    id: string;
    title: string;
    author: string;
    year: number;

    constructor(id: string, title:string, author:string, year:number){
        // Removes the whitespaces from both ends of the string
        // === checking whether this is empty after removing spaces
        if(id.trim() === "") throw new Error("ID cannot be empty");

        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }

    getId(): string{return this.id;}
    getTitle(): string{return this.title;}
    getAuthor(): string{return this.author;}
    getYear(): number{return this.year;}
    getSummary(): string{return `[Item] ${this.title}`;}
}


//-------------------------------Book------------------------------------
class Book extends LibraryItem{
    pages: number;
    ISBN: string;

    constructor(id:string, title:string, author:string, year:number, pages:number, ISBN:string){
        super(id, title, author, year);

        if(pages <= 0) throw new Error("Pages must be positive");

        this.pages = pages;
        this.ISBN = ISBN;
    }

    getSummary(): string {
        return `[Book] ${this.title} (${this.year})`;
    }

    // This method converts the Book object into a text line for saving.
    // Each property is separated by | so we can read it easily later.
    toFillLine(): string{
        return `BOOK|${this.id}|${this.title}|${this.author}|${this.year}|${this.pages}|${this.ISBN}`;
    }
}


//----------------------------DVD---------------------------------------------
class DVD extends LibraryItem{
    duration: number;

    constructor(id: string, title:string, director:string, year:number, duration:number){
        super(id, title, director, year);

        if(duration <= 0) throw new Error("Duration must be positive");

        this.duration = duration;
    }

    getSummary(): string {
        return `[DVD] ${this.title} (${this.year})`;
    }

    toFillLine(): string{
        return `DVD|${this.id}|${this.title}|${this.author}|${this.year}|${this.duration}`;
    }
}


//---------------------------------Library-------------------
// Manage all the items
class Library{
    items: LibraryItem[];

    constructor(){
        this.items = [];
    }

    // Add a new item to the library
    addItem(item: LibraryItem): void{
        this.items.push(item);
    }

    getAll(): LibraryItem[]{
        return this.items;
    }

    // ===== Our added part starts here =====

    // This method deletes one item from the library by its ID.
    // It returns true if the item was found and deleted.
    // It returns false if there is no item with this ID.
    deleteById(id: string): boolean {
        const searchId = id.trim();

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].getId() === searchId) {
                this.items.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    // This method searches items by ID, title or author.
    // It returns a new array with only matching items.
    searchItems(text: string): LibraryItem[] {
        const searchText = text.trim().toLowerCase();

        // If the search field is empty, return all items.
        if (searchText === "") {
            return this.items;
        }

        const result: LibraryItem[] = [];

        for (let item of this.items) {
            const id = item.getId().toLowerCase();
            const title = item.getTitle().toLowerCase();
            const author = item.getAuthor().toLowerCase();

            if (
                id.indexOf(searchText) !== -1 ||
                title.indexOf(searchText) !== -1 ||
                author.indexOf(searchText) !== -1
            ) {
                result.push(item);
            }
        }

        return result;
    }

    // ===== Our added part ends here =====

    toText(): string{
        // map is an array method, it takes each item and transforms it
        // i: each item in the array
        // i.toFillLine converts object to string
        return this.items.map((i:any) => i.toFillLine()).join("\n");
        // \n means new line
        // join("\n") means join everything with line breaks
    }

    // Convert text to objects, because we need to read item details from text files
    loadFromText(text: string): string[]{
        const lines = text.split("\n");
        const errors: string[] = [];

        for (let line of lines){
            try{
                if(line.trim() === ""){
                    continue;
                }

                const parts = line.split("|");

                if (parts[0] === "BOOK"){
                    this.addItem(new Book(
                        parts[1],
                        parts[2],
                        parts[3],
                        Number(parts[4]),
                        Number(parts[5]),
                        parts[6]
                    ));
                } else if (parts[0] === "DVD"){
                    this.addItem(new DVD(
                        parts[1],
                        parts[2],
                        parts[3],
                        Number(parts[4]),
                        Number(parts[5])
                    ));
                }
            } catch (e){
                errors.push("Error: " + line);
            }
        }

        return errors;
    }
}


export{
    LibraryItem,
    Book,
    DVD,
    Library
}


// Small test examples in console
const item1 = new LibraryItem("1", "Generic item", "unknown", 2020);
console.log(item1);

const book1 = new Book("2B", "Harry Potter", "J.K Rowling", 1990, 300, "334445");
const book2 = new Book("3B", "The Hobbit", "J.R.R Tolkien", 1937, 300, "554445");

console.log(book1);
console.log(item1.getSummary());
console.log(book1.getSummary());
console.log(book1.toFillLine());

const lib = new Library();
lib.addItem(book1);
lib.addItem(book2);

console.log(lib.toText());