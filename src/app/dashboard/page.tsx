"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Users, TrendingUp, Wallet, BarChart3, ArrowRight } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const summaryCards = [
  { title: "Users", value: "56", link: "Manage users", href: "/users", icon: Users },
  { title: "Courses", value: "30", link: "View all", href: "/courses", icon: TrendingUp },
  { title: "Notes", value: "30", link: "View all", href: "/notes", icon: TrendingUp },
  { title: "Admins", value: "30", link: "View all", href: "/admins", icon: TrendingUp },
];


const signupsData = [
  { month: "Mar 25", signups: 2 },
  { month: "Apr 25", signups: 1 },
  { month: "May 25", signups: 3 },
  { month: "Jun 25", signups: 2 },
  { month: "Jul 25", signups: 1 },
  { month: "Aug 25", signups: 4 },
  { month: "Sep 25", signups: 2 },
  { month: "Oct 25", signups: 6 },
  { month: "Nov 25", signups: 3 },
  { month: "Dec 25", signups: 2 },
  { month: "Jan 26", signups: 4 },
  { month: "Feb 26", signups: 8 },
];


const signupsChartConfig = {
  signups: { label: "Signups", color: "var(--chart-1)" },
};

const latestUsers = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@gmail.com",
    dateJoined: "Jan 31, 2026",
    status: "Active" as const,
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    dateJoined: "Jan 30, 2026",
    status: "Active" as const,
  },
  {
    id: "3",
    fullName: "Alex Johnson",
    email: "alex.j@company.com",
    dateJoined: "Jan 29, 2026",
    status: "Inactive" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Summary cards */}
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map(({ title, value, link, href }) => (
          <Card
            key={title}
            className="rounded-xl border-border bg-card shadow-sm"
          >
            <CardContent className="px-4 py-4 sm:px-6">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {value}
              </p>
              <Link
                href={href}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {link}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div>
        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between space-y-0 px-4 pb-4 sm:px-6">
            <CardTitle className="text-base font-semibold">
              User signups by month
            </CardTitle>
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary dark:text-primary shrink-0">
              Last 12 months
            </span>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="h-[220px] w-full min-h-[200px] sm:h-[260px]">
              <ChartContainer
                config={signupsChartConfig}
                className="h-full w-full aspect-auto"
              >
                <AreaChart
                  data={signupsData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="fillSignups"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--color-signups)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-signups)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-border"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs text-muted-foreground"
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    type="monotone"
                    dataKey="signups"
                    stroke="var(--color-signups)"
                    strokeWidth={2}
                    fill="url(#fillSignups)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest users */}
      <Card className="overflow-hidden rounded-xl border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 py-4">
          <CardTitle className="text-base font-semibold">
            Latest users
          </CardTitle>
          <Link
            href="/users"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="px-0 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">Date joined</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {latestUsers.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/50 transition-colors hover:bg-muted/20"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground sm:px-6 sm:py-4">{row.fullName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground sm:px-6 sm:py-4">{row.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground tabular-nums sm:px-6 sm:py-4">{row.dateJoined}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span
                        className={
                          row.status === "Active"
                            ? "inline-flex rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary dark:text-primary"
                            : "inline-flex rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-500 dark:text-amber-400"
                        }
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-primary hover:underline"
                        asChild
                      >
                        <Link href={`/users/${row.id}`}>
                          View
                          <ArrowRight className="ml-1 inline h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
