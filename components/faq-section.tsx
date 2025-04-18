'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'help-circle',
            question: 'How does Alif help me study?',
            answer: 'Alif uses AI to analyze your study materials (notes, PDFs, web links) and generate helpful resources like quizzes, summaries, and concept explanations to improve your understanding and retention.',
        },
        {
            id: 'item-2',
            icon: 'book-open',
            question: 'What kind of materials can I use with Alif?',
            answer: 'You can upload PDFs, paste text, provide web links, or connect to existing knowledge bases. Alif can process a wide variety of text-based content to help you study.',
        },
        {
            id: 'item-3',
            icon: 'graduation-cap',
            question: 'Is Alif suitable for all subjects?',
            answer: 'Alif works best with text-heavy subjects like history, literature, science, law, etc. While it can assist with problem-solving subjects, its core strength lies in processing and understanding textual information.',
        },
        {
            id: 'item-4',
            icon: 'lock',
            question: 'Is my data secure with Alif?',
            answer: 'Yes, we prioritize data security and privacy. Your study materials are processed securely and are not shared with third parties. Please refer to our privacy policy for more details.',
        },
        {
            id: 'item-5',
            icon: 'dollar-sign',
            question: 'Is Alif free to use?',
            answer: 'Alif offers a free tier with basic features. We also have premium subscription plans that provide access to advanced features, higher usage limits, and priority support.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for? Contact our{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
