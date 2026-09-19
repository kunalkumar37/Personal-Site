export interface VisitorLocation {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  timezone: string;
  isp: string;
  ipMasked?: string;
  maskedIp?: string;
  source: 'edge-header' | 'ip-lookup' | 'local';
}

export interface VisitorRecord extends VisitorLocation {
  id: string;
  timestamp: string;
  device: 'desktop' | 'mobile' | 'tablet' | 'bot';
  browser: string;
  path: string;
}

export interface AnalyticsSummary {
  totalRecorded: number;
  topCountries: Array<{ country: string; code: string; count: number }>;
  topCities: Array<{ city: string; count: number }>;
  recentVisits: VisitorRecord[];
  serverUptimeSeconds: number;
  status: string;
}

let hasTracked = false;

export async function sendVisitTelemetry(path: string = window.location.pathname): Promise<VisitorLocation | null> {
  if (hasTracked) return null;
  hasTracked = true;

  try {
    const res = await fetch('/api/telemetry/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer || 'direct',
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.detected || null;
  } catch (err) {
    console.warn('[Telemetry] Could not reach backend telemetry service:', err);
    return null;
  }
}

export async function fetchMyLocation(): Promise<VisitorLocation | null> {
  try {
    const res = await fetch('/api/telemetry/my-location');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('[Telemetry] Error fetching my-location:', err);
    return null;
  }
}

export async function fetchAnalytics(): Promise<AnalyticsSummary | null> {
  try {
    const res = await fetch('/api/telemetry/analytics');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('[Telemetry] Error fetching analytics:', err);
    return null;
  }
}
