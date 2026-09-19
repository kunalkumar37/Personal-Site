interface VisitRecord {
  id: string;
  timestamp: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  device: string;
  browser: string;
  path: string;
  ipMasked: string;
}

const visits: VisitRecord[] = [];
const startedAt = Date.now();

function getLocation(req: any) {
  const country = String(req.headers['x-vercel-ip-country'] || 'IN');
  const region = String(req.headers['x-vercel-ip-country-region'] || 'Karnataka');
  const cityHeader = req.headers['x-vercel-ip-city'];
  const city = cityHeader ? decodeURIComponent(String(cityHeader)) : 'Bengaluru';
  return {
    city,
    region,
    country: country === 'IN' ? 'India' : country,
    countryCode: country,
    latitude: Number(req.headers['x-vercel-ip-latitude']) || 12.9716,
    longitude: Number(req.headers['x-vercel-ip-longitude']) || 77.5946,
    timezone: String(req.headers['x-vercel-ip-timezone'] || 'Asia/Kolkata'),
    isp: 'Vercel Edge',
    ipMasked: 'privacy-preserved'
  };
}

function getBrowser(userAgent: string) {
  const lower = userAgent.toLowerCase();
  const device = /mobile|iphone|android/i.test(lower) ? 'mobile' : 'desktop';
  const browser = lower.includes('edg/') ? 'Edge' : lower.includes('firefox') ? 'Firefox' : lower.includes('chrome') ? 'Chrome' : 'Unknown';
  return { device, browser };
}

export default function handler(req: any, res: any) {
  const action = String(req.query?.action || '');

  if (action === 'visit' && req.method === 'POST') {
    const location = getLocation(req);
    const client = getBrowser(String(req.headers['user-agent'] || ''));
    const record: VisitRecord = {
      id: `vis_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...location,
      ...client,
      path: String(req.body?.path || '/')
    };
    visits.push(record);
    if (visits.length > 100) visits.shift();
    return res.status(200).json({ success: true, detected: location });
  }

  if (action === 'my-location' && req.method === 'GET') {
    return res.status(200).json(getLocation(req));
  }

  if (action === 'analytics' && req.method === 'GET') {
    const countryCounts = new Map<string, number>();
    const cityCounts = new Map<string, number>();
    visits.forEach((visit) => {
      countryCounts.set(visit.country, (countryCounts.get(visit.country) || 0) + 1);
      cityCounts.set(visit.city, (cityCounts.get(visit.city) || 0) + 1);
    });
    return res.status(200).json({
      totalRecorded: visits.length,
      topCountries: [...countryCounts].map(([country, count]) => ({ country, code: country, count })),
      topCities: [...cityCounts].map(([city, count]) => ({ city, count })),
      recentVisits: visits.slice(-20).reverse(),
      serverUptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
      status: 'operational'
    });
  }

  return res.status(404).json({ error: 'Telemetry route not found' });
}
