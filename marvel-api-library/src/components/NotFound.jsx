
import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notFound">
            <h2>404 - Page Not Found</h2>
            <h4>Uh oh!</h4>
            <p>It looks like the page you are looking for does not exist.</p>
            <p>
                You can always go back to the<NavLink to='/' className='notFoundLink' > homepage</NavLink>.
            </p>
        </div>
    );
};

export default NotFound;