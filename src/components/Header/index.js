import React, { useContext } from 'react';
import { Menu, Image, Button, Icon, Input } from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';
import { Link, useLocation, useHistory } from 'react-router-dom';
import logout from '../../context/actions/auth/logout';
import { GlobalContext } from './../../context/Provider';
import isAuthenticated from '../../utils/isAuthenticated';
import searchContacts from '../../context/actions/contacts/searchContacts';

const Header = () => {
    const { pathname } = useLocation();

    const history = useHistory();

    const { contactsDispatch: dispatch } = useContext(GlobalContext);

    const handleLogout = () => {
        logout(history)(dispatch);
    };

    const onChange = (e, { value }) => {

        const searchText = value.trim().replace(/" "/g, "");

        searchContacts(searchText)(dispatch);
    }


    return (
        <Menu secondary pointing>
            <Image src={logo} width={60}></Image>
            <Menu.Item style={{ fontSize: 24 }} as={Link} to="/">Contact App</Menu.Item>

            {pathname === '/' && isAuthenticated() && (
                <Menu.Item position="right">
                    <Input style={{ width: 300 }} placeholder="Search Contact" onChange={onChange} />
                </Menu.Item>
            )}

            {isAuthenticated() && (
                <Menu.Item position="right">
                    <Button as={Link} to="/contacts/create" primary icon>
                        <Icon name="add"></Icon>&nbsp;
                    Add Contact
                </Button>
                </Menu.Item>
            )}

            {isAuthenticated() && (
                <Menu.Item>
                    <Button onClick={handleLogout} color="red" icon>
                        <Icon name="log out"></Icon>&nbsp;
                    Logout
                </Button>
                </Menu.Item>
            )}
        </Menu >
    )
}

export default Header;
