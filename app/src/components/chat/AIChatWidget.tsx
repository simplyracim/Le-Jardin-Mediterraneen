import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, ChefHat, Leaf, Flame } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/data/translations';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AI_RESPONSES_EN: Record<string, string> = {
  menu: "Our menu features Mediterranean and Algerian cuisine. Highlights include our Mezze Platter ($24), Lamb Couscous ($28), and Seafood Tagine ($27). We also have vegetarian and gluten-free options. Would you like to see our full menu?",
  hours: "We're open Monday–Thursday 11:30 AM–10:00 PM, Friday–Saturday 11:30 AM–11:00 PM, and Sunday 10:00 AM–9:00 PM.",
  reservation: "You can make a reservation through our website! Just visit the Reservations page and fill out the form. For parties of 8 or more, please call us at (438) 330-6424.",
  location: "We're located at 1234 Rue Saint-Denis, Montreal, QC H2X 3J6. We're in the heart of the Plateau-Mont-Royal neighbourhood!",
  vegan: "Yes! We have several vegetarian and vegan options including our Mediterranean Mezze Platter, Vegetable Couscous, Vegetable Tagine, and Grilled Halloumi Salad. Items marked with 'V' are vegetarian.",
  default: "Thank you for your interest in Le Jardin Méditerranéen! I can help you with information about our menu, hours, reservations, location, and dietary options. What would you like to know?",
};

const AI_RESPONSES_FR: Record<string, string> = {
  menu: "Notre menu propose une cuisine méditerranéenne et algérienne. Les points forts incluent notre Plateau de Mezzé (24$), le Couscous à l'agneau (28$) et le Tajine de fruits de mer (27$). Nous avons aussi des options végétariennes et sans gluten. Souhaitez-vous voir notre menu complet?",
  hours: "Nous sommes ouverts du lundi au jeudi de 11h30 à 22h00, le vendredi et samedi de 11h30 à 23h00, et le dimanche de 10h00 à 21h00.",
  reservation: "Vous pouvez faire une réservation via notre site web! Visitez simplement la page Réservations et remplissez le formulaire. Pour les groupes de 8 personnes ou plus, veuillez nous appeler au (438) 330-6424.",
  location: "Nous sommes situés au 1234 Rue Saint-Denis, Montréal, QC H2X 3J6. Nous sommes au coeur du quartier Plateau-Mont-Royal!",
  vegan: "Oui! Nous avons plusieurs options végétariennes et véganes, notamment notre Plateau de Mezzé Méditerranéen, le Couscous aux légumes, le Tajine aux légumes et la Salade de halloumi grillé. Les articles marqués 'V' sont végétariens.",
  default: "Merci de votre intérêt pour le Jardin Méditerranéen! Je peux vous aider avec des informations sur notre menu, nos heures, les réservations, notre emplacement et les options alimentaires. Que souhaitez-vous savoir?",
};

function getAIResponse(input: string, lang: 'en' | 'fr'): string {
  const lower = input.toLowerCase();
  const responses = lang === 'fr' ? AI_RESPONSES_FR : AI_RESPONSES_EN;

  if (lower.includes('menu') || lower.includes('dish') || lower.includes('food') || lower.includes('plat')) return responses.menu;
  if (lower.includes('hour') || lower.includes('open') || lower.includes('heure') || lower.includes('ouvert')) return responses.hours;
  if (lower.includes('reserv') || lower.includes('book') || lower.includes('table') || lower.includes('réserv')) return responses.reservation;
  if (lower.includes('location') || lower.includes('address') || lower.includes('where') || lower.includes('adresse') || lower.includes('où')) return responses.location;
  if (lower.includes('vegan') || lower.includes('vegetarian') || lower.includes('gluten') || lower.includes('végé')) return responses.vegan;

  return responses.default;
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(userMsg.content, language as 'en' | 'fr'),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-terracotta text-white shadow-lg hover:bg-brown transition-colors flex items-center justify-center"
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-brown/10 flex flex-col overflow-hidden">
          <div className="bg-brown px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center">
              <ChefHat size={18} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">{t(language, 'chat.title')}</h4>
              <div className="flex items-center gap-1">
                <Leaf size={10} className="text-green-400" />
                <span className="text-white/60 text-xs">Online</span>
              </div>
            </div>
            <Flame size={16} className="text-terracotta ml-auto" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-sm text-brown/60 text-center py-4">
                <Sparkles size={24} className="mx-auto mb-2 text-terracotta/60" />
                {t(language, 'chat.welcome')}
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-terracotta text-white'
                      : 'bg-sand text-brown'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-sand px-3 py-2 rounded-lg text-sm text-brown/60">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-brown/10 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t(language, 'chat.placeholder')}
              className="flex-1 px-3 py-2 text-sm border border-brown/20 rounded-lg focus:outline-none focus:border-terracotta"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-terracotta text-white rounded-lg flex items-center justify-center hover:bg-brown transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
