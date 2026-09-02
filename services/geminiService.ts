import { GoogleGenAI, Chat } from '@google/genai';
import { TripPlanQuery, GeneratedItinerary, Place, KinyarwandaPhrase } from '../types';

class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    this.initClient();
  }

  private initClient(): GoogleGenAI | null {
    if (this.ai) return this.ai;

    const apiKey = 
      (typeof process !== 'undefined' && (process.env?.GEMINI_API_KEY || process.env?.API_KEY)) ||
      (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
      '';

    if (apiKey) {
      this.ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
    return this.ai;
  }

  public getClient(): GoogleGenAI | null {
    return this.initClient();
  }

  public createChat(systemInstruction: string): Chat | null {
    const client = this.getClient();
    if (!client) {
      console.warn('Gemini client initialized without API key. Falling back to offline concierge intelligence.');
      return null;
    }

    return client.chats.create({
      model: 'gemini-3.7-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });
  }

  public async generateItinerary(query: TripPlanQuery, language: string = 'English'): Promise<GeneratedItinerary> {
    const client = this.getClient();
    const prompt = `You are the lead travel architect for Rwanda AI Travel Concierge.
Create a detailed, inspiring, and realistic day-by-day Rwanda travel itinerary based on:
- Arrival Date: ${query.arrivalDate || 'Flexible'}
- Departure Date: ${query.departureDate || 'Flexible'}
- Group Size: ${query.travelersCount} traveler(s)
- Budget Tier: ${query.budgetLevel}
- Travel Styles: ${query.styles.join(', ')}
- Pace: ${query.pace}
- Transport Preference: ${query.transport}
- Special Notes: ${query.notes || 'None'}

Language requirement: Please output the summary, titles, descriptions, and tips in ${language}. Keep authentic Rwandan place names (Kigali, Musanze, Volcanoes, Akagera, Nyungwe, Lake Kivu, Huye, Nyanza) in their original names.

Respond ONLY with valid JSON conforming to this structure:
{
  "title": "Inspiring Trip Title (e.g. 5-Day Primates & Savanna Wildlife Odyssey)",
  "summary": "2-3 sentence overview of this curated journey across Rwanda.",
  "totalDays": number,
  "travelStyles": ["string"],
  "budgetTier": "${query.budgetLevel}",
  "essentialTips": ["3-5 important practical tips like clothing, permits, transport"],
  "days": [
    {
      "dayNumber": 1,
      "theme": "Arrival in Kigali & Cultural Foundations",
      "locationTitle": "Kigali",
      "daySummary": "Brief overview of what makes this day special.",
      "estimatedDayCost": "$80 - $150 USD per person",
      "activities": [
        {
          "timeSlot": "Morning",
          "title": "Activity name",
          "location": "Exact landmark/place name",
          "coordinates": { "lat": -1.9436, "lng": 30.0596 },
          "description": "Engaging description of the experience.",
          "estimatedCost": "$15 USD",
          "travelTime": "20 mins from city center",
          "tips": "Pro-tip for travelers"
        },
        {
          "timeSlot": "Afternoon",
          "title": "Activity name",
          "location": "Exact landmark/place name",
          "coordinates": { "lat": -1.9366, "lng": 30.0886 },
          "description": "Engaging description.",
          "estimatedCost": "Free / $20",
          "travelTime": "15 mins",
          "tips": "Pro-tip"
        },
        {
          "timeSlot": "Evening",
          "title": "Dining / Sunset view",
          "location": "Repub Lounge / Hotel des Mille Collines",
          "coordinates": { "lat": -1.9567, "lng": 30.0812 },
          "description": "Traditional Rwandan dining experience.",
          "estimatedCost": "$20 - $35",
          "travelTime": "10 mins",
          "tips": "Order goat brochettes with pili pili"
        }
      ]
    }
  ]
}`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          }
        });

        const text = response.text?.trim() || '{}';
        const parsed = JSON.parse(text);
        return {
          id: `itinerary-${Date.now()}`,
          title: parsed.title || 'Curated Rwanda Discovery Journey',
          summary: parsed.summary || 'A custom-designed itinerary highlighting Rwanda’s wildlife, culture, and landscapes.',
          totalDays: parsed.days?.length || 3,
          travelStyles: query.styles,
          budgetTier: query.budgetLevel,
          days: parsed.days || [],
          essentialTips: parsed.essentialTips || [
            'Book gorilla and primate permits well in advance through RDB.',
            'Pack layers and waterproof hiking footwear.',
            'MTN MoMoPay and Visa cards are accepted in most urban establishments.'
          ],
          createdAt: Date.now(),
        };
      } catch (err) {
        console.warn('Gemini itinerary generation error, falling back to smart template:', err);
      }
    }

    // Fallback dynamic high-craft itinerary generator
    return this.generateFallbackItinerary(query);
  }

  public async askAboutPlace(place: Place, queryText: string, language: string = 'English'): Promise<string> {
    const client = this.getClient();
    const prompt = `You are Rwanda AI Travel Concierge.
The traveler is inquiring about ${place.name} located in ${place.region}, Rwanda.
Category: ${place.category}
Key Details: ${place.description}.
Why Visit: ${place.whyVisit}
Price Guide: ${place.estimatedPrice || 'Standard rates'}
Opening Hours: ${place.openingHours || 'Daylight hours'}

User question: "${queryText}"

Provide a warm, precise, and practical travel recommendation in ${language}. Give 2-3 concise paragraphs with actionable tips on best timing, what to wear/bring, and nearby spots to pair with this visit. Embed \`[MAP:${place.lat},${place.lng},${place.name}]\` at the end.`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            temperature: 0.7,
          }
        });
        return response.text?.trim() || `${place.name} is one of Rwanda’s premier destinations. ${place.whyVisit} [MAP:${place.lat},${place.lng},${place.name}]`;
      } catch (e) {
        console.warn('Gemini place QA error:', e);
      }
    }

    return `${place.name} is situated in ${place.region}. ${place.description}\n\n**Why Visit:** ${place.whyVisit}\n**Practical Tip:** Recommended duration is ${place.recommendedDuration || '2 hours'}. ${place.bestTimeToVisit ? `Best time: ${place.bestTimeToVisit}.` : ''} [MAP:${place.lat},${place.lng},${place.name}]`;
  }

  public async checkPronunciation(phrase: KinyarwandaPhrase, spokenText: string, language: string = 'English'): Promise<string> {
    const client = this.getClient();
    const prompt = `You are a friendly Kinyarwanda language coach in Rwanda.
Target phrase: "${phrase.kinyarwanda}" (Meaning: "${phrase.phrase}", Phonetic: "${phrase.pronunciation}").
The traveler attempted to say: "${spokenText}".

Give short, enthusiastic, and constructive pronunciation feedback in ${language}.
1. Praise their effort (use a welcoming Rwandan expression like "Ni byiza!" or "Murakoze!").
2. Clarify syllable stress (e.g., in "Muraho", emphasize the "RAH").
3. Explain when locals love to hear this phrase in Rwanda.`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: { temperature: 0.7 }
        });
        return response.text?.trim() || `Great effort practicing "${phrase.kinyarwanda}"! Remember to pronounce it as "${phrase.pronunciation}". Locals will be delighted when you use this greeting!`;
      } catch (e) {
        console.warn('Gemini pronunciation coach error:', e);
      }
    }

    return `Ni byiza cyane (Very good effort)! You practiced "${phrase.kinyarwanda}" (${phrase.pronunciation}). In Rwanda, greeting people warmly with this phrase opens doors to radiant smiles and genuine hospitality!`;
  }

  private generateFallbackItinerary(query: TripPlanQuery): GeneratedItinerary {
    const safeStyles = query.styles || [];
    const isWildlife = safeStyles.includes('Wildlife') || safeStyles.includes('Nature');
    const isAdventure = safeStyles.includes('Adventure');

    return {
      id: `itinerary-${Date.now()}`,
      title: isWildlife ? 'Remarkable Rwanda: Gorillas, Savanna & Lake Kivu' : 'Authentic Rwanda: Culture, Art & Scenic Hills',
      summary: 'A curated journey combining Rwanda’s modern urban heartbeat in Kigali with iconic national parks and serene lake landscapes.',
      totalDays: 4,
      travelStyles: safeStyles,
      budgetTier: query.budgetLevel || 'Moderate',
      essentialTips: [
        'Obtain mountain gorilla and golden monkey permits in advance via RDB.',
        'Carry light rain jackets and comfortable hiking boots for altitude changes.',
        'Single-use plastic bags are banned in Rwanda; use reusable cloth packing cubes.',
        'MoMoPay (Mobile Money) and Visa cards are accepted in almost all urban spots.'
      ],
      days: [
        {
          dayNumber: 1,
          theme: 'Arrival & Cultural Awakening in Kigali',
          locationTitle: 'Kigali City',
          daySummary: 'Immerse yourself in Kigali’s clean tree-lined avenues, profound history, and burgeoning contemporary art scene.',
          estimatedDayCost: '$40 - $90 USD per person',
          activities: [
            {
              timeSlot: 'Morning',
              title: 'Kigali Genocide Memorial & Reflection',
              location: 'Kigali Genocide Memorial, Gisozi',
              coordinates: { lat: -1.9436, lng: 30.0596 },
              description: 'Guided audio tour understanding Rwanda’s path to unity, reconciliation, and vibrant peace.',
              estimatedCost: 'Free entry ($15 audio guide)',
              travelTime: '15 mins from city center',
              tips: 'Allow 2 to 3 quiet hours to take in the gardens and permanent exhibitions.'
            },
            {
              timeSlot: 'Afternoon',
              title: 'Inema Arts Center & Coffee Tasting',
              location: 'Inema Arts Center & Question Coffee Gishushu',
              coordinates: { lat: -1.9366, lng: 30.0886 },
              description: 'Explore contemporary African paintings, sculptures, and savor single-origin Rwandan specialty pour-overs.',
              estimatedCost: '$5 - $15 USD',
              travelTime: '10 mins',
              tips: 'Meet resident artists and pick up handmade souvenirs.'
            },
            {
              timeSlot: 'Evening',
              title: 'Panoramic Dining at Repub Lounge',
              location: 'Repub Lounge, Kimihurura',
              coordinates: { lat: -1.9567, lng: 30.0812 },
              description: 'Dine on sizzling goat brochettes, fried plantains (Mizuzu), and enjoy sunset views over Kigali’s thousand hills.',
              estimatedCost: '$20 - $35 USD',
              travelTime: '10 mins',
              tips: 'Reserve a terrace table for golden hour.'
            }
          ]
        },
        {
          dayNumber: 2,
          theme: 'Into the Virungas: Volcanoes National Park',
          locationTitle: 'Musanze & Kinigi',
          daySummary: 'Journey north through dramatic terraced green hills to the misty peaks of the Virunga volcano chain.',
          estimatedDayCost: isWildlife ? '$1,550 USD (including gorilla permit)' : '$120 USD (Bisoke/Golden Monkeys)',
          activities: [
            {
              timeSlot: 'Morning',
              title: 'Scenic Drive to Musanze & Primate Trek',
              location: 'Volcanoes National Park Headquarters, Kinigi',
              coordinates: { lat: -1.4640, lng: 29.5910 },
              description: 'Morning briefing with expert RDB rangers before tracking mountain gorillas or vibrant golden monkeys in bamboo forests.',
              estimatedCost: '$100 - $1,500 USD',
              travelTime: '2 hours drive from Kigali',
              tips: 'Hire a local porter ($15) to assist with gear and support community livelihood.'
            },
            {
              timeSlot: 'Afternoon',
              title: 'Ellen DeGeneres Campus of the Dian Fossey Fund',
              location: 'Kinigi, Musanze',
              coordinates: { lat: -1.4820, lng: 29.6100 },
              description: 'Interactive science exhibits, gorilla 360 virtual reality, and conservation labs.',
              estimatedCost: 'Free entry (donations appreciated)',
              travelTime: '10 mins from park HQ',
              tips: 'Stunning eco-architecture built with volcanic stone.'
            },
            {
              timeSlot: 'Evening',
              title: 'Musanze Caves & Dinner in Town',
              location: 'Musanze Lava Caves',
              coordinates: { lat: -1.5000, lng: 29.6300 },
              description: 'Underground lava tube exploration followed by dinner at Migano Hotel or Five Volcanoes.',
              estimatedCost: '$30 - $50 USD',
              travelTime: '15 mins',
              tips: 'Helmets and headlamps are provided by guides.'
            }
          ]
        },
        {
          dayNumber: 3,
          theme: 'Lake Kivu Shores & The Congo Nile Ridge',
          locationTitle: 'Rubavu (Gisenyi)',
          daySummary: 'Descend to the tranquil freshwater beaches of Lake Kivu for sunset boat rides and relaxation.',
          estimatedDayCost: '$60 - $120 USD per person',
          activities: [
            {
              timeSlot: 'Morning',
              title: 'Lake Kivu Kayaking & Hot Springs',
              location: 'Rubavu Waterfront, Lake Kivu',
              coordinates: { lat: -1.7000, lng: 29.2600 },
              description: 'Paddle along peaceful emerald waters and soak your feet in natural volcanic mineral hot springs.',
              estimatedCost: '$25 USD',
              travelTime: '1 hour drive from Musanze',
              tips: 'Lake Kivu is 100% free of bilharzia and safe for swimming.'
            },
            {
              timeSlot: 'Afternoon',
              title: 'Coffee Washing Station Tour & Tasting',
              location: 'Rubavu Coffee Trail',
              coordinates: { lat: -1.7200, lng: 29.2800 },
              description: 'Follow the bean from harvest on volcanic hillside farms to artisan roasting.',
              estimatedCost: '$20 USD',
              travelTime: '20 mins',
              tips: 'Purchase fresh roasted beans directly from the cooperative.'
            },
            {
              timeSlot: 'Evening',
              title: 'Lakeside Tilapia & Night Fishermen Songs',
              location: 'Lake Kivu Shoreline',
              coordinates: { lat: -1.6950, lng: 29.2550 },
              description: 'Watch three-hulled fishing boats paddle out with lamps while fishermen sing traditional songs across the water.',
              estimatedCost: '$20 USD',
              travelTime: 'Walking distance',
              tips: 'Order fresh whole grilled Lake Kivu Tilapia or fried Sambaza.'
            }
          ]
        },
        {
          dayNumber: 4,
          theme: 'Savanna Safari or Kigali Heritage Finale',
          locationTitle: 'Akagera or Kigali',
          daySummary: 'Complete your journey with a thrilling game drive in Akagera or artisan shopping in Kigali before departure.',
          estimatedDayCost: '$70 - $150 USD per person',
          activities: [
            {
              timeSlot: 'Morning',
              title: 'Kimironko Market Souvenir Shopping',
              location: 'Kimironko Market, Kigali',
              coordinates: { lat: -1.9544, lng: 30.1256 },
              description: 'Bustling market for hand-woven Agaseke peace baskets, Kitenge fabrics, and wood carvings.',
              estimatedCost: 'Custom purchases',
              travelTime: '20 mins',
              tips: 'Friendly bargaining is welcomed with a smile!'
            },
            {
              timeSlot: 'Afternoon',
              title: 'Nyamirambo Walking Tour & Lunch',
              location: 'Nyamirambo Women’s Center',
              coordinates: { lat: -1.9790, lng: 30.0520 },
              description: 'Community-led walking tour through Kigali’s most historic neighborhood with authentic home-cooked lunch.',
              estimatedCost: '$25 USD',
              travelTime: '15 mins',
              tips: 'Directly supports women literacy and vocational programs.'
            },
            {
              timeSlot: 'Evening',
              title: 'Farewell Sunset at Kigali Convention Centre',
              location: 'Kigali Convention Centre Dome',
              coordinates: { lat: -1.9535, lng: 30.0938 },
              description: 'Admire the illuminated dome lights and enjoy evening drinks before heading to Kigali International Airport.',
              estimatedCost: '$15 - $30 USD',
              travelTime: '10 mins to airport (KGL)',
              tips: 'Airport is 15-20 minutes away with smooth security checks.'
            }
          ]
        }
      ]
    };
  }
}

export const geminiService = new GeminiService();
