import { Box, Button, Input } from '@mui/material';
import React from 'react'
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ChatBotNew = ({ onClose }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const clear = async () => {
        setError("");
        setError("");
        setChatHistory([]);
        return;
    };

    const getResponse = async () => {
        if (!value) {
            setError("Error. Please ask a question!");
            return;
        }
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    history: chatHistory,
                    message: value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch('http://localhost:5555/gemini', options)
            const data = await response.text()
            console.log(data)
            setChatHistory(oldChatHistory => [...oldChatHistory, {
                role: "You",
                parts: value
            },
            {
                role: "7078",
                parts: data
            },
            ])
            setValue("")

        } catch (error) {
            console.error(error);
            setError("Something went wrong! Please try again later.");
        }
    };


    return (
        <Box
            className="chatbot"
            sx={{ display: 'flex', justifyContent: 'center', padding: 2, borderRadius: '25px', width: '27vw', minWidth: '200px', maxHeight: '500px', backgroundColor: '#56DEB0' }}
        >
            <Box
                className="inner-box"
                sx={{ width: '100%' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontWeight: 400, fontSize: '20px', marginLeft: '5px', padding: '10px' }}>
                        <b> Hi, how can I help you? </b>
                    </p>
                    <Button>
                        <HighlightOffIcon onClick={onClose} sx={{ color: '#117C58' }} />
                    </Button>
                </div>

                <Box
                    className="input-container"
                    sx={{ backgroundColor: '#48C399', width: '100%', padding: '5px', boxSizing: 'border-box', borderRadius: '10px', boxShadow: 'rgba(0,0,82,0.15) 0 2px 4px', display: 'flex' }}
                >
                    <Input
                        sx={{ border: 'none', padding: '3px 4px', fontSize: 'large', fontWeight: 400, outline: 'none', width: '90%', borderRadius: '10px', backgroundColor: 'white' }}
                        value={value}
                        placeholder="Type here.."
                        onChange={(e) => setValue(e.target.value)}
                    />

                    {!error && <Button onClick={getResponse} variant='contained' sx={{ minWidth: '15%', backgroundColor: '#1f8462', color: 'white', borderRadius: '10px', marginLeft: '5px', cursor: 'pointer', ":hover": { backgroundColor: '#117C58' }, ":active": { backgroundColor: '#117C58' } }}><SendIcon /></Button>}
                    {error && <Button onClick={clear} variant='contained' sx={{ minWidth: '15%', backgroundColor: '#1f8462', color: 'white', borderRadius: '10px', marginLeft: '5px', cursor: 'pointer', ":hover": { backgroundColor: '#117C58' }, ":active": { backgroundColor: '#117C58' } }} >Clear</Button>}

                </Box>
                {error && <p>{error}</p>}
                <Box className="search-result" sx={{ overflowY: 'auto', maxHeight: '300px', marginTop: '10px', '&::-webkit-scrollbar': { width: '5px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '50px' }, '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' } }}>
                    {chatHistory.map((chatItem, _index) => <div key={_index} >
                        <p className="answer" style={{ border: 'none', marginTop: '5px', padding: 5, fontSize: 'medium', width: '100%', borderRadius: '10px', backgroundColor: 'white' }}>{chatItem.role} : {chatItem.parts}</p>
                    </div>)}
                </Box>
            </Box>
        </Box >
    )
}

export default ChatBotNew