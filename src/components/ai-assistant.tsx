
import React, { useState } from "react";
import { Bot, X, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function AiAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  
  // Get contextual recommendations based on current route
  const getContextualRecommendation = () => {
    const path = location.pathname;
    
    if (path === "/" || path === "/portfolio") {
      return "Would you like me to analyze your portfolio for optimization opportunities?";
    } else if (path === "/home") {
      return "I notice your mortgage rate is above market average. Would you like to explore refinancing options?";
    } else if (path === "/vehicles") {
      return "Your vehicle depreciation is better than average. Great job maintaining its value!";
    } else if (path === "/valuables") {
      return "Have you considered insuring your valuable collection? I can help analyze options.";
    } else if (path === "/family") {
      return "I can help set up financial goals for family members. Would you like suggestions?";
    }
    
    return "How can I help you with your financial goals today?";
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && messages.length === 0) {
      // Add initial assistant message when expanding for the first time
      const initialMessage = {
        id: Date.now().toString(),
        text: getContextualRecommendation(),
        sender: "assistant" as const,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your financial data to provide personalized advice. This is a simulated response, but in a real implementation, this would connect to an AI service.",
        sender: "assistant" as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className={cn(
      "fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 transition-all duration-300 ease-in-out z-20",
      isExpanded ? "h-80" : "h-12"
    )}>
      {/* Header bar */}
      <div 
        onClick={handleToggleExpand}
        className="h-12 flex items-center justify-between px-4 cursor-pointer"
      >
        <div className="flex items-center">
          <Bot size={20} className="text-finance-accent" />
          <span className="ml-2 font-medium text-finance-dark">AI Financial Assistant</span>
        </div>
        <div>
          {isExpanded ? 
            <ChevronDown size={20} className="text-gray-500" /> : 
            <ChevronUp size={20} className="text-gray-500" />
          }
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="flex flex-col h-[calc(100%-3rem)] p-4">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "mb-2 p-2 rounded-lg max-w-[85%]", 
                  message.sender === "user" 
                    ? "bg-purple-100 ml-auto" 
                    : "bg-gray-100"
                )}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          {/* Input area */}
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-finance-accent"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-finance-accent hover:bg-finance-accent/80 text-white rounded-l-none"
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
