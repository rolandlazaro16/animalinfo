export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/backend/mongodb';
import Feedback from '@/backend/models/Feedback';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const status = searchParams.get('status');
    const animalId = searchParams.get('animalId');
    const search = searchParams.get('search');

    const filter: Record<string, unknown> = {};

    if (category) filter.category = category;
    if (severity) filter.severity = severity;
    if (status) filter.status = status;
    if (animalId) filter.animalId = animalId;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { animalName: { $regex: search, $options: 'i' } },
      ];
    }

    const feedback = await Feedback.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: feedback });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const feedback = await Feedback.create(body);

    return NextResponse.json(
      { success: true, data: feedback },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
