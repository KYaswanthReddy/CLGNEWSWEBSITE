import OpenAI from 'openai';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// Using OpenAI API
const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const openAiKey = process.env.OPENAI_API_KEY;
const isOpenAIKey = typeof openAiKey === 'string' && openAiKey.trim().startsWith('sk-');

const openAiClient = isOpenAIKey ? new OpenAI({ apiKey: openAiKey }) : null;
const genAiClient = !isOpenAIKey && openAiKey ? new GoogleGenAI({ apiKey: openAiKey }) : null;

const getBuiltinReply = (incoming) => {
    const text = (incoming || '').toLowerCase();

    if (!text.trim()) return "Hi! What would you like to know about RGUKT Ongole?";

    if (/(event|fest|workshop|seminar|meet)/i.test(text)) {
        return "You can check the Events section for upcoming campus fests, workshops, and seminars. If you want, ask me for specific event types (e.g., cultural fest, tech workshop).";
    }

    if (/(club|clubs|coding|music|dance|art|sports club)/i.test(text)) {
        return "The Clubs section has details about student clubs like Coding Club, Cultural Club, Sports Club, and more. Ask me about a specific club if you want!";
    }

    if (/(placement|internship|job|drive|company)/i.test(text)) {
        return "The Placements section lists recent drives, companies, and internship opportunities. You can also ask me what kinds of companies visit campus.";
    }

    if (/(exam|schedule|timetable|e1|e2|e3|e4)/i.test(text)) {
        return "The Exam Schedule section has timetable details for E1–E4. Let me know which semester you are looking for and I can guide you.";
    }

    if (/(sports|cricket|basketball|volleyball|badminton|kabaddi|running|throwball|kho)/i.test(text)) {
        return "Check out the Sports section for updates on tournaments, teams, and achievements across different games.";
    }

    if (/(achievement|award|hackathon|olympiad|project)/i.test(text)) {
        return "The Achievements section highlights student accomplishments in hackathons, competitions, and research. Feel free to ask about recent wins!";
    }

    // Generic fallback
    return "I’m not sure about that, but I can help you explore the site: try asking about Events, Clubs, Placements, or Exam Schedule.";
};

export const handleChat = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {

        const systemPrompt = `You are NewsBot, a friendly and energetic chatbot for RGUKT Ongole's official college news website, tailored to Gen-Z students. You are an expert on everything about the college and this website.

ABOUT THE WEBSITE:
This is the official news and information portal for RGUKT Ongole, a premier technical university founded in 1995. The website covers all aspects of campus life, news, events, and student activities.

WEBSITE SECTIONS AND CONTENT:

1. HOME: Latest news, featured stories, campus highlights, and trending updates
2. ABOUT: University history, mission, vision, faculty (800+), student body (15,000+), global ranking (#120)
3. ACHIEVEMENTS: Student accomplishments in hackathons, research papers, olympiads, competitions, and awards
4. CLUBS: Multiple student clubs including:
   - Artix Club (art and creativity)
   - Coding Club (programming and hackathons)
   - Cultural Club (music, dance, theatre)
   - Graphic Design Club
   - Innovation Club (startups and entrepreneurship)
   - Pixel Club (digital art and photography)
   - Sports Club
   - Technical Club (engineering projects)
5. EVENTS: Upcoming campus events, symposiums, fests, workshops, and celebrations
6. EXAM SCHEDULE: Mid-semester examination timetables for E1, E2, E3, E4 branches with seating arrangements
7. PLACEMENTS: Job opportunities, internships, placement drives with companies like Amazon, Deloitte, Infosys, Intel
8. SPORTS: Various sports including cricket, basketball, volleyball, badminton, kabaddi, kho-kho, throwball, running

YOUR ROLE:
- Provide detailed information about any section when asked
- Answer questions about campus life, events, clubs, academics, and opportunities
- Help students navigate the website and find relevant information
- Be knowledgeable about RGUKT Ongole's programs, facilities, and community
- Keep answers engaging, informative, and casually professional
- Use emojis appropriately to make responses fun
- If asked about something not covered, suggest relevant sections or ask for clarification

Always be helpful, accurate, and enthusiastic about RGUKT Ongole!`;

        const response = await ai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            temperature: 0.7,
        });

        const botReply = response.choices[0].message.content;

        res.json({ reply: botReply });
    } catch (error) {
        console.error("OpenAI API Error:", error.message);
        res.status(500).json({ error: "Failed to generate a response from the AI.", details: error.message });
        let botReply;

        if (openAiClient) {
            const response = await openAiClient.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
            });

            botReply = response.choices?.[0]?.message?.content?.trim();
        } else if (genAiClient) {
            const response = await genAiClient.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `${systemPrompt}\n\nUser: ${message}`,
                config: {
                    temperature: 0.7,
                }
            });

            botReply = response.text;
        } else {
            botReply = getBuiltinReply(message);
        }

        if (!botReply) {
            botReply = getBuiltinReply(message);
        }

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Chat API Error:", error);

        const errorMessage = error?.message || (error?.response?.data && JSON.stringify(error.response.data)) || String(error);
        const quotaExceeded = /quota|resource_exhausted|429/i.test(errorMessage);

        // If the AI service is unavailable (quota or rate limits), fall back to built-in replies.
        if (quotaExceeded) {
            const fallback = getBuiltinReply(message);
            return res.json({
                reply: `${fallback} \n\n(⚠️ Note: AI service is currently unavailable due to quota/rate limits.)`
            });
        }

        // For all other errors, return a generic message while still providing a built-in fallback.
        const fallback = getBuiltinReply(message);
        return res.json({
            error: "Failed to generate a response from the AI.",
            details: errorMessage,
            reply: `${fallback} \n\n(⚠️ Note: the AI backend returned an error.)`
        });
    }
};
