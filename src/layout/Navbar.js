import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

const Navbar = () => {
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to = "/">Home</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to = "/add">Add User</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to = "/github">Project Files</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired
}
Navbar.defaultProps = {
    title: "Default App"
}
export default Navbar;