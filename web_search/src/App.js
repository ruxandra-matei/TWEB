import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MeniuNavigare from './Nav';

import { Fragment } from 'react';
import SearchWord from './componente/search';
import AdminResults from './componente/admin_results';
import AddSearchResult from './componente/add_search_result';

function App() {

 

  return (
    <Fragment >
      <BrowserRouter>
        <MeniuNavigare />
        <Routes>
          <Route path="/" element={<SearchWord/>}/>
          <Route path="/admin_results" element={<AdminResults/>} />
          <Route path="/new_result" element={<AddSearchResult/>} />
        </Routes>
      </BrowserRouter>
      
      
    </Fragment>
    

  );
}

export default App;
