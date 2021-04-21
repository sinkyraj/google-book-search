import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
// import router from '../../routes/bookRoures';
import Home from './pages/Home'
import Saved from './pages/Saved'
import Navbar from './components/Navbar'

import './App.css';

const App = () => {               
  return (
    <>
    {/* <h1>this is app</h1> */}
    <Router>
   <div>
     <Navbar/>
     <switch>
       <Route exact path='/'>
         <Home/>

       </Route>
       <Route path='/saved'>
        <Saved/>
       </Route>
       
     </switch>
   </div>

    </Router>
    </>
  );
}

export default App;
