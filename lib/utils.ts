import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): {
  formattedDate: string;
  formattedTime: string;
} {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate =
    date.toLocaleString("ro-RO", dateOptions).charAt(0).toUpperCase() +
    date.toLocaleString("ro-RO", dateOptions).slice(1);
  const formattedTime = date.toLocaleString("ro-RO", timeOptions);

  return { formattedDate, formattedTime };
}

export function getWelcomeMessage(description: string) {
  switch (description.toLowerCase()) {
    case "clear sky":
      return "Bun venit acasă! Cer senin și aer proaspăt astăzi.";
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      return "Bun venit acasă! Puțin înnorat, dar tot o zi plăcută.";
    case "rain":
    case "shower rain":
      return "Bun venit acasă! Plouă afară, ai grijă să nu te uzi!";
    case "snow":
    case "light snow":
      return "Bun venit acasă! Fulgi de zăpadă în aer, stai la căldură!";
    case "wind":
      return "Bun venit acasă! Astăzi bate vântul.";
    default:
      return "Bun venit acasă! Să ai o zi frumoasă!";
  }
}
