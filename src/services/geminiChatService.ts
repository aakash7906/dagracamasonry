/**
 * Da Graca Masonry & Stone - AI Chatbot Service
 * Powered by Google Gemini API with intelligent guardrails, natural concise replies, and instant fallback.
 */

const GEMINI_API_KEY =
  (typeof import.meta !== 'undefined' &&
    (import.meta as { env?: { VITE_GEMINI_API_KEY?: string } }).env
      ?.VITE_GEMINI_API_KEY) ||
  '';

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'navigate' | 'quick_estimate' | 'onsite_survey' | 'cart' | 'call';
    target?: string;
  }[];
}

const SYSTEM_INSTRUCTION = `You are the friendly, helpful AI Stone Specialist for "Da Graca Masonry & Stone", a premier New Jersey luxury stonework and structural masonry contractor with over 25 years of mastery and 1,200+ completed projects.

CRITICAL RULES:
1. NEVER REPEAT THE WELCOME MESSAGE:
   - The initial greeting/welcome message ("Hello! Welcome to Da Graca Masonry...") is already displayed to the user at the start of the session.
   - NEVER repeat "Hello, welcome to Da Graca Masonry & Stone!", "I am your AI assistant...", or re-introduce the company.
   - If the user sends a greeting (like "hi", "hello", "hey", "namaste"), reply with a brief, friendly greeting (e.g. "Hey! How can I help with your stonework or masonry project today?").
   - For all other questions, answer directly without intro filler.

2. SHORT & NATURAL RESPONSES BY DEFAULT:
   - Keep answers concise, human, and conversational (1 to 3 sentences).
   - Do NOT write essays or unprompted long bullet lists. Speak like a real master craftsman.

3. DETAILED RESPONSES ONLY ON EXPLICIT REQUEST:
   - Provide a comprehensive, in-depth, or itemized breakdown ONLY if the user explicitly asks for details (e.g. using words like "in detail", "in details", "details", "everything", "in-depth", "brief", "elaborate", "explain all", "step by step", "sab kuch", "puri jankari", "poora").

4. LANGUAGE MATCHING (MANDATORY):
   - ALWAYS detect and respond in the EXACT SAME LANGUAGE and tone used by the user.
   - If the user writes in Hindi / Hinglish (e.g. "patio ke liye kaunsa stone best hai?", "kya rate hai?", "kaise book kare?"), respond in natural Hindi / Hinglish.
   - If the user writes in Spanish, respond in Spanish.
   - If Portuguese, French, etc., respond in that language.
   - If English, respond in English.

5. DOMAIN GUARDRAILS:
   - ONLY discuss masonry, stonework, patios, retaining walls, fireplaces, chimneys, walkways, tuckpointing, estimates, and Da Graca Masonry services.
   - For completely unrelated topics (coding, politics, recipes, pop culture, general knowledge), politely decline in the user's language and redirect to masonry.

6. COMPANY FACTS & ESTIMATE WORKFLOW:
   - Quick Free Estimate: 24–48 hr preliminary scope delivered via homepage form (/#consultation).
   - Detailed On-Site Survey: In-person laser measurement and soil/elevation evaluation booked via Contact page (/contact).
   - Specialty Materials: Authentic Pennsylvania thermal bluestone, Tennessee quartzite, hand-split fieldstone, granite, limestone.
   - Service Region: All 21 New Jersey counties and Eastern PA (Bucks County). Phone: (908) 555-7866. NJ License: #13VH09876500, $2M Liability Insured, 10-Year Craftsmanship Guarantee.`;

/**
 * Intelligent local masonry knowledge responder for instant, zero-failure replies
 */
function getLocalMasonryResponse(query: string): { text: string; actions?: ChatMessage['actions'] } {
  const q = query.toLowerCase().trim();

  const isHindi = /\b(kya|kaise|karo|batao|chahiye|kitna|kaha|hai|hain|namaste|dhanyavad|apna|hume|hum|daam|kharcha|diwar|patthar|kaunsa|hoga|karna|karenge|bhi|theek|kese)\b/i.test(query);
  const isSpanish = /\b(hola|gracias|cuanto|cuesta|precio|como|donde|piedra|presupuesto|servicios|estimado|cita|buenos|dias|tardes)\b/i.test(query);
  const wantsDetails = /\b(detail|details|everything|indepth|in-depth|brief|elaborate|explain|all about|sab kuch|puri jankari|poora|detalle|detalles|completo)\b/i.test(query);

  // Greetings / Small talk - NEVER repeat welcome introduction
  if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|yo|sup|namaste|hola|kem cho|kese ho|kaise ho)(\s+.*)?$/i.test(q) && q.length < 30) {
    if (isHindi) {
      return {
        text: "Namaste! Main aapke stonework ya masonry project me kaise madad kar sakta hoon?",
        actions: [
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
          { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
    }
    if (isSpanish) {
      return {
        text: "¡Hola! ¿En qué puedo ayudarle hoy con su proyecto de albañilería o piedra?",
        actions: [
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
          { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
    }
    return {
      text: "Hey! How can I help you with your masonry or stonework project today?",
      actions: [
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
      ],
    };
  }

  // Out of context / unrelated questions
  if (
    q.includes('weather') ||
    q.includes('recipe') ||
    q.includes('code') ||
    q.includes('python') ||
    q.includes('javascript') ||
    q.includes('movie') ||
    q.includes('president') ||
    q.includes('joke') ||
    (q.includes('who are you') && !q.includes('da graca') && !q.includes('masonry'))
  ) {
    if (isHindi) {
      return {
        text: "Main sirf Da Graca Masonry aur stonework services ke baare me madad kar sakta hoon. Aapke project ke baare me bataiye, main kaise help karoon?",
        actions: [
          { label: 'Explore Our Services', actionType: 'navigate', target: '/services' },
          { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
    }
    if (isSpanish) {
      return {
        text: "Estoy dedicado exclusivamente a asistirle con los servicios de albañilería de Da Graca. ¿Cómo puedo ayudarle con su proyecto hoy?",
        actions: [
          { label: 'Explore Our Services', actionType: 'navigate', target: '/services' },
          { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
    }
    return {
      text: "I specialize exclusively in Da Graca Masonry services and stone craftsmanship. How can I assist you with your project today?",
      actions: [
        { label: 'Explore Our Services', actionType: 'navigate', target: '/services' },
        { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
      ],
    };
  }

  // Booking / Consultation
  if (
    q.includes('book') ||
    q.includes('appointment') ||
    q.includes('survey') ||
    q.includes('visit') ||
    q.includes('on-site') ||
    q.includes('consultation') ||
    q.includes('schedule') ||
    q.includes('milna')
  ) {
    if (isHindi) {
      return {
        text: wantsDetails
          ? "Aap hamare master mason ke sath comprehensive On-Site Survey schedule kar sakte hain. Isme physical laser measurements, grade evaluation aur natural stone selection shamil hai. Aap direct date aur time window choose kar sakte hain."
          : "Aap hamare master mason ke sath directly property par on-site survey book kar sakte hain.",
        actions: [
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
          { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
    }
    if (isSpanish) {
      return {
        text: wantsDetails
          ? "Puede programar una visita en el sitio con nuestro maestro albañil para mediciones con láser, evaluación del terreno y selección de piedra."
          : "Con gusto programamos una inspección en su propiedad. Puede seleccionar la fecha y hora directamente.",
        actions: [
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
          { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
    }
    return {
      text: wantsDetails
        ? "We schedule comprehensive On-Site Surveys where our master mason takes physical laser measurements, checks grade elevations, assesses soil stability, and reviews natural stone samples directly with you."
        : "You can book an in-person On-Site Survey with our master mason directly on our calendar.",
      actions: [
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
      ],
    };
  }

  // Quick Free Estimate / cost / pricing / kharcha
  if (
    q.includes('quick') ||
    q.includes('free estimate') ||
    q.includes('preliminary') ||
    q.includes('cost') ||
    q.includes('quote') ||
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('how much') ||
    q.includes('rate') ||
    q.includes('kitna') ||
    q.includes('daam') ||
    q.includes('kharcha')
  ) {
    if (isHindi) {
      return {
        text: wantsDetails
          ? "Hamara Quick Free Estimate bilkul free hai. Aap square footage aur photos dete hain, aur hamare chief estimator 24-48 ghante me itemized estimate deliver karte hain."
          : "Aap homepage se 24–48 ghante me preliminary free estimate pa sakte hain, ya direct survey book kar sakte hain.",
        actions: [
          { label: 'Request Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        ],
      };
    }
    if (isSpanish) {
      return {
        text: "Ofrecemos presupuestos gratuitos preliminares en 24 a 48 horas sin compromiso.",
        actions: [
          { label: 'Request Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        ],
      };
    }
    return {
      text: wantsDetails
        ? "Our Quick Free Estimate delivers an itemized preliminary cost and scope within 24 to 48 hours based on your project dimensions and photos, completely obligation-free."
        : "You can get a free preliminary estimate within 24–48 hours directly on our homepage.",
      actions: [
        { label: 'Request Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // Cart / Inquiries
  if (
    q.includes('cart') ||
    q.includes('inquiry') ||
    q.includes('inquiries') ||
    q.includes('bag')
  ) {
    return {
      text: isHindi
        ? "Aapke sabhi estimate requests aur survey bookings Cart me save hoti hain jaha se aap review aur dispatch kar sakte hain."
        : "Whenever you submit an estimate or survey, your request is saved to your Cart to review before dispatching.",
      actions: [
        { label: 'View Cart & Inquiries', actionType: 'cart', target: '/cart' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // Patios, Walkways & Bluestone
  if (
    q.includes('patio') ||
    q.includes('walkway') ||
    q.includes('bluestone') ||
    q.includes('paver') ||
    q.includes('flagstone')
  ) {
    if (isHindi) {
      return {
        text: wantsDetails
          ? "Hum authentic Pennsylvania thermal bluestone, Tennessee quartzite aur natural flagstone use karte hain. Yeh freeze-thaw cycles jhelte hain, dhoop me thande rehte hain aur concrete pavers ki tarah fade nahi hote."
          : "Hum premium Pennsylvania bluestone aur natural flagstone ke custom patios aur walkways banate hain.",
        actions: [
          { label: 'Explore Luxury Patios', actionType: 'navigate', target: '/services#patios-walkways' },
          { label: 'Request Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
    }
    return {
      text: wantsDetails
        ? "We specialize in authentic Pennsylvania thermal bluestone, Tennessee quartzite, and custom flagstone. Unlike manufactured concrete pavers, natural stone stays cool, resists freeze-thaw cracking, and develops an heirloom patina over time."
        : "We build custom patios and walkways with authentic Pennsylvania bluestone and natural flagstone.",
      actions: [
        { label: 'Explore Luxury Patios', actionType: 'navigate', target: '/services#patios-walkways' },
        { label: 'Request Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
      ],
    };
  }

  // Retaining walls & drainage
  if (
    q.includes('retaining') ||
    q.includes('wall') ||
    q.includes('drainage') ||
    q.includes('slope') ||
    q.includes('hillside') ||
    q.includes('erosion') ||
    q.includes('diwar')
  ) {
    if (isHindi) {
      return {
        text: wantsDetails
          ? "Hamari engineered natural stone retaining walls me heavy gravity foundations, geogrid reinforcement aur integrated perforated French drains hote hain taaki water pressure aur soil erosion control ho sake."
          : "Hum heavy-duty natural stone retaining walls banate hain jisme proper French drainage system hota hai.",
        actions: [
          { label: 'Book Retaining Wall Survey', actionType: 'onsite_survey', target: '/contact' },
          { label: 'View Retaining Walls', actionType: 'navigate', target: '/services#retaining-walls' },
        ],
      };
    }
    return {
      text: wantsDetails
        ? "Our engineered stone retaining walls are built with heavy geotechnical gravity foundations, geogrid reinforcement, and integrated perforated French drain weep systems to handle hydrostatic water pressure seamlessly."
        : "We engineer heavy-duty natural stone retaining walls with integrated French drain systems to prevent erosion.",
      actions: [
        { label: 'Book Retaining Wall Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'View Retaining Walls', actionType: 'navigate', target: '/services#retaining-walls' },
      ],
    };
  }

  // Fireplaces & Chimneys
  if (
    q.includes('fire') ||
    q.includes('chimney') ||
    q.includes('hearth') ||
    q.includes('tuckpointing') ||
    q.includes('repointing') ||
    q.includes('brick')
  ) {
    if (isHindi) {
      return {
        text: wantsDetails
          ? "Hum hand-carved outdoor/indoor fireplaces, complete chimney rebuilding aur historic lime-mortar tuckpointing karte hain jo pani ko andar aane se rokti hai aur strength banaye rakhti hai."
          : "Hum custom stone fireplaces, chimney rebuilds aur historic brick tuckpointing provide karte hain.",
        actions: [
          { label: 'Explore Fireplaces', actionType: 'navigate', target: '/services#fireplaces-chimneys' },
          { label: 'Book Inspection', actionType: 'onsite_survey', target: '/contact' },
        ],
      };
    }
    return {
      text: wantsDetails
        ? "We build hand-carved Rumford outdoor/indoor fireplaces, complete chimney rebuilds, and historic lime-mortar tuckpointing to stop water intrusion and restore structural integrity."
        : "We specialize in custom stone fireplaces, chimney rebuilding, and historic lime-mortar tuckpointing.",
      actions: [
        { label: 'Explore Fireplaces', actionType: 'navigate', target: '/services#fireplaces-chimneys' },
        { label: 'Book Inspection', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // Services
  if (q.includes('service') || q.includes('offer') || q.includes('what do you do') || q.includes('kya karte ho')) {
    if (isHindi) {
      return {
        text: wantsDetails
          ? "Da Graca Masonry yeh services provide karta hai:\n\n• Natural Stone Masonry (Granite, Limestone, Fieldstone)\n• Bluestone Patios, Walkways & Terraces\n• Engineered Retaining Walls with Drainage\n• Historic Brick & Lime Tuckpointing\n• Outdoor/Indoor Fireplaces & Chimneys\n• Commercial Hardscapes"
          : "Hum natural stone masonry, bluestone patios, retaining walls, tuckpointing aur stone fireplaces ki services dete hain.",
        actions: [
          { label: 'Explore All Services', actionType: 'navigate', target: '/services' },
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        ],
      };
    }
    return {
      text: wantsDetails
        ? "Da Graca Masonry provides full-scope architectural masonry:\n\n• Architectural Stone Masonry (Fieldstone, Granite, Limestone)\n• Luxury Bluestone Patios, Walkways & Outdoor Living\n• Engineered Retaining Walls with French Drains\n• Historic Lime-Mortar Tuckpointing\n• Custom Stone Fireplaces & Chimney Rebuilding\n• Commercial Hardscapes"
        : "We offer natural stone masonry, bluestone patios, retaining walls with drainage, historic tuckpointing, and custom fireplaces.",
      actions: [
        { label: 'Explore All Services', actionType: 'navigate', target: '/services' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // About / License / Insurance
  if (
    q.includes('about') ||
    q.includes('experience') ||
    q.includes('license') ||
    q.includes('insured') ||
    q.includes('warranty') ||
    q.includes('who are') ||
    q.includes('kaun ho')
  ) {
    if (isHindi) {
      return {
        text: "Da Graca Masonry 25+ saalo se New Jersey me kaam kar rahi hai (NJ Lic #13VH09876500). Hamare paas $2M insurance aur 10-Year Craftsmanship Guarantee hai.",
        actions: [
          { label: 'Learn More About Us', actionType: 'navigate', target: '/about' },
          { label: 'View Portfolio', actionType: 'navigate', target: '/gallery' },
        ],
      };
    }
    return {
      text: "Da Graca Masonry has 25+ years of experience across NJ with 1,200+ completed projects, full licensing (NJ HIC #13VH09876500), $2M liability insurance, and a 10-Year Craftsmanship Guarantee.",
      actions: [
        { label: 'Learn More About Us', actionType: 'navigate', target: '/about' },
        { label: 'View Portfolio', actionType: 'navigate', target: '/gallery' },
      ],
    };
  }

  // Portfolio / Gallery / Projects
  if (
    q.includes('portfolio') ||
    q.includes('gallery') ||
    q.includes('project') ||
    q.includes('photos') ||
    q.includes('pictures') ||
    q.includes('work') ||
    q.includes('photo')
  ) {
    return {
      text: isHindi
        ? "Aap hamare completed bluestone courtyards, precision retaining walls aur outdoor living projects ki gallery dekh sakte hain."
        : "You can explore our gallery of completed estates, bluestone patios, and precision retaining walls across New Jersey.",
      actions: [
        { label: 'View Project Gallery', actionType: 'navigate', target: '/gallery' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // Default natural short response
  if (isHindi) {
    return {
      text: "Main aapke masonry aur stonework project me kaise madad kar sakta hoon? Aap quick estimate ya on-site survey book kar sakte hain.",
      actions: [
        { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  if (isSpanish) {
    return {
      text: "¿Cómo puedo asistirle hoy con su proyecto de albañilería o piedra natural?",
      actions: [
        { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  return {
    text: "How can I assist with your masonry project today? Would you like a quick estimate or to book an on-site survey?",
    actions: [
      { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
      { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
    ],
  };
}

/**
 * Send message to Google Gemini API with fallback to specialized masonry intelligence
 */
export async function sendChatMessageToGemini(
  userMessage: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<{ text: string; actions?: ChatMessage['actions'] }> {
  if (!GEMINI_API_KEY) {
    return getLocalMasonryResponse(userMessage);
  }

  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash',
    'gemini-pro',
  ];

  const contents = [
    ...history.slice(-6),
    {
      role: 'user',
      parts: [{ text: userMessage }],
    },
  ];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 400,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0];
        let textResponse = candidate?.content?.parts?.[0]?.text;

        if (textResponse && textResponse.trim().length > 0) {
          // Clean up repetitive welcome phrase if model inadvertently adds it mid-conversation
          textResponse = textResponse
            .replace(/^hello!?\s*welcome to (da graca masonry & stone|da graca masonry)[.!]?\s*(i['’]m your ai [^.!?]+[.!?])?\s*/i, '')
            .trim();

          // Provide matching direct action buttons based on topic
          const lower = (userMessage + ' ' + textResponse).toLowerCase();
          const actions: ChatMessage['actions'] = [];

          if (lower.includes('survey') || lower.includes('appointment') || lower.includes('on-site')) {
            actions.push({ label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' });
          }
          if (lower.includes('estimate') || lower.includes('quick') || lower.includes('quote') || lower.includes('cost') || lower.includes('price')) {
            actions.push({ label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' });
          }
          if (lower.includes('cart') || lower.includes('inquiry')) {
            actions.push({ label: 'View Cart & Inquiries', actionType: 'cart', target: '/cart' });
          }
          if (lower.includes('service') || lower.includes('patio') || lower.includes('wall') || lower.includes('fireplace')) {
            actions.push({ label: 'Explore Services', actionType: 'navigate', target: '/services' });
          }

          if (actions.length === 0) {
            actions.push(
              { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
              { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' }
            );
          }

          return {
            text: textResponse || getLocalMasonryResponse(userMessage).text,
            actions,
          };
        }
      }
    } catch {
      // Continue to next model or fallback
    }
  }

  // Graceful, natural local fallback guaranteed to always respond instantly with accuracy
  return getLocalMasonryResponse(userMessage);
}
