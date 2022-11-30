// Компонент получает ID персонажа из CharList. Получает доп данные с API о выбраном персонаже, рендерит комиксы с ним.
import { useState, useEffect} from 'react';
import PropTypes from 'prop-types'

import useMarvelService from '../services/MarvelService';
import setContent from '../utils/setContent.js';

import './charInfoStyle.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);


    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        // Если Id есть в props, ничего не делать. 
        if (!charId) { 
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            // Вручную устанавливаем 'confirmed' (рендерим контент), когда данные загружены и переданы в текущий State 
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}


const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics}  = data
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'fill'};
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">thor</div>
                    <div className="char__btns">
                        <a href={homepage}className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}  
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics > 0 ? null : 'There is no comics with this hero'}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    ) 
} 

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;