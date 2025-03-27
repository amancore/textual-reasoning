import React, { useState, useRef, useEffect } from "react";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";

const Index = () => {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const chatEndRef = useRef(null);

	// Function to scroll to the latest message
	const scrollToBottom = () => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const sendMessage = async (content) => {
		console.log("Sending message:", content);
		if (!content.trim()) return;

		const userMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			const response = await fetch("http://localhost:3000/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: content }),
			});

			if (!response.ok) throw new Error(`Error: ${response.status}`);

			const data = await response.json();
			console.log("Received response:", data.choices[0].message.content);

			const assistantMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: data.choices[0].message.content || "I'm not sure how to respond.",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, assistantMessage]);

		} catch (error) {
			console.error("Failed to send message:", error);

			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: "Sorry, I can't connect right now. Try again later.",
					timestamp: new Date(),
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen w-full bg-gray-900 text-white relative overflow-hidden">
			<header className="py-4 px-6 border-b border-gray-800 flex items-center justify-center bg-gray-900">
				<h1 className="text-xl font-semibold flex items-center gap-2">
					<span className="text-3xl">Textual Reasoning</span>
				</h1>
			</header>
			<main className="flex-1 flex flex-col overflow-hidden max-w-6xl w-full mx-auto">
				<ChatContainer messages={messages} />
				<div ref={chatEndRef} /> {/* Auto-scroll to latest message */}
				<ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
			</main>
			<div className="absolute top-0 right-0 w-96 h-96 bg-purple-700/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
		</div>
	);
};

export default Index;