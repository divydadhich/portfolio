import React, { useState } from "react";
import { sound } from "../utils/sound";
import { Terminal, Database, Shield, Radio, Cloud, Cpu, ArrowRight, Play, CheckCircle2 } from "lucide-react";

const SIMULATION_ENDPOINTS = [
  {
    id: "jwt-auth",
    method: "POST",
    path: "/api/v1/auth/verify-jwt",
    name: "JWT & RBAC Guard",
    description: "Authenticates request token and decodes role-based permissions (Admin, Agent, Customer)",
    duration: "14ms",
    status: 200,
    steps: ["Client Request", "Bearer Token Extractor", "Crypto HMAC Verify", "RBAC Role Resolver", "Access Granted"],
    response: {
      success: true,
      statusCode: 200,
      user: {
        id: "usr_7x901ae",
        email: "divy@kotibox.com",
        role: "ADMIN_SUPERVISOR",
        tier: "LEVEL_7_FULL_ACCESS",
        permissions: ["xoto:vault:read", "xoto:grid:write", "rbac:manage:users"],
      },
      tokenExpiresIn: "24h",
      verifiedAt: "2026-10-19T14:30:00.000Z",
    },
  },
  {
    id: "xoto-grid",
    method: "GET",
    path: "/api/v1/xoto/grid/properties?city=Dubai",
    name: "MongoDB Aggregation",
    description: "Executes pipeline: $geoNear, $lookup partner vaults, $match verified status",
    duration: "26ms",
    status: 200,
    steps: ["Client Query", "Express Router", "Rate Limiter (Tier 1)", "MongoDB Aggregation Pipeline", "Payload Serializer"],
    response: {
      success: true,
      statusCode: 200,
      count: 248,
      queryTimeMs: 26,
      results: [
        {
          id: "prop_dxb_882",
          title: "Skyline Luxury Penthouse",
          location: "Downtown Dubai, UAE",
          priceUSD: 1450000,
          partnerId: "vault_partner_99",
          status: "VERIFIED_ACTIVE",
          mediaCount: 14,
        },
        {
          id: "prop_dxb_883",
          title: "Marina Waterfront Villa",
          location: "Dubai Marina, UAE",
          priceUSD: 2800000,
          partnerId: "vault_partner_102",
          status: "VERIFIED_ACTIVE",
          mediaCount: 22,
        },
      ],
    },
  },
  {
    id: "s3-presign",
    method: "POST",
    path: "/api/v1/storage/s3/presigned-url",
    name: "AWS S3 Secure Upload",
    description: "Generates secure presigned PUT URL with MIME restriction & 300s expiration",
    duration: "18ms",
    status: 200,
    steps: ["Client Upload Request", "MIME Validation", "AWS SDK Credential Signer", "S3 Bucket Policy Check", "Secure Token Issued"],
    response: {
      success: true,
      statusCode: 200,
      uploadUrl: "https://xoto-production-media.s3.me-central-1.amazonaws.com/uploads/2026/asset_99a.jpg?AWSAccessKeyId=AKIAIOSFODNN7...",
      key: "uploads/2026/asset_99a.jpg",
      maxSizeBytes: 20971520,
      expiresSeconds: 300,
    },
  },
  {
    id: "socket-broadcast",
    method: "EMIT",
    path: "socket.io:event://xoto/room/broadcast",
    name: "Socket.io Real-Time",
    description: "Broadcasts low-latency event across clustered WebSocket rooms with ack payload",
    duration: "8ms",
    status: 200,
    steps: ["Socket Connection Check", "Room Namespace Lookup", "Redis Adapter Pub/Sub", "Payload Fanout", "Client Ack Received"],
    response: {
      event: "NOTIFICATION_BROADCAST",
      channel: "room_xoto_business_event_15",
      deliveredCount: 42,
      latencyMs: 8,
      payload: {
        type: "DEAL_COMMISSION_APPROVED",
        agentId: "agent_dubai_404",
        amountAED: 45000,
        timestamp: 1792400000,
      },
    },
  },
];

export default function MernPacketSimulator() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(SIMULATION_ENDPOINTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(4);
  const [executionStats, setExecutionStats] = useState({ latency: selectedEndpoint.duration, timestamp: "Ready" });

  const runSimulation = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setIsRunning(true);
    setActiveStep(0);
    sound.playClick();

    // Step-by-step pipeline illumination
    const stepInterval = 280;
    endpoint.steps.forEach((step, index) => {
      setTimeout(() => {
        setActiveStep(index);
        sound.playHover();
      }, index * stepInterval);
    });

    // Complete pipeline
    setTimeout(() => {
      setIsRunning(false);
      setActiveStep(endpoint.steps.length);
      setExecutionStats({
        latency: endpoint.duration,
        timestamp: new Date().toLocaleTimeString(),
      });
      sound.playSuccess();
    }, endpoint.steps.length * stepInterval + 150);
  };

  return (
    <div className="relative rounded-2xl glass-panel border border-cyan-500/20 overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4" /> MERN Enterprise Architecture Flow Simulator
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            STATUS 200 OK
          </span>
          <span className="text-xs font-mono text-slate-400">
            Latency: <strong className="text-white">{executionStats.latency}</strong>
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Endpoint Selector Tabs */}
        <div className="mb-6 flex flex-wrap gap-2.5">
          {SIMULATION_ENDPOINTS.map((endpoint) => {
            const isActive = selectedEndpoint.id === endpoint.id;
            return (
              <button
                key={endpoint.id}
                onClick={() => runSimulation(endpoint)}
                disabled={isRunning}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2.5 transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-neon"
                    : "bg-slate-800/60 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    endpoint.method === "POST"
                      ? "bg-amber-500/20 text-amber-300"
                      : endpoint.method === "GET"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-purple-500/20 text-purple-300"
                  }`}
                >
                  {endpoint.method}
                </span>
                <span>{endpoint.name}</span>
                <Play className={`w-3 h-3 ${isActive ? "text-cyan-400 fill-cyan-400" : "opacity-40"}`} />
              </button>
            );
          })}
        </div>

        {/* Selected Endpoint Description */}
        <div className="mb-6 bg-slate-950/60 rounded-xl p-4 border border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="font-semibold">{selectedEndpoint.method}</span>
              <span className="text-slate-300">{selectedEndpoint.path}</span>
            </div>
            <p className="text-xs text-slate-400">{selectedEndpoint.description}</p>
          </div>
          <button
            onClick={() => runSimulation(selectedEndpoint)}
            disabled={isRunning}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium flex items-center gap-2 hover:shadow-neon transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            {isRunning ? "Simulating Pipeline..." : "Dispatch Packet"}
          </button>
        </div>

        {/* Visual Pipeline Flow Nodes */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-3 flex items-center justify-between">
            <span>Execution Pipeline Stream</span>
            <span className="text-cyan-400 text-[11px]">
              {isRunning ? `Step ${activeStep + 1} of ${selectedEndpoint.steps.length}` : "Pipeline Verified"}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {selectedEndpoint.steps.map((step, idx) => {
              const isPast = activeStep > idx;
              const isCurrent = activeStep === idx && isRunning;
              return (
                <div
                  key={idx}
                  className={`relative p-3 rounded-xl border text-center transition-all duration-300 ${
                    isCurrent
                      ? "bg-cyan-500/20 border-cyan-400 shadow-neon scale-105"
                      : isPast
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-900/40 border-white/5 text-slate-500"
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400 mb-1">0{idx + 1}</div>
                  <div className="text-xs font-semibold truncate text-white">{step}</div>
                  <div className="mt-2 flex justify-center">
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin inline-block" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response JSON Inspector */}
        <div className="rounded-xl bg-[#050b18] border border-cyan-500/20 p-4 font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-slate-400">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> JSON Response Payload
            </span>
            <span className="text-[11px] text-emerald-400">HTTP/2 200 OK — Ready</span>
          </div>
          <pre className="text-slate-300 overflow-x-auto max-h-56 leading-relaxed select-all">
            {JSON.stringify(selectedEndpoint.response, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
