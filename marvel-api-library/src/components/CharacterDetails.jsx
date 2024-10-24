
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


const CharacterDetails = () => {
    const apiURL = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHash = process.env.REACT_APP_API_HASH;
    const [character, setCharacter] = useState([]);
    const [isFetching, setFetch] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();

    
    useEffect(() => {
        if (id) {
            const fetchCharacterDetails = async () => {
                setFetch(true);
                setError(null);
        
                const timeoutDuration = 13000;
                const timeoutId = setTimeout(() => {
                    setFetch(false);
                }, timeoutDuration);
        
                try {
                    const response = await axios.get(`${apiURL}/${id}?ts=1&apikey=${apiKey}&hash=${apiHash}`);
                    const characterData = response.data.data.results[0];
                    setCharacter(characterData);
                    console.log(characterData);
                    } catch (error) {
                        console.error('Error fetching character:', error);
                        setError(error.toString());
                    } finally {
                        clearTimeout(timeoutId);
                        setFetch(false);
                    }
            };
            fetchCharacterDetails();
        }
    }, [id]);

    
    const characterThumbnail = character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}`.replace('http', 'https') : '';
    
    if (isFetching) return (
        <p className='fetch'>
            {Array.from("Fetching character data . . . . . . ").map((char, index) => (
                <span key={index} style={{ animationDelay: `${1 + index / 7}s` }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </p>
    );

    return (
        <div className='characterDetails'>
            {character.name && <h2 className='characterTitle'>{character.name}</h2>}
            <div className='detailGrid'>
                {characterThumbnail && (<img className='characterThumbnail' src={characterThumbnail} alt={character.name} />)}
                <h3 className='descriptionTitle'>
                    Description:
                </h3>
                <div className='description'>
                    <p>
                        {character.description || 'No description available.'}
                    </p>
                </div>
                <h3 className='comicsTitle'>
                    Comics:
                </h3>
                <div className='comicsContainer'>
                    <ul className='comicsItems'>
                        {character.comics?.items.length > 0 ? (
                            character.comics.items.map(comic => (
                                <li className='comicsItem' key={comic.resourceURI}>{comic.name}</li>
                            ))
                        ) : (
                            <li>No comics available.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
};

CharacterDetails.propTypes = {
    characterId: PropTypes.number.isRequired,
};

export default CharacterDetails;