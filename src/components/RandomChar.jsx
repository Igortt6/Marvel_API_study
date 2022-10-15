import { Component } from 'react';
import Spinner from './Spinner';
import MarvelService from '../services/MarvelService';

import './randomCharStyle.scss';
import mjolnir from '../resources/img/mjolnir.png';

// Выдает случайного персонажа, обращаясь к базе данных API

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
    }
     
    state = {
        char: {},
        loading: true
    }


    // новое свойство marvelService внутри class RandomChar. Альтернативный синтаксис ПОЛЕЙ КЛАССОВ
    marvelService = new MarvelService();



    // Функция записывает  полученные данный (char), в State (char)
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }


    // новый метод обращения к серверу, берем данный и записываем в State
    updateChar = () => {
        // Формула получения слачайного числа из диапазона чисел. (Math.random() * (МаксЧ - МинЧ) + МинЧ)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
    }


    render() {
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                {loading ? <Spinner/> : <View char={char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki}  = char
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;