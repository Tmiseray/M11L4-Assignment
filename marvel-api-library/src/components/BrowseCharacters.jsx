
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';


const BrowseCharacters = ({ handleCharacterSelect }) => {
    const apiURL = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHash = process.env.REACT_APP_API_HASH;
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    const [currentLetter, setCurrentLetter] = useState('');
    const [isFetching, setFetch] = useState(false);
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [error, setError] = useState('');

    const nextLetter = (letter) => {
        return String.fromCharCode(letter.charCodeAt(0) + 1);
    };

    const fetchTotalCharacters = async (letter) => {
        try {
            const response = await axios.get(`${apiURL}?nameStartsWith=${letter}&limit=100&ts=1&apikey=${apiKey}&hash=${apiHash}`);
            return response.data.data.total;
        } catch (error) {
            console.error('Error fetching total characters:', error);
            return 0;
        }
    };

    const fetchRandomCharacters = async (letter) => {
        setFetch(true);
        setError(null);

        const timeoutDuration = 10000;
        const timeoutId = setTimeout(() => {
            setFetch(false);
        }, timeoutDuration);

        const total = await fetchTotalCharacters(letter);
        if (total <1 ) {
            setNoResultsMessage(`No characters available for names starting with "${letter}".`);
            setCharacters([]);
            return;
        }

        setNoResultsMessage('');

        const limit = Math.min(18, total);
        const maxOffset = total - limit;
        const randomOffset = Math.floor(Math.random() * (maxOffset + 1));

        try {
            const response = await axios.get(`${apiURL}?nameStartsWith=${letter}&limit=${limit}&offset=${randomOffset}&ts=1&apikey=${apiKey}&hash=${apiHash}`);
            
            const charactersData = response.data.data.results;
            setCharacters(charactersData);
            console.log(charactersData);
            setFetch(false);
        } catch (error) {
            console.error('Error fetching random characters:', error);
        } finally {
            clearTimeout(timeoutId);
            setFetch(false);
        }
    };

    useEffect(() => {
        const storedLetter = localStorage.getItem('currentLetter');
        if (storedLetter) {
            setCurrentLetter(storedLetter);
            fetchRandomCharacters(storedLetter);
            localStorage.setItem('currentLetter', currentLetter);
        } else {
            setCurrentLetter('A');
            fetchRandomCharacters('A');
        }
    }, []);

    const handleRefresh = async (event) => {
        event.preventDefault();
        const next = nextLetter(currentLetter);
        if (next <= 'Z') {
            setCurrentLetter(next);
        }

        try {
            if (currentLetter) {
                await fetchRandomCharacters(next);
            }
            await new Promise((resolve, reject) => setTimeout(resolve, 10000))
            setFetch(false);
        } catch (error) {
            setError(error.toString());
            setFetch(false);
        }
    };

    if (isFetching) return (
        <p className='fetch'>
            {Array.from("Fetching character data . . . . . .").map((char, index) => (
                <span key={index} style={{ animationDelay: `${0.5 + index / 20}s` }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </p>
    );

    return (
        <div className='charactersList'>
            <h2 className='title'>Characters Starting with {currentLetter}</h2>
            <button onClick={handleRefresh}>Refresh for Next Letter</button>
            {noResultsMessage && <p className='noResultsMessage'>{noResultsMessage}</p>}
            <ul className='charactersContainer'>
                {characters.map(character => {
                    return (
                        <li key={character.id}>
                            <div onClick={() => navigate(`/character-details/${character.id}`)} >
                                <img className='imgThumbnail' src={`${character.thumbnail.path}.${character.thumbnail.extension}`.replace('http', 'https')} alt={character.name} />
                                <h4 className='characterName'>{character.name}</h4>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
};

BrowseCharacters.propTypes = {
    handleCharacterSelect: PropTypes.func
};

export default BrowseCharacters;