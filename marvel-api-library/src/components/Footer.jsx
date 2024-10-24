import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="githubDiv" onClick={() => {window.open('https://github.com/Tmiseray')}}>
                <svg className="bi bi-github"><use xlinkHref="#github"/></svg>
            </div>
            <div onClick={() => {window.open('https://www.marvel.com/')}}>
                <svg className="icon--svg icon--svg mvl-animated-logo"><use xlinkHref="#marvel"/></svg>
            </div>
            <div className="linkedInDiv" onClick={() => {window.open('https://www.linkedin.com/in/taylor-miseray')}}>
                <svg className="bi bi-linkedin"><use xlinkHref="#linkedIn"/></svg>
            </div>
        </footer>
    );
};

export default Footer;