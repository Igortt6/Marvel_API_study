import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {MainPage, ComicsPage, Page404} from "../pages";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout.js";
import SingleCharacterLayout from "../pages/singleCharacterLayout/SingleCharacterLayout.js";
import SinglePage from "../pages/SinglePage";

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
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout}  dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout}  dataType='character'/>} />
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main> 
                </div>
        </Router>
    )
}


export default App; 