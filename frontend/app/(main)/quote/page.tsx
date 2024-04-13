"use client";

import Image from 'next/image'
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader } from "@/components/loader";

import { formSchema } from "./constants";

const QuotePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [showMessage, setShowMessage] = useState(false);
	const photoUrl = '/empty.png'

	// main
	const handleSubmit = () => {
		setShowMessage(true);
		setIsLoading(true)

		// Simulate loading for 1 second
		setTimeout(() => {
			setIsLoading(false);
			setMessages([
				...messages,
				{ content: 'this is a test', imageUrl: photoUrl } // Assuming photoUrl is the URL of the photo
			]);
			setMessage(''); // Clear the input field
		}, 1000);
	};

	// Improve
	const handleButtonClick = () => {
		const inputValue = message + ' end'; // Append "end" to the input value
		setMessage(inputValue);
		setMessages([...messages, inputValue]);
	};

	const router = useRouter();
	// type messages = {
	// 	role: string;
	// 	content: string;
	// };
	// // this will get the message from resopnse and store it not what i want
	// const [messages, setMessages] = useState<messages[]>([]);

	// const form = useForm<z.infer<typeof formSchema>>({
	// 	resolver: zodResolver(formSchema),
	// 	defaultValues: {
	// 		prompt: "",
	// 	},
	// });


	// const handleSubmit = () => {
	// 	setShowMessage(true);
	// 	setShowLoading(true)
	// 	setTimeout(() => {
	// 		setShowLoading(false);
	// 		setMessages([...messages, message]);
	// 		setMessage('');
	// 	}, 1000); // 1 second timer
	// };

	// generate this later for buttons
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// try {
		// 	const userMessage = { role: "user", content: values.prompt };

		// 	const response = await axios.post("/api/code", { messages: userMessage });

		// 	const res = { role: "assistant", content: response.data };

		// 	setMessages((current) => [...current, userMessage, res]);

		// } catch (error: any) {
		// 	if (error?.response?.status === 403) {
		// 		return
		// 	} else {
		// 		toast.error("Something went wrong.");
		// 	}
		// } finally {
		// 	router.refresh();
		// }
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

				{/* This is for quote */}
				<div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
					<div className="ml-2 flex-grow">
						<div className="-mt-1">
							<span className="text-sm font-semibold">User</span>
						</div>
						<p className="text-sm">Strangers from distant lands, friends of old. You have been summoned here to answer the threat of Mordor. Middle-Earth stands upon the brink of destruction. None can escape it. You will unite or you will fall. Each race is bound to this fate–this one doom. (gestures to the pedestal) Bring forth the Ring, Frodo.</p>
					</div>
					<div className="ml-2 flex-shrink-0">
						<img src="/empty.png" alt="Image" className="h-80 w-80 rounded-full" />
					</div>
				</div>

				{/* Image by bot */}
				{/* <div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
					<div className="ml-2">
						<div className="-mt-1">
							<span className="text-sm font-semibold">User</span>
						</div>
					</div>
					<div className="ml-2">
						<img src="/empty.png" alt="Image" className="h-80 w-80 rounded-full" />
					</div>
				</div> */}

				<div className="flex flex-col items-center mt-2">

				</div>
				{/* <div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
					<div className="ml-2">
						<div className="-mt-1">
							<span className="text-sm font-semibold">User</span>
							<span className="ml-1 text-xs text-gray-500">01:26</span>
						</div>
						<p className="text-sm">Strangers from distant lands, friends of old. You have been summoned here to answer the threat of Mordor. Middle-Earth stands upon the brink of destruction. None can escape it. You will unite or you will fall. Each race is bound to this fate–this one doom. (gestures to the pedestal) Bring forth the Ring, Frodo.</p>

					</div>
				</div> */}

				{/* {showMessage && !isLoading && (
					<div className="flex px-4 py-3">
						<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
						<div className="ml-2">
							<div className="-mt-1">
								<span className="text-sm font-semibold">User</span>
								<span className="ml-1 text-xs text-gray-500">01:26</span>
							</div>
							<p className="text-sm">{message}</p>
						</div>
					</div>
				)} */}

				{showMessage && messages.map((msg, index) => (
					<div key={index} className="flex px-4 py-3">
						<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
						<div className="ml-2 flex-grow">
							<div className="-mt-1">
								<span className="text-sm font-semibold">User</span>
							</div>
							<p className="text-sm">{msg.content}</p>
						</div>
						<div className="ml-2 flex-shrink-0">
							<img src={msg.imageUrl} alt="Image" className="h-80 w-80 rounded-full" />
						</div>
					</div>
				))}

			</div>


			<div className="h-12 bg-white px-5 pb-4 text-x ">
				<div className="flex items-center border-2 border-gray-300 rounded-sm p-1">
					<button disabled={isLoading} value={message} onClick={handleSubmit} onChange={(e) => setMessage(e.target.value)} className="flex-grow text-sm px-3 border-l border-gray-300 ml-1 bg-violet-500" style={{ resize: 'none' }} placeholder="Message council-of-elrond">
						Send
					</button>

				</div>
			</div>
		</>
	);
};

export default QuotePage;