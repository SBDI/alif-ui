// app/page.tsx - Root landing page
import { redirect } from 'next/navigation';

export default function RootPage() {
  // This will redirect the root path to the marketing page
  redirect('/marketing');
} 