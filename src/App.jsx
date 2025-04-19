import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home/index.jsx';
import Playground from './screens/Playground/index.jsx';
import Error404 from './screens/Error404/index.jsx';
import { GlobalStyle } from './style/global.js';
import ModalProvider from './context/ModalContext.jsx';
import PlaygroundProvider from './context/PlaygroundContext.jsx';

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground/:folderId/:playgroundId" element={<Playground />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
