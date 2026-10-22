"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createBooking, getShow, type Booking, type Show } from "../../../lib/api";

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

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getShow(id)
      .then(setShow)
      .catch((cause: unknown) => {
        setError(
          cause instanceof Error ? cause.message : "Unable to load this show.",
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const created = await createBooking({
        showId: Number(id),
        customerName: customerName.trim(),
        seatsBooked,
      });
      setBooking(created);
      setShow((current) =>
        current
          ? {
              ...current,
              availableSeats: Math.max(
                0,
                current.availableSeats - created.seatsBooked,
              ),
            }
          : current,
      );
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : "Unable to create booking.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm font-medium text-rose-700 hover:underline">
        &larr; All shows
      </Link>

      {loading && <p className="mt-8 text-slate-600">Loading show...</p>}
      {error && !show && (
        <p role="alert" className="mt-8 rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}

      {!loading && show && (
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-700">
            Showtime
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {show.title}
          </h1>
          <p className="mt-3 text-slate-600">
            {formatShowTime(show.showTime)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {show.availableSeats} seats available
          </p>

          {booking ? (
            <div
              role="status"
              className="mt-8 rounded-lg bg-emerald-50 p-5 text-emerald-900"
            >
              <h2 className="font-semibold">Booking confirmed</h2>
              <p className="mt-1">
                {booking.customerName}, {booking.seatsBooked}{" "}
                {booking.seatsBooked === 1 ? "seat is" : "seats are"} reserved.
              </p>
              <p className="mt-1 text-sm">Booking reference: {booking.id}</p>
            </div>
          ) : show.availableSeats > 0 ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="customerName"
                  className="mb-2 block text-sm font-medium"
                >
                  Customer name
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  autoComplete="name"
                  required
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-rose-700 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              <div>
                <label
                  htmlFor="seatsBooked"
                  className="mb-2 block text-sm font-medium"
                >
                  Number of seats
                </label>
                <input
                  id="seatsBooked"
                  name="seatsBooked"
                  type="number"
                  min={1}
                  max={show.availableSeats}
                  required
                  value={seatsBooked}
                  onChange={(event) =>
                    setSeatsBooked(Number(event.target.value))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-rose-700 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-rose-700 px-5 py-2.5 font-medium text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Booking..." : "Confirm booking"}
              </button>
            </form>
          ) : (
            <p className="mt-8 rounded-lg bg-amber-50 p-4 text-amber-900">
              This show is sold out.
            </p>
          )}
        </section>
      )}
    </main>
  );
}
