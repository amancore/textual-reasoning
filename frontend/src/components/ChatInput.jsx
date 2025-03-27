import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import LoadingIndicator from "./LoadingIndicator";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

	return (
		<div className="sticky bottom-0 w-full bg-gray-900/80 backdrop-blur-md py-2 rounded-md border-gray-700">
			<form
				onSubmit={handleSubmit}
				className="bg-gray-800 rounded-2xl transition-all duration-200 shadow-lg mx-auto max-w-3xl relative overflow-hidden"
			>
				<div className="absolute top-0 left-0 w-full h-full bg-gray-700/10 pointer-events-none"></div>
				<div className="relative flex items-center">
					<div className="absolute left-3 top-1/2 -translate-y-1/2">
						<Sparkles size={18} className="text-blue-400/80" />
					</div>
					<textarea
						ref={textareaRef}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Type a message..."
						className="w-full bg-transparent text-white resize-none min-h-[40px] max-h-[200px] py-4 pl-10 pr-14 focus:outline-none placeholder:text-gray-400"
						disabled={isLoading}
						rows={1}
					/>

					<div className="absolute right-3 bottom-3">
						{isLoading ? (
							<div className="w-9 h-9 flex items-center justify-center">
								<LoadingIndicator />
							</div>
						) : (
							<button
								type="submit"
								disabled={message.trim() === "" || isLoading}
								className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
							>
								<Send size={16} />
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default ChatInput;
