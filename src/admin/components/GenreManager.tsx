import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { useAdminData } from "../hooks/useAdminData";

const GenreManager = () => {
  const { genres, fetchGenres, addGenre, updateGenre, deleteGenre } = useAdminData();
  const [newGenre, setNewGenre] = useState('');
  const [editingGenre, setEditingGenre] = useState<any>(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleAddGenre = async () => {
    if (!newGenre.trim()) return;
    await addGenre(newGenre);
    setNewGenre('');
  };

  const handleUpdateGenre = async (id: number, name: string) => {
    await updateGenre(id, name);
    setEditingGenre(null);
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Manage Genres</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            placeholder="Add new genre"
            className="bg-gray-800 text-white border-gray-700"
            onKeyPress={(e) => e.key === 'Enter' && handleAddGenre()}
          />
          <Button onClick={handleAddGenre} className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid gap-2">
          {genres.map((genre) => (
            <div key={genre.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
              {editingGenre?.id === genre.id ? (
                <div className="flex gap-2 flex-1">
                  <Input
                    defaultValue={genre.name}
                    className="bg-gray-700 text-white border-gray-600"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateGenre(genre.id, (e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <Button size="sm" onClick={() => setEditingGenre(null)} variant="outline" className="border-gray-600 text-white">
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <span className="text-white">{genre.name}</span>
                    <span className="text-gray-400 text-sm ml-2">({genre._count.movies} movies)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingGenre(genre)} className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-900 border-gray-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Delete Genre</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Delete "{genre.name}"? This will remove it from {genre._count.movies} movies.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-800 text-white border-gray-600">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteGenre(genre.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenreManager;