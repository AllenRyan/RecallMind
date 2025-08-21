import { Check, Brain } from "lucide-react"

const About = () => {
    return ( 
              <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About <span className="text-blue-700">RecallMind</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re revolutionizing how people interact with information in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our <span className="text-blue-700">Mission</span></h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                In today&apos;s information-rich world, we believe everyone deserves tools that help them capture,
                understand, and recall knowledge effortlessly. RecallMind transforms the way you interact with content
                across all platforms.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">AI-powered content summarization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Cross-platform content management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Intelligent knowledge organization</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-center">
                <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Built for Modern Minds</h4>
                <p className="text-gray-600">
                  Designed by researchers and built for professionals who value their time and knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
     );
}
 
export default About;