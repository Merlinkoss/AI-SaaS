import { Discord } from "@/components/icon/discord";
import {
  Code,
  Cross,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  PenLine,
  Settings,
  VideoIcon,
} from "lucide-react";

export const CONVERSATION = {
  label: "Conversation",
  description: "Talk with ChatGPT4",
  icon: MessageSquare,
  color: "text-violet-500",
  bgColor: "bg-violet-500/10",
  href: "/conversation",
};

export const IMAGE = {
  label: "Image Generation",
  description: "Generate image by new OpenAI framework",
  icon: ImageIcon,
  href: "/image",
  color: "text-pink-700",
  bgColor: "bg-pink-700/10",
};

export const VIDEO = {
  label: "Video Generation",
  description: "Video by one of the model from ReplicateAI",
  icon: VideoIcon,
  href: "/video",
  color: "text-orange-700",
  bgColor: "bg-orange-700/10",
};

export const MUSIC = {
  label: "Music Generation",
  description: "Music by one of the model from ReplicateAI",
  icon: Music,
  href: "/music",
  color: "text-emerald-500",
  bgColor: "bg-emerald-500/10",
};

export const CODE = {
  label: "Code Generation",
  description: "Generate code by ChatGPT4",
  icon: Code,
  href: "/code",
  color: "text-green-700",
  bgColor: "bg-green-700/10",
};

export const GRAMMAR = {
  label: "Grammar Corrector",
  description:
    "Simply type sentences in English to check and decorate your grammar",
  icon: PenLine,
  href: "/grammar",
  color: "text-emerald-500",
  bgColor: "bg-emerald-500/10",
};

export const THERAPIST = {
  label: "Therapist",
  description: "Therapist role for ChatGPT bot, not real doctor",
  icon: Cross,
  href: "/therapist",
  color: "text-red-500",
  bgColor: "bg-red-500/10",
};

export const DASHBOARD = {
  label: "Dashboard",
  description: "All features contains here",
  icon: LayoutDashboard,
  href: "/dashboard",
  color: "text-sky-500",
  bgColor: "bg-sky-500/10",
};

export const SETTINGS = {
  label: "Settings",
  description: "User: ",
  icon: Settings,
  href: "/settings",
  color: "text-gray-700",
  bgColor: "bg-gray-700/10",
};

export const DISCORD = {
  label: "Discord",
  description:
    "Join to community, ask help, suggest changes, win free Generations! ",
  icon: Discord,
  href: "https://discord.gg/7RBrxupv",
  color: "",
  bgColor: "",
};
