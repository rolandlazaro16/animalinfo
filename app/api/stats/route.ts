import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Animal from '@/lib/models/Animal';
import Feedback from '@/lib/models/Feedback';

export async function GET() {
  try {
    await dbConnect();

    const [
      totalAnimals,
      totalFeedback,
      openFeedback,
      criticalFeedback,
      recentFeedback,
      statusBreakdown,
      categoryBreakdown,
      severityBreakdown,
    ] = await Promise.all([
      Animal.countDocuments(),
      Feedback.countDocuments(),
      Feedback.countDocuments({ status: 'Open' }),
      Feedback.countDocuments({ severity: 'Critical' }),
      Feedback.find().sort({ createdAt: -1 }).limit(5).lean(),
      Feedback.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Feedback.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
      Feedback.aggregate([
        { $group: { _id: '$severity', count: { $sum: 1 } } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalAnimals,
        totalFeedback,
        openFeedback,
        criticalFeedback,
        recentFeedback,
        statusBreakdown,
        categoryBreakdown,
        severityBreakdown,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
