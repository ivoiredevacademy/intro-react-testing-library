import './App.css';
import Todos from './components/Todos';
import User from './components/User';

const App: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen  mx-auto bg-blue-100 overflow-hidden'>
      <User />
      <Todos />
    </div>
  )
}

export default App;