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
  type: "HIGH_TEMPERATURE" | "HIGH_HUMIDITY" | "RAPID_PRESSURE_CHANGE" | "OBJECT_TOO_CLOSE" | "SENSOR_OFFLINE";
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
}

export interface DashboardSettings {
  refreshInterval: number; // seconds
  tempThreshold: number;   // °C
  humidityThreshold: number; // %
  distanceThreshold: number; // cm (alert when below this)
}

interface TelemetryContextType {
  data: TelemetryData;
  history: TelemetryData[];
  alerts: Alert[];
  deviceStatus: DeviceStatus;
  settings: DashboardSettings;
  isSimulating: boolean;
  setIsSimulating: (val: boolean) => void;
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
  tempThreshold: 35,
  humidityThreshold: 80,
  distanceThreshold: 20,
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

  // High temperature
  if (data.temperature > settings.tempThreshold && roll < 0.4) {
    return {
      type: "HIGH_TEMPERATURE",
      severity: data.temperature > settings.tempThreshold + 5 ? "critical" : "warning",
      message: `Temperature is ${data.temperature.toFixed(1)}°C, exceeding threshold of ${settings.tempThreshold}°C.`,
    };
  }

  // High humidity
  if (data.humidity > settings.humidityThreshold && roll < 0.4) {
    return {
      type: "HIGH_HUMIDITY",
      severity: "warning",
      message: `Humidity at ${data.humidity.toFixed(0)}%, above the ${settings.humidityThreshold}% threshold.`,
    };
  }

  // Rapid pressure change (>3 hPa in one tick)
  const pressureDelta = Math.abs(data.pressure - prevData.pressure);
  if (pressureDelta > 3 && roll < 0.5) {
    return {
      type: "RAPID_PRESSURE_CHANGE",
      severity: "info",
      message: `Pressure changed rapidly by ${pressureDelta.toFixed(1)} hPa. Possible weather change.`,
    };
  }

  // Object too close
  if (data.distance < settings.distanceThreshold && roll < 0.5) {
    return {
      type: "OBJECT_TOO_CLOSE",
      severity: data.distance < 10 ? "critical" : "warning",
      message: `Object detected at ${data.distance.toFixed(1)} cm, below safe threshold of ${settings.distanceThreshold} cm.`,
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

        // Smart alert generation based on thresholds
        const possibleAlert = generateAlert(newData, prev, settings);
        if (possibleAlert && Math.random() > 0.7) {
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
        setIsSimulating,
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
