import RandomChar from "../RandomChar";
import CharList from "../CharList";
import CharInfo from "../CharInfo";
import ErrorBoundary from "../ErrorBoundary";

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    const [selectedChar, setChar] = useState(null) //id персонажа, для отображения комиксов в CharInfo

    // метод устанавливает state selectedChar через аргумент id. (Подъем состояния с другого компонента)
    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;