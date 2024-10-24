
import { Link, NavLink } from "react-router-dom";

function NavigationBar() {

    return (
        <nav className="navBar">
            <div onClick={() => {window.open('https://www.marvel.com/')}} >
                <svg className="icon--svg icon--svg mvl-animated-logo"><use xlinkHref="#marvel"/></svg>
            </div>
            <NavLink to='/' activeClassName='active' >Home</NavLink>
            <NavLink to='/browse-characters' activeClassName='active' >Browse Characters</NavLink>
            <NavLink to='/comics' activeClassName='active' >Comics</NavLink>
        </nav>
    );
};

export default NavigationBar;