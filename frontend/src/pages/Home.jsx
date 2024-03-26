import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ChatBotNew from '../components/home/ChatBotNew'
import Button from '@mui/material/Button'
import ForumIcon from '@mui/icons-material/Forum'

const Home = () => {
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  return (
    <div className='p-4'>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>7078 Chatbot Build Environment</h1>
      </div>

      <div>
        <div style={{ position: 'relative', zIndex: 30, marginTop: '5%', marginLeft: '73%' }}>
          {showChat && (<ChatBotNew onClose={() => setShowChat(false)} />)}
        </div>
      </div>

      <Button
        variant="contained"
        size="large"
        sx={{ borderRadius: "50px", padding: "1%", position: "absolute", bottom: "5%", right: "2%", backgroundColor: '#117C58', ":hover": { backgroundColor: '#117C58' }, ":active": { backgroundColor: '#48C399' } }}
        onClick={() => setShowChat((prev) => !prev)}
      >
        <ForumIcon sx={{ fontSize: '30px' }} />
      </Button>

    </div>
  )
}

export default Home