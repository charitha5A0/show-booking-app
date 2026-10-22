export interface Show {
  id: number;
  title: string;
  showTime: string;
  totalSeats: number;
  availableSeats: number;
}

export interface Booking {
  id: number;
  customerName: string;
  seatsBooked: number;
  bookingTime: string;
  show: Show;
}

export interface CreateBookingInput {
  showId: number;
  customerName: string;
  seatsBooked: number;
}

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"
).replace(/\/+$/, "");

export { API_BASE_URL };

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String(payload.message)
        : typeof payload === "object" && payload !== null && "error" in payload
          ? String(payload.error)
          : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getShows(): Promise<Show[]> {
  return request<Show[]>("/api/shows", { cache: "no-store" });
}

export function getShow(id: number | string): Promise<Show> {
  return request<Show>(`/api/shows/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
}

export function createBooking(input: CreateBookingInput): Promise<Booking> {
  return request<Booking>("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}
