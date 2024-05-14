import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


function DeleteBook() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publishYear, setPublishYear] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const {id} = useParams()

  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false)
        enqueueSnackbar("Book deleted successfully!", {variant: 'success'})
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar("ERROR!", {variant: 'error'})
        console.log(err)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col item-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
          <button className='w-32 p-2 bg-red-300 m-8' onClick={handleDeleteBook}>
              Delete
            </button>
        </div>
      </div>
  )
}

export default DeleteBook