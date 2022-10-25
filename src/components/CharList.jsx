// Компонент получает данный c API,  рендерит 9 карточек персонажей
import React, { Component } from 'react';

import './charListStyle.scss';
import MarvelService from '../services/MarvelService';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1548,
        charEnded: false
    }

    // новое свойство marvelService внутри class CharList. Альтернативный синтаксис ПОЛЕЙ КЛАССОВ
    marvelService = new MarvelService();

    // После монтирования, вызываем метод getAllCharacters() из компонента MarvelService. Передаем данные в новый метод onCharsListLoaded()
    // Вызываем все выше в методе onRequest без аргумента(подставиться базовый в MarvelService)
    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharsListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharsListLoaded)
        .catch(this.onError)
    }

    onCharsListLoading = () => {
       this.setState({
            newItemLoading: true
       }) 
    }


    // Пролучаем данные (объект с персонажами) и записываем в компонент CharList.state
    onCharsListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }


        this.setState(({offset, charList}) => ({ //Синтаксис кол бек функции, которая возвращает объект
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'fill'};
            }

            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef} 
                    key={item.id}
                    onClick={
                        () => {
                            this.props.onCharSelected(item.id)
                            this.focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                this.props.onCharSelected(item.id);
                                this.focusOnItem(i);
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


    render () {
        const {charList,loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block' }}> {/*Условие, если тру, кнопка неактивна */}
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
    

export default CharList;