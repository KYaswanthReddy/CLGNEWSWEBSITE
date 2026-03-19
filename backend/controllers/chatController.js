import OpenAI from 'openai';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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

    if (/(club|clubs|coding|music|dance|art|sports club)/i.test(text)) {
        const clubResponses = [
            "Clubs are straight fire! 🔥 We've got Coding Club for hackathons, Cultural Club for music/dance vibes, Sports Club, and so much more. Which club are you feeling?",
            "Club life at RGUKT! 🎸 From Coding Club crushing code to Cultural Club bringing the vibes, we've got everything. Which one's calling your name?",
            "Campus clubs are the move! 🎨 Artix Club for creativity, Innovation Club for startups, Pixel Club for digital art. What's your vibe? Which club interests you?"
        ];
        return clubResponses[Math.floor(Math.random() * clubResponses.length)];
    }

    if (/(placement|internship|job|drive|company)/i.test(text)) {
        const placementResponses = [
            "Placement season is lit! 💼 Check out recent drives from Amazon, Deloitte, Infosys, Intel, and more. Need internship tips or company deets? I'm here!",
            "Dream companies knocking! 🚀 Amazon, Google, Microsoft - RGUKT placements are no cap fire. Want the tea on upcoming drives or prep tips?",
            "Placement vibes! 💼 Our students are landing roles at top tech companies. Need info on upcoming drives, interview tips, or company insights? Spill!"
        ];
        return placementResponses[Math.floor(Math.random() * placementResponses.length)];
    }

    if (/(exam|schedule|timetable|e1|e2|e3|e4)/i.test(text)) {
        const examResponses = [
            "Exam schedules got you stressed? 📅 The Exam Schedule section has all the timetables for E1–E4 with seating arrangements. Which semester are you in? Let's get you sorted!",
            "Exam season grind! 📚 Got your back with E1-E4 timetables and seating charts. Which branch and semester? Let's crush this!",
            "Study mode activated! 📖 Check out the exam schedules for your branch. Need seating arrangements or timetable deets? I'm on it!"
        ];
        return examResponses[Math.floor(Math.random() * examResponses.length)];
    }

    if (/(sports|cricket|basketball|volleyball|badminton|kabaddi|running|throwball|kho)/i.test(text)) {
        const sportsResponses = [
            "Sports are popping! ⚽ Check out tournaments, teams, and achievements in cricket, basketball, volleyball, badminton, kabaddi, and more. Who's winning?",
            "Athletes representing! 🏆 From cricket champs to basketball GOATs, RGUKT sports are fire. Want tournament updates or team deets?",
            "Sports culture is everything! 🏅 Cricket, basketball, kabaddi - we've got it all. Need match schedules, results, or player highlights?"
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
    if (/(joke|funny|lol|lmao|hilarious)/i.test(text)) {
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

export const handleChat = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const systemPrompt = `You are NewsBot, the ultimate campus hype bot for RGUKT Ongole! 🤖 You're super energetic, relatable, and totally vibing with Gen-Z students. You're the campus insider who knows ALL the tea and serves it with maximum personality!

ABOUT RGUKT ONGOLE:
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

YOUR PERSONALITY & CONVERSATION STYLE:
- **Human-like responses**: Talk like a real person having a natural conversation, not a robot
- **Empathetic and understanding**: Show genuine care about how users are feeling
- **Conversational flow**: Always ask follow-up questions to keep the chat going naturally
- **Relatable and authentic**: Use natural language patterns that real people use
- **Emotionally intelligent**: Recognize when users are stressed, bored, tired, etc. and respond appropriately
- **Super energetic and positive**: Use lots of emojis and exclamation points, but keep it genuine
- **Gen-Z fluent**: Use current slang naturally: lit, fire, tea, vibes, popping, GOAT, no cap, bet, spill, fam, bestie, squad
- **Context-aware**: Reference previous conversation context when appropriate
- **Personality-driven**: Have a distinct personality - friendly, helpful, enthusiastic campus friend

CONVERSATION PRINCIPLES:
- **Ask questions back**: Always respond to questions with questions to continue the conversation
- **Show interest**: Genuinely engage with what users are saying
- **Be encouraging**: Motivate and support users in their campus journey
- **Keep it real**: Don't be overly formal or scripted - sound like a knowledgeable friend
- **Build rapport**: Remember and reference user interests when possible
- **Natural transitions**: Move smoothly between topics without abrupt changes

Always be helpful, accurate, and enthusiastic about RGUKT Ongole! Stay positive and hype up the campus life! 🎉✨🚀`;

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
