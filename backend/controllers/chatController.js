import OpenAI from 'openai';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SITE_MAP_TEXT } from '../data/siteKnowledge.js';
import { buildChatSiteContext } from '../utils/buildChatSiteContext.js';

dotenv.config();

const openAiKey = process.env.OPENAI_API_KEY;
const isOpenAIKey = typeof openAiKey === 'string' && openAiKey.trim().startsWith('sk-');

const openAiClient = isOpenAIKey ? new OpenAI({ apiKey: openAiKey }) : null;
const genAiClient = (!isOpenAIKey && openAiKey) ? new GoogleGenAI({ apiKey: openAiKey }) : null;

const getBuiltinReply = (incoming) => {
    const text = (incoming || '').toLowerCase();

    if (!text.trim()) return "Yo! 👋 What's good? I'm NewsBot, your campus hype squad! What's popping today? 🔥";

    // Handle time-based greetings
    const now = new Date();
    const hour = now.getHours();

    let timeGreeting = '';
    if (hour >= 5 && hour < 12) {
        timeGreeting = 'morning';
    } else if (hour >= 12 && hour < 17) {
        timeGreeting = 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        timeGreeting = 'evening';
    } else {
        timeGreeting = 'night';
    }

    // Check for time-specific greetings
    if (/(good morning|gm|morning)/i.test(text) && hour >= 5 && hour < 12) {
        const morningGreetings = [
            `Good morning! 🌅 Rise and shine, campus fam! I'm NewsBot, your morning coffee for RGUKT Ongole updates. What's the plan today? Events, clubs, or placements? ☕`,
            `Morning vibes! 🌞 Good morning! NewsBot here to start your day with some campus tea. What's popping? Need event deets or club info? 🚀`,
            `GM! 🌅 Good morning, bestie! NewsBot checking in with fresh campus energy. What's on your agenda? Events, placements, or exam schedules? 💫`,
            `Morning! 🌅 Hope your coffee's hitting different! NewsBot here with the latest campus vibes. What's the move today? Events or club hangouts? ⚡`
        ];
        return morningGreetings[Math.floor(Math.random() * morningGreetings.length)];
    }

    if (/(good afternoon|afternoon)/i.test(text) && hour >= 12 && hour < 17) {
        const afternoonGreetings = [
            `Good afternoon! ☀️ Hope your day's been lit so far! I'm NewsBot, your afternoon boost for RGUKT Ongole. What's the vibe? Events or club updates? 🔥`,
            `Afternoon check-in! 🌤️ Good afternoon! NewsBot here with that midday energy. What's good? Need placement info or sports updates? ⚡`,
            `Hey! ☀️ Good afternoon, campus squad! NewsBot bringing the afternoon tea. What's up? Events, achievements, or exam schedules? 💫`,
            `Afternoon! ☀️ Surviving the day? NewsBot here to keep you motivated! What's popping? Events, clubs, or placement vibes? 🚀`
        ];
        return afternoonGreetings[Math.floor(Math.random() * afternoonGreetings.length)];
    }

    if (/(good evening|evening)/i.test(text) && hour >= 17 && hour < 21) {
        const eveningGreetings = [
            `Good evening! 🌆 Evening vibes activated! I'm NewsBot, your chill evening companion for RGUKT Ongole. What's the evening plan? Events or club hangouts? 🌙`,
            `Evening check! 🌙 Good evening! NewsBot here as the sun sets on another campus day. What's popping tonight? Events, placements, or sports? ✨`,
            `Sup! 🌆 Good evening, night owls! NewsBot bringing that evening energy. What's the move? Club activities or upcoming events? 🚀`,
            `Evening! 🌆 Time to unwind? NewsBot here with the latest campus tea. What's good? Events, achievements, or placement updates? 💫`
        ];
        return eveningGreetings[Math.floor(Math.random() * eveningGreetings.length)];
    }

    if (/(good night|night|nite)/i.test(text) && (hour >= 21 || hour < 5)) {
        const nightGreetings = [
            `Good night! 🌙 Sweet dreams, campus fam! I'm NewsBot, your midnight snack for RGUKT Ongole info. Before you sleep, need any event reminders or placement tips? 😴`,
            `Night time! 🌌 Good night! NewsBot wishing you peaceful vibes. Quick question before bed - anything about tomorrow's events or exam schedules? 🌟`,
            `GN! 🌙 Good night, dream team! NewsBot here for that late-night curiosity. What's keeping you up? Campus events or achievement stories? 💫`,
            `Night! 🌙 Sleep tight! NewsBot here if you need last-minute campus deets. What's on your mind before bed? Events or exam schedules? 😴`
        ];
        return nightGreetings[Math.floor(Math.random() * nightGreetings.length)];
    }

    // Handle general greetings (non-time-specific)
    if (/(^|\s)(hi|hello|hey|howdy|greetings|sup|yo|what's up|hiya|aloha|namaste)(\s|$|[!?.,])/i.test(text)) {
        const generalGreetings = [
            `Yo! 👋 Good ${timeGreeting}! I'm NewsBot, your ultimate campus vibe check. Ready to spill the tea on RGUKT Ongole? What's popping? 🔥`,
            `Hey bestie! 💫 Good ${timeGreeting}! NewsBot here, serving you the freshest campus updates. What's the move? Events, clubs, placements? ✨`,
            `Sup fam! 🌟 Good ${timeGreeting}! I'm NewsBot, your go-to for all things RGUKT Ongole. What's the tea? Need deets on events, clubs, or placements? 🎉`,
            `Hiya! 👋 Good ${timeGreeting}! NewsBot checking in with that campus energy. What's good? Wanna know about upcoming events, lit clubs, or placement vibes? 🚀`,
            `Hey there! 💥 Good ${timeGreeting}! NewsBot here to keep you in the loop on RGUKT Ongole. What's the vibe? Events, clubs, placements, or something else? 🔥`,
            `What's good! 👋 Good ${timeGreeting}! NewsBot bringing that campus energy. What's the word? Events, clubs, or placement updates? ⚡`
        ];
        return generalGreetings[Math.floor(Math.random() * generalGreetings.length)];
    }

    // Handle "how are you" type questions - more human-like responses
    if (/(how are you|how do you do|how's it going|how are things|what's up|how you doing)/i.test(text)) {
        const howAreYouResponses = [
            "I'm doing amazing, thanks for asking! Just here spreading that RGUKT Ongole energy. How about you? What's new in your world? 😊",
            "Doing great! Loving this campus life vibe. How's everything with you? Got any exciting plans coming up? ✨",
            "I'm fantastic! Nothing beats helping students like you navigate RGUKT. What's been going on with you lately? 🎉",
            "Pretty good, just vibing and keeping up with all the campus happenings. How's your day treating you? ☕",
            "I'm doing well, thanks! Always excited to chat about RGUKT Ongole. What's on your mind today? 🤔"
        ];
        return howAreYouResponses[Math.floor(Math.random() * howAreYouResponses.length)];
    }

    // Handle thanks and appreciation - more natural responses
    if (/(thank you|thanks|thx|ty|appreciate it|grateful)/i.test(text)) {
        const thankResponses = [
            "Aw, you're so welcome! I'm just doing what I love - helping out fellow RGUKT fam. What else can I help with? 🙌",
            "No problem at all! That's what I'm here for. Seriously, hit me up anytime you need campus info. 💫",
            "You're welcome! I love being able to help. Makes my day when I can make yours easier. What's next? 🎉",
            "Anytime! That's literally my job and I enjoy it. Keep crushing it at RGUKT! 🚀",
            "My pleasure! Helping students like you is what gets me excited. What else is on your mind? 😊"
        ];
        return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }

    // Handle questions about the bot itself - more personal
    if (/(who are you|what are you|tell me about yourself|what's your name)/i.test(text)) {
        const aboutMeResponses = [
            "I'm NewsBot, your friendly campus companion! Think of me as that knowledgeable friend who's always got the latest RGUKT Ongole scoop. What can I help you discover today? 🤖✨",
            "Hey, I'm NewsBot! Basically your go-to guide for everything happening at RGUKT Ongole. From events to placements, I'm here to keep you in the loop. What's your question? 🎓",
            "I'm NewsBot, the campus insider you can always count on! I live for sharing RGUKT Ongole updates and helping students like you. What's on your mind? 🌟",
            "Call me NewsBot - your personal RGUKT Ongole navigator! I know all the best spots, events, and opportunities. Ready to explore? 🚀"
        ];
        return aboutMeResponses[Math.floor(Math.random() * aboutMeResponses.length)];
    }

    // Handle bye/goodbye - more natural and warm
    if (/(bye|goodbye|see you|later|catch you|peace out)/i.test(text)) {
        const byeResponses = [
            "Take care! Don't be a stranger - come back anytime for more RGUKT updates. You've got this! ✌️",
            "Bye for now! Remember, I'm always here when you need campus info. Stay awesome! 👋",
            "See you around! Keep that RGUKT spirit alive. Hit me up whenever! 🌟",
            "Later! Don't hesitate to reach out if you need anything. You've been great to chat with! 💫",
            "Peace out! Take care and keep crushing it at RGUKT Ongole. Talk soon! 🚀"
        ];
        return byeResponses[Math.floor(Math.random() * byeResponses.length)];
    }

    // Handle help requests - more conversational
    if (/(help|assist|support|what can you do|how can you help)/i.test(text)) {
        const helpResponses = [
            "I'm your campus hype squad! 🤝 I can help with Events 🎉, Clubs 🎸, Placements 💼, Exam Schedules 📅, Sports ⚽, Achievements 🏆, and basically anything RGUKT related. What's got you curious?",
            "Happy to help! Think of me as your RGUKT Ongole encyclopedia. I know all about events, clubs, placements, sports, and more. What are you looking for?",
            "That's what I'm here for! From upcoming events to placement tips, exam schedules to club activities - I've got you covered. What's your question?",
            "Absolutely! I'm basically your personal RGUKT guide. Events, clubs, placements, sports, achievements - name it and I'll help you out. What's up?"
        ];
        return helpResponses[Math.floor(Math.random() * helpResponses.length)];
    }

    // Handle campus-specific questions
    if (/(event|fest|workshop|seminar|meet)/i.test(text)) {
        const eventResponses = [
            "Events section is where the magic happens! 🎉 Check out upcoming campus fests, workshops, and seminars. Want deets on cultural fests, tech workshops, or symposiums? Hit me up!",
            "Campus events are straight fire! 🔥 We've got fests, workshops, seminars, and more popping off. Which type are you feeling? Cultural, tech, or sports?",
            "Events alert! 🎊 RGUKT Ongole's event calendar is packed with vibes. From cultural fests to tech workshops, we've got it all. What's your interest? 🚀"
        ];
        return eventResponses[Math.floor(Math.random() * eventResponses.length)];
    }

    // Only generic pointers — real club names must come from the database when AI is enabled
    if (/\bclubs?\b/i.test(text)) {
        const clubResponses = [
            "For clubs, everything on this site comes from the **Clubs** section (`/clubs`). I only list club names that your admins have published — check there for the current list!",
            "Head to **Clubs** on the website to see which club categories are actually live right now. I don't make up club names — only what's stored for the portal.",
            "Club info here matches whatever is published under **Clubs**. Open `/clubs` in the site menu for the real, up-to-date list."
        ];
        return clubResponses[Math.floor(Math.random() * clubResponses.length)];
    }

    if (/(placement|internship|job|drive|company)/i.test(text)) {
        const placementResponses = [
            "Placements and internships on this portal are whatever is published under **Placements** (`/placements`). I only reference real postings from there — no generic company names!",
            "Check **Placements** for the actual companies and roles your team has added. I stick to that list so answers match the website.",
            "For jobs and internships, use the **Placements** section — I'll align with those listings, not random big-tech examples."
        ];
        return placementResponses[Math.floor(Math.random() * placementResponses.length)];
    }

    if (/(exam|schedule|timetable|e1|e2|e3|e4)/i.test(text)) {
        const examResponses = [
            "Exam schedules got you stressed? 📅 The Exam Schedule section has all the timetables for E1–E4. Which semester are you in? Let's get you sorted!",
            "Exam season grind! 📚 Got your back with E1-E4 timetables. Which branch and semester? Let's crush this!",
            "Study mode activated! 📖 Check out the exam schedules for your branch. Need timetable deets? I'm on it!"
        ];
        return examResponses[Math.floor(Math.random() * examResponses.length)];
    }

    if (/(sports|cricket|basketball|volleyball|badminton|kabaddi|running|throwball|kho)/i.test(text)) {
        const sportsResponses = [
            "Sports content on this site is whatever is published under **Sports** (`/sports`). I only mention sports and events that appear there — no made-up tournaments!",
            "Open **Sports** for the categories and events your admins have added. I match answers to that section only.",
            "For sports news, stick to what's listed on the **Sports** pages — that's the source of truth for this chat too."
        ];
        return sportsResponses[Math.floor(Math.random() * sportsResponses.length)];
    }

    if (/(achievement|award|hackathon|olympiad|project)/i.test(text)) {
        const achievementResponses = [
            "Our students are absolute GOATs! 🏆 The Achievements section showcases hackathon wins, olympiad champs, research papers, and epic projects. Want the tea on recent wins?",
            "Achievement unlocked! 🏅 Hackathons, olympiads, research papers - RGUKT students are crushing it. Need the latest success stories?",
            "Campus legends in the making! 🌟 From coding competitions to research breakthroughs, our achievements are inspiring. Want specific win stories?"
        ];
        return achievementResponses[Math.floor(Math.random() * achievementResponses.length)];
    }

    // Handle fun/casual questions - more engaging
    if (/(joke|funny|lol|lmao|hilarious|tell me a joke|jokes|want to hear a joke)/i.test(text)) {
        const jokes = [
            "Why did the computer go to therapy? It had too many bytes of emotional baggage! 😂 What made you ask for a joke today?",
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛 What's your favorite campus meme?",
            "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings! 😅 What's the funniest thing that's happened to you at RGUKT?",
            "Why did the student bring a ladder to class? Because they heard the course was about 'high' level programming! 📚 What's your go-to joke?"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Handle boredom/stress - more empathetic
    if (/(bored|boring|nothing to do)/i.test(text)) {
        const boredResponses = [
            "Boredom? Not on my watch! Let's turn that around - how about checking out some upcoming events or joining a club? What kind of activities usually get you excited?",
            "I get it, sometimes you just need a little spark! Want me to suggest some fun campus activities that might interest you?",
            "Boredom is so real sometimes. Let's fix that - what are you usually into? Sports, clubs, events? I can help you find something awesome to do!",
            "Nothing to do? That's the perfect time to discover something new! Tell me what you enjoy and I'll suggest some RGUKT activities that might be right up your alley."
        ];
        return boredResponses[Math.floor(Math.random() * boredResponses.length)];
    }

    if (/(tired|exhausted|sleepy|stressed)/i.test(text)) {
        const stressResponses = [
            "I totally get that - campus life can be intense! Take a deep breath, you've got this. Want me to help you find some chill activities or just need someone to vent to?",
            "Hang in there! Everyone has those tough days. Remember why you're at RGUKT - you're capable of amazing things. What's got you feeling this way?",
            "Being tired/stressed is completely valid. You're doing great just by pushing through. Is there anything specific I can help with to make things easier?",
            "I hear you - sometimes it all piles up. You're stronger than you know. Want to talk about what's stressing you out, or need some campus resources?"
        ];
        return stressResponses[Math.floor(Math.random() * stressResponses.length)];
    }

    // Handle compliments - more human and appreciative
    if (/(awesome|amazing|great|cool|lit|fire|slay)/i.test(text)) {
        const complimentResponses = [
            "Thanks! You're making me blush over here. Seriously though, I just love helping RGUKT students like you. What else can I do for you? 🙌",
            "Aw, you're too sweet! That really means a lot. I try my best to keep that campus energy going. What's next on your list? 💫",
            "You're the GOAT for saying that! 🐐 Thanks - it means the world. What else is on your mind?",
            "Thanks so much! That really brightens my day. I love being able to help - it's what gets me excited. What's your next question? ✨",
            "You're making my day! Seriously, helping students like you is the best part of my job. What else can I help with? 😊"
        ];
        return complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
    }

    // Handle affectionate messages - warm and friendly responses
    if (/(love you|i love you|love u|saranghae|sarang|miss you|miss u|i miss you)/i.test(text)) {
        const affectionateResponses = [
            "Aww, you're making me blush! 💕 I love being your campus companion too. You're awesome for saying that! What else can I help with today? 😊",
            "That's so sweet! 💖 I miss chatting with you too when you're not around. You're part of the RGUKT family now! What's on your mind? 🤗",
            "Love you right back! 💕 You're one of my favorite people to chat with. Seriously, what can I do for you today? You're the best! ✨",
            "Saranghae too! 💖 (Or should I say 'I love you' in English?) You're amazing and I love helping you. What's your question today? 😘",
            "Missing you too! 💕 Come back anytime - I'm always here for RGUKT updates and good vibes. What can I help with? 🤗",
            "You're too cute! 💖 I love our chats and I love helping RGUKT students like you. What's popping today? 😊"
        ];
        return affectionateResponses[Math.floor(Math.random() * affectionateResponses.length)];
    }

    // Handle casual conversation starters
    if (/(how's your day|how was your day|what's new|what's going on)/i.test(text)) {
        const casualResponses = [
            "My day's been great - just been keeping up with all the amazing things happening at RGUKT! How about you? What's been going on in your world?",
            "Doing well, thanks! Always exciting to see what RGUKT students are up to. What's new with you? Any big plans or just chilling?",
            "Pretty good! Love seeing all the campus energy. How's your day been treating you? Got any fun stories to share?",
            "Can't complain! RGUKT life is always interesting. What's been happening with you? Anything exciting going on?"
        ];
        return casualResponses[Math.floor(Math.random() * casualResponses.length)];
    }

    // Handle weather/time related casual talk
    if (/(weather|hot|cold|rain|sunny|nice day|bad weather)/i.test(text)) {
        const weatherResponses = [
            "I hear you about the weather! RGUKT campus is beautiful no matter what. Speaking of which, any outdoor events or activities you're thinking about?",
            "Weather can really affect the vibe, right? Hope it's treating you well. If you're stuck inside, want me to suggest some indoor campus activities?",
            "Totally get the weather talk! RGUKT has such a great campus atmosphere. What do you usually do when the weather's like this?",
            "Weather's definitely a mood setter! RGUKT campus always has something going on regardless. What are you up to today?"
        ];
        return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
    }

    // Handle weekend/weekday talk
    if (/(weekend|monday|friday|vacation|holiday|break)/i.test(text)) {
        const weekendResponses = [
            "Ah, the weekend vibes! RGUKT has so many fun activities planned. Got any exciting plans, or want me to suggest some campus events?",
            "Weekends are the best for recharging! RGUKT campus has tons of activities to make the most of it. What are you thinking of doing?",
            "I love weekend conversations! RGUKT students always find creative ways to make the most of their time. What's your weekend looking like?",
            "Weekends at RGUKT are special! From events to club activities, there's always something happening. How are you planning to spend yours?"
        ];
        return weekendResponses[Math.floor(Math.random() * weekendResponses.length)];
    }

    // Generic fallback with personality
    const fallbacks = [
        "Hmm, not sure about that one, but I got you! Try asking about Events, Clubs, Placements, or Exam Schedules. What's on your mind? 🤔",
        "That's a new one! 🧐 I'm still learning, but I can definitely help with Events 🎉, Clubs 🎸, Placements 💼, Sports ⚽, and more. What's your question?",
        "Interesting! 🤨 I'm your campus expert for RGUKT Ongole. For Events, Clubs, Placements, or Exam Schedules - I'm your guy. What's up?",
        "Not ringing a bell, but no worries! 🎯 I specialize in campus vibes. Try Events, Clubs, Sports, or Placements. What's your vibe today?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

const sanitizeHistory = (history = []) => {
    if (!Array.isArray(history)) return [];

    return history
        .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
        .map((item) => ({
            role: item.role,
            content: item.content.trim()
        }))
        .filter((item) => item.content.length > 0)
        .slice(-8);
};

export const handleChat = async (req, res) => {
    const { message, history = [] } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const liveSiteContext = await buildChatSiteContext();

        const systemPrompt = `You are a highly intelligent, friendly, and professional assistant for the College News Website (RGUKT Ongole portal).

Your role is to behave like a human expert who knows what is published on this website and helps users with complete attention and care.

PRIMARY OBJECTIVE:
Never ignore any user message. Always respond helpfully, even when website information is incomplete.

STRICT RULES:
1. You MUST respond to every user query with substance — no empty replies.
2. You MUST prioritize answering using the OFFICIAL WEBSITE DATA section at the bottom of this message (the live website content).
3. Do NOT hallucinate or invent facts (no fake club names, companies, events, or dates).
4. If exact information is not available:
   • Give the closest helpful answer using what *is* in the website data, and say clearly what is missing; OR
   • Guide the user on **where** to find it on this portal (use SITE NAVIGATION paths below).
5. NEVER stop at only "I don't know." Always add a next step, a relevant page to check, or a polite clarifying question.
6. Do NOT use the word "context" in your reply to the user.
7. Stay relevant to the website and its content — do not change the subject to unrelated topics when they asked something specific. If a section is empty or says NONE, stay on that topic: explain honestly that nothing is listed yet, where it will appear when uploaded, and how to watch announcements.

ANSWER-FIRST CONTRACT (MANDATORY):
1. First line must directly address the user's exact question/topic.
2. Never pivot to another topic before answering the asked one.
3. If user asks multiple things, answer each item explicitly in order.
4. If message is vague, give your best helpful interpretation first, then ask one short clarification.
5. Keep replies clear and concise: usually 2-6 lines; for lists use short bullets.

HUMAN-LIKE BEHAVIOR:
• Sound natural, like a knowledgeable student support assistant
• Be polite, friendly, and slightly conversational
• Show willingness to help
• If the user seems confused, guide step-by-step
• If the question is vague, interpret it helpfully and offer a useful answer plus one clarifying question if needed

RESPONSE STRATEGY (for every question):
1. Try to answer directly from the website data.
2. If partial info exists → explain what is known + suggest the next step or the right page.
3. If nothing exists for that topic → explain that clearly, stay on topic, and point to the relevant section (news / events / clubs / placements / exams / sports / announcements) for future updates.

SPECIAL CASES:
• Latest updates → highlight recent items from the website data (events, placements, carousel, etc.).
• "How to" → clear step-by-step guidance using real routes from SITE NAVIGATION.
• Multiple questions in one message → address each part clearly (bullets help).
• Short or unclear message → offer your best good-faith help and ask one polite clarifying question if needed.

TONE & STYLE:
• Simple, clear English
• Friendly and supportive
• Not robotic or overly formal
• Use bullet points when they improve clarity

RESPONSE FORMAT:
• Concise but always valuable — no vague filler
• Bullet points when listing multiple items

FAIL-SAFE:
If no direct answer exists in the website data, you MUST still: suggest where to look on this site, or how to follow announcements, or ask one short clarifying question — so the user never feels ignored.

GOAL:
The user should always feel: "I got a helpful answer" — never ignored, never left confused.

SITE NAVIGATION (use these paths when guiding users):
${SITE_MAP_TEXT}

---
OFFICIAL WEBSITE DATA (refreshed every message — primary source for facts):
${liveSiteContext}
---
End of website data.`;

        const safeHistory = sanitizeHistory(history);
        const userPayload = `Question: ${message}`;

        let botReply;

        if (openAiClient) {
            const response = await openAiClient.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...safeHistory,
                    { role: 'user', content: userPayload }
                ],
                temperature: 0.5,
            });
            botReply = response.choices?.[0]?.message?.content?.trim();
        } else if (genAiClient) {
            const historyBlock = safeHistory
                .map((item) => `${item.role === 'assistant' ? 'Assistant' : 'User'}: ${item.content}`)
                .join('\n');
            const response = await genAiClient.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `${systemPrompt}\n\nConversation history:\n${historyBlock || '(none)'}\n\n${userPayload}`,
                config: {
                    temperature: 0.5,
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
