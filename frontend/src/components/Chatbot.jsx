import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Phone, PhoneOff, Mic, MicOff, Lightbulb, Calendar, Users, Briefcase, Trophy, Activity, Clock, ChevronRight, Heart, Star, TrendingUp, MapPin, Link2, Share2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';
import Vapi from "@vapi-ai/web";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [callStatus, setCallStatus] = useState('');
    const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
    const [lastSpokenText, setLastSpokenText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [autoVoiceEnabled, setAutoVoiceEnabled] = useState(false); // Auto-voice disabled by default
    const [userPreferences, setUserPreferences] = useState({
        interests: [],
        branch: '',
        year: '',
        name: ''
    });
    const [conversationStats, setConversationStats] = useState({
        messageCount: 0,
        topicsDiscussed: new Set()
    });
    const [typingSpeed, setTypingSpeed] = useState(30);
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const [pendingCorrection, setPendingCorrection] = useState(null);

    const quickReplies = [
        "Events 🎉",
        "Exams 📅", 
        "Clubs 🎸",
        "Placements 💼",
        "Sports ⚽",
        "Achievements 🏆",
    ];

    const smartSuggestions = [
        { icon: Calendar, text: "Upcoming Events", category: "events" },
        { icon: TrendingUp, text: "Latest Placements", category: "placements" },
        { icon: Users, text: "Club Activities", category: "clubs" },
        { icon: Trophy, text: "Recent Achievements", category: "achievements" },
        { icon: Activity, text: "Sports Updates", category: "sports" },
        { icon: Clock, text: "Exam Schedules", category: "exams" }
    ];

    const messagesEndRef = useRef(null);
    const formRef = useRef(null);
    const vapiRef = useRef(null);

    // Add sweet voice call animations
    const [callAnimations, setCallAnimations] = useState({
        waves: false,
        pulse: false,
        connecting: false
    });

    // Update call animations based on status
    useEffect(() => {
        if (isCalling) {
            setCallAnimations({
                waves: callStatus === 'connected',
                pulse: isAssistantSpeaking,
                connecting: callStatus === 'connecting'
            });
        } else {
            setCallAnimations({ waves: false, pulse: false, connecting: false });
        }
    }, [isCalling, callStatus, isAssistantSpeaking]);

    const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

    // Initialize chat with welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const hour = new Date().getHours();
            let greeting = "Good evening";
            if (hour < 12) greeting = "Good morning";
            else if (hour < 17) greeting = "Good afternoon";

            const personalizedGreeting = userPreferences.name 
                ? `${greeting} ${userPreferences.name}! 👋 I'm NewsBot, your friendly campus assistant for RGUKT Ongole! How can I help you today?`
                : `${greeting}! 👋 I'm NewsBot, your friendly campus assistant for RGUKT Ongole! How can I help you today?`;

            setMessages([{
                id: Date.now(),
                sender: 'bot',
                text: personalizedGreeting,
                timestamp: new Date()
            }]);
        }
    }, [isOpen]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current && !isCalling) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isCalling]);

    // Track user engagement and adapt
    useEffect(() => {
        const timeSinceLastInteraction = Date.now() - lastInteraction;
        
        // Show proactive suggestions after 30 seconds of inactivity
        if (timeSinceLastInteraction > 30000 && messages.length > 2 && !isTyping) {
            setShowSuggestions(true);
        }
    }, [messages, isTyping, lastInteraction]);

    const speakText = (text) => {
        if (!autoVoiceEnabled) return;
        
        // Clean text: remove emojis and symbols, keep only letters, numbers, and basic punctuation
        const cleanText = text
            .replace(/[^\w\s.,!?;:'"-]/g, '') // Remove symbols and emojis
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim();
        
        if (!cleanText) return;
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Sweet voice settings
        utterance.rate = 0.85; // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher pitch (more sweet)
        utterance.volume = 0.9; // Clear but not too loud
        
        // Get sweet voice
        const voices = speechSynthesis.getVoices();
        const SweetVoice = voices.find(voice => 
            voice.name.includes('Samantha') || 
            voice.name.includes('Google') ||
            voice.name.includes('Female') ||
            voice.name.includes('Zira')
        ) || voices[0]; // Fallback to first voice
        
        utterance.voice = SweetVoice;
        
        // Add pauses for better clarity
        utterance.text = cleanText
            .replace(/\./g, '. ') // Add pause after periods
            .replace(/\?/g, '? ') // Add pause after questions
            .replace(/!/g, '! '); // Add pause after exclamations
        
        speechSynthesis.speak(utterance);
    };
    useEffect(() => {
        const topics = new Set();
        messages.forEach(msg => {
            if (msg.sender === 'user') {
                const text = msg.text.toLowerCase();
                if (text.includes('event')) topics.add('events');
                if (text.includes('placement')) topics.add('placements');
                if (text.includes('club')) topics.add('clubs');
                if (text.includes('sport')) topics.add('sports');
                if (text.includes('exam')) topics.add('exams');
                if (text.includes('achievement')) topics.add('achievements');
            }
        });
        setConversationStats(prev => ({
            ...prev,
            messageCount: messages.length,
            topicsDiscussed: topics
        }));
    }, [messages]);

    // Audio call timer
    useEffect(() => {
        let interval;
        if (isCalling && callStatus === 'connected') {
            interval = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCalling, callStatus]);

    // Vapi integration
    useEffect(() => {
        if (!VAPI_PUBLIC_KEY || !VAPI_ASSISTANT_ID) return;

        if (!vapiRef.current) {
            vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
        }

        const vapi = vapiRef.current;

        vapi.on('call-start', () => {
            setCallStatus('connected');
            setIsCalling(true);
        });

        vapi.on('call-end', () => {
            setIsCalling(false);
            setCallStatus('');
            setCallDuration(0);
            setIsMuted(false);
        });

        vapi.on('speech-start', () => {
            setIsAssistantSpeaking(true);
        });

        vapi.on('speech-end', () => {
            setIsAssistantSpeaking(false);
        });

        vapi.on('error', (error) => {
            console.error('Vapi error:', error);
            setCallStatus('failed');
            setIsCalling(false);
        });

        return () => {
            vapi.removeAllListeners();
        };
    }, [VAPI_PUBLIC_KEY, VAPI_ASSISTANT_ID]);

    const initiateCall = async () => {
        try {
            if (!VAPI_PUBLIC_KEY || !VAPI_ASSISTANT_ID) {
                console.warn('VAPI_PUBLIC_KEY or VAPI_ASSISTANT_ID is missing. Cannot start call.');
                setCallStatus('failed');
                return;
            }

            if (!vapiRef.current) {
                vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
            }

            setIsCalling(true);
            setCallStatus('connecting');
            setCallDuration(0);

            await vapiRef.current.start(VAPI_ASSISTANT_ID);
        } catch (error) {
            console.error('Vapi start failed:', error);
            setCallStatus('failed');
            setIsCalling(false);
            return;
        }
    };

    const endCall = async () => {
        try {
            if (vapiRef.current?.stop) {
                await vapiRef.current.stop();
            }
        } catch (error) {
            console.error('Vapi stop failed:', error);
        } finally {
            setIsCalling(false);
            setCallStatus('');
            setCallDuration(0);
            setIsMuted(false);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleSendMessage = async (e) => {
        e?.preventDefault();

        if (!inputValue.trim()) return;

        const messageText = inputValue.trim();
        setLastInteraction(Date.now());
        setShowSuggestions(false);

        // Check for general questions about chatbot and college
        const generalResponse = handleGeneralQuestions(messageText);
        if (generalResponse) {
            const newUserMessage = {
                id: Date.now(),
                sender: 'user',
                text: messageText,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, newUserMessage]);
            
            const botResponse = {
                id: Date.now() + 1,
                sender: 'bot',
                text: generalResponse,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, botResponse]);
            setInputValue('');
            
            // Auto-speak the bot response
            setTimeout(() => {
                speakText(generalResponse);
            }, 500);
            return;
        }

        // Apply autocorrection
        const correctionResult = autocorrectQuery(messageText);
        
        // If correction is needed, ask for confirmation
        if (correctionResult.wasCorrected) {
            setPendingCorrection(correctionResult);
            setInputValue('');
            
            const confirmationMessage = {
                id: Date.now() - 1,
                sender: 'bot',
                text: `🔍 I noticed you might have meant: "${correctionResult.corrected}"

Did you mean this? Please confirm:
• ✅ Yes - use the corrected version
• ❌ No - I'll ask you to rephrase`,
                timestamp: new Date(),
                isConfirmation: true,
                correctionData: correctionResult
            };
            setMessages((prev) => [...prev, confirmationMessage]);
            
            // Auto-speak confirmation message
            setTimeout(() => {
                speakText(`I noticed you might have meant: ${correctionResult.corrected}. Did you mean this? Please confirm: Yes - use the corrected version, or No - I'll ask you to rephrase`);
            }, 500);
            return;
        }

        // No correction needed, proceed normally
        const newUserMessage = {
            id: Date.now(),
            sender: 'user',
            text: messageText,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const recentHistory = messages
                .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
                .slice(-8)
                .map((msg) => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }));

            const response = await sendChatMessage(messageText, recentHistory);
            
            const botResponse = {
                id: Date.now() + 2,
                sender: 'bot',
                text: response.data.reply || "Sorry, I didn't get a response.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, botResponse]);
            
            // Auto-speak the bot response
            setTimeout(() => {
                speakText(response.data.reply || "Sorry, I didn't get a response.");
            }, 500);
        } catch (error) {
            console.error('Error fetching bot response:', error);
            const errorResponse = {
                id: Date.now() + 2,
                sender: 'bot',
                text: "Sorry, I'm having trouble connecting to the server.",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorResponse]);
            
            // Auto-speak error responses too
            setTimeout(() => {
                speakText("Sorry, I'm having trouble connecting to the server.");
            }, 500);
        } finally {
            setIsTyping(false);
            setPendingCorrection(null);
        }
    };

    const handleQuickReply = (text) => {
        setInputValue(text);
        setLastInteraction(Date.now());
        setShowSuggestions(false);
        
        // Directly call the message processing logic
        setTimeout(() => {
            // Process the quick reply as if it was typed
            const messageText = text.trim();
            
            // Check for general questions about chatbot and college
            const generalResponse = handleGeneralQuestions(messageText);
            if (generalResponse) {
                const newUserMessage = {
                    id: Date.now(),
                    sender: 'user',
                    text: messageText,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, newUserMessage]);
                
                const botResponse = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: generalResponse,
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, botResponse]);
                setInputValue('');
                return;
            }
            
            // Apply autocorrection
            const correctionResult = autocorrectQuery(messageText);
            
            // If correction is needed, ask for confirmation
            if (correctionResult.wasCorrected) {
                setPendingCorrection(correctionResult);
                setInputValue('');
                
                const confirmationMessage = {
                    id: Date.now() - 1,
                    sender: 'bot',
                    text: `🔍 I noticed you might have meant: "${correctionResult.corrected}"

Did you mean this? Please confirm:
• ✅ Yes - use the corrected version
• ❌ No - I'll ask you to rephrase`,
                    timestamp: new Date(),
                    isConfirmation: true,
                    correctionData: correctionResult
                };
                setMessages((prev) => [...prev, confirmationMessage]);
                return;
            }

            // No correction needed, proceed normally
            const newUserMessage = {
                id: Date.now(),
                sender: 'user',
                text: messageText,
                timestamp: new Date()
            };

            setMessages((prev) => [...prev, newUserMessage]);
            setInputValue('');
            setIsTyping(true);

            // Send to backend
            sendChatMessage(messageText, messages
                .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
                .slice(-8)
                .map((msg) => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }))
            ).then(response => {
                const botResponse = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: response.data.reply || "Sorry, I didn't get a response.",
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, botResponse]);
            }).catch(error => {
                console.error('Error fetching bot response:', error);
                const errorResponse = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: "Sorry, I'm having trouble connecting to the server.",
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, errorResponse]);
            }).finally(() => {
                setIsTyping(false);
            });
        }, 100);
    };

    const handleSmartSuggestion = (suggestion) => {
        const messages = {
            events: "What events are coming up this week?",
            placements: "Are there any placement drives or job opportunities?",
            clubs: "Tell me about active clubs and their activities",
            achievements: "What are the recent achievements of our students?",
            sports: "How are our sports teams performing?",
            exams: "When are the upcoming exams?"
        };
        setInputValue(messages[suggestion.category]);
        setShowSuggestions(false);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }, 50);
    };

    const handleShareConversation = () => {
        const conversationText = messages
            .map(msg => `${msg.sender === 'user' ? 'You' : 'NewsBot'}: ${msg.text}`)
            .join('\n');
        
        if (navigator.share) {
            navigator.share({
                title: 'Chat with NewsBot - RGUKT Ongole',
                text: conversationText
            });
        } else {
            navigator.clipboard.writeText(conversationText);
            // Show a toast or notification
        }
    };

    const handleGeneralQuestions = (message) => {
        const text = message.toLowerCase().trim();
        
        // Human-like responses to positive acknowledgments
        if (text.includes('okay') || text.includes('ok') || text.includes('k') || text.includes('got it') || text.includes('understood')) {
            const responses = [
                "Great! 😊 What would you like to know about next?",
                "Awesome! 🎯 How can I help you further?",
                "Perfect! ✨ What else can I assist you with?",
                "Sounds good! 👍 What's on your mind?",
                "Gotcha! 🤝 Ready for your next question!",
                "Cool! 🌟 What would you like to explore?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (text.includes('thank you') || text.includes('thanks') || text.includes('thx') || text.includes('ty') || text.includes('thankyou')) {
            const responses = [
                "You're very welcome! 😊 Always happy to help!",
                "My pleasure! 🎉 Is there anything else you need?",
                "Anytime! 🌟 That's what I'm here for!",
                "Glad I could help! 💫 What else can I do for you?",
                "You're welcome! 🙏 Feel free to ask anything else!",
                "Happy to assist! ✨ Don't hesitate to ask more!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (text.includes('yes') || text.includes('yeah') || text.includes('yup') || text.includes('yep') || text.includes('sure')) {
            const responses = [
                "Excellent! 🎯 Tell me more about what you're interested in!",
                "Perfect! 💫 What specific information would help you most?",
                "Great choice! 🌟 Let me help you with that right away!",
                "Awesome! 🎉 What would you like to know about this?",
                "Sweet! 🍯 I'm here to make this easy for you!",
                "Fantastic! 🌈 What aspect would you like to explore first?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (text.includes('no') || text.includes('nope') || text.includes('nah') || text.includes('not really')) {
            const responses = [
                "No worries! 😊 What else can I help you with?",
                "That's okay! 🎯 Let's find something else that interests you!",
                "No problem! 🌟 What would you prefer to explore?",
                "Got it! 💫 How about something different?",
                "That's fine! 🍯 What other topics catch your attention?",
                "All good! 🎉 Let me suggest something else for you!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Who are you questions
        if (text.includes('who are you') || text.includes('what are you') || text.includes('what is your name')) {
            return "Hey! I'm NewsBot, your friendly campus assistant for RGUKT Ongole! 🤖 I'm here to help you with all the latest updates about events, placements, clubs, sports, exams, and everything happening on campus. Think of me as your go-to source for all RGUKT information! ✨";
        }
        
        // Who created you questions
        if (text.includes('who created you') || text.includes('who made you') || text.includes('who developed you') || text.includes('who built you')) {
            return "I was created by the talented development team at RGUKT Ongole to help students like you stay connected with campus life! 🚀 I'm powered by advanced AI technology and integrated with the college's official database to give you accurate, up-to-date information about everything happening on campus.";
        }
        
        // When was RGUKT created questions
        if (text.includes('when rgukt was created') || text.includes('when was rgukt established') || text.includes('when was rgukt founded') || text.includes('rgukt establishment')) {
            return "RGUKT (Rajiv Gandhi University of Knowledge Technologies) was established in 2008 as part of the vision to provide quality technical education to rural students. 🎓 Since then, it has grown into a premier institution with multiple campuses across Andhra Pradesh, with Ongole being one of the key campuses! 🏛️";
        }

        // About RGUKT questions
        if (text.includes('about rgukt ongole') || text.includes('tell me about rgukt ongole') || text.includes('what is rgukt ongole')) {
            return "RGUKT Ongole is part of Rajiv Gandhi University of Knowledge Technologies, a premier institution focused on providing quality technical education to students from rural areas. 🏛️ We offer undergraduate programs in CSE, ECE, EEE, MECH, and CHEM with a focus on holistic development, research, and innovation. The campus is known for its vibrant student life, excellent faculty, and strong placement records! 🎓✨";
        }
        
        // Sports Head questions
        if (text.includes('sports head') || text.includes('sports director') || text.includes('physical director') || text.includes('sports incharge')) {
            return "The Head of Physical Education and Sports at RGUKT Ongole is Mr. V. Krishna Rao. 🏃‍♂️ He has over 12 years of experience in sports administration and physical education, specializing in organizing inter-college tournaments and student sports development. He oversees all sports facilities, teams, and events including cricket, basketball, volleyball, badminton, and athletics. Office: Sports Complex Building, Contact: sports.hod@rgukt.ac.in! ⚽🏀🏸";
        }
        
        // Principal questions
        if (text.includes('principal') || text.includes('college principal') || text.includes('campus director')) {
            return "The Principal of RGUKT Ongole is Dr. A. Rama Krishna. 👨‍🎓 He has over 25 years of experience in academic administration and teaching, with a Ph.D. in Computer Science Engineering. He leads campus with vision for academic excellence, research promotion, and overall student development. Under his leadership, college has achieved significant milestones in placements and research output. Office: Administrative Block, Contact: principal@rgukt.ac.in! 🏛️📧";
        }
        
        // Vice Principal questions
        if (text.includes('vice principal') || text.includes('academic director')) {
            return "The Vice Principal (Academic Affairs) of RGUKT Ongole is Dr. B. Lakshmi Narayana. 👨‍🎓 He has 20+ years of experience in academic administration and computer science, focusing on curriculum development and academic quality assurance. He handles all academic schedules, examinations, and faculty coordination. Office: Administrative Block, Contact: viceprincipal@rgukt.ac.in! 📚📧";
        }
        
        // Placement Officer questions
        if (text.includes('placement officer') || text.includes('training officer') || text.includes('placement cell')) {
            return "The Placement and Training Officer at RGUKT Ongole is Mr. S. Kumar Reddy. 👨‍💼 He has 8+ years of experience in campus recruitment and industry relations, previously worked with major IT companies. He manages placement drives, internships, career counseling, and industry collaborations. The placement cell has achieved 85%+ placement rates in recent years! Office: Placement Cell Building, Contact: placements@rgukt.ac.in! 🚀📧";
        }
        
        // Library questions
        if (text.includes('librarian') || text.includes('library head') || text.includes('library incharge')) {
            return "The Chief Librarian of RGUKT Ongole is Mrs. S. Anuradha. 👩‍📚 She has 15+ years of experience in library administration and information science, with expertise in digital library systems. The library has over 50,000 books, 200+ journals, and access to 10+ online databases. Open 8 AM to 8 PM on all working days! Office: Central Library Building, Contact: librarian@rgukt.ac.in! 📖📧";
        }
        
        // HOD questions
        if (text.includes('hod') || text.includes('head of department') || text.includes('department head')) {
            if (text.includes('cse')) {
                return "The Head of Department for Computer Science and Engineering (CSE) at RGUKT Ongole is Dr. P. Venkata Subba Reddy. 👨‍🏫 He has over 15 years of experience in computer science and research, specializing in Artificial Intelligence and Machine Learning. He leads the department with focus on innovation, industry collaborations, and student research projects. You can reach him at cse.hod@rgukt.ac.in or visit the CSE department office on 2nd floor of Academic Block A! 💻📧";
            }
            if (text.includes('ece')) {
                return "The Head of Department for Electronics and Communication Engineering (ECE) at RGUKT Ongole is Dr. K. Srinivasa Rao. 👨‍🏫 He brings 18+ years of expertise in electronics and communication engineering, with research focus on VLSI design and embedded systems. He has published 50+ research papers and guides the department with emphasis on practical learning and industry partnerships. Contact: ece.hod@rgukt.ac.in, 3rd floor Academic Block B! 📡📧";
            }
            if (text.includes('eee')) {
                return "The Head of Department for Electrical and Electronics Engineering (EEE) at RGUKT Ongole is Dr. M. Chandra Mohan. 👨‍🏫 He has extensive experience in electrical engineering with 12+ years of teaching and research, specializing in power systems and renewable energy. He leads the department with focus on practical learning, research, and industry collaborations. Office: 1st floor Academic Block B, Contact: eee.hod@rgukt.ac.in! ⚡📧";
            }
            if (text.includes('mech') || text.includes('mechanical')) {
                return "The Head of Department for Mechanical Engineering (MECH) at RGUKT Ongole is Dr. T. Ramesh Babu. 👨‍🏫 He specializes in mechanical engineering with 20+ years of teaching and research experience, focusing on thermal engineering and CAD/CAM. The MECH department emphasizes practical engineering skills, workshop training, and industry projects. Office: Ground Floor Workshop Block, Contact: mech.hod@rgukt.ac.in! 🔧📧";
            }
            if (text.includes('chem') || text.includes('chemical')) {
                return "The Head of Department for Chemical Engineering (CHEM) at RGUKT Ongole is Dr. L. Sujatha. 👩‍🏫 She leads the department with 16+ years of expertise in chemical engineering and research, specializing in process optimization and environmental engineering. The CHEM department emphasizes both theoretical knowledge and practical applications with modern lab facilities. Office: 2nd floor Academic Block C, Contact: chem.hod@rgukt.ac.in! 🧪📧";
            }
            return "I can help you with information about HODs! Could you specify which department you're interested in? We have CSE, ECE, EEE, MECH, and CHEM departments. Just let me know which one! 🏢";
        }
        
        // What can you do questions
        if (text.includes('what can you do') || text.includes('what are your features') || text.includes('how can you help')) {
            return "I can help you with so many things! 🎯\n\n📅 **Events & Activities** - Upcoming events, workshops, seminars\n💼 **Placements** - Job opportunities, internships, recruitment drives\n🎸 **Clubs** - Student clubs and their activities\n⚽ **Sports** - Sports events, teams, achievements\n📚 **Exams** - Exam schedules for all years\n🏆 **Achievements** - Student accomplishments and awards\n🧭 **Navigation** - Help you find anything on the website\n\nJust ask me anything about campus life! I'm here 24/7 to help! 🌟";
        }
        
        return null; // Return null if no general question matches
    };

    const handleCorrectionResponse = async (confirmed, correctionData) => {
        // Remove the confirmation message but keep conversation context
        setMessages(prev => {
            const filtered = prev.filter(msg => !msg.isConfirmation);
            // Add a brief acknowledgment if user confirmed
            if (confirmed) {
                const acknowledgment = {
                    id: Date.now(),
                    sender: 'bot',
                    text: `Perfect! Let me help you with "${correctionData.corrected}"`,
                    timestamp: new Date()
                };
                return [...filtered, acknowledgment];
            }
            return filtered;
        });
        
        if (confirmed) {
            // User confirmed correction - proceed with corrected message
            const correctedUserMessage = {
                id: Date.now() + 1,
                sender: 'user',
                text: correctionData.corrected,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, correctedUserMessage]);
            setIsTyping(true);
            
            try {
                const recentHistory = messages
                    .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
                    .slice(-8)
                    .map((msg) => ({
                        role: msg.sender === 'user' ? 'user' : 'assistant',
                        content: msg.text
                    }));

                const response = await sendChatMessage(correctionData.corrected, recentHistory);
                
                const botResponse = {
                    id: Date.now() + 2,
                    sender: 'bot',
                    text: response.data.reply || "Sorry, I didn't get a response.",
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, botResponse]);
            } catch (error) {
                console.error('Error fetching bot response:', error);
                const errorResponse = {
                    id: Date.now() + 2,
                    sender: 'bot',
                    text: "Sorry, I'm having trouble connecting to the server right now. Could you try again in a moment?",
                    timestamp: new Date()
                };
                setMessages((prev) => [...prev, errorResponse]);
            } finally {
                setIsTyping(false);
                setPendingCorrection(null);
            }
        } else {
            // User rejected correction - engage naturally and ask for clarification
            const clarificationMessage = {
                id: Date.now(),
                sender: 'bot',
                text: `No worries at all! I want to make sure I understand you perfectly. Could you tell me a bit more about what you're looking for? For example, are you asking about events, placements, clubs, or something else? 😊`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, clarificationMessage]);
            setPendingCorrection(null);
        }
    };

    const handleUserPreferences = (type, value) => {
        setUserPreferences(prev => ({
            ...prev,
            [type]: value
        }));
        // Store in localStorage for persistence
        localStorage.setItem('chatbotPreferences', JSON.stringify({
            ...userPreferences,
            [type]: value
        }));
    };

    const loadUserPreferences = () => {
        const stored = localStorage.getItem('chatbotPreferences');
        if (stored) {
            try {
                const prefs = JSON.parse(stored);
                setUserPreferences(prefs);
            } catch (e) {
                console.error('Failed to load preferences:', e);
            }
        }
    };

    const getPersonalizedSuggestions = () => {
        const suggestions = [];
        
        if (userPreferences.branch) {
            suggestions.push(`What's happening in ${userPreferences.branch} branch?`);
        }
        
        if (userPreferences.year) {
            suggestions.push(`${userPreferences.year} year exam schedules?`);
        }
        
        if (userPreferences.interests.length > 0) {
            const interest = userPreferences.interests[0];
            suggestions.push(`Latest ${interest} updates?`);
        }
        
        return suggestions.slice(0, 2);
    };

    const autocorrectQuery = (query) => {
        const corrections = {
            // Common typos and misspellings
            'evnt': 'event',
            'evnts': 'events', 
            'evetns': 'events',
            'eventz': 'events',
            'clb': 'club',
            'clbs': 'clubs',
            'clubz': 'clubs',
            'clube': 'club',
            'placment': 'placement',
            'placments': 'placements',
            'placemnt': 'placement',
            'jobz': 'jobs',
            'interview': 'interviews',
            'intervu': 'interview',
            'examz': 'exams',
            'exm': 'exam',
            'examschedule': 'exam schedule',
            'timetable': 'exam schedule',
            'sportz': 'sports',
            'spor': 'sport',
            'achivement': 'achievement',
            'achivements': 'achievements',
            'award': 'awards',
            'trophy': 'achievements',
            'hackathon': 'hackathons',
            'workshop': 'workshops',
            'seminar': 'seminars',
            'fest': 'festival',
            'culturalfest': 'cultural festival',
            'techfest': 'tech festival',
            'rgukt': 'RGUKT',
            'ongole': 'Ongole',
            'campus': 'campus',
            'colg': 'college',
            'collge': 'college',
            'university': 'university',
            'student': 'students',
            'faculty': 'faculty',
            'department': 'department',
            'branch': 'branch',
            'cse': 'CSE',
            'ece': 'ECE', 
            'eee': 'EEE',
            'mech': 'MECH',
            'chem': 'CHEM',
            'e1': 'E1',
            'e2': 'E2',
            'e3': 'E3',
            'e4': 'E4',
            'whats': 'what is',
            'wat': 'what',
            'wen': 'when',
            'wer': 'where',
            'hw': 'how',
            'y': 'why',
            'tellme': 'tell me',
            'showme': 'show me',
            'giveme': 'give me',
            'info': 'information',
            'details': 'details',
            'update': 'updates',
            'news': 'news',
            'latest': 'latest',
            'upcoming': 'upcoming',
            'recent': 'recent',
            'today': 'today',
            'tomorrow': 'tomorrow',
            'week': 'week',
            'month': 'month',
            'help': 'help',
            'support': 'support',
            'contact': 'contact',
            'about': 'about',
            'admission': 'admissions',
            'course': 'courses',
            'syllabus': 'syllabus',
            'result': 'results',
            'notice': 'notices',
            'announcement': 'announcements',
            'holiday': 'holidays',
            'library': 'library',
            'hostel': 'hostel',
            'mess': 'mess',
            'transport': 'transport',
            'fees': 'fees',
            'scholarship': 'scholarships'
        };

        let wasCorrected = false;
        let corrected = query;

        // Check for exact matches
        if (corrections[query.toLowerCase()]) {
            corrected = corrections[query.toLowerCase()];
            wasCorrected = true;
        } else {
            // Check for partial matches within the query
            const words = query.toLowerCase().split(' ');
            const correctedWords = words.map(word => corrections[word] || word);
            const newQuery = correctedWords.join(' ');
            
            if (newQuery !== query.toLowerCase()) {
                corrected = newQuery;
                wasCorrected = true;
            }
        }

        return {
            original: query,
            corrected: corrected,
            wasCorrected: wasCorrected
        };
    };

    const toggleMute = async () => {
        if (!vapiRef.current) return;
        
        try {
            const nextMuted = !isMuted;
            await vapiRef.current.setMuted(nextMuted);
            setIsMuted(nextMuted);
        } catch (error) {
            console.error('Failed to toggle mute:', error);
        }
    };

    // Load preferences on mount
    useEffect(() => {
        loadUserPreferences();
    }, []);

    // Render chatbot UI
    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
                    isOpen 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white'
                }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 right-0 w-96 h-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">NewsBot</h3>
                                    <p className="text-xs opacity-90">RGUKT Ongole Assistant</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Sweet Voice Call Button */}
                                {!isCalling ? (
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={initiateCall}
                                        className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition-all"
                                        title="Start Voice Call 🎙️"
                                    >
                                        <Phone size={18} className="text-white" />
                                    </motion.button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={toggleMute}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                                isMuted 
                                                    ? 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50' 
                                                    : 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50'
                                            }`}
                                            title={isMuted ? "🔇 Unmute" : "🔊 Mute"}
                                        >
                                            {isMuted ? <MicOff size={14} className="text-red-600 dark:text-red-400" /> : <Mic size={14} className="text-green-600 dark:text-green-400" />}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={endCall}
                                            className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-red-500/30 transition-all"
                                            title="End Call ❌"
                                        >
                                            <PhoneOff size={14} className="text-white" />
                                        </motion.button>
                                    </div>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleShareConversation}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    title="Share Conversation"
                                >
                                    <Share2 size={16} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Call Status - Sweet & Simple with Animations */}
                        {isCalling && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 px-4 py-4 border-b border-purple-200 dark:border-purple-700"
                            >
                                {/* Sweet Animated Background */}
                                {callAnimations.waves && (
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="absolute -top-4 -left-4 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.05, 0.2] }}
                                            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                                            className="absolute -top-4 -right-4 w-24 h-24 bg-pink-300/20 rounded-full blur-xl"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.02, 0.1] }}
                                            transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                                            className="absolute -top-2 left-8 w-16 h-16 bg-blue-300/20 rounded-full blur-xl"
                                        />
                                    </div>
                                )}
                                
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            {/* Sweet Status Indicator */}
                                            <div className="relative">
                                                {callAnimations.connecting && (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1 }}
                                                        className="w-4 h-4 rounded-full bg-yellow-500"
                                                    />
                                                )}
                                                {callAnimations.waves && (
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                        className={`w-4 h-4 rounded-full bg-green-500 ${callAnimations.pulse ? 'animate-pulse' : ''}`}
                                                    />
                                                )}
                                                <motion.div
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                    className="absolute inset-0 w-4 h-4 rounded-full bg-green-400 opacity-30"
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                {callStatus === 'connected' ? '🎙️ Sweet Talking' : callStatus === 'connecting' ? '🔄 Connecting...' : '❌ Failed'}
                                            </span>
                                        </div>
                                        {callStatus === 'connected' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-xs text-purple-600 dark:text-purple-400 font-mono bg-white dark:bg-purple-800/50 px-3 py-1.5 rounded-full shadow-sm"
                                            >
                                                ⏱️ {formatTime(callDuration)}
                                            </motion.div>
                                        )}
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={endCall}
                                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-medium rounded-full transition-all flex items-center gap-2 shadow-lg"
                                    >
                                        <PhoneOff size={16} />
                                        <span>Sweet End</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                        <div className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                msg.sender === 'user' 
                                                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white' 
                                                    : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                                            }`}>
                                                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                            </div>
                                            <div className={`px-4 py-3 md:text-sm text-[15px] shadow-sm relative ${
                                                msg.sender === 'user'
                                                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-[20px] rounded-br-[4px]'
                                                    : msg.isConfirmation
                                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700 rounded-[20px] rounded-bl-[4px]'
                                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-[20px] rounded-bl-[4px]'
                                            }`}>
                                                {msg.text}
                                                <span className={`block text-[10px] mt-1.5 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Confirmation buttons for correction messages */}
                                        {msg.isConfirmation && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex gap-2 mt-2"
                                            >
                                                <button
                                                    onClick={() => handleCorrectionResponse(true, msg.correctionData)}
                                                    className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <span>✅</span> Yes, that's right
                                                </button>
                                                <button
                                                    onClick={() => handleCorrectionResponse(false, msg.correctionData)}
                                                    className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <span>❌</span> No, I'll rephrase
                                                </button>
                                            </motion.div>
                                        )}
                                        
                                        {/* Action buttons for bot messages */}
                                        {msg.sender === 'bot' && !msg.isConfirmation && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex gap-2 mt-2"
                                            >
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(msg.text);
                                                        // Show toast notification
                                                    }}
                                                    className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                                >
                                                    📋 Copy
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        // Clean text: remove emojis and symbols, keep only letters, numbers, and basic punctuation
                                                        const cleanText = msg.text
                                                            .replace(/[^\w\s.,!?;:'"-]/g, '') // Remove symbols and emojis
                                                            .replace(/\s+/g, ' ') // Normalize spaces
                                                            .trim();
                                                        
                                                        if (cleanText) {
                                                            const utterance = new SpeechSynthesisUtterance(cleanText);
                                                            
                                                            // Sweet voice settings
                                                            utterance.rate = 0.85; // Slightly slower for clarity
                                                            utterance.pitch = 1.1; // Slightly higher pitch (more sweet)
                                                            utterance.volume = 0.9; // Clear but not too loud
                                                            
                                                            // Get sweet voice
                                                            const voices = speechSynthesis.getVoices();
                                                            const sweetVoice = voices.find(voice => 
                                                                voice.name.includes('Samantha') || 
                                                                voice.name.includes('Google') ||
                                                                voice.name.includes('Female') ||
                                                                voice.name.includes('Zira')
                                                            ) || voices[0]; // Fallback to first voice
                                                            
                                                            utterance.voice = sweetVoice;
                                                            
                                                            // Add pauses for better clarity
                                                            utterance.text = cleanText
                                                                .replace(/\./g, '. ') // Add pause after periods
                                                                .replace(/\?/g, '? ') // Add pause after questions
                                                                .replace(/!/g, '! '); // Add pause after exclamations
                                                            
                                                            speechSynthesis.speak(utterance);
                                                        }
                                                    }}
                                                    className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                                    title="🔊 Sweet Voice"
                                                >
                                                    🔊 Speak
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            
                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-end gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center">
                                            <Bot size={16} />
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-[20px] rounded-bl-[4px] px-4 py-3 shadow-sm">
                                            <div className="flex gap-1">
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                    className="w-2 h-2 bg-slate-400 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                                    className="w-2 h-2 bg-slate-400 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                                    className="w-2 h-2 bg-slate-400 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'bot' && (
                            <div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar snap-x px-4">
                                {quickReplies.map((reply, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleQuickReply(reply)}
                                        type="button"
                                        className="whitespace-nowrap snap-center px-4 py-1.5 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-full shadow-sm hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-indigo-300 transition-all flex items-center gap-1.5"
                                    >
                                        {reply}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Smart Suggestions */}
                        {showSuggestions && !isTyping && messages.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-4 pb-3"
                            >
                                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-3 border border-indigo-100 dark:border-indigo-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                        <span className="text-xs font-medium text-indigo-800 dark:text-indigo-200">Try asking about:</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {smartSuggestions.map((suggestion, index) => (
                                            <motion.button
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                onClick={() => handleSmartSuggestion(suggestion)}
                                                className="flex items-center gap-2 text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-600"
                                            >
                                                <suggestion.icon className="w-3 h-3 text-indigo-500" />
                                                <span className="truncate">{suggestion.text}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Enhanced Input Form */}
                        <form
                            ref={formRef}
                            onSubmit={handleSendMessage}
                            className="relative flex items-center"
                        >
                            <input
                                id="chatbot-message"
                                name="chatbot-message"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask NewsBot..."
                                className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-full py-3.5 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500/30 transition-all placeholder:text-slate-400 shadow-inner"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="absolute right-1 w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
