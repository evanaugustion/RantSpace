import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        if (input.trim()) {
            // Add the user's message (right-aligned)
            setMessages((prevMessages) => [...prevMessages, { text: input, align: "right" }]);
            setInput("");

            // Simulate fetching a response from the database (left message)
            setTimeout(() => {
                const dbResponse = { text: "This is a response from the database!", align: "left" };
                setMessages((prevMessages) => [...prevMessages, dbResponse]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen items-center bg-gray-800 p-4">
            <div className="w-full h-full bg-black p-4 rounded-lg shadow-lg">
                <div className="h-full w-3/4 mx-auto flex-col space-y-4 overflow-y-auto h-80 px-4 py-6 bg-transparent rounded-md">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.align === "right" ? "justify-end" : "justify-start"}`}>
                            <p className={`px-4 py-2 rounded-lg text-sm ${
                                message.align === "right"
                                    ? "border border-white bg-transparent text-white rounded-br-none"
                                    : "bg-gray-200 text-black rounded-bl-none"
                                }`}>
                                {message.text}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center left-1/2 -translate-x-1/2 absolute bottom-14 w-3/4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg text-sm border bg-transparent text-white outline-none placeholder-gray-400"
                        placeholder="Type your rant..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 px-4 py-2 bg-white text-black rounded-lg text-sm"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
