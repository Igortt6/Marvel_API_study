// Компонент получает ID персонажа из CharList. Получает доп данные с API о выбраном персонаже, рендерит комиксы с ним.

import { useState, useEffect} from 'react';

import Skeleton from './Skeleton.jsx';
import useMarvelService from '../services/MarvelService';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import './charInfoStyle.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);


    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    },[props.charId])

    const updateChar = () => {
        const {charId} = props;
        // Если Id есть в props, ничего не делать. 
        if (!charId) { 
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    // Проверка на отображение Скелетона или спинера, ошибки, данных
    const skeleton =  char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics}  = char
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

export default CharInfo;