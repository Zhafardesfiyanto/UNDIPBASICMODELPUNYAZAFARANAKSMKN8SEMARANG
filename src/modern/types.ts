export interface ModernExhibit {
  id: string
  title: string
  category: string
  year: string
  summary: string
  description: string
  position: [number, number, number]
  color?: string
}

export interface ModernGallerySceneProps {
  onSwitchRoom: (room: 'classic' | 'modern') => void
}
