import React from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatMessage = ({ message }) => {
	const isUser = message.role === "user";

	return (
		<div
			className={`animate-fade-in flex w-full items-start gap-4 py-4 ${isUser ? "justify-end" : "justify-start"
				}`}
		>
			{!isUser && (
				<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
					<Sparkles size={18} className="text-primary animate-pulse-minimal" />
				</div>
			)}
			<div
				className={`flex max-w-[65%] md:max-w-[65%] flex-col gap-2 rounded-2xl px-4 py-3 transition-opacity ${isUser
					? "bg-gradient-to-r from-indigo-600 to-purple-600 text-primary-foreground shadow-lg shadow-purple-500/20"
					: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md"
					}`}
			>
				<div className="text-xl md:text-base font-SF Pro leading-relaxed">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							code({ inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<SyntaxHighlighter
										style={oneDark}
										language={match[1]}
										PreTag="div"
										className="rounded-lg p-2"
									>
										{String(children).replace(/\n$/, "")}
									</SyntaxHighlighter>
								) : (
									<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded" {...props}>
										{children}
									</code>
								);
							},
						}}
					>
						{message.content}
					</ReactMarkdown>
				</div>
				<div
					className={`text-xs opacity-70 self-end flex items-center gap-1 ${isUser ? "text-primary-foreground/80" : "text-gray-600 dark:text-gray-400"
						}`}
				>
					{new Date(message.timestamp).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
					})}
				</div>
			</div>
			{isUser && (
				<div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
					<MessageSquare size={18} className="text-white" />
				</div>
			)}
		</div>
	);
};

export default ChatMessage;

