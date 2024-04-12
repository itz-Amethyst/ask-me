"use client";

import * as z from "zod";
import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";

import { formSchema } from "./constants";
import Image from 'next/image'

const NFTPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [showMessage, setShowMessage] = useState(false);

	// main
	const handleSubmit = () => {
		setShowMessage(true);
		setIsLoading(true)

		// Simulate loading for 1 second
		setTimeout(() => {
			setIsLoading(false);
			setMessages([...messages, message]); // Append the new message to the existing array
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
				<div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
					<div className="ml-2">
						<div className="-mt-1">
							<span className="text-sm font-semibold">User</span>
						</div>
					</div>
					<div className="ml-2">
						<img src="/empty.png" alt="Image" className="h-80 w-80 rounded-full" />
					</div>
				</div>

				<div className="flex flex-col items-center mt-2">

				</div>
				<div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
					<div className="ml-2">
						<div className="-mt-1">
							<span className="text-sm font-semibold">User</span>
							<span className="ml-1 text-xs text-gray-500">01:26</span>
						</div>
						<p className="text-sm">Strangers from distant lands, friends of old. You have been summoned here to answer the threat of Mordor. Middle-Earth stands upon the brink of destruction. None can escape it. You will unite or you will fall. Each race is bound to this fate–this one doom. (gestures to the pedestal) Bring forth the Ring, Frodo.</p>

					</div>
				</div>

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
						<div className="ml-2">
							<div className="-mt-1">
								<span className="text-sm font-semibold">User</span>
								<span className="ml-1 text-xs text-gray-500">01:26</span>
							</div>
							<p className="text-sm">{msg}</p>
						</div>
					</div>
				))}

			</div>


			<div className="h-12 bg-white px-5 pb-4 text-x">
				<div className="flex items-center border-2 border-gray-300 rounded-sm p-1">
					<button disabled={isLoading} className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200" onClick={handleButtonClick}>
						<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</button>
					<input disabled={isLoading} value={message} onChange={(e) => setMessage(e.target.value)} className="flex-grow text-sm px-3 border-l border-gray-300 ml-1" style={{ resize: 'none' }} placeholder="Message council-of-elrond" cols="" rows="1"></input>


					<button disabled={isLoading} className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200" onClick={handleSubmit}>
						<svg className="h-4 w-4 transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
						</svg>
					</button>
				</div>
			</div>
		</>
	)

	return (
		<div>
			<Heading
				title="Code Generation"
				description="Generate code using descriptive text."
				icon={Code}
				iconColor="text-green-700"
				bgColor="bg-green-700/10"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isLoading}
												placeholder="Simple toggle button using react hooks."
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								type="submit"
								disabled={isLoading}
								size="icon"
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="No conversation started." />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message, i) => (
							<div
								key={i + "77"}
								className={cn(
									"p-8 w-full flex items-start gap-x-8 rounded-lg",
									message.role === "user"
										? "bg-white border border-black/10"
										: "bg-muted"
								)}
							>
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code className="bg-black/10 rounded-lg p-1" {...props} />
										),
									}}
									className="text-sm overflow-hidden leading-7"
								>
									{message.content || ""}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NFTPage;
