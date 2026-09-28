export default function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg
      className={`logo-mark ${className}`}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="12" fill="#7b4eae" />
      <path d="M11.2 15.4c2.5-1 5.2-.7 7.6.6v12.4c-2.5-1.1-5.2-1.3-7.6-.4V15.4Z" fill="#fff" />
      <path d="M28.8 15.4c-2.5-1-5.2-.7-7.6.6v12.4c2.5-1.1 5.2-1.3 7.6-.4V15.4Z" fill="#fff" />
      <path d="M20 16.2v12" fill="none" stroke="#7b4eae" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M22.4 19.4h4.2M22.4 22.3h3.1"
        fill="none"
        stroke="#b8862f"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}
