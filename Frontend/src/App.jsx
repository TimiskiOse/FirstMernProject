import { Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import CreateBooks from './pages/createBooks'
import EditBook from './pages/editBook'
import ShowBooks from './pages/showBooks'
import DeleteBook from './pages/deleteBook'




const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBooks /> } />
      <Route path='/books/edit/:id' element={<EditBook /> } />
      <Route path='/books/details/:id' element={<ShowBooks /> } />
      <Route path='/books/delete/:id' element={<DeleteBook /> } />
    </Routes>
  )
}

export default App
