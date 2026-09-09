import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Brand tooth outline (same as the original design) */
export function ToothIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2C7.5 2 4 4.5 4 8c0 3.5 1.5 6 2.5 9 .8 2.4 2.2 4 3.5 4 1.5 0 2-2 2-3.5 0-1.5.5-1.5 1-1.5s1 0 1 1.5c0 1.5.5 3.5 2 3.5 1.3 0 2.7-1.6 3.5-4 1-3 2.5-5.5 2.5-9 0-3.5-3.5-6-8-6z" />
    </BaseIcon>
  );
}

/** Dental implants */
export function ImplantIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 4h10v4H7zM9 8v4M15 8v4M8 12h8v2H8zM9 14v4M15 14v4M10 18h4v2h-4zM12 20v2" />
    </BaseIcon>
  );
}

/** Teeth whitening sparkles */
export function WhiteningIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2l1.5 3.5L17 7l-3.5 1.5L12 12l-1.5-3.5L7 7l3.5-1.5L12 2zM19 13l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM5 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    </BaseIcon>
  );
}

/** Orthodontics / braces */
export function OrthodonticsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="6" width="6" height="6" rx="1" />
      <rect x="14" y="6" width="6" height="6" rx="1" />
      <path d="M10 9h4M2 9h2M20 9h2" />
    </BaseIcon>
  );
}

/** Root canal therapy */
export function RootCanalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3C8 3 5 5 5 8c0 4 3 6 4 10 1 4 2 4 3 4s2 0 3-4c1-4 4-6 4-10 0-3-3-5-7-5z" />
      <path d="M12 9v7" />
    </BaseIcon>
  );
}

/** General dentistry */
export function GeneralDentistryIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2C7 2 4 5 4 8c0 3 2 6 3 9 .6 2 1.5 3 2.5 3 1.5 0 2-2 2.5-3 .5 1 1 3 2.5 3 1 0 1.9-1 2.5-3 1-3 3-6 3-9 0-3-3-6-8-6z" />
      <circle cx="12" cy="8" r="2" />
    </BaseIcon>
  );
}

/* Brand social icons (removed from lucide v1, drawn from Feather) */
export function FacebookIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BaseIcon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </BaseIcon>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v2a6 6 0 0 1 2-2z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </BaseIcon>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </BaseIcon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.49 0-2.94-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.217 8.217 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.21 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.02 2.59.12.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
    </svg>
  );
}

