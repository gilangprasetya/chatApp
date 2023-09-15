/* Core */
import { NextResponse } from 'next/server'

import connectDB from '@/db'
import User from '@/models/User'

connectDB()

export async function GET(req: Request, res: Response) {
  try {
    const users = await User.find({})
    return NextResponse.json({ data: users })
  } catch (error) {
    return NextResponse.json({ data: error })
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    const { username } = body

    const user = await User.create({ username })

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ data: error })
  }
}