import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, Zap, Server, Shield, Cpu, Database, Activity, GitFork } from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  tech: string;
  role: string;
  latency: string;
  protocol: string;
  concurrencySafe: string;
  telemetryMetric: string;
}

export const SystemDiagramVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<string>('gateway');

  const nodes: SystemNode[] = [
    {
      id: 'client',
      name: 'Client Traffic',
      tech: 'HTTP/2 • WebSockets • SSE',
      role: 'Flash sale bursts and concurrent user requests',
      latency: '1 - 3 ms',
      protocol: 'HTTPS / WSS',
      concurrencySafe: 'Client-side connection pooling & backoff retries',
      telemetryMetric: '1,000+ simultaneous requests in load testing'
    },
    {
      id: 'gateway',
      name: 'API Gateway & Auth',
      tech: 'Spring Boot • Spring Security • JWT',
      role: 'Token validation, RBAC enforcement, AtomicLong rate limit',
      latency: '2 - 4 ms',
      protocol: 'REST / Filter Chain',
      concurrencySafe: 'Lock-free AtomicLong compare-and-swap (CAS)',
      telemetryMetric: 'Standardized OAuth 2.0 validation across 5+ services'
    },
    {
      id: 'services',
      name: 'Core Microservices',
      tech: 'Java 17 • Spring Boot • HikariCP',
      role: 'Business rules, seat reservation, supervisor AI routing',
      latency: '15 - 35 ms',
      protocol: 'Internal REST / gRPC',
      concurrencySafe: 'ForkJoinPool parallel execution & thread isolation',
      telemetryMetric: 'Throughput increased by 35% with workload tuning'
    },
    {
      id: 'kafka',
      name: 'Kafka Event Stream',
      tech: 'Apache Kafka • Event-Driven',
      role: 'Partitioned order topics, asynchronous state transitions',
      latency: '5 - 10 ms',
      protocol: 'Kafka TCP / Binary',
      concurrencySafe: 'Strict partition-key ordering & consumer group commits',
      telemetryMetric: 'Zero message loss across asynchronous booking stages'
    },
    {
      id: 'redis',
      name: 'Redis Distributed Lock',
      tech: 'Redis • TTL Locks • Caching',
      role: 'Atomic seat locking (SETNX), 600s TTL, high-read cache',
      latency: '< 2 ms',
      protocol: 'RESP Protocol',
      concurrencySafe: 'SETNX with UUID ownership token & auto-expiry TTL',
      telemetryMetric: 'Read latency reduced from ~180ms to <50ms'
    },
    {
      id: 'persistence',
      name: 'DB & Local AI Engine',
      tech: 'MySQL • Oracle • Ollama (Qwen 8B)',
      role: 'Durable ACID state and local LLM token streaming',
      latency: '12 - 45 ms',
      protocol: 'JDBC / SSE Proxy',
      concurrencySafe: 'Optimistic locking with version column & idempotency checks',
      telemetryMetric: 'Zero duplicate bookings, sub-second first token latency'
    }
  ];

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    setActiveStep(0);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= nodes.length - 1) {
          clearInterval(interval);
          setSimulating(false);
          return nodes.length - 1;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleReset = () => {
    setActiveStep(-1);
    setSimulating(false);
  };

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[1];

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c0e14]/90 p-4 sm:p-5 text-slate-200">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-300">
            Interactive Architecture Inspector
          </span>
          <span className="text-[11px] font-mono-code text-slate-300 hidden sm:inline-block">
            (Live Execution Trace)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulate}
            disabled={simulating}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-3 h-3 ${simulating ? 'animate-spin' : ''}`} />
            <span>{simulating ? 'Simulating Traffic...' : 'Simulate 1k req/s Burst'}</span>
          </button>
          <button
            onClick={handleReset}
            title="Reset Flow"
            className="p-1 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="py-5 grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-2.5">
        {nodes.map((node, index) => {
          const isCurrentStep = activeStep === index;
          const isPassedStep = activeStep > index;
          const isSelected = selectedNode === node.id;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`cursor-pointer group relative flex flex-col justify-between p-3 rounded-lg border text-left transition-all duration-200 ${
                isSelected
                  ? 'border-emerald-500/60 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40'
                  : isCurrentStep
                  ? 'border-emerald-400 bg-emerald-500/10 scale-[1.02]'
                  : isPassedStep
                  ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'
              }`}
            >
              {/* Step indicator tag */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="font-mono-code text-[10px] text-slate-300 font-semibold">
                  0{index + 1}
                </span>
                {isPassedStep ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : isCurrentStep ? (
                  <Zap className="w-3 h-3 text-emerald-400 animate-bounce" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                )}
              </div>

              <div>
                <h4 className="font-display font-semibold text-xs text-white leading-tight mb-1 group-hover:text-emerald-300 transition-colors">
                  {node.name}
                </h4>
                <p className="font-mono-code text-[10px] text-slate-300 line-clamp-1">
                  {node.tech.split('•')[0]}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between font-mono-code text-[10px] text-slate-300">
                <span>{node.latency}</span>
                <span className="text-emerald-400/80">{node.protocol.split('/')[0]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Technical Telemetry Drawer */}
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 sm:p-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              NODE TELEMETRY
            </span>
            <span className="font-display font-semibold text-white text-sm">
              {activeNodeData.name}
            </span>
          </div>
          <span className="font-mono-code text-[11px] text-slate-300">
            Stack: <span className="text-emerald-300">{activeNodeData.tech}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
          <div className="space-y-1">
            <span className="font-mono-code text-slate-300 uppercase block text-[10px]">
              System Role
            </span>
            <p className="text-slate-200">{activeNodeData.role}</p>
          </div>

          <div className="space-y-1">
            <span className="font-mono-code text-slate-300 uppercase block text-[10px]">
              Concurrency Guarantee
            </span>
            <p className="text-slate-200">{activeNodeData.concurrencySafe}</p>
          </div>

          <div className="space-y-1">
            <span className="font-mono-code text-slate-300 uppercase block text-[10px]">
              Measured Benchmark
            </span>
            <p className="text-emerald-300 font-medium">{activeNodeData.telemetryMetric}</p>
          </div>

          <div className="space-y-1">
            <span className="font-mono-code text-slate-300 uppercase block text-[10px]">
              Latency & Transport
            </span>
            <p className="font-mono-code text-slate-300">
              {activeNodeData.latency} • {activeNodeData.protocol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
