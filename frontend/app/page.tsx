"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getShows, type Show } from "../lib/api";

function formatShowTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Time to be announced";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export default function HomePage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShows()
      .then(setShows)
      .catch((cause: unknown) => {
        setError(
          cause instanceof Error ? cause.message : "Unable to load shows.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
          Showtime
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find your next show
        </h1>
        <p className="mt-3 text-slate-600">
          Choose a performance and reserve your seats.
        </p>
      </header>

      {loading && <p className="text-slate-600">Loading shows...</p>}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}
      {!loading && !error && shows.length === 0 && (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
          No shows are available right now.
        </p>
      )}

      <section aria-label="Available shows" className="grid gap-5 sm:grid-cols-2">
        {shows.map((show) => (
          <article
            key={show.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{show.title}</h2>
            <p className="mt-3 text-slate-600">
              {formatShowTime(show.showTime)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {show.availableSeats} seats available
            </p>
            <Link
              href={`/shows/${show.id}`}
              className="mt-6 inline-flex w-fit rounded-lg bg-rose-700 px-4 py-2 font-medium text-white transition hover:bg-rose-800"
            >
              Book now
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
