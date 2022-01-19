export interface Column {
  __v: number
  _id: string
  author: string
  avatar: {
    _id: string
    url: string
  }
  createdAt: string
  description: string
  featured: boolean
  key: number
  title: string
}

export type Columns = Column[]
