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

export async function DELETE(req: NextRequest, res: Response) {
  try {
    const url = new URL(req.url);
    const chatItemId = url.searchParams.get('chatItemId'); // Extract the chat item ID from the query parameters
    const result = await Chat.deleteOne({ _id: chatItemId });
    
    if (result.deletedCount === 1) {
      // The chat item was deleted successfully
      return NextResponse.json({ message: 'Chat item deleted successfully' });
    } else {
      // The chat item was not found
      return NextResponse.json({ error: 'Chat item not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while deleting the chat item' }, { status: 500 });
  }
}