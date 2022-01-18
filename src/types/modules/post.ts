export interface Post {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}

export type Posts = Post[]
