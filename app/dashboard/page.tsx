"use client";

import { Thermometer, Droplets, Wind, Mountain, Ruler } from "lucide-react";
import { useTelemetry } from "@/components/providers/TelemetryProvider";
import { SensorCard } from "@/components/cards/SensorCard";
import { DeviceStatusCard } from "@/components/cards/DeviceStatusCard";
import { ComfortScoreCard } from "@/components/cards/ComfortScoreCard";
import { CustomLineChart } from "@/components/charts/CustomLineChart";
import { AlertPanel } from "@/components/alerts/AlertPanel";
import EcoMap from "@/components/Map";

export default function DashboardHome() {
  const { data, history, deviceStatus } = useTelemetry();

  const prev = history[history.length - 2];

  const chartData = history.map((e) => ({
    time: new Date(e.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    temperature: e.temperature,
    humidity: e.humidity,
    pressure: e.pressure,
    altitude: e.altitude,
    distance: e.distance,
  }));

  const getTrend = (curr: number, prevVal: number | undefined) =>
    prevVal === undefined ? "stable" : curr > prevVal ? "up" : curr < prevVal ? "down" : "stable";

  const getDelta = (curr: number, prevVal: number | undefined) =>
    prevVal !== undefined ? curr - prevVal : undefined;

  return (
    <div className="flex flex-col gap-6">

      {/* Row 1: 5 Sensor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <SensorCard
          title="Temperature"
          value={data.temperature.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          trend={getTrend(data.temperature, prev?.temperature)}
          delta={getDelta(data.temperature, prev?.temperature)}
          status={data.temperature > 35 ? "warning" : "normal"}
          historyData={history.map((h) => h.temperature)}
        />
        <SensorCard
          title="Humidity"
          value={data.humidity.toFixed(0)}
          unit="%"
          icon={Droplets}
          trend={getTrend(data.humidity, prev?.humidity)}
          delta={getDelta(data.humidity, prev?.humidity)}
          status={data.humidity > 80 ? "warning" : "normal"}
          historyData={history.map((h) => h.humidity)}
        />
        <SensorCard
          title="Atmospheric Pressure"
          value={data.pressure.toFixed(0)}
          unit="hPa"
          icon={Wind}
          trend={getTrend(data.pressure, prev?.pressure)}
          delta={getDelta(data.pressure, prev?.pressure)}
          status="normal"
          historyData={history.map((h) => h.pressure)}
          variant="light"
        />
        <SensorCard
          title="Altitude"
          value={data.altitude.toFixed(0)}
          unit="m"
          icon={Mountain}
          trend={getTrend(data.altitude, prev?.altitude)}
          delta={getDelta(data.altitude, prev?.altitude)}
          status="normal"
          historyData={history.map((h) => h.altitude)}
        />
        <SensorCard
          title="Water Level"
          value={data.distance.toFixed(0)}
          unit="cm"
          icon={Ruler}
          trend={getTrend(data.distance, prev?.distance)}
          delta={getDelta(data.distance, prev?.distance)}
          status={data.distance < 20 ? "critical" : data.distance < 40 ? "warning" : "normal"}
          historyData={history.map((h) => h.distance)}
          variant="primary"
          invertTrend={true}
        />
      </div>

      {/* Row 2: Temperature Chart + Comfort Score + Device Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart — 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm flex flex-col min-h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1c1c1a] font-bold text-base">Temperature Trend</h3>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full animate-pulse">
              ● Live
            </span>
          </div>
          <div className="flex-1">
            <CustomLineChart data={chartData} dataKey="temperature" color="#e07a5f" label="Temp (°C)" />
          </div>
        </div>

        {/* Right column: Comfort Score + Device Status */}
        <div className="flex flex-col gap-6">
          <ComfortScoreCard temperature={data.temperature} humidity={data.humidity} />
          <DeviceStatusCard deviceStatus={deviceStatus} />
        </div>
      </div>

      {/* Row 3: Alert Panel */}
      <div className="mt-2">
        <AlertPanel />
      </div>

      <div className="mt-6">
        <h3 className="text-slate-900 font-bold text-base mb-4">Device Location</h3>
        <EcoMap />
      </div>

    </div>
  );
}
