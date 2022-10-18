import { Component } from "react/cjs/react.development";

import AppHeader from "./AppHeader";
import RandomChar from "./RandomChar";
import CharList from "./CharList";
import CharInfo from "./CharInfo";

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

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>    {/*получаем id и записываем в state*/}
                        <CharInfo charId={this.state.selectedChar}/>    {/*передаем полученый id от CharList*/}
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main> 
            </div>
        )
    }
}

export default App; 