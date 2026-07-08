"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface TelemetryData {
  temperature: number;
  humidity: number;
  pressure: number;
  altitude: number;
  distance: number; // Ultrasonic sensor, cm
  timestamp: string;
}

export interface DeviceStatus {
  esp32Online: boolean;
  thingspeakConnected: boolean;
  lastUpload: string;
  rssi: number; // Signal strength dBm
}

export interface Alert {
  id: string;
  type: "HIGH_TEMPERATURE" | "HIGH_HUMIDITY" | "RAPID_PRESSURE_CHANGE" | "HIGH_WATER_LEVEL" | "RAPID_WATER_RISE" | "SENSOR_OFFLINE";
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
}

export interface DashboardSettings {
  refreshInterval: number; // seconds
  tempThreshold: number;   // °C
  humidityThreshold: number; // %
  distanceThreshold: number; // cm (alert when below this)
  pressureThreshold: number; // hPa
}

interface TelemetryContextType {
  data: TelemetryData;
  history: TelemetryData[];
  alerts: Alert[];
  deviceStatus: DeviceStatus;
  settings: DashboardSettings;
  isSimulating: boolean;
  userRole: "admin" | "user";
  setIsSimulating: (val: boolean) => void;
  setUserRole: (role: "admin" | "user") => void;
  setSettings: (s: DashboardSettings) => void;
  addAlert: (alert: Omit<Alert, "id" | "timestamp">) => void;
  clearAlerts: () => void;
}

const defaultData: TelemetryData = {
  temperature: 24.5,
  humidity: 55,
  pressure: 1013.25,
  altitude: 120,
  distance: 85,
  timestamp: new Date().toISOString(),
};

const defaultSettings: DashboardSettings = {
  refreshInterval: 15,
  tempThreshold: 32,
  humidityThreshold: 85,
  distanceThreshold: 100,
  pressureThreshold: 1005,
};

const defaultDeviceStatus: DeviceStatus = {
  esp32Online: true,
  thingspeakConnected: true,
  lastUpload: new Date().toISOString(),
  rssi: -52,
};

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

function generateAlert(
  data: TelemetryData,
  prevData: TelemetryData,
  settings: DashboardSettings
): Omit<Alert, "id" | "timestamp"> | null {
  const roll = Math.random();

  // High temperature (Fuel)
  if (data.temperature > settings.tempThreshold && roll < 0.4) {
    return {
      type: "HIGH_TEMPERATURE",
      severity: data.temperature > settings.tempThreshold + 3 ? "critical" : "warning",
      message: `High Thermal Energy: Temp is ${data.temperature.toFixed(1)}°C. Increases severity if storm breaks.`,
    };
  }

  // High humidity (Saturation)
  if (data.humidity > settings.humidityThreshold && roll < 0.4) {
    return {
      type: "HIGH_HUMIDITY",
      severity: data.humidity > 95 ? "critical" : "warning",
      message: data.humidity > 95 ? `Critical Air Saturation (${data.humidity.toFixed(0)}%): Immediate heavy rain likely.` : `High Humidity: Air is ${data.humidity.toFixed(0)}% saturated.`,
    };
  }

  // Low Pressure (Storm Predictor)
  if (data.pressure < settings.pressureThreshold && roll < 0.4) {
    return {
      type: "RAPID_PRESSURE_CHANGE",
      severity: data.pressure < 995 ? "critical" : "warning",
      message: data.pressure < 995 ? "Severe Cyclone/Storm Alert: Extreme pressure drop!" : `Low Pressure System: Storm approaching. (${data.pressure.toFixed(1)} hPa)`,
    };
  }

  // Rapid Water Rise
  const waterRise = prevData.distance - data.distance; // distance decreasing = water rising
  if (waterRise > 4) {
    return {
      type: "RAPID_WATER_RISE",
      severity: "critical",
      message: `Emergency: Water level is rising rapidly! (Rose by ${waterRise.toFixed(1)} cm).`,
    };
  }

  // High Water Level (Physical Risk)
  if (data.distance < settings.distanceThreshold) {
    return {
      type: "HIGH_WATER_LEVEL",
      severity: data.distance < 30 ? "critical" : "warning",
      message: data.distance < 30 ? `CRITICAL FLOOD RISK: Water level is breaching! (${data.distance.toFixed(1)} cm from sensor)` : `Flood Warning: Water level rising. (${data.distance.toFixed(1)} cm from sensor)`,
    };
  }

  return null;
}

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TelemetryData>(defaultData);
  const [history, setHistory] = useState<TelemetryData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>(defaultDeviceStatus);
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings);
  const [isSimulating, setIsSimulating] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "user">("admin");

  // Pre-fill history with dummy data for initial charts
  useEffect(() => {
    const initialHistory = Array.from({ length: 24 }).map((_, i) => ({
      temperature: 22 + Math.sin(i * 0.4) * 4 + Math.random() * 1.5,
      humidity: 50 + Math.cos(i * 0.3) * 12 + Math.random() * 3,
      pressure: 1013 + Math.sin(i * 0.2) * 3 + Math.random() * 1,
      altitude: 118 + Math.cos(i * 0.5) * 4 + Math.random() * 2,
      distance: 75 + Math.sin(i * 0.6) * 20 + Math.random() * 5,
      timestamp: new Date(Date.now() - (24 - i) * 15000).toISOString(),
    }));
    setHistory(initialHistory);
  }, []);

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setData((prev) => {
        const newData: TelemetryData = {
          temperature: Number((prev.temperature + (Math.random() * 0.6 - 0.3)).toFixed(1)),
          humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() * 2 - 1))),
          pressure: Number((prev.pressure + (Math.random() * 4 - 2)).toFixed(2)),
          altitude: Number((prev.altitude + (Math.random() * 0.4 - 0.2)).toFixed(1)),
          distance: Math.max(2, Math.min(400, prev.distance + (Math.random() * 10 - 5))),
          timestamp: new Date().toISOString(),
        };

        setHistory((prevHistory) => {
          const newHistory = [...prevHistory, newData];
          if (newHistory.length > 60) newHistory.shift();
          return newHistory;
        });

        // Smart alert generation based on thresholds (DISABLED DURING SIMULATION)
        /*
        const possibleAlert = generateAlert(newData, prev, settings);
        const isWaterAlert = possibleAlert?.type === "RAPID_WATER_RISE" || possibleAlert?.type === "HIGH_WATER_LEVEL";
        
        if (possibleAlert && (isWaterAlert || Math.random() > 0.7)) {
          setAlerts((prevAlerts) => {
            const newAlert: Alert = {
              ...possibleAlert,
              id: Math.random().toString(36).substring(7),
              timestamp: new Date().toISOString(),
            };
            const updated = [newAlert, ...prevAlerts];
            return updated.slice(0, 20); // keep last 20
          });
        }
        */

        // Update device status
        setDeviceStatus((prev) => ({
          ...prev,
          lastUpload: new Date().toISOString(),
          rssi: prev.rssi + Math.floor(Math.random() * 3 - 1),
        }));

        return newData;
      });
    }, settings.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isSimulating, settings]);

  const addAlert = (alert: Omit<Alert, "id" | "timestamp">) => {
    setAlerts((prev) => [
      { ...alert, id: Math.random().toString(36).substring(7), timestamp: new Date().toISOString() },
      ...prev,
    ].slice(0, 20));
  };

  const clearAlerts = () => setAlerts([]);

  return (
    <TelemetryContext.Provider
      value={{
        data,
        history,
        alerts,
        deviceStatus,
        settings,
        isSimulating,
        userRole,
        setIsSimulating,
        setUserRole,
        setSettings,
        addAlert,
        clearAlerts,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error("useTelemetry must be used within a TelemetryProvider");
  }
  return context;
}
