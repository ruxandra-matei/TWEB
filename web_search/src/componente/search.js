import React, { Fragment, useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function SearchWord() {
    const [searchResult, setSearchResult] = useState({
        info: {},
        loaded: false,
        loading: false,
    });

    const [searchWord, setSearchWord] = useState("");

    const fetchSearchResult = async () => {
        if (!searchWord.trim()) {
            alert("Introduceți un cuvânt de căutat!");
            return;
        }

        setSearchResult((prevState) => ({ ...prevState, loading: true }));

        try {
            const response = await fetch(`http://localhost:8080/api/search/${searchWord}`);
            const result = await response.json();

            if (response.ok) {
                setSearchResult({
                    info: result,
                    loaded: true,
                    loading: false,
                });
            } else {
                alert(result);
                setSearchResult((prevState) => ({ ...prevState, loading: false }));
            }
        } catch (error) {
            console.error("Eroare la conexiunea cu baza de date:", error);
            alert("Eroare de conexiune la baza de date");
            setSearchResult((prevState) => ({ ...prevState, loading: false, loaded: false }));
        }
    };

    return (
        <Fragment>
            <div id="searchBox">
                <TextField
                    label="Search word"
                    variant="outlined"
                    placeholder="Nume lucrare"
                    value={searchWord}
                    onChange={(event) => setSearchWord(event.target.value)}
                />
                <Button
                    id="searchButton"
                    variant="outlined"
                    color="success"
                    onClick={fetchSearchResult}
                >
                    Caută
                </Button>
            </div>

            {searchResult.loaded && (
                <table id="ListOfWorks">
                    <caption>
                        Rezultate pentru cuvântul: <i>{searchWord}</i>
                    </caption>
                    <tbody>
                        <tr>
                            <th>Rezultat</th>
                            <th>Link</th>
                        </tr>
                        {searchResult.info !== "Cuvantul cautat nu exista!" &&
                            searchResult.info.map((r) => (
                                <tr key={r.ID}>
                                    <td>{r.Name}</td>
                                    <td>{r.Link}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </Fragment>
    );
}
