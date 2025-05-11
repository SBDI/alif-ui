import Image from 'next/image';
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

const logos = [
  { src: "/logos/nvidia.svg", alt: "Nvidia Logo", height: 20, width: 80 },
  { src: "/logos/column.svg", alt: "Column Logo", height: 16, width: 70 },
  { src: "/logos/github.svg", alt: "GitHub Logo", height: 16, width: 60 },
  { src: "/logos/nike.svg", alt: "Nike Logo", height: 20, width: 50 },
  { src: "/logos/lemonsqueezy.svg", alt: "Lemon Squeezy Logo", height: 20, width: 100 },
  { src: "/logos/laravel.svg", alt: "Laravel Logo", height: 16, width: 70 },
  { src: "/logos/lilly.svg", alt: "Lilly Logo", height: 28, width: 60 },
  { src: "/logos/openai.svg", alt: "OpenAI Logo", height: 24, width: 90 },
];

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Trusted by students worldwide</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            {logos.map((logo, index) => (
                              <div className="flex" key={index}>
                                <Image
                                    className="mx-auto h-auto dark:invert"
                                    src={logo.src}
                                    alt={logo.alt} 
                                    height={logo.height}
                                    width={logo.width}
                                />
                              </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 