import React, { useState, useEffect } from 'react'
import ChatBotNew from '../components/home/ChatBotNew'
import Button from '@mui/material/Button'
import ForumIcon from '@mui/icons-material/Forum'

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div style={{ padding: '30px' }}>

      <h1 className='text-3xl my-8'>7078 Chatbot Build Environment</h1>

      <div
        style={{
          position: 'relative',
          zIndex: 30,
          marginTop: '7%',
          marginLeft: '73%'
        }}
      >
        {showChat && (<ChatBotNew onClose={() => setShowChat(false)} />)}
      </div>

      <Button
        variant="contained"
        size="large"
        onClick={() => setShowChat((prev) => !prev)}
        sx={{
          borderRadius: "50px",
          padding: "1%",
          position: "absolute",
          bottom: "5%",
          right: "2%",
          backgroundColor: '#117C58',
          ":hover": { backgroundColor: '#117C58' },
          ":active": { backgroundColor: '#48C399' }
        }}
      >
        <ForumIcon sx={{ fontSize: '30px' }} />
      </Button>

    </div >
  )
}

export default Home