const variants = {
  primary: 'bg-plum text-on-inverse hover:bg-plum-dark',
  dark: 'bg-inverse text-on-inverse hover:bg-plum-dark',
  ghost: 'bg-cream text-ink ring-1 ring-line hover:bg-lilac',
  gold: 'bg-gold text-inverse hover:brightness-95',
}

export function buttonClass(variant = 'primary', className = '') {
  return `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${variants[variant]} ${className}`
}
