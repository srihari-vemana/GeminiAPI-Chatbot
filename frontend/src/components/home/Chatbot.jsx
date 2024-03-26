import React from "react";
import { useState } from "react";

const Chatbot = () => {
    const ourHistory = "hello";
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
        <div className="chatbot">
            <div className="inner-box">
                <p className="heading">
                    Hi, how can I help you?
                    {/* <button className="surprise">Surprise Me</button> */}
                </p>
                <div className="input-container">
                    <input
                        value={value}
                        placeholder="Type here.."
                        onChange={(e) => setValue(e.target.value)}
                    />
                    {!error && <button onClick={getResponse}>Ask Me</button>}
                    {error && <button onClick={clear}>Clear</button>}
                </div>
                {error && <p>{error}</p>}
                <div className="search-result">
                    {chatHistory.map((chatItem, _index) => <div key={_index}>
                        <p className="answer">{chatItem.role} : {chatItem.parts}</p>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
