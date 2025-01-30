import { Keyword } from "./sync.js";
import { SearchResult } from "./sync.js";

export const initTables = async function populateDatabase() {
    try {
        // Adaugare keywords in baza de date
        const keywords = [
            { ID: 1, Name: "Social media" },
            { ID: 2, Name: "car" },
            { ID: 3, Name: "movie" },
            { ID: 4, Name: "song" },
        ];

        for (const keyword of keywords) {
            await Keyword.create(keyword);
        }

        // Adaugare search results in baza de date
        const searchResults = [
            { Name: "Facebook", Link: "Link 1", Keyword_ID: 1, Count: 3 },
            { Name: "WhatsApp", Link: "Link 2", Keyword_ID: 1, Count: 4 },
            { Name: "Instagram", Link: "Link 3", Keyword_ID: 1, Count: 2 },
            { Name: "Dacia", Link: "Link 4", Keyword_ID: 2, Count: 10 },
            { Name: "Audi", Link: "Link 5", Keyword_ID: 2, Count: 12 },
            { Name: "Citroen", Link: "Link 6", Keyword_ID: 2, Count: 7 },
            { Name: "Movie 1", Link: "Link 7", Keyword_ID: 3, Count: 5 },
            { Name: "Movie 2", Link: "Link 8", Keyword_ID: 3, Count: 1 },
            { Name: "Movie 3", Link: "Link 9", Keyword_ID: 3, Count: 2 },
            { Name: "Song 1", Link: "Link 10", Keyword_ID: 4, Count: 7 },
            { Name: "Song 2", Link: "Link 11", Keyword_ID: 4, Count: 9 },
            { Name: "Song 3", Link: "Link 12", Keyword_ID: 4, Count: 8 },
        ];

        for (const result of searchResults) {
            await SearchResult.create(result);
        }

        console.log("Popularea bazei de date s-a realizat cu succes!");
    } catch (err) {
        console.error("Eroare la popularea bazei de date:", err);
    }
};
