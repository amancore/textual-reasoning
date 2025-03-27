import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
const ChatContainer = ({ messages }) => {
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="chat-container flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-900 text-black dark:text-white custom-scrollbar max-w-6xl">
			{Array.isArray(messages) && messages.length === 0 ? (
				<div className="flex items-center justify-center h-full">
					<div className="text-muted-foreground dark:text-gray-400 text-center">
						<p className="text-lg">No messages yet</p>
						<p className="text-sm">Type a message to start the conversation</p>
					</div>
				</div>
			) : (
				messages?.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))
			)}
			<div ref={messagesEndRef} className="h-1"></div>
		</div>
	);
};

export default ChatContainer;