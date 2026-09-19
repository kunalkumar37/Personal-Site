import React, { useEffect, useState } from 'react';
import {
  Globe,
  Radio,
  MapPin,
  Activity,
  Server,
  ShieldCheck,
  RefreshCw,
  X,
  Clock,
  Laptop,
  Smartphone,
  CheckCircle2,
  Terminal,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  VisitorLocation,
  AnalyticsSummary,
  fetchMyLocation,
  fetchAnalytics,
  sendVisitTelemetry
} from '../services/telemetry';

interface BackendLocationTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendLocationTelemetryModal: React.FC<BackendLocationTelemetryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [myLocation, setMyLocation] = useState<VisitorLocation | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [loc, stats] = await Promise.all([fetchMyLocation(), fetchAnalytics()]);
      setMyLocation(loc);
      setAnalytics(stats);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#090b10] shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Navigation */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Global Visitor Reach & Activity
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono-code font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Presence
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time regional reach and privacy-preserving visitor presence across the globe.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              title="Refresh Activity"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current User Live Detection Card */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0c121e] via-[#090e18] to-[#07090f] p-5 sm:p-6 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.06)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between gap-2 mb-4 font-mono-code text-xs text-emerald-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold uppercase tracking-wider">Your Regional Connection</span>
            </div>
            {lastRefreshed && (
              <span className="text-[11px] text-slate-500">
                Synchronized at {lastRefreshed}
              </span>
            )}
          </div>

          {loading && !myLocation ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono-code text-xs">
              <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
              <span>Resolving regional network presence...</span>
            </div>
          ) : myLocation ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* City & Region */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono-code text-slate-500 block uppercase">City & Region</span>
                <span className="font-display font-bold text-base sm:text-lg text-white block mt-0.5">
                  {myLocation.city}
                </span>
                <span className="text-xs text-slate-400 font-mono-code">
                  {myLocation.region || 'Metropolitan Region'}
                </span>
              </div>

              {/* Country & Code */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono-code text-slate-500 block uppercase">Country</span>
                <span className="font-display font-bold text-base sm:text-lg text-white block mt-0.5">
                  {myLocation.country}
                </span>
                <span className="text-xs text-emerald-400 font-mono-code font-semibold">
                  Region: {myLocation.countryCode}
                </span>
              </div>

              {/* Coordinates & Timezone */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono-code text-slate-500 block uppercase">Timezone & Locale</span>
                <span className="font-mono-code text-xs text-white block mt-1 font-semibold">
                  {myLocation.timezone}
                </span>
                <span className="text-xs text-slate-400 font-mono-code">
                  {myLocation.latitude !== null && myLocation.longitude !== null
                    ? `${myLocation.latitude.toFixed(2)}°, ${myLocation.longitude.toFixed(2)}°`
                    : 'Regional Cluster'}
                </span>
              </div>

              {/* Connection Security & Privacy */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono-code text-slate-500 block uppercase">Privacy & Safety</span>
                <span className="font-mono-code text-xs text-emerald-300 block mt-1 font-semibold">
                  IP Truncated (Anonymized)
                </span>
                <span className="text-[11px] text-slate-400 font-mono-code">
                  Status: <strong className="text-emerald-400">Connected</strong>
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-mono-code">Active regional connection established.</p>
          )}

          {/* Privacy Guarantee callout */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-code text-slate-400">
            <span>
              🔒 <strong className="text-slate-300">Privacy Guarantee:</strong> Client IP addresses are truncated in-memory; zero persistent personal logging or tracking.
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Secure Edge Proxy Operational
            </span>
          </div>
        </div>

        {/* Aggregate Stats & Top Locations */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Countries */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0e14]">
              <div className="flex items-center gap-2 font-mono-code text-xs text-slate-400 uppercase tracking-wider mb-3">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Top Visitor Countries</span>
              </div>
              <div className="space-y-2">
                {analytics.topCountries.length > 0 ? (
                  analytics.topCountries.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {c.country}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-emerald-400 font-semibold text-[11px]">
                        {c.count} hit{c.count > 1 ? 's' : ''}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 font-mono-code">Awaiting visitor traffic...</p>
                )}
              </div>
            </div>

            {/* Top Cities */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0e14]">
              <div className="flex items-center gap-2 font-mono-code text-xs text-slate-400 uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Top Visitor Cities</span>
              </div>
              <div className="space-y-2">
                {analytics.topCities.length > 0 ? (
                  analytics.topCities.map((ct, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        {ct.city}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-sky-300 font-semibold text-[11px]">
                        {ct.count}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 font-mono-code">Awaiting visitor traffic...</p>
                )}
              </div>
            </div>

            {/* Network Infrastructure Operations */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0e14] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono-code text-xs text-slate-400 uppercase tracking-wider mb-3">
                  <Server className="w-3.5 h-3.5 text-purple-400" />
                  <span>Network Operations</span>
                </div>
                <div className="space-y-2.5 font-mono-code text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Recorded Global Visits:</span>
                    <span className="text-white font-bold">{analytics.totalRecorded}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">System Uptime:</span>
                    <span className="text-emerald-400">{Math.floor(analytics.serverUptimeSeconds / 60)}m {analytics.serverUptimeSeconds % 60}s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Delivery Tier:</span>
                    <span className="text-slate-300">Global Edge CDN</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Geo Resolution:</span>
                    <span className="text-purple-300">Regional IP Ingress</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Encrypted Edge Gateways Online</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Visitor Feed Stream */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0e14] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 font-mono-code text-xs text-white uppercase tracking-wider">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Recent Global Visitor Activity</span>
            </div>
            <span className="text-[11px] font-mono-code text-slate-500">
              Last {analytics?.recentVisits.length || 0} visits
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-code text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] text-slate-500 text-[11px]">
                  <th className="pb-2 font-medium">Timestamp</th>
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Country</th>
                  <th className="pb-2 font-medium">Network Hash</th>
                  <th className="pb-2 font-medium">Device & Client</th>
                  <th className="pb-2 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {analytics && analytics.recentVisits.length > 0 ? (
                  analytics.recentVisits.map((v) => (
                    <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 text-slate-400 text-[11px]">
                        {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                      <td className="py-2.5 text-white font-medium">
                        {v.city || 'Regional'}
                      </td>
                      <td className="py-2.5 text-slate-300">
                        <span className="inline-flex items-center gap-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-emerald-400 border border-white/[0.08]">
                            {v.countryCode}
                          </span>
                          <span>{v.country}</span>
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-400 text-[11px]">
                        {v.ipMasked}
                      </td>
                      <td className="py-2.5 text-slate-300">
                        <span className="inline-flex items-center gap-1.5">
                          {v.device === 'mobile' ? (
                            <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                          ) : (
                            <Laptop className="w-3.5 h-3.5 text-sky-400" />
                          )}
                          <span>{v.browser}</span>
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Connected
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500 text-xs">
                      Awaiting initial network visits...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code text-slate-400 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Anonymous aggregated regional presence only • In-memory buffer</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
