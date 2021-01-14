import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import QuestionForm from './components/questionForm';

function App() {
  return (
    <>
      <ToastContainer />
      <main className="container"></main>
    </>
  );
}

export default App;
