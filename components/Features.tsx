import { BookOpen, Brain, Search, Star, Users, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Features = () => {
    return (   
          <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful <span className="text-blue-700">Features</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to transform information overload into organized knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Summarization</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered algorithms extract key insights from articles, videos, and documents in seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Search</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find any piece of information instantly with our advanced semantic search capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Capture</h3>
                <p className="text-gray-600 leading-relaxed">
                  Save content from any source with our browser extension and mobile apps in one click.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
                <p className="text-gray-600 leading-relaxed">
                  Share knowledge bases with your team and collaborate on research projects seamlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Organization</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automatically categorize and tag your content using machine learning algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Insights</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get personalized recommendations and insights based on your reading patterns and interests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
     );
}
 
export default Features;