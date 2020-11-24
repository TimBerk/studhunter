import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import { getCurrentUser, checkIsLoggedIn } from "../../utils/storages";
import {isEmpty} from "../../utils/common";
import { headerLinks, headerUserLinks} from "../../constants/HeaderLinks";

class Navbar extends Component {
    state = {
        currentUser: getCurrentUser(),
        isLoggedIn: checkIsLoggedIn(),
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user !== undefined && props.user !== state.currentUser) {
            return {
                currentUser: props.user
            };
        }

        return null;
    }

    render () {
        const [{ logout }, {currentUser, isLoggedIn}] = [this.props, this.state];
        const userLinks = isLoggedIn ? headerUserLinks : null;
        let userPart = null;

        if (currentUser && !isEmpty(currentUser)) {
            userPart = (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        Мои настройки
                    </a>
                    <div className="dropdown-menu" aria-labelledby="userDropdown">
                        {
                            userLinks.map((link, id) => {
                                return <NavLink className="dropdown-item" exact  to={link.url} key={id}  activeClassName="active">
                                        {link.name}
                                    </NavLink>
                            })
                        }
                        <button className="dropdown-item" onClick={logout}>
                            Выйти
                        </button>
                    </div>
                </li>
            )
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">StudHunter</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav align-items-end">
                        {
                            headerLinks
                                .filter(link => isLoggedIn? link.auth === isLoggedIn : true)
                                .map((link, id) => {
                                return <li className="nav-item" key={id}>
                                    <NavLink className="nav-link" exact  to={link.url}  activeClassName="active">
                                        {link.name}
                                    </NavLink>
                                </li>
                            })
                        }

                        {userPart}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({ auth: { user, isLoggedIn } }) => {
    return { user, isLoggedIn }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);