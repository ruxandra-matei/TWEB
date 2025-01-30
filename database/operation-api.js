import { Keyword } from "./sync.js";
import { SearchResult } from "./sync.js";
import { initTabels } from "./initTabels.js";

// Functie pentru autentificare cu Sequelize
async function sequelizeAuthenticate(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate();
        console.log("Conexiunea la baza de date a fost realizata cu succes!");
    } catch (err) {
        console.error("Eroare la conexiunea cu baza de date:", err);
    }
}

// Functie pentru sincronizare cu Sequelize
async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: false, alter: true });
        console.log("Sincronizarea cu baza de date a fost realizata cu succes!");
    } catch (err) {
        console.error("Eroare la sincronizarea cu baza de date:", err);
    }
}

// Initializarea bazei de date
async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuthenticate(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    // Uncomment daca vrei sa populezi baza de date
    // await initTabels();
}

// Gaseste toate rezultatele din baza de date
async function findAllResults() {
    try {
        const results = await Keyword.findAll({
            include: [{ model: SearchResult }],
        });
        return [200, results];
    } catch (err) {
        console.error("Eroare la gasirea tuturor rezultatelor:", err);
        return [500, "A aparut o problema interna."];
    }
}

// Gaseste un rezultat dupa cuvant cheie
async function findResultByKeyword(key) {
    if (!key.trim()) {
        return [400, "Nu ati introdus niciun cuvant cheie pentru cautare!"];
    }

    try {
        let results = await Keyword.findAll({
            include: [{ model: SearchResult }],
            where: { Name: key },
        });

        if (results.length === 0) {
            results = await SearchResult.findAll({ where: { Name: key } });
        }

        if (results.length === 0) {
            return [404, "Cuvantul cautat nu exista!"];
        }

        return [200, results];
    } catch (err) {
        console.error("Eroare la gasirea rezultatului:", err);
        return [500, "A aparut o problema interna."];
    }
}

// Adauga un rezultat nou
async function addNewResult(body) {
    if (!body || !body.Name || !body.Link || !body.Category) {
        return [400, "Informatii insuficiente pentru adaugare!"];
    }

    try {
        let keywordId = 0;

        const keyword = await Keyword.findOne({ where: { Name: body.Category } });
        if (!keyword) {
            const newKeyword = await Keyword.create({ Name: body.Category });
            keywordId = newKeyword.ID;
        } else {
            keywordId = keyword.ID;
        }

        await SearchResult.create({
            Name: body.Name,
            Link: body.Link,
            Count: 1,
            Keyword_ID: keywordId,
        });

        return [201, "Rezultatul a fost adaugat cu succes!"];
    } catch (err) {
        console.error("Eroare la adaugarea rezultatului:", err);
        return [500, "A aparut o problema interna."];
    }
}

// Actualizeaza un rezultat existent
async function updateSearchResult(searchResultID, body) {
    if (!body || !body.Name || !body.Link || !body.Category || isNaN(searchResultID)) {
        return [400, "Informatii insuficiente sau ID invalid!"];
    }

    try {
        const searchResult = await SearchResult.findByPk(searchResultID);
        if (!searchResult) {
            return [404, "Rezultatul specificat nu exista!"];
        }

        let keywordId = 0;
        const keyword = await Keyword.findOne({ where: { Name: body.Category } });
        if (!keyword) {
            const newKeyword = await Keyword.create({ Name: body.Category });
            keywordId = newKeyword.ID;
        } else {
            keywordId = keyword.ID;
        }

        await searchResult.update({
            Name: body.Name,
            Link: body.Link,
            Count: body.Count || searchResult.Count,
            Keyword_ID: keywordId,
        });

        return [200, "Rezultatul a fost actualizat cu succes!"];
    } catch (err) {
        console.error("Eroare la actualizarea rezultatului:", err);
        return [500, "A aparut o problema interna."];
    }
}

// Sterge un rezultat
async function deleteSearchResult(searchResultID) {
    if (isNaN(searchResultID)) {
        return [400, "ID-ul nu este valid!"];
    }

    try {
        const searchResult = await SearchResult.findByPk(searchResultID);
        if (!searchResult) {
            return [404, "Rezultatul specificat nu exista!"];
        }

        const keywordId = searchResult.Keyword_ID;
        await searchResult.destroy();

        const keyword = await Keyword.findByPk(keywordId, {
            include: [SearchResult],
        });

        if (keyword && keyword.SearchResults.length === 0) {
            await keyword.destroy();
        }

        return [200, "Rezultatul a fost sters cu succes!"];
    } catch (err) {
        console.error("Eroare la stergerea rezultatului:", err);
        return [500, "A aparut o problema interna."];
    }
}

// Exporta operatiile disponibile
export const OperatiiApi = {
    init: sequelizeInit,
    findResultByKeyword,
    findAllResults,
    addNewResult,
    updateSearchResult,
    deleteSearchResult,
};
