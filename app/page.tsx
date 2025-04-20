// app/page.tsx - Root landing page
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to the marketing page which is now in the (marketing) route group
  // This avoids the redirect loop by using the full URL
  return redirect('/marketing');
}