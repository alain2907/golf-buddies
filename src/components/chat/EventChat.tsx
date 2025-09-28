'use client'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Message } from '@/types'
import { sendMessage, subscribeToMessages } from '@/lib/firestore'
import { Send, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface EventChatProps {
  eventId: string
  organizerId: string
}

export default function EventChat({ eventId, organizerId }: EventChatProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = subscribeToMessages(eventId, (msgs) => {
      setMessages(msgs)
      scrollToBottom()
    })

    return () => unsubscribe()
  }, [eventId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newMessage.trim()) return

    setLoading(true)
    try {
      await sendMessage(eventId, {
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        text: newMessage.trim(),
        isOrganizer: user.uid === organizerId
      })
      setNewMessage('')
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="card-golf h-96 flex flex-col">
      <div className="flex items-center mb-4 pb-4 border-b">
        <MessageCircle className="w-5 h-5 mr-2 text-golf-green" />
        <h3 className="font-semibold">Event Chat</h3>
        <span className="ml-auto text-sm text-gray-500">
          {messages.length} messages
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No messages yet</p>
            <p className="text-sm mt-1">Be the first to say hello!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.userId === user.uid}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="input-golf flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !newMessage.trim()}
          className="btn-golf px-4"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

function MessageBubble({ message, isOwn }: { message: Message, isOwn: boolean }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs px-4 py-2 rounded-2xl ${
        isOwn
          ? 'bg-gradient-to-r from-golf-green to-golf-light text-white'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {!isOwn && (
          <div className="flex items-center mb-1">
            <span className="font-semibold text-sm">{message.userName}</span>
            {message.isOrganizer && (
              <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                Organizer
              </span>
            )}
          </div>
        )}
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-gray-500'}`}>
          {format(message.timestamp.toDate(), 'HH:mm')}
        </p>
      </div>
    </div>
  )
}