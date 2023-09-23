import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/db'
import Chat from '@/models/Chat'

connectDB()

export async function GET(req: NextRequest, res: Response) {
  try {
    const sender = req.nextUrl.searchParams.get('sender')
    const receiver = req.nextUrl.searchParams.get('receiver')
    const chats = await Chat.find({
      $or: [{
        sender: sender, receiver: receiver
      }, {
        sender: receiver, receiver: sender
      }]
    }).sort({ createdAt: 1 })
    return NextResponse.json({ data: chats })
  } catch (error) {
    return NextResponse.json({ data: error })
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    const { content, sender, receiver } = body

    const chat = new Chat({ content, sender, receiver })

    await chat.save()

    return NextResponse.json({ chat })
  } catch (error) {
    return NextResponse.json({ data: error })
  }
}

export async function PUT(req: NextRequest, res: Response) {
  try {
    // Parse the request body to get messageId and newContent
    const { messageId, newContent } = await req.json();

    // Find the message by its unique identifier (e.g., _id)
    const message = await Chat.findById(messageId);

    if (!message) {
      // Message not found, return an error response
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // Update the message content
    message.content = newContent;

    // Save the updated message
    await message.save();

    // Return a success response
    return NextResponse.json({ message });
  } catch (error) {
    // Handle errors and return an error response
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}