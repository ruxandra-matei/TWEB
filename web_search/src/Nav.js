import { Fragment } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from '@material-ui/core';

function MeniuNavigare() {

    return (
        <Fragment>
            <AppBar style={{ position: "relative " }}>
                <Toolbar>
                    <ul className="meniu_style">
                        <Link to={"/admin_results"} className="link_style">
                            <li>Administrare rezultate cautare</li>
                        </Link>
                        <Link to={"/"} className="link_style" >
                            <li>Search</li>
                        </Link>
                    </ul>
                </Toolbar>
            </AppBar>
        </Fragment >

    );
}

export default MeniuNavigare;