const Loading = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-line)]" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--color-gold)]" />
      </div>
      <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-muted)] uppercase">
        Loading
      </p>
    </div>
  </div>
)

export default Loading
