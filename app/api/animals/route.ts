import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Animal from '@/lib/models/Animal';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const species = searchParams.get('species');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const filter: Record<string, unknown> = {};

    if (species) filter.species = species;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { species: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const animals = await Animal.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: animals });
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
    const animal = await Animal.create(body);

    return NextResponse.json(
      { success: true, data: animal },
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
