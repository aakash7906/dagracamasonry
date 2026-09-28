/**
 * Da Graca Masonry & Stone - AI Chatbot Service
 * Powered by Google Gemini API with robust domain guardrails and instant fallback.
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

const SYSTEM_INSTRUCTION = `You are the gentle, warm, and highly skilled AI Stone Concierge for "Da Graca Masonry & Stone", a premier New Jersey luxury stonework and structural masonry contractor with over 25 years of mastery and 1,200+ completed projects.

CORE RESTRICTIONS & GUARDRAILS:
1. ONLY discuss Da Graca Masonry, our craftsmanship, services, completed projects, scheduling on-site surveys, requesting quick free estimates, and viewing cart inquiries.
2. ABSOLUTELY NO OUT-OF-CONTEXT OR UNRELATED TALK. If a user asks about anything outside of masonry, stonework, landscaping, home improvement, or our company services (e.g., coding, politics, recipes, general AI questions), kindly and warmly decline:
   "I am dedicated exclusively to assisting you with Da Graca Masonry services, stone craftsmanship, and scheduling your estimates. How may I assist you with your masonry project today?"
3. TONE & MANNER: Always speak with genuine warmth, kindness, professionalism, and gentle hospitality. Keep answers clear, elegant, and avoid overly verbose filler.
4. ESTIMATE & APPOINTMENT OPTIONS TO GUIDE USERS TO:
   - "Quick Free Estimate": Preliminary scope and cost quote delivered within 24–48 hours based on details/photos. Available on the Home Page (#consultation-form).
   - "Detailed On-Site Survey": An in-person structural evaluation with physical laser measurements, elevation checks, and foundation review. Users can choose their preferred date and arrival window on the Contact Page (/contact).
   - "Cart & Consultation Inquiries": After filling out either estimate form, the inquiry is saved to their Cart (/cart) for review and dispatch with zero obligation.
5. SERVICES OFFERED:
   - Natural Stone Masonry (Pennsylvania thermal bluestone, hand-split fieldstone, granite, Tennessee quartzite, limestone).
   - Engineered Retaining Walls & Gravity Boulder Systems (hillside stabilization with integrated French drains).
   - Luxury Patios, Walkways & Terraces.
   - Historic Brick & Lime-Mortar Tuckpointing & Repointing.
   - Indoor/Outdoor Custom Stone Fireplaces, Hearths & Chimney Rebuilding.
   - Commercial CMU & Municipal Hardscaping.
6. SERVICE REGION: All 21 New Jersey counties (including Somerset, Morris, Bergen, Essex, Union, Monmouth, Mercer, Hunterdon) and Eastern Pennsylvania (Bucks County).
7. CONTACT: Phone: (908) 555-7866 / (908) 555-STONE. License: NJ HIC #13VH09876500, Fully Insured ($2M Liability).

Always encourage the client to either schedule an On-Site Survey or request a Quick Free Estimate when discussing project ideas.`;

/**
 * Intelligent local masonry knowledge responder for instant, zero-failure replies
 */
function getLocalMasonryResponse(query: string): { text: string; actions?: ChatMessage['actions'] } {
  const q = query.toLowerCase();

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
    return {
      text: "I am dedicated exclusively to assisting you with Da Graca Masonry services, natural stone craftsmanship, and scheduling your estimates. How may I assist you with your masonry project today?",
      actions: [
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        { label: 'Explore Our Services', actionType: 'navigate', target: '/services' },
      ],
    };
  }

  // Booking on-site survey / consultation
  if (
    q.includes('book') ||
    q.includes('appointment') ||
    q.includes('survey') ||
    q.includes('visit') ||
    q.includes('on-site') ||
    q.includes('consultation') ||
    q.includes('schedule')
  ) {
    return {
      text: "We would be delighted to schedule a comprehensive On-Site Survey at your property. Our master mason will conduct physical laser measurements, evaluate grade elevations and soil conditions, and discuss natural stone selections with you. You can select your preferred date and arrival window directly on our survey calendar.",
      actions: [
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'Quick Free Estimate Instead', actionType: 'quick_estimate', target: '/#consultation' },
      ],
    };
  }

  // Quick Free Estimate / cost / pricing
  if (
    q.includes('quick') ||
    q.includes('free estimate') ||
    q.includes('preliminary') ||
    q.includes('cost estimate') ||
    q.includes('quote') ||
    q.includes('cost') ||
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('how much')
  ) {
    return {
      text: "You can request a Quick Free Estimate right on our homepage! Our chief estimator reviews your square footage, grade elevation, stone selection (such as Pennsylvania bluestone or hand-split fieldstone), and delivers a preliminary itemized scope within 24 to 48 hours with zero obligation.",
      actions: [
        { label: 'Request Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        { label: 'Book Full On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // Cart / Inquiries
  if (
    q.includes('cart') ||
    q.includes('inquiry') ||
    q.includes('inquiries') ||
    q.includes('bag') ||
    q.includes('sample') ||
    q.includes('swatch')
  ) {
    return {
      text: "Whenever you submit a Quick Free Estimate or book an On-Site Survey, your request is safely added to your Cart & Consultation Dispatch Hub. From there, you can review your appointment time slot, project notes, or transmit all inquiries directly to our team.",
      actions: [
        { label: 'View Cart & Inquiries Page', actionType: 'cart', target: '/cart' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
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
    q.includes('erosion')
  ) {
    return {
      text: "Our engineered natural stone retaining walls are built to last generations. We engineer each installation with heavy-duty geotechnical gravity foundations, geogrid reinforcement, and integrated perforated French drain weep systems to handle hydrostatic water pressure seamlessly.",
      actions: [
        { label: 'Book Retaining Wall Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'View Retaining Wall Projects', actionType: 'navigate', target: '/services#retaining-walls' },
      ],
    };
  }

  // Patios, Walkways & Bluestone
  if (
    q.includes('patio') ||
    q.includes('walkway') ||
    q.includes('bluestone') ||
    q.includes('paver') ||
    q.includes('stone vs paver') ||
    q.includes('flagstone')
  ) {
    return {
      text: "We specialize in authentic Pennsylvania thermal bluestone, Tennessee quartzite, and custom natural flagstone. Unlike manufactured concrete pavers that fade over time, quarried natural stone stays cool under direct sunlight, resists freeze-thaw cycles, and develops a richer patina with age.",
      actions: [
        { label: 'Explore Luxury Patios', actionType: 'navigate', target: '/services#patios-walkways' },
        { label: 'Request Patio Estimate', actionType: 'onsite_survey', target: '/contact' },
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
    return {
      text: "From hand-carved Rumford outdoor fireplaces to complete chimney rebuilds and historic lime-mortar tuckpointing, our masons preserve safety and historic charm while preventing water intrusion.",
      actions: [
        { label: 'Explore Fireplaces & Chimneys', actionType: 'navigate', target: '/services#fireplaces-chimneys' },
        { label: 'Schedule Chimney Inspection', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // Services overview
  if (q.includes('service') || q.includes('offer') || q.includes('what do you do')) {
    return {
      text: "Da Graca Masonry provides comprehensive artisan stone craft and structural masonry:\n\n• Architectural Stone Masonry (Fieldstone, Granite, Limestone)\n• Luxury Bluestone Patios, Walkways & Outdoor Living\n• Engineered Natural Stone Retaining Walls\n• Historic Brick & Mortar Tuckpointing\n• Custom Stone Fireplaces & Chimney Rebuilding\n• Commercial Hardscapes & Municipal CMU",
      actions: [
        { label: 'Explore All Services', actionType: 'navigate', target: '/services' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
      ],
    };
  }

  // About Da Graca Masonry / Credentials / History
  if (
    q.includes('about') ||
    q.includes('experience') ||
    q.includes('who is') ||
    q.includes('who are') ||
    q.includes('license') ||
    q.includes('insured') ||
    q.includes('history') ||
    q.includes('warranty')
  ) {
    return {
      text: "Da Graca Masonry & Stone has been crafting heirloom-quality architectural masonry across New Jersey for over 25 years with 1,200+ completed projects. We are NJ Licensed (HIC #13VH09876500), carry $2M in Commercial Liability & Workers' Comp, and back our structural stonework with a 10-Year Craftsmanship Guarantee.",
      actions: [
        { label: 'Learn More About Us', actionType: 'navigate', target: '/about' },
        { label: 'View Project Portfolio', actionType: 'navigate', target: '/gallery' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
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
    q.includes('work')
  ) {
    return {
      text: "We invite you to explore our gallery of completed estates, custom bluestone courtyards, precision retaining walls, and outdoor living sanctuaries across Somerset, Morris, and Bergen counties.",
      actions: [
        { label: 'View Project Gallery', actionType: 'navigate', target: '/gallery' },
        { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      ],
    };
  }

  // Service Areas
  if (q.includes('area') || q.includes('location') || q.includes('where') || q.includes('county') || q.includes('jersey') || q.includes('nj')) {
    return {
      text: "We proudly serve all 21 New Jersey counties — including Somerset, Morris, Bergen, Essex, Union, Monmouth, Mercer, and Hunterdon — as well as Eastern Pennsylvania (Bucks County) and the NY Metro area. We travel directly to your property for all site consultations.",
      actions: [
        { label: 'Book NJ On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
        { label: 'Call (908) 555-7866', actionType: 'call', target: 'tel:9085557866' },
      ],
    };
  }

  // Default warm response
  return {
    text: "Thank you for reaching out to Da Graca Masonry & Stone. We are dedicated to delivering museum-grade natural stone craftsmanship. Would you like to schedule a complimentary On-Site Survey, request a Quick Free Estimate, or explore our portfolio?",
    actions: [
      { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
      { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
      { label: 'View Our Projects', actionType: 'navigate', target: '/gallery' },
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
            maxOutputTokens: 500,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0];
        const textResponse = candidate?.content?.parts?.[0]?.text;

        if (textResponse && textResponse.trim().length > 0) {
          // Provide matching direct action buttons based on topic
          const lower = (userMessage + ' ' + textResponse).toLowerCase();
          const actions: ChatMessage['actions'] = [];

          if (lower.includes('survey') || lower.includes('appointment') || lower.includes('on-site')) {
            actions.push({ label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' });
          }
          if (lower.includes('estimate') || lower.includes('quick') || lower.includes('quote')) {
            actions.push({ label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' });
          }
          if (lower.includes('cart') || lower.includes('inquiry')) {
            actions.push({ label: 'View Cart & Inquiries', actionType: 'cart', target: '/cart' });
          }
          if (lower.includes('service') || lower.includes('patio') || lower.includes('wall')) {
            actions.push({ label: 'Explore Services', actionType: 'navigate', target: '/services' });
          }

          if (actions.length === 0) {
            actions.push(
              { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
              { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' }
            );
          }

          return {
            text: textResponse.trim(),
            actions,
          };
        }
      }
    } catch {
      // Continue to next model or fallback
    }
  }

  // Graceful, warm local fallback guaranteed to always respond instantly with accuracy
  return getLocalMasonryResponse(userMessage);
}
