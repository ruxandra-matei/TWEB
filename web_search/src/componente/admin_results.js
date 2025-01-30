import React, { Fragment, useState, useEffect } from "react";
import { Button } from "@material-ui/core";

export default function AdminResults() {
    const [searchResult, setSearchResult] = useState({
        info: {},
        loaded: false,
        loading: false,
    });

    const [editResult, setEditResult] = useState(false);
    const [resultCategory, setResultCategory] = useState("");
    const [resultName, setResultName] = useState("");
    const [resultLink, setResultLink] = useState("");
    const [resultCount, setResultCount] = useState(-1);
    const [resultId, setResultId] = useState(-1);

    useEffect(() => {
        if (!searchResult.loaded) {
            fetchSearchResults();
        }
    }, [searchResult.loaded]);

    const fetchSearchResults = async () => {
        setSearchResult((prevState) => ({ ...prevState, loading: true }));
        try {
            const response = await fetch("http://localhost:8080/api/search_all");
            const data = await response.json();
            if (response.ok) {
                setSearchResult({
                    info: data,
                    loaded: true,
                    loading: false,
                });
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Eroare la conexiunea cu baza de date:", error);
            setSearchResult({ info: {}, loaded: false, loading: false });
            alert("Eroare de conexiune la baza de date");
        }
    };

    const deleteSearchResult = async (idResult) => {
        try {
            const response = await fetch(`http://localhost:8080/api/delete_search_result/${idResult}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            alert(result);
            window.location.reload();
        } catch (error) {
            console.error("Eroare la ștergerea rezultatului:", error);
        }
    };

    const editSearchResult = (category, result) => {
        setResultCategory(category);
        setResultName(result.Name);
        setResultLink(result.Link);
        setResultCount(result.Count);
        setResultId(result.ID);
        setEditResult(true);
    };

    const updateResult = async () => {
        const updatedResult = {
            Category: resultCategory,
            Name: resultName,
            Link: resultLink,
            Count: resultCount,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/update_search_result/${resultId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedResult),
            });
            const result = await response.json();
            alert(result);
            setEditResult(false);
            window.location.reload();
        } catch (error) {
            console.error("Eroare la actualizarea rezultatului:", error);
        }
    };

    const cancelUpdateResult = () => {
        setEditResult(false);
    };

    return (
        <Fragment>
            <Button href="../new_result" id="AddButton">
                Adaugă rezultat nou
            </Button>

            {!editResult && searchResult.loaded && (
                <table id="ListOfWorks">
                    <caption>Lista căutări baza de date:</caption>
                    <tbody>
                        <tr>
                            <th>Cuvânt cheie</th>
                            <th>Rezultat</th>
                            <th>Link</th>
                            <th>Opțiuni</th>
                        </tr>
                        {searchResult.info !== "Cuvantul cautat nu exista!" &&
                            searchResult.info.map((key) =>
                                Array.from(key.SearchResults.values()).map((result) => (
                                    <Fragment key={result.ID}>
                                        <tr>
                                            <td>{key.Name}</td>
                                            <td>{result.Name}</td>
                                            <td>{result.Link}</td>
                                            <td>
                                                <Button id="deleteButton" onClick={() => deleteSearchResult(result.ID)}>
                                                    Șterge
                                                </Button>
                                                <Button id="editButton" onClick={() => editSearchResult(key.Name, result)}>
                                                    Editare
                                                </Button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))
                            )}
                    </tbody>
                </table>
            )}

            {editResult && (
                <Fragment>
                    <div id="formular">
                        <div id="titlu_formular">Actualizare rezultat căutare</div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Categorie"
                                    value={resultCategory}
                                    onChange={(event) => setResultCategory(event.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Rezultat"
                                    value={resultName}
                                    onChange={(event) => setResultName(event.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Link"
                                    value={resultLink}
                                    onChange={(event) => setResultLink(event.target.value)}
                                />
                            </div>
                            <div>
                                <input type="button" value="Actualizare" onClick={updateResult} />
                                <input type="button" value="Anulare" onClick={cancelUpdateResult} />
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
