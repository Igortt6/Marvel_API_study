import { useState } from "react";

import AppHeader from "./AppHeader";
import RandomChar from "./RandomChar";
import CharList from "./CharList";
import CharInfo from "./CharInfo";
import ErrorBoundary from "./ErrorBoundary";

import decoration from '../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null) //id персонажа, для отображения комиксов в CharInfo

    // метод устанавливает state selectedChar через аргумент id. (Подъем состояния с другого компонента)
    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>    {/*получаем id и записываем в state*/}
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>    {/*передаем полученый id от CharList*/}
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main> 
            
        </div>
    )
}


export default App; 