import FadeInView from '@/components/FadeInView'

export default function DocsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <FadeInView>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Docs</h1>
        <p className="text-foreground/70">Документация и шпаргалки появятся здесь.</p>
      </FadeInView>
    </div>
  )
}
