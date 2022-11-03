// Компонент получает данный c API,  рендерит 9 карточек персонажей
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charListStyle.scss';
import useMarvelService from '../services/MarvelService';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';


const CharList = (props) => {
    const [ charList, setCharList] = useState([]);
    const [ newItemLoading, setNewItemLoading] = useState(false);
    const [ offset, setOffset] = useState(210);
    const [ charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {

        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharsListLoaded)
    }

    // Пролучаем данные (объект с персонажами) и записываем в компонент CharList.state
    const onCharsListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset =>  offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'fill'};
            }
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el} 
                    key={item.id}
                    onClick={() => {
                            props.onCharSelected(item.id)
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}
                        >  {/*получаем id и записываем в state. Метод находиться в App.js*/}
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block' }}> {/*Условие, если тру, кнопка неактивна */}
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

// Проверка типов с помощью PropTypes
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
 
export default CharList;