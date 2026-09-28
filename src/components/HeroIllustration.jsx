import source from '../assets/pic1.svg?raw'

const markup = source
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(
    '<g transform="translate(-102.166 38.207)">',
    '<g class="hero-figure"><g transform="translate(-102.166 38.207)">',
  )
  .replace(/<\/g>\s*<\/g>\s*$/, '</g></g></g>')

export default function HeroIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 799.031 618.536"
      className={className}
      role="img"
      aria-label="Person studying technology on a laptop"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
