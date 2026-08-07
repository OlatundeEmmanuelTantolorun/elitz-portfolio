import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineDownload,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { AiOutlinePhone } from "react-icons/ai";

export const contactData = {
  label: "Contact",
  heading: "Let's Build Something Meaningful.",
  description:
    "Whether you have an idea waiting to be built, a project to collaborate on, or simply want to connect, I'd love to hear from you. Let's create something that leaves a lasting impact.",
  contactItems: [
    {
      id: "email",
      icon: HiOutlineMail,
      label: "Email",
      value: "olatundeemmanueldev@gmail.com",
      type: "email",
      href: "mailto:olatundeemmanueldev@gmail.com",
    },
    {
      id: "github",
      icon: FaGithub,
      label: "GitHub",
      value: "Olatunde Emmanuel (Elitz)",
      type: "link",
      href: "https://github.com/OlatundeEmmanuelTantolorun",
    },
    {
      id: "linkedin",
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "Emmanuel Tantolorun",
      type: "link",
      href: "https://www.linkedin.com/in/emmanuel-tantolorun-93244b3ab/",
    },
    {
      id: "x",
      icon: FaXTwitter,
      label: "X",
      value: "@elitz_dev",
      type: "link",
      href: "https://x.com/elitz_dev",
    },
    {
      id: "TikTok",
      icon: FaTiktok,
      label: "TikTok",
      value: "@elitz_01",
      type: "link",
      href: "https://www.tiktok.com/@elitz_dev01?",
    },
    {
      id: "location",
      icon: HiOutlineLocationMarker,
      label: "Location",
      value: "Lokoja, Nigeria",
      type: "text",
    },
    {
      id: "phone",
      icon: AiOutlinePhone,
      label: "Phone",
      value: "+2349066882533",
      displayName: "+234 906 688 2533",
      type: "phone",
      href: "tel:+2349066882533",
    },
  ],
  primaryButton: {
    label: "Get In Touch",
    href: "mailto:hello@elitz.dev",
    icon: "→",
  },
  secondaryButton: {
    label: "Download Resume",
    href: "/resume.pdf",
    icon: HiOutlineDownload,
  },
  closingQuote: "The light is on. Let's build something together.",
};
