import FadeInView from '@/components/FadeInView'

export default function PromptsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <FadeInView>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Prompts</h1>
        <p className="text-foreground/70">Готовые промпты для AI появятся здесь.</p>
      </FadeInView>
    </div>
  )
}
