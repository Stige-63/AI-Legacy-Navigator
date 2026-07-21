export default function Disclaimer({ compact = false }) {
  return (
    <p className={compact ? 'disclaimer disclaimer--compact' : 'disclaimer'}>
      AI Legacy Navigator provides educational guidance and reflection prompts. It does not
      replace advice from parents, educators, counselors, healthcare professionals, or other
      qualified adults.
    </p>
  )
}
