import { getShows } from "../../../lib/api";
import BookingPage from "./booking-page";

export async function generateStaticParams() {
  const shows = await getShows();
  return shows.map((show) => ({ id: String(show.id) }));
}

export default function ShowPage() {
  return <BookingPage />;
}
