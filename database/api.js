import "./sync.js";
import { router } from "../server-init.js";
import { OperatiiApi } from "./operation-api.js";

// Obtinerea tuturor rezultatelor din baza de date
router.route("/search_all").get(async (req, res) => {
    try {
        const [status, results] = await OperatiiApi.findAllResults();
        res.status(status).json(results);
    } catch (error) {
        console.error("Eroare la obtinerea tuturor rezultatelor:", error);
        res.status(500).send("A aparut o problema interna.");
    }
});

// Cautare rezultat dupa cuvant cheie
router.route("/search/:key").get(async (req, res) => {
    const { key } = req.params;
    try {
        const [status, results] = await OperatiiApi.findResultByKeyword(key);
        const searchResults = results[0]?.SearchResults ?? results;
        res.status(status).json(searchResults);
    } catch (error) {
        console.error("Eroare la cautarea rezultatului dupa cuvant cheie:", error);
        res.status(500).send("A aparut o problema interna.");
    }
});

// Adaugarea unui rezultat nou
router.route("/new_search_result").post(async (req, res) => {
    const newResult = req.body;
    console.log("Rezultat nou primit:", newResult);
    try {
        const [status, result] = await OperatiiApi.addNewResult(newResult);
        res.status(status).json(result);
    } catch (error) {
        console.error("Eroare la adaugarea unui rezultat nou:", error);
        res.status(500).send("A aparut o problema interna.");
    }
});

// Actualizarea unui rezultat existent
router.route("/update_search_result/:result_id").put(async (req, res) => {
    const { result_id } = req.params;
    const updatedData = req.body;
    try {
        const [status, result] = await OperatiiApi.updateSearchResult(+result_id, updatedData);
        res.status(status).json(result);
    } catch (error) {
        console.error("Eroare la actualizarea rezultatului:", error);
        res.status(500).send("A aparut o problema interna.");
    }
});

// Stergerea unui rezultat din baza de date
router.route("/delete_search_result/:searchResult_id").delete(async (req, res) => {
    const { searchResult_id } = req.params;
    try {
        const [status, result] = await OperatiiApi.deleteSearchResult(+searchResult_id);
        res.status(status).json(result);
    } catch (error) {
        console.error("Eroare la stergerea rezultatului:", error);
        res.status(500).send("A aparut o problema interna.");
    }
});
