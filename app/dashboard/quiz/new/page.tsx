'use client';

import { NewQuizPageContainer } from "@/features/quiz/containers/NewQuizPageContainer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function NewQuizPage() {
  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs 
        items={[
            { label: 'Dashboard', href: '/dashboard' }, 
            { label: 'New Quiz' } // Current page
        ]}
      />
      <h1 className="text-2xl font-semibold">Pick resources to generate questions</h1>
      <NewQuizPageContainer />
    </div>
  );
} 