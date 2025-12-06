import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Film, List, BarChart3, Tag, Plus } from 'lucide-react';
import ContentForm from './components/ContentForm';
import ContentList from './components/ContentList';
import StatsOverview from './components/StatsOverview';
import GenreManager from './components/GenreManager';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tab') || 'dashboard';
  });
  const [editMovieId, setEditMovieId] = useState<number | undefined>();

  const handleEditMovie = (movieId: number) => {
    setEditMovieId(movieId);
    setActiveTab('add-content');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Clear URL params
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Panel - Content Management</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-pink-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="add-content" className="text-white data-[state=active]:bg-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </TabsTrigger>
            <TabsTrigger value="manage-content" className="text-white data-[state=active]:bg-pink-600">
              <List className="w-4 h-4 mr-2" />
              Manage Content
            </TabsTrigger>
            <TabsTrigger value="genres" className="text-white data-[state=active]:bg-pink-600">
              <Tag className="w-4 h-4 mr-2" />
              Genres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <StatsOverview />
          </TabsContent>

          <TabsContent value="add-content" className="space-y-6">
            <ContentForm editMovieId={editMovieId} onSuccess={() => setActiveTab('manage-content')} />
          </TabsContent>

          <TabsContent value="manage-content" className="space-y-6">
            <ContentList onEditMovie={handleEditMovie} />
          </TabsContent>

          <TabsContent value="genres" className="space-y-6">
            <GenreManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;