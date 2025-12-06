import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Tag, Users, FolderOpen } from "lucide-react";
import { useAdminData } from "../hooks/useAdminData";

const StatsOverview = () => {
  const { stats, fetchStats } = useAdminData();

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="text-center py-8 text-gray-400">
        Loading stats...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.movieCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Genres</CardTitle>
            <Tag className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.genreCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Downloads</CardTitle>
            <Users className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalDownloads || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">This Month</CardTitle>
            <FolderOpen className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.monthlyMovies || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.recentMovies.map((movie) => (
              <div key={movie.id} className="flex justify-between items-center p-3 bg-gray-800 rounded">
                <span className="font-medium text-white">{movie.title}</span>
                <span className="text-sm text-gray-400">
                  {new Date(movie.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;