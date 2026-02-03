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
import { ArrowRight } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { useDashboardService } from "../services";
import { DashboardSkeleton } from "../components/DashboardSkeleton";
import { cn } from "@/lib/utils";
import moment from "moment";
import type { DashboardSummaryData } from "@/types/dashboard";

const signupsChartConfig = {
  signups: { label: "Signups", color: "var(--chart-1)" },
};

function mapUserSignupsToChartData(
  items: DashboardSummaryData["userSignupsByMonth"]
): { month: string; signups: number }[] {
  if (!items?.length) return [];
  const sorted = [...items].sort(
    (a, b) => a.year - b.year || a.month - b.month
  );
  return sorted.map(({ year, month, count }) => ({
    month: moment({ year, month: month - 1, day: 1 }).format("MMM YY"),
    signups: count,
  }));
}

export function DashboardContent() {
  const { isLoading, data } = useDashboardService();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div
      className={cn(
        "space-y-6 sm:space-y-8",
        "animate-in fade-in-0 duration-300 ease-out"
      )}
    >
      {/* Summary cards */}
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          // key={title}
          className="rounded-xl border-border bg-card shadow-sm"
        >
          <CardContent className="px-4 py-4 sm:px-6">
            <p className="text-sm font-medium text-muted-foreground">
              Total Users
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {data?.totalUsers || 0}
            </p>
            <Link
              href={'/users'}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        <Card
          // key={title}
          className="rounded-xl border-border bg-card shadow-sm"
        >
          <CardContent className="px-4 py-4 sm:px-6">
            <p className="text-sm font-medium text-muted-foreground">
              Total Courses
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {data?.totalCourses || 0}
            </p>
            <Link
              href={'/courses'}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        <Card
          // key={title}
          className="rounded-xl border-border bg-card shadow-sm"
        >
          <CardContent className="px-4 py-4 sm:px-6">
            <p className="text-sm font-medium text-muted-foreground">
              Total Courses
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {data?.totalChapters || 0}
            </p>
            <Link
              href={'/chapters'}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View chapters
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        <Card
          // key={title}
          className="rounded-xl border-border bg-card shadow-sm"
        >
          <CardContent className="px-4 py-4 sm:px-6">
            <p className="text-sm font-medium text-muted-foreground">
              Total Lessons
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {data?.totalLessons || 0}
            </p>
            <Link
              href={'/lessons'}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View lessons
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
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
                  data={mapUserSignupsToChartData(data?.userSignupsByMonth ?? [])}
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
                {data?.latest5Users.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/50 transition-colors hover:bg-muted/20"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground sm:px-6 sm:py-4">{row.firstName} {row.lastName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground sm:px-6 sm:py-4">{row.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground tabular-nums sm:px-6 sm:py-4">{moment(row.createdAt).format("DD MMM YYYY")}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span
                        className={cn(
                          row.isBlocked
                            ? "inline-flex rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-500 dark:text-amber-400"
                            : "inline-flex rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary dark:text-primary"
                        )}
                      >
                        {row.isBlocked ? "Inactive" : "Active"}
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
