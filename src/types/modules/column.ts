export interface Column {
  __v: number
  _id: string
  title: string
  author: string
  avatar: {
    _id: string
    url: string
  }
  createdAt: string
  description: string
  featured: boolean
  key: number
}

export type Columns = Column[]
