import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSearchResult() {
    const navigate = useNavigate();

    const [resultCategory, setResultCategory] = useState("");
    const [resultName, setResultName] = useState("");
    const [resultLink, setResultLink] = useState("");

    const addResult = async () => {
        const newSearchResult = {
            Category: resultCategory,
            Name: resultName,
            Link: resultLink,
        };

        try {
            const response = await fetch("http://localhost:8080/api/new_search_result", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSearchResult),
            });

            const data = await response.json();
            if (response.status === 200) {
                alert(data);
                navigate("/admin_results");
            } else {
                alert(data);
            }
        } catch (error) {
            console.error("Eroare la adăugarea rezultatului:", error);
            alert("A apărut o problemă. Încercați din nou.");
        }
    };

    const cancelAddResult = () => {
        navigate("/admin_results");
    };

    return (
        <Fragment>
            <div id="formular">
                <div id="titlu_formular">Adăugare rezultat căutare</div>
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
                        <input type="button" value="Adăugare" onClick={addResult} />
                        <input type="button" value="Anulare" onClick={cancelAddResult} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
