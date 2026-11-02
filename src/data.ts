// All editable site content lives here: contact channels, services, prices, and work samples.
// Prices are "starting at" amounts in Philippine pesos.

export const SITE = {
  name: "Craftline Digital",
  descriptor: "Websites, video editing, and graphic design for local businesses",
  portfolioUrl: "https://glennpolia.vercel.app/"
};

// Leave a channel's value empty ("") to hide it everywhere on the site.
export const CONTACT = {
  email: "glennpolia9@gmail.com",
  whatsapp: "https://wa.me/639388589282",
  whatsappDisplay: "+63 938 858 9282",
  messenger: "https://www.facebook.com/glenn.polia7?mibextid=ZbWKwL"
};

export type ServiceId = "web" | "va" | "video" | "design";

export interface Service {
  id: ServiceId;
  title: string;
  summary: string;
  items: string[];
  // Leave startingAt out to show "Price on request" until a price is set.
  startingAt?: number;
  unit?: string;
}

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Website Development",
    summary: "A clear, mobile-friendly website that tells customers what you offer and how to reach you.",
    items: [
      "Simple business websites and landing pages",
      "Mobile-friendly layouts",
      "Your introduction, services or products, and contact details",
      "Social links and contact buttons",
      "Basic on-page SEO setup (higher packages)"
    ],
    startingAt: 1000
  },
  {
    id: "va",
    title: "VA Portfolio Websites",
    summary: "A personal portfolio site for aspiring virtual assistants, so clients can see your skills, samples, and resume in one link.",
    items: [
      "About you, your skills, and the services you offer",
      "Work samples and the tools you use",
      "Resume download and contact buttons",
      "Mobile-friendly layout",
      "Your own shareable link for job applications"
    ]
  },
  {
    id: "video",
    title: "Video Editing",
    summary: "Short videos that promote your business on Facebook, Instagram, and TikTok.",
    items: [
      "Short promotional videos",
      "Social media video ads",
      "Product or service promos",
      "Reels, TikTok, and Facebook formats",
      "Text overlays, captions, pacing, and transitions"
    ],
    startingAt: 500,
    unit: "per short-form video"
  },
  {
    id: "design",
    title: "Graphic Design",
    summary: "Eye-catching graphics for your posts, promos, and sales.",
    items: [
      "Social media graphics",
      "Promotional posters",
      "Product and service promo creatives",
      "Sale and discount graphics",
      "Basic business promotional materials"
    ],
    startingAt: 250,
    unit: "per graphic"
  }
];

export interface WebsitePackage {
  name: string;
  startingAt: number;
  summary: string;
  includes: string[];
  featured?: boolean;
}

export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    name: "Starter Page",
    startingAt: 1000,
    summary: "A one-page website to get your business online.",
    includes: [
      "One-page basic website",
      "Business name and introduction",
      "Services or products section",
      "Contact information or your social links",
      "Mobile-friendly layout"
    ]
  },
  {
    name: "Business Website",
    startingAt: 2500,
    summary: "A more complete site with room to show your business.",
    includes: [
      "About section",
      "Services or products section",
      "Gallery or image section",
      "Contact information and social links",
      "Mobile-friendly layout"
    ],
    featured: true
  },
  {
    name: "Business Website Plus",
    startingAt: 3000,
    summary: "A more customized layout with extra content sections.",
    includes: [
      "Everything in Business Website",
      "More customized layout and sections",
      "Inquiry/contact form, where supported",
      "Basic on-page SEO",
      "Form setup confirmed with you before we start"
    ]
  }
];

export const PRICING_NOTES = [
  "All prices are starting prices. Your final quote depends on scope, how ready your content is, complexity, and any third-party requirements.",
  "Domain, hosting, paid tools, and third-party subscriptions are separate where applicable.",
  "Extra pages, custom features, payment or booking systems, and major redesigns are quoted separately.",
  "VA portfolio websites, video editing, and graphic design are priced separately from website packages. Creative prices do not include ad spend, stock assets, or paid music.",
  "Ongoing support can be discussed based on your needs."
];

export const PROCESS = [
  { title: "Discuss", text: "We talk about your business, your goals, and what you need made." },
  { title: "Plan", text: "We agree on the scope, content, timeline, price, and what is not included." },
  { title: "Create", text: "I build the website or prepare the creative work and share it with you for review." },
  { title: "Review and Deliver", text: "I apply the agreed revisions, hand over the final files, and we talk about any ongoing support separately." }
];

export type WorkKind = "Website" | "VA Portfolio" | "Video" | "Graphic Design";

export interface WorkItem {
  id: string;
  title: string;
  kind: WorkKind;
  description: string;
  imageUrl?: string;
  previewUrl?: string;
  previewLabel?: string;
  // Concept work is labeled on the site so it is never mistaken for a client project.
  concept?: boolean;
  video?: string[];
}

export const WORK: WorkItem[] = [
  {
    id: "glennpolia-portfolio",
    title: "Glenn Polia Portfolio",
    kind: "VA Portfolio",
    description: "My own portfolio site with a project gallery, resume download, interactive demos, and a mobile layout.",
    imageUrl: "/assets/work/glennpolia-portfolio.png",
    previewUrl: "https://glennpolia.vercel.app/",
    previewLabel: "Visit Site"
  },
  {
    id: "markcastillon-portfolio",
    title: "Mark Castillon Portfolio",
    kind: "VA Portfolio",
    description: "A portfolio for an Information Systems graduate and creative technologist, with an interactive skills map, work samples, experience, and a resume.",
    imageUrl: "/assets/work/markcastillon-portfolio.png",
    previewUrl: "https://markcastillon-portfolio.vercel.app/",
    previewLabel: "Visit Site"
  },
  {
    id: "jeffybanez-portfolio",
    title: "Jeff Ybanez Portfolio",
    kind: "VA Portfolio",
    description: "A portfolio for a full-stack virtual assistant, with services, tools, project samples, and WhatsApp contact buttons.",
    imageUrl: "/assets/work/jeffybanez-portfolio.png",
    previewUrl: "https://www.jeffybanez.site/",
    previewLabel: "Visit Site"
  },
  {
    id: "cafe-concept",
    title: "Local Café Website",
    kind: "Website",
    description: "A one-page site for a neighborhood café with the menu, opening hours, location, and order buttons. Shows what the Starter Page package looks like.",
    previewUrl: "/concepts/cafe/",
    previewLabel: "Open Demo",
    concept: true
  },
  {
    id: "smartlink",
    title: "SMARTLink Services",
    kind: "Website",
    description: "A landing page for a broadband, fiber, and network installation company, built to turn visitors into project inquiries.",
    imageUrl: "/assets/funnels/smartlink-services.png",
    previewUrl: "https://app.gohighlevel.com/v2/preview/f08rWhxfie91HDwC43CV?notrack=true",
    previewLabel: "View Page"
  },
  {
    id: "velamd",
    title: "VelaMD Telehealth",
    kind: "Website",
    description: "A landing page for an online dermatology service with a simple three-step \"How It Works\" section.",
    imageUrl: "/assets/funnels/vela-md-how-it-works.png",
    previewUrl: "https://app.gohighlevel.com/v2/preview/8P91zxwp8ZsMdXbOqibF?notrack=true",
    previewLabel: "View Page"
  },
  {
    id: "ruben-arthur",
    title: "Ruben & Arthur Partnership Kit",
    kind: "Website",
    description: "A media kit page presenting a content creator duo to brands and builders looking for partnerships.",
    imageUrl: "/assets/funnels/ruben-arthur-partnership.png",
    previewUrl: "https://app.gohighlevel.com/v2/preview/T7r63z5lkenUyB7ZqSSq?notrack=true",
    previewLabel: "View Page"
  },
  {
    id: "burn-bright",
    title: "Burn Bright Pro",
    kind: "Website",
    description: "A landing page for an Instagram marketing app that explains the product and moves visitors toward signing up.",
    imageUrl: "/assets/funnels/burn-bright-pro-ig.png",
    previewUrl: "https://app.gohighlevel.com/v2/preview/4Kldl6gfh04SWEOXoLm8?notrack=true",
    previewLabel: "View Page"
  },
  {
    id: "glp1-clinic",
    title: "GLP-1 Weight Loss Clinic",
    kind: "Website",
    description: "A landing page for a medical weight loss program, structured to get visitors to book a consultation.",
    imageUrl: "/assets/funnels/glp1-demo-clinic.png",
    previewUrl: "https://app.gohighlevel.com/v2/preview/7W6Ieb6PAlZJ4UOelx4T",
    previewLabel: "View Page"
  },
  {
    id: "promo-reels",
    title: "Short-Form Promo Ads",
    kind: "Video",
    description: "Short vertical ad edits with different opening hooks cut against the same main footage, made for Reels and TikTok.",
    video: ["/assets/videos/ad3-body-reel.mp4", "/assets/videos/ad11-body-reel.mp4"]
  },
  {
    id: "credit-brigade",
    title: "Credit Brigade Ad Set",
    kind: "Graphic Design",
    description: "Social ad graphics for a credit repair service with a checklist of benefits and a direct call to action.",
    imageUrl: "/assets/graphics/credit-brigade.png"
  },
  {
    id: "eye-mazen",
    title: "Eye-Mazen Gummy Promo",
    kind: "Graphic Design",
    description: "Product promo graphics for a supplement: the main claim, ingredient highlights, and everyday use cases.",
    imageUrl: "/assets/graphics/eye-mazen-gummy.png"
  },
  {
    id: "7figure",
    title: "7Figure Builder Ads",
    kind: "Graphic Design",
    description: "Bold text-based ad graphics for a home-building course, made to stop the scroll and get free sign-ups.",
    imageUrl: "/assets/graphics/7figure-builder.png"
  }
];
