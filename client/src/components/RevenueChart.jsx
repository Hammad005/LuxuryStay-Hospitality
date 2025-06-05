"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = {
  bookings: "rgb(40, 40, 70)", // Primary
  checkin: "rgb(40, 40, 70)", // primary/80
  checkout: "rgb(40, 40, 70)", // Deep Purple
  services: "rgb(40, 40, 70)", // Sky Royal Blue
};

export function RevenueChart({ bookings, checkIn, checkOut, services }) {
  const data = [
    { name: "Bookings", Amount: bookings },
    { name: "CheckIn", Amount: checkIn },
    { name: "CheckOut", Amount: checkOut },
    { name: "Services", Amount: services },
  ];

  return (
    <Card className={"border border-primary/80"}>
      <CardHeader className="space-y-1">
        <CardTitle>Revenue Chart</CardTitle>
        <CardDescription>Comparison of key metrics</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#fff", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(40, 40, 70)", // deep royal background
                color: "#fff", // white text for contrast
                border: "none",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.70)",
                padding: "10px 12px",
              }}
              formatter={(value) => [`Rs. ${value}/-`]}
              itemStyle={{
                color: "var(--primary)", // light lavender text
                fontWeight: 500,
                marginBottom: 4,
              }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            />

            <Bar dataKey="Amount" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name.replace(/\s/g, "").toLowerCase()]}
                  stroke="rgba(0, 0, 0, 0.15)"
                  strokeWidth={4}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
