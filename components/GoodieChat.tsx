import React, { useState, useRef, useEffect } from 'react';
import { askGoodieStream } from '../services/geminiService';
import MessageIcon from './icons/MessageIcon';
import SendIcon from './icons/SendIcon';
import CloseIcon from './icons/CloseIcon';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

// A simple and safe component to render basic Markdown
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const processInlineFormatting = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const blocks = text.split('\n\n').filter(block => block.trim() !== '');

  return (
    <div className="prose-sm text-brand-text leading-relaxed">
      {blocks.map((block, index) => {
        // Is it a list?
        if (block.startsWith('- ')) {
          const listItems = block.split('\n').map((item, i) => (
            <li key={i} className="mb-1">
              {processInlineFormatting(item.replace(/^- /, ''))}
            </li>
          ));
          return <ul key={index} className="list-disc pl-5 my-2 space-y-1">{listItems}</ul>;
        }

        // Is it a heading?
        if (block.startsWith('### ')) {
          return <h3 key={index} className="text-md font-bold font-heading mt-3 mb-1">{processInlineFormatting(block.substring(4))}</h3>
        }
        if (block.startsWith('## ')) {
          return <h2 key={index} className="text-lg font-bold font-heading mt-4 mb-2">{processInlineFormatting(block.substring(3))}</h2>
        }

        // Otherwise, it's a paragraph
        return <p key={index} className="mb-2 last:mb-0">{processInlineFormatting(block)}</p>;
      })}
    </div>
  );
};


const GoodieChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! I'm Goodie, your friendly assistant for Goodsteps Academy. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const stream = await askGoodieStream(input);
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    
    let assistantResponse = '';
    setMessages(prev => [...prev, { role: 'assistant', text: '' }]);
    
    reader.read().then(function processText({ done, value }): any {
      if (done) {
        setIsLoading(false);
        return;
      }

      const chunk = decoder.decode(value, { stream: true });
      assistantResponse += chunk;
      
      setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
              return [...prev.slice(0, -1), { ...lastMessage, text: assistantResponse }];
          }
          return prev;
      });

      return reader.read().then(processText);
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brand-purple text-white p-4 rounded-full shadow-lg hover:bg-brand-purple/90 transition-transform transform hover:scale-110 z-50"
        aria-label="Chat with Goodie"
      >
       {isOpen ? <CloseIcon /> : <MessageIcon />}
      </button>

      <div className={`fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[550px] bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col z-50 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <header className="p-4 border-b bg-brand-purple/5">
            <h3 className="font-semibold text-lg font-heading text-brand-purple">Goodie — Parent Assistant</h3>
          </header>
          <main className="flex-1 p-4 overflow-y-auto space-y-4 bg-brand-background">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center flex-shrink-0">G</div>}
                <div className={`max-w-[80%] rounded-xl px-4 py-3 ${m.role === 'user' ? 'bg-brand-red text-white rounded-br-none' : 'bg-white text-brand-text shadow-sm rounded-bl-none'}`}>
                  {m.role === 'user' ? m.text : <SimpleMarkdown text={m.text} />}
                  {isLoading && m.role === 'assistant' && i === messages.length -1 && <div className="flex items-center justify-center space-x-1 mt-2">
                      <span className="inline-block w-2 h-2 bg-brand-purple/50 rounded-full animate-bounce delay-0"></span>
                      <span className="inline-block w-2 h-2 bg-brand-purple/50 rounded-full animate-bounce delay-150"></span>
                      <span className="inline-block w-2 h-2 bg-brand-purple/50 rounded-full animate-bounce delay-300"></span>
                    </div>}
                </div>
              </div>
            ))}
             <div ref={messagesEndRef} />
          </main>
          <form onSubmit={handleSend} className="border-t flex p-2 bg-white/70 backdrop-blur-sm">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fees, admissions..."
              className="flex-1 px-4 py-2 text-sm bg-gray-100 outline-none border border-transparent rounded-full focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
              disabled={isLoading}
            />
            <button type="submit" className="ml-2 p-2 text-white bg-brand-purple rounded-full hover:bg-brand-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
              <SendIcon />
            </button>
          </form>
          <footer className="text-center p-2 border-t bg-white/70 backdrop-blur-sm rounded-b-2xl">
            <p className="text-xs text-gray-400">
              Built By <a href="https://julishasolutions.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-500 hover:text-brand-purple transition-colors">Julisha Solutions</a>
            </p>
          </footer>
        </div>
    </>
  );
};

export default GoodieChat;