export interface Post {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: string
}

export type Posts = Post[]
