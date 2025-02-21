// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { FaUserCircle, FaRobot } from 'react-icons/fa';
// import { FiSend } from 'react-icons/fi';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const apiKey = 'AIzaSyDrZEogRkINfN1ow8T8whhU-_5Wr5AryGs';
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: 'gemini-1.5-flash',
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
// };

// interface Message {
//   id: number;
//   content: string;
//   isBot: boolean;
// }

// const ChatInterface = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 1,
//       content: 'Welcome to FinBot! How can I help you with your investments today?',
//       isBot: true,
//     },
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     // Add user message
//     const userMessage: Message = {
//       id: messages.length + 1,
//       content: inputMessage,
//       isBot: false,
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     try {
//       // Get previous messages excluding the initial bot message
//       const chatHistory = messages.slice(1).map(msg => ({
//         role: msg.isBot ? 'model' : 'user',
//         parts: [{ text: msg.content }],
//       }));

//       const chatSession = model.startChat({
//         generationConfig,
//         history: chatHistory,
//       });

//       // Send only the current user input
//       const result = await chatSession.sendMessage(inputMessage);
//       const response = await result.response;
//       const text = response.text();

//       setMessages((prev) => [
//         ...prev,
//         { id: prev.length + 1, content: text, isBot: true },
//       ]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           content: 'Sorry, I encountered an error. Please try again.',
//           isBot: true
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="flex flex-col h-[80vh] w-[80vw] mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <motion.div
//             key={message.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} items-start gap-2`}
//           >
//             {message.isBot ? (
//               <FaRobot className="text-2xl text-purple-600 mt-1" />
//             ) : (
//               <FaUserCircle className="text-2xl text-blue-600 mt-1" />
//             )}
//             <div
//               className={`max-w-sm p-3 rounded-xl shadow-lg ${
//                 message.isBot ? 'bg-white text-gray-800' : 'bg-blue-600 text-white'
//               }`}
//             >
//               {message.content}
//             </div>
//           </motion.div>
//         ))}
//         {isLoading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex items-center gap-2"
//           >
//             <FaRobot className="text-2xl text-purple-600" />
//             <div className="bg-white p-3 rounded-xl shadow-lg">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100"></div>
//                 <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200"></div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
//         <motion.div className="flex gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Ask me anything about investments..."
//             className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//             disabled={isLoading}
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center"
//           >
//             <FiSend className="text-lg" />
//           </button>
//         </motion.div>
//       </form>
//     </motion.div>
//   );
// };

// export default ChatInterface;

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaRobot } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const groqApiKey = "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";
const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Welcome to **FinBot**! How can I help you with your investments today?',
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatText = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Add a new line before and after headings, and include stickers
        const headingText = part.slice(2, -2);
        const sticker = getStickerForHeading(headingText); // Get a sticker for the heading
        return (
          <div key={index} className="my-4">
            <strong className="text-purple-700 text-2xl block">{headingText}</strong>
            {sticker && <span className="text-3xl">{sticker}</span>}
          </div>
        );
      } else {
        return part;
      }
    });
  };

  // Function to get a sticker for a heading
  const getStickerForHeading = (heading: string) => {
    const stickerMap: { [key: string]: string } = {
      "Welcome": "👋",
      "Investment": "📈",
      "Stocks": "📊",
      "Portfolio": "💼",
      "Risk": "⚠️",
      "Returns": "💰",
      "Advice": "💡",
      "Market": "🌍",
      "Analysis": "🔍",
      "Tips": "✨",
    };
    return stickerMap[heading] || "📝"; // Default sticker if no match
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(1).map(msg => ({
        role: msg.isBot ? 'assistant' : 'user',
        content: msg.content,
      }));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [...chatHistory, { role: 'user', content: inputMessage }],
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: false,
          stop: null
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const botReply = data.choices[0]?.message?.content || 'Sorry, I could not process that request.';

      // Add stickers for headings in the bot's response
      const formattedReply = botReply.replace(/\*\*([^*]+)\*\*/g, (match, heading) => {
        const sticker = getStickerForHeading(heading);
        return `\n**${heading}**\n${sticker}\n`;
      });

      setMessages((prev) => [...prev, { id: prev.length + 1, content: formattedReply, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { id: prev.length + 1, content: 'Error: Unable to process request. Please try again.', isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-[90vh] w-[90vw] mx-auto bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} items-start gap-2`}
          >
            {message.isBot ? (
              <FaRobot className="text-3xl text-purple-600 mt-1" />
            ) : (
              <FaUserCircle className="text-3xl text-blue-600 mt-1" />
            )}
            <div className={`max-w-2xl p-3 rounded-xl shadow-md text-lg font-medium ${message.isBot ? 'bg-white text-gray-900' : 'bg-indigo-600 text-white'}`}>
              {formatText(message.content)}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <FaRobot className="text-3xl text-purple-600" />
            <div className="bg-white p-3 rounded-xl shadow-md">
              <div className="flex space-x-1 animate-pulse">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <motion.div className="flex gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about investments..."
            className="flex-1 p-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading} className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all disabled:opacity-50 flex items-center justify-center">
            <FiSend className="text-2xl" />
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ChatInterface;