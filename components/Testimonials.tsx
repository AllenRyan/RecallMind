"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "./ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    text: "RecallMind has completely changed how I research. I can now process 10x more information and actually remember it all.",
    initials: "SJ",
    color: "bg-blue-100 text-blue-600",
    name: "Sarah Johnson",
    role: "Research Analyst",
  },
  {
    text: "The AI summarization is incredibly accurate. It saves me hours every week and helps me stay on top of industry trends.",
    initials: "MC",
    color: "bg-green-100 text-green-600",
    name: "Michael Chen",
    role: "Product Manager",
  },
  {
    text: "Finally, a tool that understands how my brain works. The organization features are intuitive and powerful.",
    initials: "ER",
    color: "bg-purple-100 text-purple-600",
    name: "Emily Rodriguez",
    role: "Content Strategist",
  },
]

const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 1500, stopOnInteraction: false })] // autoplay every 1.5s
  )

  return (
    <section
      id="testimonials"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their knowledge workflow.
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.concat(testimonials).map((t, idx) => (
              <div
                className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] px-3"
                key={idx}
              >
                <Card className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 ${t.color.split(" ")[0]} rounded-full flex items-center justify-center`}
                      >
                        <span className={t.color.split(" ")[1] + " font-semibold"}>
                          {t.initials}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
