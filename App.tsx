import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { 
  Message, 
  Destination, 
  ActiveTab, 
  Place, 
  GeneratedItinerary 
} from './types';
import { getSystemInstruction, LANGUAGES } from './constants';
import { geminiService } from './services/geminiService';
import { voiceService } from './services/voiceService';
import { RWANDA_PLACES } from './data/rwandaPlacesData';
import { volcanoesHotelsData } from './data/volcanoesHotelsData';
import { huyeHotelsData } from './data/huyeHotelsData';

// UI Components
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import SmartMapExplore from './components/SmartMapExplore';
import TripPlanner from './components/TripPlanner';
import ExperienceRwanda from './components/ExperienceRwanda';
import SafetyAssistant from './components/SafetyAssistant';
import MyRwanda from './components/MyRwanda';
import FiveStarHotels from './components/FiveStarHotels';
import VoiceModal from './components/VoiceModal';

import PlaceDetailModal from './components/PlaceDetailModal';
import PaymentModal from './components/PaymentModal';
import LoginScreen, { UserProfile } from './components/LoginScreen';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './WelcomeScreen';

import ArrowLeftIcon from './components/icons/ArrowLeftIcon';
import PlusIcon from './components/icons/PlusIcon';
import { Sparkles, MessageSquare, Compass, CalendarDays, BookOpen, ShieldAlert } from 'lucide-react';

const UI_TEXT: Record<string, Record<string, string>> = {
  title: { en: "Rwanda AI Travel Concierge", fr: "Concierge de Voyage IA Rwanda", rw: "Umujyanama wa AI mu ngendo mu Rwanda", sw: "Mwelekezi wa Kusafiri Rwanda AI", es: "Conserje de Viajes IA Ruanda", de: "Ruanda KI-Reise-Concierge", zh: "卢旺达AI旅行管家", hi: "रवांडा एआई यात्रा कंसीयज", ar: "مساعد السفر الذكي في رواندا", pt: "Concierge de Viagem IA Ruanda", ja: "ルワンダAIトラベルコンシェルジュ", ru: "ИИ-консьерж по путешествиям в Руанду" },
  newChat: { en: "New Chat", fr: "Nouveau Chat", rw: "Ikiganiro Gishya", sw: "Gumzo Jipya", es: "Nuevo Chat", de: "Neuer Chat", zh: "新聊天", hi: "नई चैट", ar: "دردشة جديدة", pt: "Novo Chat", ja: "新しいチャット", ru: "Новый чат" },
  back: { en: "Back", fr: "Retour", rw: "Subira", sw: "Rudi", es: "Atrás", de: "Zurück", zh: "返回", hi: "वापस", ar: "رجوع", pt: "Voltar", ja: "戻る", ru: "Назад" },
  login: { en: "Login", fr: "Connexion", rw: "Injira", sw: "Ingia", es: "Iniciar Sesión", de: "Anmelden", zh: "登录", hi: "लॉग इन करें", ar: "تسجيل الدخول", pt: "Entrar", ja: "ログイン", ru: "Войти" },
  logout: { en: "Logout", fr: "Déconnexion", rw: "Sohoka", sw: "Toka", es: "Cerrar Sesión", de: "Abmelden", zh: "登出", hi: "लॉग आउट", ar: "تسجيل الخروج", pt: "Sair", ja: "ログアウト", ru: "Выйти" },
  loginTitle: { en: "Welcome to Rwanda AI", fr: "Bienvenue sur Rwanda AI", rw: "Murakaza neza muri Rwanda AI", sw: "Karibu Rwanda AI", es: "Bienvenido a Rwanda AI", de: "Willkommen bei Rwanda AI", zh: "欢迎使用卢旺达AI", hi: "रवांडा एआई में आपका स्वागत है", ar: "مرحبًا بك في رواندا AI", pt: "Bem-vindo ao Rwanda AI", ja: "ルワンダAIへようこそ", ru: "Добро пожаловать в Rwanda AI" },
  loginSubtitle: { en: "Your intelligent multilingual travel concierge for the Land of a Thousand Hills.", fr: "Votre concierge de voyage intelligent et multilingue pour le Pays des Mille Collines.", rw: "Umujyanama wawe w'ubwenge mu ndimi nyinshi mu Gihugu cy'Imisozi Igihumbi.", sw: "Mwelekezi wako wa kusafiri mwenye akili bandia katika Nchi ya Vilima Elfu.", es: "Tu conserje de viajes inteligente y multilingüe para la Tierra de las Mil Colinas.", de: "Ihr intelligenter mehrsprachiger Reise-Concierge für das Land der tausend Hügel.", zh: "千丘之国的智能多语言旅行管家。", hi: "सहस्र पहाड़ियों की भूमि के लिए आपका बुद्धिमान बहुभाषी यात्रा कंसीयज।", ar: "مساعد السفر الذكي متعدد اللغات لأرض الألف تل.", pt: "Seu concierge de viagem inteligente e multilíngue para a Terra das Mil Colinas.", ja: "千の丘の国のためのインテリジェントな多言語旅行コンシェルジュ。", ru: "Ваш умный многоязычный консьерж по Стране тысячи холмов." },
  signInGoogle: { en: "Sign in with Google", fr: "Se connecter avec Google", rw: "Injira na Google", sw: "Ingia na Google", es: "Iniciar sesión con Google", de: "Mit Google anmelden", zh: "使用谷歌登录", hi: "Google के साथ साइन इन करें", ar: "تسجيل الدخول باستخدام جوجل", pt: "Entrar com o Google", ja: "Googleでサインイン", ru: "Войти через Google" },
  signInFacebook: { en: "Sign in with Facebook", fr: "Se connecter avec Facebook", rw: "Injira na Facebook", sw: "Ingia na Facebook", es: "Iniciar sesión con Facebook", de: "Mit Facebook anmelden", zh: "使用Facebook登录", hi: "फेसबुक के साथ साइन इन करें", ar: "تسجيل الدخول باستخدام فيسبوك", pt: "Entrar com o Facebook", ja: "Facebookでサインイン", ru: "Войти через Facebook" },
  signInApple: { en: "Sign in with Apple", fr: "Se connecter avec Apple", rw: "Injira na Apple", sw: "Ingia na Apple", es: "Iniciar sesión con Apple", de: "Mit Apple anmelden", zh: "使用Apple登录", hi: "Apple के साथ साइन इन करें", ar: "تسجيل الدخول باستخدام أبل", pt: "Entrar com a Apple", ja: "Appleでサインイン", ru: "Войти через Apple" },
  signInLinkedin: { en: "Sign in with LinkedIn", fr: "Se connecter avec LinkedIn", rw: "Injira na LinkedIn", sw: "Ingia na LinkedIn", es: "Iniciar sesión con LinkedIn", de: "Mit LinkedIn anmelden", zh: "使用领英登录", hi: "लिंक्डइन के साथ साइन इन करें", ar: "تسجيل الدخول باستخدام لينكد إن", pt: "Entrar com o LinkedIn", ja: "LinkedInでサインイン", ru: "Войти через LinkedIn" },
  signInInstagram: { en: "Sign in with Instagram", fr: "Se connecter avec Instagram", rw: "Injira na Instagram", sw: "Ingia na Instagram", es: "Iniciar sesión con Instagram", de: "Mit Instagram anmelden", zh: "使用Instagram登录", hi: "इंस्टाग्राम के साथ साइन इन करें", ar: "تسجيل الدخول باستخدام انستجرام", pt: "Entrar com o Instagram", ja: "Instagramでサインイン", ru: "Войти через Instagram" },
  signInX: { en: "Sign in with X", fr: "Se connecter avec X", rw: "Injira na X", sw: "Ingia na X", es: "Iniciar sesión con X", de: "Mit X anmelden", zh: "使用X登录", hi: "X के साथ साइन इन करें", ar: "تسجيل الدخول باستخدام إكس", pt: "Entrar com o X", ja: "Xでサインイン", ru: "Войти через X" },
  signInEmail: { en: "Sign in with Email", fr: "Se connecter avec Email", rw: "Injira na imeri", sw: "Ingia na Barua pepe", es: "Iniciar sesión con Email", de: "Mit E-Mail anmelden", zh: "使用电子邮件登录", hi: "ईमेल के साथ साइन इन करें", ar: "تسجيل الدخول باستخدام البريد الإلكتروني", pt: "Entrar com o Email", ja: "メールでサインイン", ru: "Войти по электронной почте" },
  or: { en: "OR", fr: "OU", rw: "CYANGWA", sw: "AU", es: "O", de: "ODER", zh: "或", hi: "या", ar: "أو", pt: "OU", ja: "または", ru: "ИЛИ" },
  welcomeTitle: { en: "Welcome to Rwanda AI Concierge!", fr: "Bienvenue sur le Concierge IA du Rwanda !", rw: "Murakaza neza kuri Rwanda AI Concierge!", sw: "Karibu kwenye Mwelekezi wa AI wa Rwanda!", es: "¡Bienvenido a tu Conserje de IA de Ruanda!", de: "Willkommen beim Ruanda KI-Concierge!", zh: "欢迎使用卢旺达AI旅行管家！", hi: "रवांडा एआई कंसीयज में आपका स्वागत है!", ar: "أهلاً بك في مساعد السفر الذكي في رواندا!", pt: "Bem-vindo ao Concierge IA de Ruanda!", ja: "ルワンダAIコンシェルジュへようこそ！", ru: "Добро пожаловать в ИИ-консьерж по Руанде!" },
  welcomeSubtitle: { en: "Ask me anything about gorilla permits, safari drives, Kigali restaurants, cultural etiquette, or safety.", fr: "Posez-moi vos questions sur les permis gorilles, safaris, restaurants à Kigali ou la sécurité.", rw: "Mbaza ikibazo cyose ku birunga, ingagi, ibiryo, n'ingendo zose mu Rwanda.", sw: "Niulize chochote kuhusu vibali vya sokwe, safari, mikahawa ya Kigali au usalama.", es: "Pregúntame sobre permisos de gorilas, safaris, restaurantes en Kigali o seguridad.", de: "Fragen Sie mich nach Gorilla-Permits, Safaris, Restaurants in Kigali oder Sicherheit.", zh: "询问关于大猩猩许可证、野生动物园游猎、基加利美食或安全信息。", hi: "गोरिल्ला परमिट, सफारी ड्राइव, किगाली रेस्तरां या सुरक्षा के बारे में कुछ भी पूछें।", ar: "اسألني عن تصاريح الغوريلا أو رحلات السفاري أو مطاعم كيغالي.", pt: "Pergunte sobre autorizações de gorilas, safáris, restaurantes em Kigali ou segurança.", ja: "ゴリラ許可証、サファリ、キガリのレストラン、安全性について何でもお尋ねください。", ru: "Спрашивайте о разрешениях на горилл, сафари, ресторанах Кигали и безопасности." },
  promptHeader: { en: "Quick Reach", fr: "Accès Rapide", rw: "Kugera Vuba", sw: "Ufikiaji wa Haraka", es: "Acceso Rápido", de: "Schnellzugriff", zh: "快速访问", hi: "त्वरित पहुँच", ar: "وصول سريع", pt: "Acesso Rápido", ja: "クイックアクセス", ru: "Быстрый доступ" },
  findNearby: { en: "📍 Find Places Near Me", fr: "📍 Trouver des lieux à proximité", rw: "📍 Shakisha ahantu hano hafi", sw: "📍 Tafuta Maeneo Karibu Nami", es: "📍 Buscar lugares cercanos", de: "📍 Orte in der Nähe finden", zh: "📍 查找我附近的地方", hi: "📍 मेरे पास के स्थान खोजें", ar: "📍 ابحث عن أماكن بالقرب مني", pt: "📍 Encontrar lugares próximos", ja: "📍 近くの場所を探す", ru: "📍 Найти места рядом" },
  prompt1: { en: "Tell me about Rwanda's national parks.", fr: "Parlez-moi des parcs nationaux du Rwanda.", rw: "Mbwira ibya za pariki z'igihugu z'u Rwanda.", sw: "Niambie kuhusu mbuga za kitaifa za Rwanda.", es: "Háblame de los parques nacionales de Ruanda.", de: "Erzählen Sie mir von Ruandas Nationalparks.", zh: "告诉我关于卢旺达国家公园的信息。", hi: "मुझे रवांडा के राष्ट्रीय उद्यानों के बारे में बताएं।", ar: "أخبرني عن المتنزهات الوطنية في رواندا.", pt: "Fale-me sobre os parques nacionais de Ruanda.", ja: "ルワンダの国立公園について教えてください。", ru: "Расскажите мне о национальных парках Руанды." },
  prompt2: { en: "Where is the Kigali Genocide Memorial?", fr: "Où se trouve le Mémorial du génocide de Kigali ?", rw: "Urwibutso rwa Jenoside rwa Kigali ruri he?", sw: "Kumbukumbu ya Mauaji ya Kimbari ya Kigali iko wapi?", es: "¿Dónde está el Memorial del Genocidio de Kigali?", de: "Wo ist das Kigali Genocide Memorial?", zh: "基加利种族灭绝纪念馆在哪里？", hi: "किगाली नरसंहार स्मारक कहाँ है?", ar: "أين يقع نصب كيغالي التذكاري للإبادة الجماعية؟", pt: "Onde fica o Memorial do Genocídio de Kigali?", ja: "キガリ虐殺記念館はどこにありますか？", ru: "Где находится Мемориал геноцида в Кигали?" },
  prompt3: { en: "What are the top 5 things to do in Kigali?", fr: "Quelles sont les 5 meilleures choses à faire à Kigali ?", rw: "Ni ibihe bintu 5 by'ingenzi byo gukorera i Kigali?", sw: "Mambo 5 bora ya kufanya Kigali ni yapi?", es: "¿Cuáles son las 5 mejores cosas que hacer en Kigali?", de: "Was sind die Top 5 Aktivitäten in Kigali?", zh: "在基加利最值得做的5件事是什么？", hi: "किगाली में करने के लिए शीर्ष 5 चीजें क्या हैं?", ar: "ما هي أفضل 5 أشياء يمكن القيام بها في كيغالي؟", pt: "Quais são as 5 melhores coisas para fazer em Kigali?", ja: "キガリでやるべきことトップ5は何ですか？", ru: "Чем заняться в Кигали: топ-5?" },
  prompt4: { en: "How do I get from Kigali to Volcanoes National Park?", fr: "Comment puis-je me rendre de Kigali au Parc National des Volcans ?", rw: "Ngera nte muri Pariki y'Igihugu y'Ibirunga mvuye i Kigali?", sw: "Ninawezaje kufika kutoka Kigali hadi Hifadhi ya Taifa ya Volcanoes?", es: "¿Cómo llego desde Kigali al Parque Nacional de los Volcanes?", de: "Wie komme ich von Kigali zum Volcanoes-Nationalpark?", zh: "我如何从基加利前往火山国家公园？", hi: "मैं किगाली से ज्वालामुखी राष्ट्रीय उद्यान कैसे पहुँचूँ?", ar: "كيف أصل من كيغالي إلى حديقة البراكين الوطنية؟", pt: "Como chego de Kigali ao Parque Nacional dos Vulcões?", ja: "キガリから火山国立公園への行き方を教えてください。", ru: "Как добраться из Кигали в Национальный парк вулканов?" },
  prompt5: { en: "Tell me about Rwandan food.", fr: "Parlez-moi de la nourriture rwandaise.", rw: "Mbwira ku byerekeye amafunguro yo mu Rwanda.", sw: "Niambie kuhusu chakula cha Rwanda.", es: "Háblame de la comida ruandesa.", de: "Erzählen Sie mir vom ruandischen Essen.", zh: "告诉我关于卢旺达美食的信息。", hi: "मुझे रवांडा के भोजन के बारे में बताएं।", ar: "أخبرني عن الطعام الرواندي.", pt: "Fale-me sobre a comida ruandesa.", ja: "ルワンダの食べ物について教えてください。", ru: "Расскажите мне о руандийской еде." },
  prompt6: { en: "Is it safe to travel in Rwanda?", fr: "Est-il sûr de voyager au Rwanda ?", rw: "Gusura u Rwanda biratekanye?", sw: "Je, ni salama kusafiri nchini Rwanda?", es: "¿Es seguro viajar en Ruanda?", de: "Ist es sicher, in Ruanda zu reisen?", zh: "在卢旺达旅行安全吗？", hi: "क्या रवांडा में यात्रा करना सुरक्षित है?", ar: "هل السفر في رواندا آمن؟", pt: "É seguro viajar em Ruanda?", ja: "ルワンダの旅行は安全ですか？", ru: "Безопасно ли путешествовать по Руанде?" },
  prompt7: { en: "Can you teach me a few basic Kinyarwanda phrases?", fr: "Pouvez-vous m'apprendre quelques phrases de base en kinyarwanda ?", rw: "Wanyigisha interuro nkeya z'ibanze mu Kinyarwanda?", sw: "Unaweza kunifundisha misemo michache ya msingi ya Kinyarwanda?", es: "¿Puedes enseñarme algunas frases básicas en kinyarwanda?", de: "Können Sie mir ein paar grundlegende Kinyarwanda-Sätze beibringen?", zh: "你能教我一些基本的基尼亚卢旺达语短语吗？", hi: "क्या आप मुझे कुछ बुनियादी किन्यारवांडा वाक्यांश सिखा सकते हैं?", ar: "هل يمكنك تعليمي بعض العبارات الأساسية في الكينيارواندية؟", pt: "Você pode me ensinar algumas frases básicas em quiniaruanda?", ja: "基本的なキニヤルワンダ語のフレーズをいくつか教えてもらえますか？", ru: "Можете научить меня нескольким основным фразам на киньяруанда?" },
  prompt8: { en: "Tell me about Rwanda's museums and their locations.", fr: "Parlez-moi des musées du Rwanda et de leurs emplacements.", rw: "Mbwira ingoro ndangamurage z'u Rwanda n'aho ziherereye.", sw: "Niambie kuhusu makumbusho ya Rwanda na maeneo yake.", es: "Háblame de los museos de Ruanda y sus ubicaciones.", de: "Erzählen Sie mir von Ruandas Museen und ihren Standorten.", zh: "告诉我关于卢旺达博物馆及其位置的信息。", hi: "मुझे रवांडा के संग्रहालयों और उनके स्थानों के बारे में बताएं।", ar: "أخبرني عن متاحف رواندا ومواقعها.", pt: "Fale-me sobre os museus de Ruanda e suas localizações.", ja: "ルワンダの博物館とその場所について教えてください。", ru: "Расскажите мне о музеях Руанды и их расположении." },
  inputPlaceholder: { en: "Ask Rwanda AI Concierge anything...", fr: "Posez votre question au Concierge IA...", rw: "Baza Umujyanama wa Rwanda AI ikintu cyose...", sw: "Uliza Mwelekezi wa Rwanda AI chochote...", es: "Pregunta al Conserje IA de Ruanda...", de: "Frage den Ruanda KI-Concierge alles...", zh: "向卢旺达AI管家提问...", hi: "रवांडा एआई कंसीयज से कुछ भी पूछें...", ar: "اسأل مساعد السفر الذكي...", pt: "Pergunte ao Concierge IA de Ruanda...", ja: "ルワンダAIコンシェルジュに質問...", ru: "Спросите ИИ-консьержа о чем угодно..." },
  upgradeToContinue: { en: "Upgrade to Premium for unlimited queries", fr: "Passez à Premium pour des requêtes illimitées", rw: "Simbukira kuri Premium kugirango ukomeze", sw: "Boresha hadi Premium kwa maswali bila kikomo", es: "Actualiza a Premium para consultas ilimitadas", de: "Auf Premium upgraden für unbegrenzte Anfragen", zh: "升级到高级版以获取无限制查询", hi: "असीमित प्रश्नों के लिए प्रीमियम में अपग्रेड करें", ar: "الترقية إلى بريميوم لاستفسارات غير محدودة", pt: "Atualize para Premium para consultas ilimitadas", ja: "無制限の質問のためにプレミアムにアップグレード", ru: "Перейдите на Премиум для неограниченных запросов" },
  creditsRemaining: { en: "Credits: {count}", fr: "Crédits : {count}", rw: "Inguzanyo: {count}", sw: "Salio: {count}", es: "Créditos: {count}", de: "Guthaben: {count}", zh: "积分: {count}", hi: "क्रेडिट: {count}", ar: "الرصيد: {count}", pt: "Créditos: {count}", ja: "クレジット: {count}", ru: "Кредиты: {count}" },
  paymentTitle: { en: "Upgrade to VIP Travel Concierge", fr: "Passez au Concierge VIP", rw: "Simbukira kuri VIP Travel Concierge", sw: "Boresha hadi VIP Travel Concierge", es: "Actualizar a Conserje VIP", de: "Auf VIP-Concierge upgraden", zh: "升级到VIP旅行管家", hi: "वीआईपी यात्रा कंसीयज में अपग्रेड करें", ar: "الترقية إلى عضوية VIP المميزة", pt: "Atualizar para VIP Concierge", ja: "VIPトラベルコンシェルジュにアップグレード", ru: "Перейти на VIP Travel Concierge" },
  paymentSubtitle: { en: "You've used your complimentary credits. Upgrade for unlimited AI, voice streaming, and priority itineraries!", fr: "Vous avez utilisé vos crédits gratuits. Passez à Premium pour un accès illimité !", rw: "Wakoresheje inguzanyo zawe z'ubuntu. Simbukira kuri VIP kugirango ukomeze!", sw: "Umetumia salio lako la bure. Boresha kwa safari bila kikomo!", es: "¡Has usado tus créditos gratuitos. Actualiza para acceso ilimitado!", de: "Sie haben Ihre Gratis-Credits aufgebraucht. Upgraden Sie für uneingeschränkten Zugang!", zh: "您已用完免费积分。升级以享受无限制AI对话！", hi: "आपने अपने मानार्थ क्रेडिट का उपयोग कर लिया है। असीमित पहुँच के लिए अपग्रेड करें!", ar: "لقد استخدمت رصيدك المجاني. قم بالترقية للوصول غير المحدود!", pt: "Você usou seus créditos gratuitos. Atualize para acesso ilimitado!", ja: "無料クレジットを使い切りました。無制限アクセスのためにアップグレードしてください！", ru: "Вы использовали свои бесплатные кредиты. Перейдите на Премиум для безлимитного доступа!" },
  howToUpgrade: { en: "How to Upgrade", fr: "Comment Mettre à Niveau", rw: "Uko wasimbukira ku isumbuye", sw: "Jinsi ya Kuboresha", es: "Cómo Actualizar", de: "So führen Sie ein Upgrade durch", zh: "如何升级", hi: "कैसे अपग्रेड करें", ar: "كيفية الترقية", pt: "Como Atualizar", ja: "アップグレード方法", ru: "Как обновиться" },
  premiumPrice: { en: "Pay $10 (12,000 RWF) for full month VIP Access.", fr: "Payez 10 $ (12 000 RWF) pour un mois d'accès VIP.", rw: "Ishyura $10 (12,000 RWF) ukwezi kumwe kwa VIP.", sw: "Lipa $10 (12,000 RWF) kwa mwezi mzima wa VIP.", es: "Paga $10 (12,000 RWF) por un mes de acceso VIP.", de: "Zahlen Sie 10 $ (12.000 RWF) für einen Monat VIP-Zugang.", zh: "支付10美元（12,000卢旺达法郎）获取单月VIP权限。", hi: "एक महीने के वीआईपी एक्सेस के लिए $10 (12,000 RWF) का भुगतान करें।", ar: "ادفع 10 دولارات (12000 فرنك رواندي) للوصول لكامل الشهر.", pt: "Pague $10 (12.000 RWF) por um mês de acesso VIP.", ja: "1か月間のVIPアクセスに10ドル（12,000 RWF）を支払います。", ru: "Заплатите 10 $ (12 000 RWF) за месяц VIP-доступа." },
  payWithMomo: { en: "Pay with MTN MoMoPay (Code: 651631)", fr: "Payer avec MoMoPay (Code: 651631)", rw: "Ishyura na MoMoPay (Kode: 651631)", sw: "Lipa na MoMoPay (Nambari: 651631)", es: "Pagar con MoMoPay (Código: 651631)", de: "Mit MoMoPay bezahlen (Code: 651631)", zh: "使用MoMoPay支付（代码: 651631）", hi: "मोमोपे से भुगतान करें (कोड: 651631)", ar: "الدفع بواسطة MoMoPay (كود: 651631)", pt: "Pagar com MoMoPay (Código: 651631)", ja: "MoMoPayで支払う（コード: 651631）", ru: "Оплатить через MoMoPay (код: 651631)" },
  payWithBank: { en: "Pay with Equity Bank Rwanda", fr: "Payer avec Equity Bank Rwanda", rw: "Ishyura na Equity Bank Rwanda", sw: "Lipa na Equity Bank Rwanda", es: "Pagar con Equity Bank Rwanda", de: "Mit Equity Bank Rwanda bezahlen", zh: "使用Equity Bank Rwanda支付", hi: "इक्विटी बैंक रवांडा से भुगतान करें", ar: "الدفع بواسطة بنك Equity رواندا", pt: "Pagar com Equity Bank Rwanda", ja: "Equity Bank Rwandaで支払う", ru: "Оплатить через Equity Bank Rwanda" },
  paymentConfirmation: { en: "I've Sent Payment (Activate VIP Access)", fr: "J'ai envoyé le paiement (Activer l'accès VIP)", rw: "Nohereje Ubwishyu (Fungura VIP)", sw: "Nimetuma Malipo (Washa VIP)", es: "He enviado el pago (Activar VIP)", de: "Ich habe bezahlt (VIP aktivieren)", zh: "我已付款（激活VIP）", hi: "मैंने भुगतान भेज दिया है (वीआईपी सक्रिय करें)", ar: "لقد أرسلت الدفعة (تفعيل VIP)", pt: "Enviei o pagamento (Ativar VIP)", ja: "支払いを送信しました（VIPを有効化）", ru: "Я отправил платеж (Активировать VIP)" },
  copy: { en: "Copy", fr: "Copier", rw: "Koporora", sw: "Nakili", es: "Copiar", de: "Kopieren", zh: "复制", hi: "कॉपी", ar: "نسخ", pt: "Copiar", ja: "コピー", ru: "Копировать" },
  copied: { en: "Copied!", fr: "Copié !", rw: "Byakoporowe!", sw: "Imenakiliwa!", es: "¡Copiado!", de: "Kopiert!", zh: "已复制！", hi: "कॉपी किया गया!", ar: "تم النسخ!", pt: "Copiado!", ja: "コピーしました！", ru: "Скопировано!" },
  upgrade: { en: "VIP Upgrade", fr: "Mettre à niveau", rw: "Simbukira ku isumbuye", sw: "Boresha", es: "Actualizar", de: "Upgrade", zh: "升级", hi: "अपग्रेड", ar: "ترقية", pt: "Atualizar", ja: "アップグレード", ru: "Обновить" },
  premium: { en: "VIP Member", fr: "Membre VIP", rw: "Umunyamuryango wa VIP", sw: "Mwanachama wa VIP", es: "Miembro VIP", de: "VIP-Mitglied", zh: "VIP会员", hi: "वीआईपी सदस्य", ar: "عضو VIP", pt: "Membro VIP", ja: "VIPメンバー", ru: "VIP-участник" },
  getDirections: { en: "Get Directions", fr: "Obtenir l'itinéraire", rw: "Shaka Inzira", sw: "Pata Maelekezo", es: "Obtener Direcciones", de: "Route berechnen", zh: "获取路线", hi: "दिशा - निर्देश प्राप्त करें", ar: "احصل على الاتجاهات", pt: "Obter Direções", ja: "経路を取得", ru: "Проложить маршрут" },
  locating: { en: "Locating you...", fr: "Localisation en cours...", rw: "Turashakisha aho uherereye...", sw: "Tunakutafuta...", es: "Ubicándote...", de: "Standort wird ermittelt...", zh: "定位中...", hi: "आपको ढूंढा जा रहा है...", ar: "تحديد موقعك...", pt: "Localizando você...", ja: "位置情報を取得中...", ru: "Определение местоположения..." },
  locationError: { en: "Could not find your location.", fr: "Impossible de trouver votre emplacement.", rw: "Ntibishobotse kubona aho uherereye.", sw: "Haikuweza kupata eneo lako.", es: "No se pudo encontrar tu ubicación.", de: "Standort konnte nicht gefunden werden.", zh: "无法找到您的位置。", hi: "आपका स्थान नहीं मिल सका।", ar: "تعذر العثور على موقعك.", pt: "Não foi possível encontrar sua localização.", ja: "現在地が見つかりませんでした。", ru: "Не удалось найти ваше местоположение." },
};

type Provider = 'google' | 'facebook' | 'apple' | 'linkedin' | 'instagram' | 'x' | 'email';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [language, setLanguage] = useState('English');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const session = localStorage.getItem('rwanda_user_session');
      return !!session;
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState<{ name: string; email?: string } | null>(() => {
    try {
      const session = localStorage.getItem('rwanda_user_session');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });
  const [credits, setCredits] = useState(15);
  const [isPremium, setIsPremium] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Saved items persistence
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rwanda_saved_places');
      return stored ? JSON.parse(stored) : ['volcanoes_np', 'kigali_memorial', 'question_coffee'];
    } catch {
      return ['volcanoes_np', 'kigali_memorial', 'question_coffee'];
    }
  });

  const [savedItineraries, setSavedItineraries] = useState<GeneratedItinerary[]>(() => {
    try {
      const stored = localStorage.getItem('rwanda_saved_trips');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const langCode = LANGUAGES.find((l) => l.name === language)?.code || 'en';
  const t = (key: keyof typeof UI_TEXT) => UI_TEXT[key]?.[langCode] || UI_TEXT[key]['en'];

  useEffect(() => {
    localStorage.setItem('rwanda_saved_places', JSON.stringify(savedPlaceIds));
  }, [savedPlaceIds]);

  useEffect(() => {
    localStorage.setItem('rwanda_saved_trips', JSON.stringify(savedItineraries));
  }, [savedItineraries]);

  const initializeChat = useCallback(() => {
    try {
      const instruction = getSystemInstruction(language);
      const newChat = geminiService.createChat(instruction);
      setChat(newChat);
      setMessages([]);
      setDestinations([]);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Failed to initialize AI Chat: ${e.message}`);
      } else {
        setError("An unknown error occurred during initialization.");
      }
    }
  }, [language]);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const appendToLastMessage = useCallback((chunk: string) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      const lastMessageIndex = newMessages.length - 1;
      const lastMessage = newMessages[lastMessageIndex];
      if (lastMessage && lastMessage.role === 'model') {
        newMessages[lastMessageIndex] = {
          ...lastMessage,
          content: lastMessage.content + chunk,
        };
        return newMessages;
      }
      return prev;
    });
  }, []);

  const findAndDisplayNearbyPlaces = useCallback(async (primaryDestination: Destination) => {
    if (!chat) return;

    const lowerCaseName = primaryDestination.name.toLowerCase();

    if (lowerCaseName.includes('volcanoes') || lowerCaseName.includes('virunga')) {
      const allHotels = [
        ...volcanoesHotelsData.luxury,
        ...volcanoesHotelsData.midRange,
        ...volcanoesHotelsData.budget,
      ];
      const hotelDestinations: Destination[] = allHotels.map((hotel) => ({
        lat: hotel.lat,
        lng: hotel.lng,
        name: hotel.name,
      }));
      setDestinations((prev) => [...prev, ...hotelDestinations]);

      const hotelMessage: Message = { role: 'model', content: '', component: 'VolcanoesHotels' };
      setMessages((prev) => [...prev, hotelMessage]);
      return;
    }

    if (lowerCaseName.includes('huye') || lowerCaseName.includes('butare')) {
      const hotelDestinations: Destination[] = huyeHotelsData.map((hotel) => ({
        lat: hotel.lat,
        lng: hotel.lng,
        name: hotel.name,
      }));
      setDestinations((prev) => [...prev, ...hotelDestinations]);

      const hotelMessage: Message = { role: 'model', content: '', component: 'HuyeHotels' };
      setMessages((prev) => [...prev, hotelMessage]);
      return;
    }

    const followUpPrompt = `Based on the user's interest in ${primaryDestination.name}, suggest a list of at least 6 nearby hotels, guesthouses, restaurants, coffee shops, and points of interest. You MUST use the [MAP:latitude,longitude,Place Name] format for each recommendation. Format your response with clear markdown headings.`;

    const thinkingContent = `Discovering recommendations around ${primaryDestination.name}...`;
    const thinkingMessage: Message = { role: 'model', content: thinkingContent, isSuggestion: true };

    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      const stream = await chat.sendMessageStream({ message: followUpPrompt });

      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessageIndex = newMessages.length - 1;
        const lastMessage = newMessages[lastMessageIndex];
        if (lastMessage && lastMessage.content === thinkingContent) {
          newMessages[lastMessageIndex] = { ...lastMessage, content: '' };
        }
        return newMessages;
      });

      let fullResponse = '';
      let contentBuffer = '';
      let animationFrameId: number | null = null;

      const throttledUpdate = () => {
        if (contentBuffer.length > 0) {
          appendToLastMessage(contentBuffer);
          contentBuffer = '';
        }
        animationFrameId = null;
      };

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        contentBuffer += chunkText;
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(throttledUpdate);
        }
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      throttledUpdate();

      const matches = fullResponse.matchAll(/\[MAP:(-?\d+\.?\d*),(-?\d+\.?\d*),(.*?)\]/g);
      const nearbyDestinations: Destination[] = [];
      for (const match of matches) {
        const [, lat, lng, name] = match;
        nearbyDestinations.push({ lat: parseFloat(lat), lng: parseFloat(lng), name: name.trim() });
      }

      if (nearbyDestinations.length > 0) {
        setDestinations((prevDests) => [...prevDests, ...nearbyDestinations]);
      }
    } catch (e) {
      console.warn("Failed to fetch nearby places:", e);
      setMessages((prev) => prev.filter((msg) => !(msg.isSuggestion && msg.content.includes(thinkingContent.substring(0, 10)))));
    }
  }, [chat, appendToLastMessage]);

  const handleSendMessage = useCallback(async (prompt: string, hiddenPrompt?: string) => {
    if (!isPremium && credits <= 0) {
      setIsPaymentModalOpen(true);
      return;
    }

    if (isLoading || !chat) {
      return;
    }

    if (!isPremium) {
      setCredits((prev) => Math.max(0, prev - 1));
    }
    setIsLoading(true);
    setError(null);

    // Switch to Chat tab when message is sent
    setActiveTab('chat');

    const actualPrompt = hiddenPrompt || prompt;
    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage, { role: 'model', content: '' }]);

    try {
      const stream = await chat.sendMessageStream({ message: actualPrompt });

      let fullResponse = '';
      let contentBuffer = '';
      let animationFrameId: number | null = null;

      const throttledUpdate = () => {
        if (contentBuffer.length > 0) {
          appendToLastMessage(contentBuffer);
          contentBuffer = '';
        }
        animationFrameId = null;
      };

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        contentBuffer += chunkText;
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(throttledUpdate);
        }
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      throttledUpdate();

      const matches = fullResponse.matchAll(/\[MAP:(-?\d+\.?\d*),(-?\d+\.?\d*),(.*?)\]/g);
      const newDestinations: Destination[] = [];
      for (const match of matches) {
        const [, lat, lng, name] = match;
        newDestinations.push({ lat: parseFloat(lat), lng: parseFloat(lng), name: name.trim() });
      }

      if (newDestinations.length === 0) {
        const lowerCasePrompt = actualPrompt.toLowerCase();
        const lowerCaseResponse = fullResponse.toLowerCase();
        const isHuyeQuery = lowerCasePrompt.includes('huye') || lowerCasePrompt.includes('butare') || lowerCaseResponse.includes('huye') || lowerCaseResponse.includes('butare');
        const isVolcanoesQuery = lowerCasePrompt.includes('volcanoes') || lowerCasePrompt.includes('virunga') || lowerCaseResponse.includes('volcanoes') || lowerCaseResponse.includes('virunga');

        if (isHuyeQuery) {
          newDestinations.push({ lat: -2.6077, lng: 29.7429, name: 'Huye' });
        } else if (isVolcanoesQuery) {
          newDestinations.push({ lat: -1.464, lng: 29.591, name: 'Volcanoes National Park' });
        }
      }

      if (newDestinations.length > 0) {
        setDestinations((prevDests) => {
          const existingDests = new Set(prevDests.map((d) => `${d.lat},${d.lng}`));
          const filteredNewDests = newDestinations.filter((d) => !existingDests.has(`${d.lat},${d.lng}`));
          return [...prevDests, ...filteredNewDests];
        });
        await findAndDisplayNearbyPlaces(newDestinations[0]);
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(`Error from AI: ${errorMessage}`);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading, credits, isPremium, findAndDisplayNearbyPlaces, appendToLastMessage]);

  const handleGetDirections = useCallback((destOrLat: Destination | number, maybeLng?: number, maybeName?: string) => {
    let lat: number;
    let lng: number;
    let name: string = 'Rwanda Destination';

    if (typeof destOrLat === 'number') {
      lat = destOrLat;
      lng = maybeLng!;
      name = maybeName || name;
    } else {
      lat = destOrLat.lat;
      lng = destOrLat.lng;
      name = destOrLat.name;
    }

    if (!navigator.geolocation) {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lng}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    );
  }, []);

  const handleRequestLocate = useCallback(() => {
    setError(null);
    if (!navigator.geolocation) {
      setError(t('locationError'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setError(t('locationError'));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [t]);

  const handleFindNearby = useCallback(() => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      handleSendMessage('Find the best places to visit near Kigali');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLoading(false);
        const promptText = t('findNearby').replace('📍 ', '');
        const hiddenPrompt = `I am currently at coordinates (${latitude}, ${longitude}) in Rwanda. What are the best places, restaurants, coffee shops, and landmarks to visit nearby? You MUST use the [MAP:latitude,longitude,Place Name] format for each recommendation.`;
        handleSendMessage(promptText, hiddenPrompt);
      },
      () => {
        setIsLoading(false);
        const promptText = t('findNearby').replace('📍 ', '');
        handleSendMessage(promptText, "What are the most popular tourist attractions and landmarks across Rwanda?");
      }
    );
  }, [handleSendMessage, t]);

  const handleToggleSavePlace = (placeId: string) => {
    setSavedPlaceIds((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  const handleSaveItinerary = (itinerary: GeneratedItinerary) => {
    setSavedItineraries((prev) => {
      const exists = prev.some((item) => item.id === itinerary.id);
      if (exists) return prev;
      return [itinerary, ...prev];
    });
  };

  const handleDeleteItinerary = (id: string) => {
    setSavedItineraries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLoginSuccess = (userData: UserProfile) => {
    const profile = { 
      name: userData.name || 'Traveler', 
      email: userData.email || '' 
    };
    setUser(profile);
    try {
      localStorage.setItem('rwanda_user_session', JSON.stringify(profile));
    } catch {
      // ignore
    }
    setCredits(15);
    setIsPremium(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('rwanda_user_session');
    } catch {
      // ignore
    }
    setIsLoggedIn(false);
    setUser(null);
    setCredits(0);
    setIsPremium(false);
  };

  const handlePurchasePremium = () => {
    setIsPremium(true);
    setIsPaymentModalOpen(false);
  };

  const isInputDisabled = isLoading || (!isPremium && credits <= 0);

  const examplePrompts = [
    t('findNearby'),
    t('prompt1'),
    t('prompt2'),
    t('prompt3'),
    t('prompt4'),
    t('prompt5'),
    t('prompt6'),
    t('prompt7'),
    t('prompt8'),
  ];

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={handleLoginSuccess}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        texts={{
          loginSubtitle: t('loginSubtitle'),
          signInGoogle: t('signInGoogle'),
          signInFacebook: t('signInFacebook'),
          signInApple: t('signInApple'),
          signInLinkedin: t('signInLinkedin'),
          signInInstagram: t('signInInstagram'),
          signInX: t('signInX'),
          signInEmail: t('signInEmail'),
          or: t('or'),
        }}
        welcomeTitle={t('welcomeTitle')}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onLanguageChange={setLanguage}
        credits={credits}
        isPremium={isPremium}
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        user={user}
        onLogout={handleLogout}
        onNewChat={initializeChat}
        t={t}
      />

      {/* Main Content View Switcher */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        
        {/* 1. Home Dashboard */}
        {activeTab === 'home' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <HomeHero
              onNavigateTab={setActiveTab}
              onQuickPrompt={(p) => handleSendMessage(p)}
              onPromptClick={(p, isNearby) => {
                if (isNearby) handleFindNearby();
                else handleSendMessage(p);
              }}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onSelectPlace={(place) => setSelectedPlaceForModal(place)}
              savedPlaceIds={savedPlaceIds || []}
              onToggleSavePlace={handleToggleSavePlace}
              language={language}
            />
          </div>
        )}

        {/* 2. Interactive Map Explorer */}
        {activeTab === 'explore' && (
          <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-hidden bg-slate-900">
            <SmartMapExplore
              destinations={destinations}
              userLocation={userLocation}
              onGetDirections={(lat, lng, name) => handleGetDirections(lat, lng, name)}
              onRequestLocate={handleRequestLocate}
              onSelectPlace={(place) => setSelectedPlaceForModal(place)}
              savedPlaceIds={savedPlaceIds}
              onToggleSavePlace={handleToggleSavePlace}
              onAskConcierge={(prompt) => handleSendMessage(prompt)}
              getDirectionsText={t('getDirections')}
            />
          </div>
        )}

        {/* 3. AI Trip Planner */}
        {activeTab === 'planner' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <TripPlanner
              onSaveItinerary={handleSaveItinerary}
              savedItineraries={savedItineraries}
              onOpenInChat={(msg) => handleSendMessage(msg)}
              language={language}
            />
          </div>
        )}

        {/* 4. Cultural Experience, Phrases & Parks */}
        {activeTab === 'experience' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <ExperienceRwanda
              onAskConcierge={(p) => handleSendMessage(p)}
              language={language}
            />
          </div>
        )}

        {/* 5. 5-Star Luxury Hotels & Booking */}
        {activeTab === 'hotels' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <FiveStarHotels
              onAskConcierge={(p) => handleSendMessage(p)}
              onGetDirections={(lat, lng, name) => handleGetDirections(lat, lng, name)}
            />
          </div>
        )}

        {/* 6. Safety & Emergency Contacts */}
        {activeTab === 'safety' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <SafetyAssistant
              onAskConcierge={(p) => handleSendMessage(p)}
            />
          </div>
        )}

        {/* 7. My Rwanda (Saved Places, Itineraries, Membership) */}
        {activeTab === 'profile' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <MyRwanda
              user={user}
              credits={credits}
              isPremium={isPremium}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
              savedPlaceIds={savedPlaceIds}
              onToggleSavePlace={handleToggleSavePlace}
              savedItineraries={savedItineraries}
              onDeleteItinerary={handleDeleteItinerary}
              onSelectPlace={(place) => setSelectedPlaceForModal(place)}
              onNavigateTab={setActiveTab}
              onAskConcierge={(p) => handleSendMessage(p)}
              language={language}
            />
          </div>
        )}

        {/* 8. Full-Featured Chat Concierge */}
        {activeTab === 'chat' && (

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-900">
            
            {/* Quick Reach Sidebar (Collapsible on mobile) */}
            <aside className="hidden md:block w-72 flex-shrink-0 bg-slate-950/80 border-r border-slate-800 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {t('promptHeader')}
                </h3>
                <button
                  onClick={initializeChat}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  <span>{t('newChat')}</span>
                </button>
              </div>

              <div className="space-y-2">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (index === 0) handleFindNearby();
                      else handleSendMessage(prompt);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      index === 0
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xs'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </aside>

            {/* Chat Body & Input */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/60 relative">
              <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                <div className="max-w-3xl mx-auto h-full">
                  {messages.length === 0 && !isLoading && (
                    <WelcomeScreen
                      welcomeTitle={t('welcomeTitle')}
                      welcomeSubtitle={t('welcomeSubtitle')}
                      onQuickPrompt={(p) => handleSendMessage(p)}
                    />
                  )}

                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <ChatMessage
                        key={index}
                        message={msg}
                        language={language}
                        onSelectMapDestination={(lat, lng, name) => handleGetDirections(lat, lng, name)}
                      />
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
                      <ChatMessage
                        message={{ role: 'model', content: '' }}
                        isLoading={true}
                        language={language}
                      />
                    )}
                  </div>
                </div>
              </main>

              {/* Chat Input Bar */}
              <footer className="bg-slate-950/90 border-t border-slate-800/80 p-3 sm:p-4">
                <div className="max-w-3xl mx-auto">
                  {error && (
                    <div className="mb-2 text-center text-xs text-rose-300 bg-rose-950/60 border border-rose-800 p-2 rounded-xl">
                      <p>{error}</p>
                    </div>
                  )}
                  <ChatInput
                    onSendMessage={(msg) => handleSendMessage(msg)}
                    disabled={isInputDisabled}
                    placeholder={isInputDisabled ? t('upgradeToContinue') : t('inputPlaceholder')}
                  />
                </div>
              </footer>

            </div>
          </div>
        )}

      </div>

      {/* Place Detail Modal */}
      {selectedPlaceForModal && (
        <PlaceDetailModal
          place={selectedPlaceForModal}
          onClose={() => setSelectedPlaceForModal(null)}
          isSaved={(savedPlaceIds || []).includes(selectedPlaceForModal.id)}
          onToggleSave={handleToggleSavePlace}
          onGetDirections={(lat, lng, name) => handleGetDirections(lat, lng, name)}
          onAskConcierge={(p) => {
            setSelectedPlaceForModal(null);
            handleSendMessage(p);
          }}
        />
      )}

      {/* Voice Assistant Modal */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        setLanguage={setLanguage}
        onSendQueryToChat={(q) => handleSendMessage(q)}
      />

      {/* Payment / VIP Upgrade Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          onClose={() => setIsPaymentModalOpen(false)}
          onUpgrade={handlePurchasePremium}
          texts={{
            paymentTitle: t('paymentTitle'),
            paymentSubtitle: t('paymentSubtitle'),
            howToUpgrade: t('howToUpgrade'),
            premiumPrice: t('premiumPrice'),
            payWithMomo: t('payWithMomo'),
            payWithBank: t('payWithBank'),
            paymentConfirmation: t('paymentConfirmation'),
            copy: t('copy'),
            copied: t('copied'),
          }}
        />
      )}

    </div>
  );
};

export default App;
