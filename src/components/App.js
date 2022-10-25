import { Component } from "react/cjs/react.development";

import AppHeader from "./AppHeader";
import RandomChar from "./RandomChar";
import CharList from "./CharList";
import CharInfo from "./CharInfo";
import ErrorBoundary from "./ErrorBoundary";

import decoration from '../resources/img/vision.png';

class App extends Component {
    state = { 
        selectedChar: null  //id персонажа, для отображения комиксов в CharInfo
    }

    // метод устанавливает state selectedChar через аргумент id. (Подъем состояния с другого компонента)
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    // done
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>    {/*получаем id и записываем в state*/}
                        </ErrorBoundary>
                        <ErrorBoundary>
                           <CharInfo charId={this.state.selectedChar}/>    {/*передаем полученый id от CharList*/}
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main> 
                
            </div>
        )
    }
}


export default App; 