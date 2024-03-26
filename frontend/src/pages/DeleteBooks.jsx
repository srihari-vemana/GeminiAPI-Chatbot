import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBooks = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [book, setBook] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("An error occured in Loading the book")
        setLoading(false);
      });
  }, [])

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occured, please check the console')
        console.log(error);
      });  
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <div className='flex justify-center'><h1 className='text-3xl my-4'>Delete Book</h1></div>
      {loading ? <Spinner/> : ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button 
          className='text-xl bg-red-600 text-white m-8 w-1/2 rounded-xl p-1'
          onClick={handleDeleteBook}        
        >
          Yes, Delete it

        </button>

        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title</span>
          <span className='text-xl'>{book.title}</span>
        </div>

        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Author</span>
          <span className='text-xl'>{book.author}</span>
        </div>

        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
          <span className='text-xl'>{book.publishYear}</span>
        </div>

      </div>
    </div>
  )
}

export default DeleteBooks