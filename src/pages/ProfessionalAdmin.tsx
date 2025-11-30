import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, Film, TrendingUp, Settings, Zap, 
  Users, Eye, Download, Search, Globe, 
  Clock, Star, Calendar, Cpu, Database,
  RefreshCw, AlertTriangle, CheckCircle
} from "lucide-react";

const ProfessionalAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metrics, setMetrics] = useState({
    todayViews: 0,
    todayDownloads: 0,
    totalMovies: 0,
    trendingMovies: 0,
    activeUsers: 0,
    serverLoad: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Professional Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 mb-8">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-pink-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-pink-600">
              <Film className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="collections" className="text-white data-[state=active]:bg-pink-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-pink-600">
              <Eye className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-white data-[state=active]:bg-pink-600">
              <Zap className="w-4 h-4 mr-2" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="system" className="text-white data-[state=active]:bg-pink-600">
              <Settings className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Today's Views</CardTitle>
                  <Eye className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">12,847</div>
                  <p className="text-xs text-green-500">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Downloads</CardTitle>
                  <Download className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3,421</div>
                  <p className="text-xs text-green-500">+8% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,847</div>
                  <p className="text-xs text-green-500">+5% from last hour</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Server Load</CardTitle>
                  <Cpu className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">67%</div>
                  <p className="text-xs text-yellow-500">Normal range</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Film className="w-4 h-4 mr-2" />
                  Add Movie
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Trending
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Database className="w-4 h-4 mr-2" />
                  Backup Data
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Movies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                        <div>
                          <p className="text-white font-medium">Movie Title {i}</p>
                          <p className="text-gray-400 text-sm">Added 2 hours ago</p>
                        </div>
                        <div className="text-green-500 text-sm">Published</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Top Searches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Avengers', 'Spider-Man', 'Batman', 'John Wick', 'Fast & Furious'].map((search, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                        <div className="flex items-center">
                          <Search className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-white">{search}</span>
                        </div>
                        <div className="text-blue-500 text-sm">{1247 - i * 200} searches</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CONTENT TAB */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Content Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-pink-600 hover:bg-pink-700">
                      <Film className="w-4 h-4 mr-2" />
                      Add New Movie
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-white">
                      Bulk Import
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Auto-fetch Metadata</h4>
                    <div className="flex gap-2">
                      <Input placeholder="Movie title" className="bg-gray-800 text-white border-gray-700" />
                      <Input placeholder="Year" className="bg-gray-800 text-white border-gray-700 w-24" />
                      <Button className="bg-blue-600 hover:bg-blue-700">Fetch</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Content Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Movies</span>
                    <span className="text-white font-bold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Published</span>
                    <span className="text-green-500 font-bold">2,731</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Draft</span>
                    <span className="text-yellow-500 font-bold">116</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Featured</span>
                    <span className="text-blue-500 font-bold">45</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* COLLECTIONS TAB */}
          <TabsContent value="collections" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Trending Now', count: 20, auto: true, icon: TrendingUp, color: 'text-red-500' },
                { name: 'Popular This Week', count: 50, auto: true, icon: Star, color: 'text-yellow-500' },
                { name: 'New Releases', count: 30, auto: true, icon: Calendar, color: 'text-green-500' },
                { name: 'Top Rated', count: 100, auto: false, icon: Star, color: 'text-blue-500' },
                { name: 'Action Movies', count: 450, auto: false, icon: Film, color: 'text-purple-500' },
                { name: 'Netflix Originals', count: 78, auto: false, icon: Globe, color: 'text-pink-500' }
              ].map((collection, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">{collection.name}</CardTitle>
                    <collection.icon className={`h-4 w-4 ${collection.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{collection.count}</div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-400">
                        {collection.auto ? 'Auto-updated' : 'Manual'}
                      </p>
                      {collection.auto && <CheckCircle className="h-3 w-3 text-green-500" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Top Performing Content</h4>
                    <div className="space-y-2">
                      {['Avengers: Endgame', 'Spider-Man: No Way Home', 'The Batman'].map((movie, i) => (
                        <div key={i} className="flex justify-between p-2 bg-gray-800 rounded">
                          <span className="text-white text-sm">{movie}</span>
                          <span className="text-green-500 text-sm">{12847 - i * 1000} views</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Traffic Sources</h4>
                    <div className="space-y-2">
                      {[
                        { source: 'Direct', percentage: 45 },
                        { source: 'Google Search', percentage: 32 },
                        { source: 'Social Media', percentage: 23 }
                      ].map((source, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-white">{source.source}</span>
                            <span className="text-gray-400">{source.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-pink-600 h-2 rounded-full" 
                              style={{ width: `${source.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">User Behavior</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-gray-800 rounded">
                        <span className="text-gray-400">Avg. Session</span>
                        <span className="text-white">4m 32s</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-800 rounded">
                        <span className="text-gray-400">Pages/Session</span>
                        <span className="text-white">3.2</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-800 rounded">
                        <span className="text-gray-400">Bounce Rate</span>
                        <span className="text-white">32%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AUTOMATION TAB */}
          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Scheduled Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { task: 'Update Trending', interval: 'Every 5 minutes', status: 'active' },
                    { task: 'Backup Database', interval: 'Daily at 2 AM', status: 'active' },
                    { task: 'Generate Sitemap', interval: 'Every 6 hours', status: 'active' },
                    { task: 'Clean Cache', interval: 'Every hour', status: 'active' }
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div>
                        <p className="text-white font-medium">{task.task}</p>
                        <p className="text-gray-400 text-sm">{task.interval}</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-green-500 text-sm">Active</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">AI Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-gray-800 rounded">
                    <h4 className="text-white font-medium">Auto-categorization</h4>
                    <p className="text-gray-400 text-sm">Automatically assign genres and tags</p>
                    <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">Configure</Button>
                  </div>
                  <div className="p-3 bg-gray-800 rounded">
                    <h4 className="text-white font-medium">Trending Prediction</h4>
                    <p className="text-gray-400 text-sm">Predict which content will trend</p>
                    <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">Setup</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SYSTEM TAB */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Database</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cache</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CDN</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">API</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-green-500">120ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-500">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Memory Usage</span>
                    <span className="text-yellow-500">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Disk Space</span>
                    <span className="text-green-500">45%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Quick Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Database className="w-4 h-4 mr-2" />
                    Optimize DB
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Generate Backup
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfessionalAdmin;