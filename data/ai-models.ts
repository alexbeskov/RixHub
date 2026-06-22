export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  tags: string[]
  icon: string // Iconify set, e.g. 'logos:openai', 'logos:anthropic'
}

export const aiModels: AIModel[] = [
  // Examples:
  // { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', description: '...', tags: ['text'], icon: 'logos:openai' },
  // { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', description: '...', tags: ['text'], icon: 'logos:anthropic' },
]
