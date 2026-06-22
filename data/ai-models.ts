export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  tags: string[]
}

export const aiModels: AIModel[] = []
