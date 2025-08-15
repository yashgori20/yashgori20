import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Plus,
    Search,
    MessageSquare,
    User,
    Briefcase,
    Code,
    BrainCircuit,
    Mail,
    ChevronDown,
    Settings,
    HelpCircle,
    Palette,
    Database,
    Instagram,
    Linkedin,
    Github,
    X
} from 'lucide-react';
import { resumeData } from '@/data/resume';
import XLogo from '@/components/XLogo';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';

const Demo1 = () => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showPersonalityModal, setShowPersonalityModal] = useState(false);
    const [showMemoryModal, setShowMemoryModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);

    // Portfolio sections as "chats"
    const portfolioChats = [
        { id: 'about', title: 'About Me', icon: User, description: 'Learn about my background' },
        { id: 'experience', title: 'Work Experience', icon: Briefcase, description: 'My professional journey' },
        { id: 'projects', title: 'Projects', icon: Code, description: 'Things I\'ve built' },
        { id: 'skills', title: 'Skills & Expertise', icon: BrainCircuit, description: 'My technical abilities' },
        { id: 'contact', title: 'Contact Me', icon: Mail, description: 'Get in touch' },
    ];

    const handleChatClick = (chatId: string) => {
        setSelectedChat(chatId);
        // Here you would implement the actual chat functionality
    };

    return (
        <div className="h-screen bg-[#212121] text-white flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#171717] border-r border-gray-700 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-700">
                    <Button
                        className="w-full justify-start bg-transparent border border-gray-600 hover:bg-gray-700 text-white"
                        onClick={() => setSelectedChat(null)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New chat
                    </Button>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search chats"
                            className="pl-10 bg-transparent border-gray-600 text-white placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Navigation Tools */}
                <div className="px-4 mb-4">
                    <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Portfolio</div>
                    <div className="space-y-1">
                        {portfolioChats.map((chat) => {
                            const Icon = chat.icon;
                            return (
                                <button
                                    key={chat.id}
                                    onClick={() => handleChatClick(chat.id)}
                                    className={`w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors group ${selectedChat === chat.id ? 'bg-gray-700' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-4 w-4 text-gray-400 group-hover:text-white" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-white truncate">
                                                {chat.title}
                                            </div>
                                            <div className="text-xs text-gray-400 truncate">
                                                {chat.description}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Chats */}
                <div className="px-4 mb-4 flex-1">
                    <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Recent</div>
                    <div className="space-y-1">
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="h-4 w-4 text-gray-400" />
                                <div className="text-sm text-white truncate">AI Product Strategy Discussion</div>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="h-4 w-4 text-gray-400" />
                                <div className="text-sm text-white truncate">Technical Skills Overview</div>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="h-4 w-4 text-gray-400" />
                                <div className="text-sm text-white truncate">Project Collaboration Ideas</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="p-4 border-t border-gray-700">
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={resumeData.profileImage} alt="Yash Gori" />
                                <AvatarFallback>YG</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left">
                                <div className="text-sm font-medium">Yash Gori</div>
                                <div className="text-xs text-gray-400">AI Product Lead</div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Profile Dropdown */}
                        {showProfileDropdown && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#2a2a2a] border border-gray-600 rounded-lg shadow-lg">
                                <div className="p-4 border-b border-gray-600">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={resumeData.profileImage} alt="Yash Gori" />
                                            <AvatarFallback>YG</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">Yash Gori</div>
                                            <div className="text-sm text-gray-400">AI Product Lead</div>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-2">
                                        <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Linkedin className="h-4 w-4" />
                                            </Button>
                                        </a>
                                        <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Github className="h-4 w-4" />
                                            </Button>
                                        </a>
                                        <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <XLogo className="h-4 w-4" />
                                            </Button>
                                        </a>
                                        <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <HuggingFaceLogo className="h-4 w-4" />
                                            </Button>
                                        </a>
                                        <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Instagram className="h-4 w-4" />
                                            </Button>
                                        </a>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <button
                                        onClick={() => setShowPersonalityModal(true)}
                                        className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left"
                                    >
                                        <Palette className="h-4 w-4" />
                                        <span className="text-sm">Change Chatbot Personality</span>
                                    </button>
                                    <button
                                        onClick={() => setShowMemoryModal(true)}
                                        className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left"
                                    >
                                        <Database className="h-4 w-4" />
                                        <span className="text-sm">Memory & Preferences</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left">
                                        <HelpCircle className="h-4 w-4" />
                                        <span className="text-sm">Help & Support</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-left">
                                        <Settings className="h-4 w-4" />
                                        <span className="text-sm">Settings</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="border-b border-gray-700 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-semibold">YashBot 3000 🚀</h1>
                            <Badge variant="secondary" className="bg-purple-600 text-white">
                                Your AI Product Buddy
                            </Badge>
                        </div>
                        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                            Upgrade your plan
                        </Button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-2xl w-full px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-semibold mb-4">Ready to dive into Yash's world? 🌟</h2>
                            <p className="text-gray-400">
                                I'm basically Yash's digital twin (but cooler). Ask me anything about his projects, skills, or that time he secured Microsoft funding! 💰
                            </p>
                        </div>

                        {/* Input */}
                        <div className="relative">
                            <Input
                                placeholder="Ask anything..."
                                className="w-full bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400 pr-12 py-4 text-lg"
                            />
                            <Button
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200"
                            >
                                →
                            </Button>
                        </div>

                        {/* Suggestions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                            <Card className="bg-[#2a2a2a] border-gray-600 hover:bg-[#333] cursor-pointer transition-colors">
                                <CardContent className="p-4">
                                    <div className="text-sm font-medium mb-1">🤖 Show me his AI wizardry</div>
                                    <div className="text-xs text-gray-400">RAG systems, LLMs, and other cool stuff</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#2a2a2a] border-gray-600 hover:bg-[#333] cursor-pointer transition-colors">
                                <CardContent className="p-4">
                                    <div className="text-sm font-medium mb-1">💼 What's his secret to product success?</div>
                                    <div className="text-xs text-gray-400">From intern to AI Product Lead</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#2a2a2a] border-gray-600 hover:bg-[#333] cursor-pointer transition-colors">
                                <CardContent className="p-4">
                                    <div className="text-sm font-medium mb-1">🚀 Want to build something together?</div>
                                    <div className="text-xs text-gray-400">Let's talk collaboration & opportunities</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#2a2a2a] border-gray-600 hover:bg-[#333] cursor-pointer transition-colors">
                                <CardContent className="p-4">
                                    <div className="text-sm font-medium mb-1">Show me his technical skills</div>
                                    <div className="text-xs text-gray-400">Dive into his expertise</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 text-center">
                    <p className="text-xs text-gray-400">
                        YashBot 3000 can make mistakes (but rarely does 😉). Consider checking important information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Demo1;