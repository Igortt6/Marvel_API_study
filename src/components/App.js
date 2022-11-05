import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppHeader from "./AppHeader";
import RandomChar from "./RandomChar";
import CharList from "./CharList";
import CharInfo from "./CharInfo";
import ErrorBoundary from "./ErrorBoundary";
import ComicsList from "./ComicsList";
import SingleComic from "./SingleComic";
import AppBanner from './AppBanner';


import decoration from '../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null) //id персонажа, для отображения комиксов в CharInfo

    // метод устанавливает state selectedChar через аргумент id. (Подъем состояния с другого компонента)
    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Route>
                        <AppBanner/>
                        <ComicsList/>
                    </Route>
                    {/* <SingleComic/> */}
                    {/* <Route>
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
                    </Route> */}
                </main> 
            </div>
        </Router>
    )
}


export default App; 