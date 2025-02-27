declare global {
   interface Window {
     gtag: (...args: any[]) => void;
   }
 }

export const GA_MEASUREMENT_ID = process.env.GOOGLE_ANALYTICS_ID; 

// Track page views
export const pageview = (url: string) => {
   if (typeof window !== "undefined" && window.gtag) {
     window.gtag("config", GA_MEASUREMENT_ID, {
       page_path: url,
     });
   }
 };
 
 // Track custom events (like button clicks)
 export const event = ({ action, category, label, value }: {
   action: string;
   category: string;
   label?: string;
   value?: number;
 }) => {
   if (typeof window !== "undefined" && window.gtag) {
     window.gtag("event", action, {
       event_category: category,
       event_label: label,
       value: value,
     });
   }
 };
