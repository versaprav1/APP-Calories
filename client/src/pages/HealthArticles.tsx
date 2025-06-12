import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function HealthArticles() {
  const [, setLocation] = useLocation();

  const featuredArticles = [
    {
      title: "The Science of Recovery",
      category: "Recovery",
      readTime: "5 min read",
      date: "Dec 10, 2024",
      excerpt: "Understanding how proper recovery enhances performance and prevents injury in endurance sports.",
      featured: true
    },
    {
      title: "Fueling Your Triathlon",
      category: "Nutrition",
      readTime: "8 min read",
      date: "Dec 8, 2024",
      excerpt: "Complete nutrition strategies for training and race day performance optimization.",
      featured: true
    }
  ];

  const articleCategories = [
    {
      category: "Training",
      articles: [
        { title: "Zone 2 Training Benefits", readTime: "6 min", author: "Dr. Sarah Chen" },
        { title: "Building Aerobic Base", readTime: "4 min", author: "Coach Mike Wilson" },
        { title: "Interval Training Guide", readTime: "7 min", author: "Prof. Lisa Johnson" }
      ]
    },
    {
      category: "Recovery",
      articles: [
        { title: "Sleep and Athletic Performance", readTime: "5 min", author: "Dr. James Miller" },
        { title: "Active Recovery Methods", readTime: "3 min", author: "PT Rachel Adams" },
        { title: "Managing Training Stress", readTime: "6 min", author: "Coach David Lee" }
      ]
    },
    {
      category: "Injury Prevention",
      articles: [
        { title: "Common Running Injuries", readTime: "8 min", author: "Dr. Emma Taylor" },
        { title: "Swimmer's Shoulder Prevention", readTime: "5 min", author: "PT Mark Brown" },
        { title: "Cycling Biomechanics", readTime: "7 min", author: "Dr. Alex Garcia" }
      ]
    }
  ];

  const trendingTopics = [
    "Heat Training", "Cold Water Swimming", "Power Meter Training", 
    "Mental Performance", "Altitude Training", "Race Fueling"
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto relative pb-20">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="text-black text-[14px] font-medium">19:09</div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center px-4 py-4">
          <Button
            onClick={() => setLocation("/resources")}
            variant="ghost"
            className="text-[#70c1e4] hover:bg-[#70c1e4]/10"
          >
            ← Back
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-[80px] h-[80px] bg-[#70c1e4] rounded-full flex items-center justify-center">
            <div className="text-white text-[24px]">📰</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Health Articles</h1>
          
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Featured Articles</h3>
              <div className="space-y-3">
                {featuredArticles.map((article, index) => (
                  <div key={index} className="bg-white rounded-[15px] p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[11px] bg-[#70c1e4] text-white px-2 py-1 rounded-full">Featured</span>
                      <span className="text-[11px] text-gray-500">{article.date}</span>
                    </div>
                    <h4 className="text-[15px] font-medium text-gray-800 mb-1">{article.title}</h4>
                    <p className="text-[13px] text-gray-600 mb-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {article.category}
                      </span>
                      <span className="text-[12px] text-[#70c1e4] font-medium">{article.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {articleCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-[14px] font-medium text-gray-700">{article.title}</div>
                        <div className="text-[12px] text-gray-500">By {article.author}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] text-[#70c1e4] font-medium">{article.readTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <span 
                    key={index} 
                    className="text-[12px] bg-white border border-[#70c1e4] text-[#70c1e4] px-3 py-1 rounded-full cursor-pointer hover:bg-[#70c1e4] hover:text-white transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Discover More</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  🔍 Search Articles
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📚 Categories
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  ⭐ Bookmarks
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📧 Newsletter
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="flex justify-around py-2">
              <button onClick={() => setLocation("/dashboard")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">🏠</div>
                <span className="text-[10px] text-gray-600">Home</span>
              </button>
              <button onClick={() => setLocation("/account")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">👤</div>
                <span className="text-[10px] text-gray-600">Account</span>
              </button>
              <button onClick={() => setLocation("/activity")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">📊</div>
                <span className="text-[10px] text-gray-600">Activity</span>
              </button>
              <button onClick={() => setLocation("/resources")} className="flex flex-col items-center py-2 px-4">
                <div className="w-6 h-6 mb-1">📚</div>
                <span className="text-[10px] text-[#70c1e4] font-medium">Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}