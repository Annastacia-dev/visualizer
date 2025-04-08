"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPicker } from "@/components/color-picker"

interface ChartProps {
  data: any[]
  title: string
  description?: string
  xKey: string
  yKey: string
}

export function Chart({ data, title, description, xKey, yKey }: ChartProps) {
  const [chartType, setChartType] = React.useState("bar")
  const [colors, setColors] = React.useState(["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          <ColorPicker onChange={setColors} initialColors={colors} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={chartType} onValueChange={setChartType} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
            <TabsTrigger value="scatter">Scatter</TabsTrigger>
          </TabsList>

          <div className="h-[400px] w-full">
            <TabsContent value="bar" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-md shadow-sm p-2">
                            <p className="font-medium">{`${label}`}</p>
                            <p className="text-sm text-muted-foreground">{`${payload[0].name}: ${payload[0].value}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Bar dataKey={yKey} fill={colors[0]} name={yKey} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="line" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-md shadow-sm p-2">
                            <p className="font-medium">{`${label}`}</p>
                            <p className="text-sm text-muted-foreground">{`${payload[0].name}: ${payload[0].value}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey={yKey} stroke={colors[0]} name={yKey} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="pie" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey={yKey}
                    nameKey={xKey}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-md shadow-sm p-2">
                            <p className="font-medium">{`${payload[0].name}`}</p>
                            <p className="text-sm text-muted-foreground">{`${yKey}: ${payload[0].value}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="scatter" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} type="category" angle={-45} textAnchor="end" height={60} />
                  <YAxis dataKey={yKey} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-md shadow-sm p-2">
                            <p className="font-medium">{`${payload[0].payload[xKey]}`}</p>
                            <p className="text-sm text-muted-foreground">{`${yKey}: ${payload[0].payload[yKey]}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Scatter name={yKey} data={data} fill={colors[0]} />
                </ScatterChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-[400px] w-full">{children}</div>
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-background border rounded-md shadow-sm p-2">{children}</div>
}

export const ChartTooltipContent = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <>
      <p className="font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </>
  )
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-center gap-4 mt-4">{children}</div>
}

export const ChartLegendContent = ({ color, label }: { color: string; label: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export const ChartStyle = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
