import { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {action && (
        action.href ? (
          <a href={action.href} className="text-golf-green hover:text-golf-light font-medium">
            {action.label} →
          </a>
        ) : (
          <button onClick={action.onClick} className="text-golf-green hover:text-golf-light font-medium">
            {action.label} →
          </button>
        )
      )}
    </div>
  )
}