"use client";

import React from "react";

type Point = { date: Date; value: number };

type Props = {
  data: Point[];
  title: string;
  height?: number;
};

// Minimal, dependency-free SVG line chart suitable for simple time series.
export function TimeSeriesChart({ data, title, height = 260 }: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState<number>(520);

  // Responsive width via ResizeObserver
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w && w !== width) setWidth(w);
      }
    });
    ro.observe(el);
    // Initialize
    setWidth(el.clientWidth || 520);
    return () => ro.disconnect();
  }, []);
  const padding = { top: 24, right: 16, bottom: 28, left: 36 };

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const xs = data.map((d) => d.date.getTime());
  const ys = data.map((d) => d.value);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = 0; // counts start at 0
  const rawMaxY = Math.max(0, ...ys);
  // Build an integer-friendly axis: round up to a nice step
  const baseMax = Math.max(1, rawMaxY);
  const step = Math.max(1, Math.ceil(baseMax / 4));
  const yUpper = Math.ceil(baseMax / step) * step; // top of axis (>= baseMax)

  const xScale = (t: number) => {
    if (maxX === minX) return padding.left + innerW / 2;
    return padding.left + ((t - minX) / (maxX - minX)) * innerW;
  };
  const yScale = (v: number) => padding.top + innerH - (v / (yUpper - minY)) * innerH;

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [data]);

  const path = React.useMemo(() => {
    if (!sortedData.length) return "";
    return sortedData
      .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.date.getTime())} ${yScale(d.value)}`)
      .join(" ");
  }, [sortedData]);

  // Simple ticks: 4 x-ticks, 4 y-ticks
  const xTicks = 4;
  const xTickValues = Array.from({ length: xTicks + 1 }, (_, i) =>
    minX + ((maxX - minX) * i) / xTicks,
  );
  const yTickValues: number[] = [];
  for (let v = minY; v <= yUpper; v += step) {
    yTickValues.push(v);
  }

  return (
    <div ref={containerRef} className="rounded-md border p-4 w-full overflow-hidden">
      <div className="mb-2 text-sm font-medium text-foreground">{title}</div>
      <svg width={width} height={height} role="img" aria-label={title}>
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top + innerH}
          x2={padding.left + innerW}
          y2={padding.top + innerH}
          stroke="#e5e7eb"
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerH}
          stroke="#e5e7eb"
        />

        {/* Grid + y ticks */}
        {yTickValues.map((v, i) => {
          const y = yScale(v);
          return (
            <g key={i}>
              <line x1={padding.left} x2={padding.left + innerW} y1={y} y2={y} stroke="#f3f4f6" />
              <text x={padding.left - 6} y={y + 3} fontSize="10" textAnchor="end" fill="#6b7280">
                {v}
              </text>
            </g>
          );
        })}

        {/* x ticks */}
        {xTickValues.map((t, i) => {
          const x = xScale(t);
          const d = new Date(t);
          const label = `${d.getMonth() + 1}/${d.getDate()}`;
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={padding.top + innerH} y2={padding.top + innerH + 4} stroke="#e5e7eb" />
              <text x={x} y={padding.top + innerH + 16} fontSize="10" textAnchor="middle" fill="#6b7280">
                {label}
              </text>
            </g>
          );
        })}

        {/* Line path */}
        <path d={path} fill="none" stroke="#2563eb" strokeWidth={2} />

        {/* Dots at each data point */}
        {sortedData.map((d, i) => {
          const cx = xScale(d.date.getTime());
          const cy = yScale(d.value);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={3.5} fill="#2563eb" stroke="#ffffff" strokeWidth={1} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
