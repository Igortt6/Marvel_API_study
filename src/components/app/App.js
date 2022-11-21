import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {MainPage, ComicsPage, Page404} from "../pages";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout.js";
import SingleCharacterLayout from "../pages/singleCharacterLayout/SingleCharacterLayout.js";

import AppHeader from "../AppHeader";

const App = () => {

    return (
        <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SingleComicLayout Compomemt={<SingleComicLayout/>}  dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SingleCharacterLayout Compomemt={<SingleCharacterLayout/>}  dataType='character'/>} />
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main> 
                </div>
        </Router>
    )
}


export default App; 