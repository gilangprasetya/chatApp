import { NextRequest, NextResponse } from 'next/server'
import { NextApiResponse } from 'next';
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

export async function PUT(req: NextRequest, res: NextApiResponse) {
  try {
    const { messageId, newContent } = await req.json();
    // console.log(`Received PUT request for message ID: ${messageId}`)  
    const message = await Chat.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.content = newContent;
    await message.save();
    return res.json({ message });
  } catch (error) {
    console.error('Error while updating message:', error);
    return res.status(500).json({ error: 'Failed to update message' })
  }
}