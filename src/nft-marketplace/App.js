import './App.css';
import {Navbar} from './components'
import {Home} from './pages'
import {Routes, Route} from "react-router-dom";
import { useEffect } from 'react';
import {useLocation} from "react-router";
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

function useLocationEffect(callback) {
  const location = useLocation();

  useEffect(() => {
    callback(location);
  }, [location, callback]);
}

function ScrollToTop() {
  useLocationEffect(() => {
    window.scrollTo(0, 0);
  });

  return (null);
}

const persistor = persistStore(store);

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
