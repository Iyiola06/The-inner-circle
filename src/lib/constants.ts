export const WHATSAPP_NUMBER = "2347016941726";

export const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const WHATSAPP_MESSAGES = {
  GENERAL: "Hello, I want to become a Circler. Please share the available communities and payment steps.",
  BETTER_MAN: "Hello, I want to join the Better Man Community at ₦15,000. Please share the payment steps.",
  INNOVATION_LAB: "Hello, I want to join the Innovation Lab Community at ₦20,500. Please share the payment steps.",
  BUDDING_CEOS: "Hello, I want to join the Budding CEOs Community at ₦28,000. Please share the payment steps.",
};
