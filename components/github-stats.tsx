"use client";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, GitBranch, GitCommit, Star, Flame, Activity, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  username: string;
}
interface GithubStats {
  user: {
    totalContribution: number;
  };
  contributions: {
    count: number;
    date: string;
  }[];
}

// Helper narrower types for optional idle callback without ambient declaration conflicts
type MaybeIdleWindow = typeof window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const GithubStats = ({ username }: Props) => {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<30 | 60 | 90>(30);

  useEffect(()=>{
    const ctrl = new AbortController();
    let idleId: number | null = null;
    const run = async ()=>{
      try {
        const response = await fetch(`/api/github?username=${username}`, { signal: ctrl.signal, cache: 'force-cache' });
        if(!response.ok) throw new Error(`Error fetching data: ${response.status}`);
        const data = await response.json();
        if(!ctrl.signal.aborted) setStats(data);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        setError("Failed to fetch GitHub stats");
      } finally {
        if(!ctrl.signal.aborted) setLoading(false);
      }
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const win = window as MaybeIdleWindow;
      idleId = win.requestIdleCallback?.(run, { timeout: 1500 });
    } else {
      const t = setTimeout(run, 300); // slight delay to prioritize main content
      idleId = t as unknown as number;
    }
    return () => {
      ctrl.abort();
      if (idleId) {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          (window as MaybeIdleWindow).cancelIdleCallback?.(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
    };
  }, [username]);


  // Memoized calculations (null-safe) executed every render to preserve hook order
  const { currentStreak, longestStreak, maxContributions, avgLast30, bestDayDate, days } = useMemo(()=>{
    const days = stats?.contributions ?? [];
    if(!days.length){
      return { currentStreak:0, longestStreak:0, maxContributions:0, avgLast30:0, bestDayDate: undefined as string | undefined, days };
    }
    // Current streak
    let cur = 0;
    for(let i = days.length -1; i>=0; i--){
      if(days[i].count>0) cur++; else break;
    }
    // Longest streak
    let longest = 0; let running = 0;
    for(const d of days){
      if(d.count>0){ running++; if(running>longest) longest = running; } else running = 0;
    }
    // Max & date
    let max = 0; let maxDate = days[0]?.date;
    for(const d of days){ if(d.count>max){ max = d.count; maxDate = d.date; } }
    // Average last 30
    const last30 = days.slice(-30);
    const sum30 = last30.reduce((a,d)=>a+d.count,0);
    const avg30 = last30.length ? sum30/last30.length : 0;
    return { currentStreak:cur, longestStreak:longest, maxContributions:max, avgLast30:avg30, bestDayDate:maxDate, days };
  },[stats]);

  // Selected timeframe slice for heatmap/sparkline (null-safe)
  const timeframeData = useMemo(()=> days.slice(-timeframe), [days, timeframe]);

  // Scale levels dynamically within timeframe for clearer contrast
  const maxInTimeframe = Math.max(...timeframeData.map(d=>d.count), 1);

  const getContributionLevel = (count:number)=>{
    if(count === 0) return "bg-muted/40 dark:bg-muted/30";
    const pct = (count / maxInTimeframe) * 100;
    if(pct <= 20) return "bg-primary/20";
    if(pct <= 40) return "bg-primary/40";
    if(pct <= 65) return "bg-primary/60";
    if(pct <= 85) return "bg-primary/80";
    return "bg-primary";
  };

  // Build sparkline path for timeframe (simple SVG)
  const sparklinePath = useMemo(()=>{
    if(!timeframeData.length) return "";
    const h = 36; const w = 120; const step = w / (timeframeData.length - 1 || 1);
    const localMax = Math.max(...timeframeData.map(d=>d.count),1);
    return timeframeData.map((d,i)=>{ const x=i*step; const y = h - (d.count/localMax)*(h-4) - 2; return `${i===0? 'M':'L'}${x.toFixed(2)},${y.toFixed(2)}`; }).join(" ");
  },[timeframeData]);

  // Early returns AFTER all hooks to keep hook order stable
  if (loading) {
    return (
      <Card className="p-4 sm:p-6 bg-card border-border/5">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-8 bg-muted rounded " />
          <div className="h-32 bg-muted rounded " />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 sm:p-6 bg-card border-border/5">
        <p className="text-destructive">{error}</p>
      </Card>
    );
  }

  if(!stats) return null; // after hooks so order stable

  return (
    <Card className="relative p-4 sm:p-6 lg:p-8 bg-card border-border/50 backdrop-blur-xl overflow-hidden group">
      {/* decorative blur / glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-70" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 sm:space-y-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <GitCommit className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold">
            Contribution Activity
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md transition-shadow"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {currentStreak}<span className="text-xs font-medium text-muted-foreground ml-1">days</span>
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md transition-shadow"
          >
            <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Total Contributions</p>
            <p className="text-xl sm:text-2xl font-bold">
              {stats.user.totalContribution.toLocaleString()}
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md transition-shadow"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Best Day</p>
            <p className="text-xl sm:text-2xl font-bold">{maxContributions}<span className="text-xs font-medium text-muted-foreground ml-1">commits</span></p>
            {bestDayDate && (
              <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{new Date(bestDayDate).toLocaleDateString(undefined,{month:'short', day:'numeric'})}</p>
            )}
          </motion.div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md transition-shadow"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Longest Streak</p>
            <p className="text-xl sm:text-2xl font-bold">{longestStreak}<span className="text-xs font-medium text-muted-foreground ml-1">days</span></p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md transition-shadow"
          >
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Avg (30d)</p>
            <p className="text-xl sm:text-2xl font-bold">{avgLast30.toFixed(1)}<span className="text-xs font-medium text-muted-foreground ml-1">/day</span></p>
          </motion.div>
        </div>
        {/* Timeframe controls & sparkline */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-medium text-muted-foreground">Recent Activity</h4>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-secondary/50 p-1 border border-border/40">
              {[30,60,90].map(tf => (
                <button
                  key={tf}
                  onClick={()=> setTimeframe(tf as 30|60|90)}
                  className={cn("relative px-3 py-1 text-xs font-medium rounded-full transition-all", timeframe === tf ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground")}
                  aria-pressed={timeframe === tf}
                  aria-label={`Show last ${tf} days`}
                >
                  {tf}d
                </button>
              ))}
            </div>
          </div>

          {/* sparkline */}
          <motion.div
            key={timeframe}
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.4 }}
            className="flex items-end gap-4"
          >
            <div className="relative w-32 h-10">
              <svg viewBox="0 0 120 36" className="absolute inset-0 overflow-visible">
                <defs>
                  <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <motion.path
                  d={sparklinePath}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength:0 }}
                  animate={{ pathLength:1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                {/* gradient area removed */}
                {sparklinePath && (
                  <motion.path
                    d={`${sparklinePath} L120,36 L0,36 Z`}
                    fill="url(#spark)"
                    initial={{ opacity:0 }}
                    animate={{ opacity:1 }}
                    transition={{ delay:0.2 }}
                  />
                )}
              </svg>
            </div>
            <p className="text-xs text-muted-foreground leading-tight max-w-xs">Showing <span className="font-medium text-foreground">last {timeframe} days</span> of commits. Each square below scales relative to the max in this window.</p>
          </motion.div>

          {/* Heatmap */}
          <div className="space-y-3">
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-rows-1 grid-flow-col gap-1 min-w-[540px]">
                <TooltipProvider>
                  <AnimatePresence mode="popLayout">
          {timeframeData.map((day , index)=>(
                    <motion.div
                      layout
                      key={day.date}
            initial={{scale:0, opacity:0}}
            animate={{scale:1, opacity:1}}
                      exit={{scale:0, opacity:0}}
                      transition={{delay:index * 0.012, type:'spring', stiffness:220, damping:18}}
                    > 
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "h-6 w-6 sm:h-7 sm:w-7 rounded-md ring-1 ring-border/20 shadow-sm hover:shadow-md", 
                              getContributionLevel(day.count),
                "transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 relative overflow-hidden"
                            )}
                            aria-label={`${day.count} contributions on ${new Date(day.date).toLocaleDateString(undefined,{month:'short', day:'numeric'})}`}
                            role="button"
                            tabIndex={0}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs font-semibold text-black">
                            {day.count} contributions on { new Date(day.date).toLocaleDateString(undefined,{month:"short" , day:"numeric"}) }
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </TooltipProvider>
              </div>
            </div>
            {/* scale legend */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              <span>Less</span>
              {[0,1,2,3,4].map(l=>(
                <div key={l} className={cn("h-3 w-5 rounded-sm", getContributionLevel(Math.round((l/4)*maxInTimeframe)))} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

      </motion.div>
    </Card>
  );
};

export default GithubStats;
