"use client";

import Image from 'next/image'
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader } from "@/components/loader";


const QuotePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [showMessage, setShowMessage] = useState(false);
	const photoUrl = '/empty.png'

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault(); // Prevent the default form submission behavior
			handleSubmit(); // Call the handleSubmit function
		}
	};

	// main
	const handleSubmit = () => {
		setShowMessage(true);
		setIsLoading(true)

		axios.get('http://127.0.0.1:8000/api/quote')
			.then(response => {
                setIsLoading(false);
				console.log(response)

				const data = response.data
                // Update the messages state if needed
                const botMessage = { content: data.content, author: data.author , author_image: `data:image/png;base64, ${data.author_image}` };
                setMessages([...messages, botMessage]);
				console.log(messages)
			})
			.catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
                setShowMessage(false);
            });


		setMessage('');
		
	};

	// Improve
	const handleButtonClick = () => {
		const inputValue = message + ' end'; // Append "end" to the input value
		setMessage(inputValue);
		setMessages([...messages, inputValue]);
	};


	return (
		<>
			{isLoading && (
				<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
					<Loader />
				</div>
			)}
			<div className="flex flex-col flex-grow overflow-auto">
				<div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300">
						<div className="w-10 h-10 relative animate-pulse">
							<Image src="/loading_one_icon_155179.png" alt="Sam" className="h-6 w-6 rounded-full" fill />
						</div>
					</div>
					<div className="ml-2">
						<div className="-mt-1 flex items-center">
							<span className="text-sm font-semibold">BOT</span>

						</div>
						<p className="text-sm">Anyone know if Frodo is awake yet?</p>
						<div className="flex space-x-2 mt-1">
							<button className="flex items-center pl-1 pr-2 h-5 bg-gray-300 hover:bg-gray-400 rounded-full text-xs">
								<span>🔥</span>
								<span className="ml-1 font-medium">2</span>
							</button>
						</div>
					</div>
				</div>


				<div className="flex flex-col items-center mt-2">

				</div>
		

				{showMessage && messages.map((msg, index) => (
					<div key={index} className="flex px-4 py-3">
						<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
						<div className="ml-2 flex-grow">
							<div className="-mt-1">
								<span className="text-sm font-semibold">User</span>
							</div>
							<p className="text-sm">{msg.content} - {msg.author}</p>
						</div>
						<div className="ml-2 flex-shrink-0">
							<img src={msg.author_image} alt="Image" className="h-80 w-80 rounded-sm" />
						</div>
					</div>
				))}

			</div>


			<div className="h-12 bg-white px-5 pb-4 text-x ">
				<div className="flex items-center border-2 border-gray-300 rounded-sm p-1">
					<button disabled={isLoading} value={message} onKeyDown={handleKeyDown} onClick={handleSubmit} onChange={(e) => setMessage(e.target.value)} className="flex-grow text-sm px-3 border-l border-gray-300 ml-1 bg-violet-500" style={{ resize: 'none' }} placeholder="Message council-of-elrond">
						Send
					</button>

				</div>
			</div>
		</>
	);
};

export default QuotePage;
