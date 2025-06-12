import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function VideoTutorials() {
  const [, setLocation] = useLocation();

  const featuredVideos = [
    {
      title: "Perfect Swimming Technique",
      instructor: "Olympic Coach Sarah Miller",
      duration: "12:45",
      level: "All Levels",
      views: "2.1K",
      thumbnail: "🏊‍♀️"
    },
    {
      title: "Running Form Essentials",
      instructor: "Elite Coach Mike Johnson",
      duration: "8:30",
      level: "Beginner",
      views: "3.5K",
      thumbnail: "🏃‍♂️"
    }
  ];

  const videoCategories = [
    {
      category: "Swimming Technique",
      videos: [
        { title: "Freestyle Breathing", duration: "6:20", level: "Beginner", views: "1.8K" },
        { title: "Backstroke Fundamentals", duration: "7:15", level: "Intermediate", views: "1.2K" },
        { title: "Butterfly Stroke Guide", duration: "9:40", level: "Advanced", views: "950" }
      ]
    },
    {
      category: "Running Drills",
      videos: [
        { title: "High Knees & Butt Kicks", duration: "4:30", level: "All Levels", views: "2.3K" },
        { title: "Cadence Training", duration: "5:45", level: "Intermediate", views: "1.7K" },
        { title: "Hill Running Technique", duration: "8:20", level: "Advanced", views: "1.1K" }
      ]
    },
    {
      category: "Cycling Skills",
      videos: [
        { title: "Proper Bike Fit", duration: "10:15", level: "All Levels", views: "2.8K" },
        { title: "Cornering Techniques", duration: "6:50", level: "Intermediate", views: "1.4K" },
        { title: "Climbing Efficiency", duration: "7:35", level: "Advanced", views: "1.0K" }
      ]
    },
    {
      category: "Strength Training",
      videos: [
        { title: "Core for Athletes", duration: "15:20", level: "All Levels", views: "3.2K" },
        { title: "Functional Movement", duration: "12:10", level: "Intermediate", views: "1.9K" },
        { title: "Injury Prevention", duration: "11:45", level: "All Levels", views: "2.1K" }
      ]
    }
  ];

  const playlists = [
    { name: "Triathlon Basics", videos: 8, duration: "1h 24m" },
    { name: "Advanced Training", videos: 12, duration: "2h 15m" },
    { name: "Recovery & Mobility", videos: 6, duration: "45m" }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "text-green-600";
      case "Intermediate": return "text-yellow-600";
      case "Advanced": return "text-red-600";
      default: return "text-[#70c1e4]";
    }
  };

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
            <div className="text-white text-[24px]">🎥</div>
          </div>
        </div>

        <div className="px-8">
          <h1 className="text-[24px] font-semibold text-center mb-8 text-[#70c1e4]">Video Tutorials</h1>
          
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Featured Videos</h3>
              <div className="space-y-3">
                {featuredVideos.map((video, index) => (
                  <div key={index} className="bg-white rounded-[15px] p-4 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-[20px]">
                        {video.thumbnail}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-medium text-gray-800 mb-1">{video.title}</h4>
                        <p className="text-[12px] text-gray-600 mb-2">by {video.instructor}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-3">
                            <span className="text-[11px] text-[#70c1e4] font-medium">{video.duration}</span>
                            <span className={`text-[11px] font-medium ${getLevelColor(video.level)}`}>
                              {video.level}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-500">{video.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {videoCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-[#f8f9fa] rounded-[20px] p-4">
                <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.videos.map((video, videoIndex) => (
                    <div key={videoIndex} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-[14px] font-medium text-gray-700">{video.title}</div>
                        <div className="flex space-x-3 mt-1">
                          <span className="text-[11px] text-[#70c1e4] font-medium">{video.duration}</span>
                          <span className={`text-[11px] font-medium ${getLevelColor(video.level)}`}>
                            {video.level}
                          </span>
                          <span className="text-[11px] text-gray-500">{video.views} views</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-[28px] rounded-[14px] border-[#70c1e4] text-[#70c1e4] text-[11px] px-3"
                      >
                        ▶ Play
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-4">Curated Playlists</h3>
              <div className="space-y-3">
                {playlists.map((playlist, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#70c1e4] rounded-lg flex items-center justify-center">
                        <span className="text-white text-[12px]">📋</span>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-gray-700">{playlist.name}</div>
                        <div className="text-[12px] text-gray-500">{playlist.videos} videos • {playlist.duration}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-[28px] rounded-[14px] border-[#70c1e4] text-[#70c1e4] text-[11px] px-3"
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-[20px] p-4">
              <h3 className="text-[16px] font-medium text-[#70c1e4] mb-3">Video Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  🔍 Search Videos
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📱 Download App
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  ⭐ Favorites
                </Button>
                <Button
                  variant="outline"
                  className="h-[35px] rounded-[17px] border-[#70c1e4] text-[#70c1e4] text-[12px]"
                >
                  📺 Watch Later
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