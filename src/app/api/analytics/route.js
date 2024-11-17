import { BetaAnalyticsDataClient } from '@google-analytics/data';
import 'dotenv/config';
import { NextResponse } from 'next/server';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range');

  let dateRanges;
  switch (range) {
    case 'today':
      dateRanges = [{ startDate: 'today', endDate: 'today' }];
      break;
    case '7days':
      dateRanges = [{ startDate: '7daysAgo', endDate: 'today' }];
      break;
    case '30days':
      dateRanges = [{ startDate: '30daysAgo', endDate: 'today' }];
      break;
    default:
      dateRanges = [{ startDate: 'today', endDate: 'today' }];
  }


  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GOOGLE_PROPERTY_ID}`,
      dateRanges: dateRanges,
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'averageSessionDuration' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'eventCount' }
      ],
      dimensions: [
        { name: 'date' }
      ],
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error al obtener datos de Google Analytics:', error.message);
    return NextResponse.json({ error: 'Error al obtener datos de Google Analytics' }, { status: 500 });
  }
}
