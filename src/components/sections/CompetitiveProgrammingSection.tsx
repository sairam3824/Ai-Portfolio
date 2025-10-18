import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CompetitiveProgrammingSection = () => {
  const platforms = [
    {
      name: "CodeChef",
      username: "sairam2004",
      rating: "1500",
      stars: "2★",
      rank: "27,876",
      countryRank: "25,408",
      problemsSolved: "454",
      contestsParticipated: "15",
      badges: [
        { name: "Daily Streak Diamond", description: "100 days streak" },
        { name: "Contest Contender Bronze", description: "5 contests participated" },
        { name: "Problem Solver Silver", description: "250 problems solved" }
      ],
      url: "https://www.codechef.com/users/sairam2004",
      color: "bg-orange-500"
    },
    {
      name: "LeetCode",
      username: "sairam3824",
      rating: "N/A",
      stars: "N/A",
      rank: "N/A",
      countryRank: "N/A",
      problemsSolved: "N/A",
      contestsParticipated: "N/A",
      badges: [],
      url: "https://leetcode.com/u/sairam3824",
      color: "bg-yellow-500"
    },
    {
      name: "InterviewBit",
      username: "sai-rama-linga-reddy-maruri",
      rating: "N/A",
      stars: "N/A",
      rank: "N/A",
      countryRank: "N/A",
      problemsSolved: "N/A",
      contestsParticipated: "N/A",
      badges: [],
      url: "https://www.interviewbit.com/profile/sai-rama-linga-reddy-maruri/",
      color: "bg-blue-500"
    },
    {
      name: "TakeUForward",
      username: "sairam3824",
      rating: "N/A",
      stars: "N/A",
      rank: "N/A",
      countryRank: "N/A",
      problemsSolved: "N/A",
      contestsParticipated: "N/A",
      badges: [],
      url: "https://takeuforward.org/plus/profile/sairam3824",
      color: "bg-green-500"
    }
  ];

  const learningProgress = [
    { topic: "C++", progress: 23 },
    { topic: "Machine Learning", progress: 2 },
    { topic: "Stacks and Queues", progress: 33 },
    { topic: "Graphs", progress: 37 },
    { topic: "Trees and Binary trees", progress: 12 },
    { topic: "Bit Manipulation", progress: 6 },
    { topic: "Linked Lists", progress: 28 },
    { topic: "Recursion", progress: 8 },
    { topic: "Problem solving in Python", progress: 10 }
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <h2 className="text-3xl font-bold text-foreground text-center">
        Competitive Programming
      </h2>

      {/* Platform Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {platforms.map((platform, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
              <h3 className="text-lg font-semibold text-foreground">{platform.name}</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Username:</span>
                <span className="text-foreground font-medium">{platform.username}</span>
              </div>
              
              {platform.rating !== "N/A" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="text-foreground font-medium">{platform.rating} {platform.stars}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Global Rank:</span>
                    <span className="text-foreground font-medium">#{platform.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country Rank:</span>
                    <span className="text-foreground font-medium">#{platform.countryRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Problems Solved:</span>
                    <span className="text-foreground font-medium">{platform.problemsSolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contests:</span>
                    <span className="text-foreground font-medium">{platform.contestsParticipated}</span>
                  </div>
                </>
              )}
            </div>

            {platform.badges.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">Badges:</h4>
                <div className="flex flex-wrap gap-1">
                  {platform.badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block w-full text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              View Profile
            </a>
          </Card>
        ))}
      </div>

      {/* Learning Progress */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Learning Progress
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learningProgress.map((item, index) => (
            <Card key={index} className="p-4 border border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">{item.topic}</span>
                <span className="text-sm text-muted-foreground">{item.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
