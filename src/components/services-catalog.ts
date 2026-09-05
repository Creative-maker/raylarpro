export type ServiceCategory = {
  slug: string;
  label: string;
  title: string;
  desc: string;
  items: string[];
};

/** Single source of truth for the seven service categories (6 items each). */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "shopify-development",
    label: "01 , Build",
    title: "Shopify Development",
    desc: "Build fast, scalable Shopify stores designed for growth.",
    items: [
      "Shopify Store Setup",
      "Custom Theme Development",
      "Shopify Plus",
      "Store Migration",
      "Headless Commerce",
      "App Development",
    ],
  },
  {
    slug: "store-optimization-cro",
    label: "02 , Convert",
    title: "Store Optimization & CRO",
    desc: "Increase conversions and maximize revenue from your existing traffic.",
    items: [
      "Conversion Rate Optimization",
      "Speed Optimization",
      "Checkout Optimization",
      "Product Page Optimization",
      "UX Improvements",
      "eCommerce Audits",
    ],
  },
  {
    slug: "seo-ai-search",
    label: "03 , Discover",
    title: "SEO & AI Search Optimization",
    desc: "Help customers discover your store through organic and AI-powered search.",
    items: [
      "Technical SEO",
      "Shopify SEO",
      "On-Page SEO",
      "GEO (Generative Engine Optimization)",
      "AI Search Optimization",
      "Structured Data",
    ],
  },
  {
    slug: "sem-paid-growth",
    label: "04 , Acquire",
    title: "Search Engine Marketing (SEM) & Paid Growth",
    desc: "Drive qualified traffic through high-performing paid advertising campaigns.",
    items: [
      "Google Ads",
      "Google Shopping",
      "Performance Max",
      "Search Campaigns",
      "Remarketing",
      "Landing Page Optimization",
    ],
  },
  {
    slug: "email-sms-marketing",
    label: "05 , Retain",
    title: "Email & SMS Marketing",
    desc: "Turn one-time buyers into loyal repeat customers.",
    items: [
      "Klaviyo Automation",
      "Email Campaigns",
      "SMS Marketing",
      "Customer Segmentation",
      "Abandoned Cart Recovery",
      "Post-Purchase Flows",
    ],
  },
  {
    slug: "integrations-ai-automation",
    label: "06 , Automate",
    title: "Integrations & AI Automation",
    desc: "Connect your tools and automate repetitive tasks to scale efficiently.",
    items: [
      "Shopify Flow",
      "API Integrations",
      "AI Automation",
      "CRM & ERP Integrations",
      "Inventory Sync",
      "Google Analytics 4",
    ],
  },
  {
    slug: "growth-consultancy",
    label: "07 , Scale",
    title: "Shopify Growth Consultancy",
    desc: "Strategic guidance to help your business grow with confidence.",
    items: [
      "Shopify Consultancy",
      "Growth Strategy",
      "Store Audits",
      "Internationalisation",
      "Performance Reviews",
      "Ongoing Support",
    ],
  },
];
