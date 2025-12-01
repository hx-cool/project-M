import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, ArrowLeft } from "lucide-react";
import { TMDBSearch } from "@/components/TMDBSearch";

const Admin = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMovieId, setEditMovieId] = useState<number | null>(null);
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useState<HTMLDivElement | null>(null)[0];
  const [formData, setFormData] = useState({
    // Card Info
    title: "",
    year: "",
    posterUrl: "",
    platform: "",
    isSeries: false,
    episodeInfo: "",
    quality: "WEB-DL",
    customQuality: "",
    audioType: "Dual Audio",
    customAudioType: "",
    language: "Hindi-English",
    customLanguage: "",
    subtitle: "none",
    customSubtitle: "",
    releaseDate: "",
    movieOrigin: "Hollywood",
    size480p: "422MB",
    size720p: "1GB",
    size1080p: "2.6GB",
    size2160p: "",
    show4K: false,
    isEditorPick: false,
    // Detail Page Info
    genre: "",
    rating: "",
    duration: "",
    synopsis: "",
    cast: "",
    screenshots: "",
    // Download Links - Unified
    codec: "none",
    allDownloads: [
      {id: '480p', name: '480p', link: '', size: '422MB', qualityDetail: 'WEB-DL', order: 0, isCustom: false},
      {id: '720p10bit', name: '720p 10Bit', link: '', size: '670MB', qualityDetail: 'WEB-DL x264', order: 1, isCustom: false},
      {id: '720p', name: '720p', link: '', size: '1GB', qualityDetail: 'WEB-DL x264', order: 2, isCustom: false},
      {id: '1080p10bit', name: '1080p 10Bit', link: '', size: '2GB', qualityDetail: 'WEB-DL x265', order: 3, isCustom: false},
      {id: '1080p', name: '1080p', link: '', size: '2.6GB', qualityDetail: 'WEB-DL x264', order: 4, isCustom: false},
      {id: '1080p60fps', name: '1080p 60FPS', link: '', size: '3.5GB', qualityDetail: 'WEB-DL x264', order: 5, isCustom: false},
      {id: '1440p', name: '1440p', link: '', size: '4.5GB', qualityDetail: 'WEB-DL x265', order: 6, isCustom: false},
      {id: '2160p', name: '2160p', link: '', size: '8GB', qualityDetail: '4K SDR x265', order: 7, isCustom: false},
      {id: '2160p10bit', name: '2160p 10Bit', link: '', size: '10GB', qualityDetail: '4K HDR x265', order: 8, isCustom: false},
    ] as Array<{id: string, name: string, link: string, size: string, qualityDetail: string, order: number, isCustom: boolean}>,
  });

  useEffect(() => {
    // Check if we're in edit mode
    const movieId = localStorage.getItem('editMovieId');
    if (movieId) {
      setIsEditMode(true);
      setEditMovieId(parseInt(movieId));
      loadMovieForEdit(parseInt(movieId));
      localStorage.removeItem('editMovieId');
    }
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const formCard = document.querySelector('.admin-form-card');
      if (formCard) {
        setFormHeight(formCard.clientHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [formData]);

  const loadMovieForEdit = async (movieId: number) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/movies/${movieId}`);
      const movie = await response.json();
      
      const predefinedIds = ['480p', '720p 10Bit', '720p', '1080p 10Bit', '1080p', '1080p 60FPS', '1440p', '2160p', '2160p 10Bit'];
      const allDownloads = [
        {id: '480p', name: '480p', link: movie.downloads?.find((d: any) => d.resolution === '480p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '480p')?.size || '422MB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '480p')?.qualityDetail || 'WEB-DL', order: movie.downloads?.find((d: any) => d.resolution === '480p')?.order ?? 0, isCustom: false},
        {id: '720p10bit', name: '720p 10Bit', link: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.size || '670MB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.qualityDetail || 'WEB-DL x264', order: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.order ?? 1, isCustom: false},
        {id: '720p', name: '720p', link: movie.downloads?.find((d: any) => d.resolution === '720p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '720p')?.size || '1GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '720p')?.qualityDetail || 'WEB-DL x264', order: movie.downloads?.find((d: any) => d.resolution === '720p')?.order ?? 2, isCustom: false},
        {id: '1080p10bit', name: '1080p 10Bit', link: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.size || '2GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.qualityDetail || 'WEB-DL x265', order: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.order ?? 3, isCustom: false},
        {id: '1080p', name: '1080p', link: movie.downloads?.find((d: any) => d.resolution === '1080p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1080p')?.size || '2.6GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1080p')?.qualityDetail || 'WEB-DL x264', order: movie.downloads?.find((d: any) => d.resolution === '1080p')?.order ?? 4, isCustom: false},
        {id: '1080p60fps', name: '1080p 60FPS', link: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.size || '3.5GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.qualityDetail || 'WEB-DL x264', order: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.order ?? 5, isCustom: false},
        {id: '1440p', name: '1440p', link: movie.downloads?.find((d: any) => d.resolution === '1440p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1440p')?.size || '4.5GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1440p')?.qualityDetail || 'WEB-DL x265', order: movie.downloads?.find((d: any) => d.resolution === '1440p')?.order ?? 6, isCustom: false},
        {id: '2160p', name: '2160p', link: movie.downloads?.find((d: any) => d.resolution === '2160p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '2160p')?.size || '8GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '2160p')?.qualityDetail || '4K SDR x265', order: movie.downloads?.find((d: any) => d.resolution === '2160p')?.order ?? 7, isCustom: false},
        {id: '2160p10bit', name: '2160p 10Bit', link: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.size || '10GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.qualityDetail || '4K HDR x265', order: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.order ?? 8, isCustom: false},
        ...movie.downloads?.filter((d: any) => !predefinedIds.includes(d.resolution)).map((d: any, idx: number) => ({id: `custom-${idx}`, name: d.resolution, link: d.link, qualityDetail: d.qualityDetail || '', size: d.size, order: d.order ?? 999, isCustom: true})) || []
      ].sort((a, b) => a.order - b.order);
      
      setFormData({
        title: movie.title || "",
        year: movie.year || "",
        posterUrl: movie.posterUrl || "",
        platform: movie.platform || "",
        isSeries: movie.isSeries || false,
        episodeInfo: movie.episodeInfo || "",
        quality: movie.quality || "WEB-DL",
        customQuality: movie.customQuality || "",
        audioType: movie.audioType || "Dual Audio",
        customAudioType: movie.customAudioType || "",
        language: movie.language || "Hindi-English",
        customLanguage: movie.customLanguage || "",
        subtitle: movie.subtitle || "none",
        customSubtitle: movie.customSubtitle || "",
        releaseDate: movie.releaseDate || "",
        movieOrigin: movie.movieOrigin || "Hollywood",
        size480p: "422MB",
        size720p: "1GB",
        size1080p: "2.6GB",
        size2160p: "",
        show4K: movie.show4K || false,
        isEditorPick: movie.isEditorPick || false,
        genre: movie.genres?.map((g: any) => g.genre.name).join(', ') || "",
        rating: movie.rating?.toString() || "",
        duration: movie.duration || "",
        synopsis: movie.synopsis || "",
        cast: movie.cast?.map((c: any) => c.cast.name).join(', ') || "",
        screenshots: movie.screenshots?.map((s: any) => s.url).join(', ') || "",
        codec: movie.codec || "none",
        allDownloads,
      });
    } catch (error) {
      console.error('Failed to load movie for editing:', error);
    }
  };

  useEffect(() => {
    const baseQuality = formData.quality === "custom" ? formData.customQuality : formData.quality;
    const codecMap: Record<string, Record<string, string>> = {
      "none": {"480p": baseQuality, "720p10bit": baseQuality, "720p": baseQuality, "1080p10bit": baseQuality, "1080p": baseQuality, "1080p60fps": baseQuality, "1440p": baseQuality, "2160p": `4K ${baseQuality}`, "2160p10bit": `4K ${baseQuality}`},
      "x264": {"480p": `${baseQuality} x264`, "720p10bit": `${baseQuality} x264`, "720p": `${baseQuality} x264`, "1080p10bit": `10Bit x264`, "1080p": `${baseQuality} x264`, "1080p60fps": `60FPS x264`, "1440p": `${baseQuality} x264`, "2160p": `4K ${baseQuality} x264`, "2160p10bit": `4K 10Bit x264`},
      "x265": {"480p": `${baseQuality} x265`, "720p10bit": `10Bit x265`, "720p": `${baseQuality} x265`, "1080p10bit": `10Bit x265`, "1080p": `${baseQuality} x265`, "1080p60fps": `60FPS x265`, "1440p": `${baseQuality} x265`, "2160p": `4K ${baseQuality} x265`, "2160p10bit": `4K HDR x265`},
      "H.264": {"480p": `${baseQuality} H.264`, "720p10bit": `${baseQuality} H.264`, "720p": `${baseQuality} H.264`, "1080p10bit": `10Bit H.264`, "1080p": `${baseQuality} H.264`, "1080p60fps": `60FPS H.264`, "1440p": `${baseQuality} H.264`, "2160p": `4K ${baseQuality} H.264`, "2160p10bit": `4K 10Bit H.264`},
      "H.265": {"480p": `${baseQuality} H.265`, "720p10bit": `10Bit H.265`, "720p": `${baseQuality} H.265`, "1080p10bit": `10Bit H.265`, "1080p": `${baseQuality} H.265`, "1080p60fps": `60FPS H.265`, "1440p": `${baseQuality} H.265`, "2160p": `4K ${baseQuality} H.265`, "2160p10bit": `4K HDR H.265`},
      "HEVC": {"480p": `${baseQuality} HEVC`, "720p10bit": `10Bit HEVC`, "720p": `${baseQuality} HEVC`, "1080p10bit": `10Bit HEVC`, "1080p": `${baseQuality} HEVC`, "1080p60fps": `60FPS HEVC`, "1440p": `${baseQuality} HEVC`, "2160p": `4K ${baseQuality} HEVC`, "2160p10bit": `4K HDR HEVC`},
    };
    const details = codecMap[formData.codec] || codecMap["none"];
    setFormData(prev => ({
      ...prev,
      allDownloads: prev.allDownloads.map(dl => {
        if (dl.isCustom) return dl;
        return {...dl, qualityDetail: details[dl.id] || dl.qualityDetail};
      })
    }));
  }, [formData.quality, formData.customQuality, formData.codec]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert unified downloads back to separate fields
    const submitData = {
      ...formData,
      allDownloads: formData.allDownloads,
      download480p: formData.allDownloads.find(d => d.id === '480p')?.link || '',
      size480pCustom: formData.allDownloads.find(d => d.id === '480p')?.size || '422MB',
      qualityDetail480p: formData.allDownloads.find(d => d.id === '480p')?.qualityDetail || 'WEB-DL',
      download720p10bit: formData.allDownloads.find(d => d.id === '720p10bit')?.link || '',
      size720p10bit: formData.allDownloads.find(d => d.id === '720p10bit')?.size || '670MB',
      qualityDetail720p10bit: formData.allDownloads.find(d => d.id === '720p10bit')?.qualityDetail || 'WEB-DL x264',
      download720p: formData.allDownloads.find(d => d.id === '720p')?.link || '',
      size720pCustom: formData.allDownloads.find(d => d.id === '720p')?.size || '1GB',
      qualityDetail720p: formData.allDownloads.find(d => d.id === '720p')?.qualityDetail || 'WEB-DL x264',
      download1080p10bit: formData.allDownloads.find(d => d.id === '1080p10bit')?.link || '',
      size1080p10bit: formData.allDownloads.find(d => d.id === '1080p10bit')?.size || '2GB',
      qualityDetail1080p10bit: formData.allDownloads.find(d => d.id === '1080p10bit')?.qualityDetail || 'WEB-DL x265',
      download1080p: formData.allDownloads.find(d => d.id === '1080p')?.link || '',
      size1080pCustom: formData.allDownloads.find(d => d.id === '1080p')?.size || '2.6GB',
      qualityDetail1080p: formData.allDownloads.find(d => d.id === '1080p')?.qualityDetail || 'WEB-DL x264',
      download1080p60fps: formData.allDownloads.find(d => d.id === '1080p60fps')?.link || '',
      size1080p60fps: formData.allDownloads.find(d => d.id === '1080p60fps')?.size || '3.5GB',
      qualityDetail1080p60fps: formData.allDownloads.find(d => d.id === '1080p60fps')?.qualityDetail || 'WEB-DL x264',
      download1440p: formData.allDownloads.find(d => d.id === '1440p')?.link || '',
      size1440p: formData.allDownloads.find(d => d.id === '1440p')?.size || '4.5GB',
      qualityDetail1440p: formData.allDownloads.find(d => d.id === '1440p')?.qualityDetail || 'WEB-DL x265',
      download2160p: formData.allDownloads.find(d => d.id === '2160p')?.link || '',
      size2160p: formData.allDownloads.find(d => d.id === '2160p')?.size || '8GB',
      qualityDetail2160p: formData.allDownloads.find(d => d.id === '2160p')?.qualityDetail || '4K SDR x265',
      download2160p10bit: formData.allDownloads.find(d => d.id === '2160p10bit')?.link || '',
      size2160p10bit: formData.allDownloads.find(d => d.id === '2160p10bit')?.size || '10GB',
      qualityDetail2160p10bit: formData.allDownloads.find(d => d.id === '2160p10bit')?.qualityDetail || '4K HDR x265',
      customDownloads: formData.allDownloads.filter(d => d.isCustom).map(d => ({name: d.name, link: d.link, size: d.size, qualityDetail: d.qualityDetail, order: d.order})),
    };
    
    console.log('Submitting form data:', submitData);
    
    try {
      const url = isEditMode 
        ? `http://${window.location.hostname}:3001/api/admin/movies/${editMovieId}`
        : `http://${window.location.hostname}:3001/api/movies`;
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      
      const data = await response.json();
      console.log('Server response:', data);
      
      if (data.success) {
        alert(isEditMode ? 'Movie updated successfully!' : 'Movie added successfully!');
        if (isEditMode) {
          window.location.href = '/admin-crud?tab=movies';
        } else {
          // Redirect to admin-crud to see the new movie
          window.location.href = '/admin-crud?tab=movies';
          return;
        }
        if (false) { // This block won't execute now
          // Reset form for new movie
          setFormData({
            title: "",
            year: "",
            posterUrl: "",
            platform: "",
            isSeries: false,
            episodeInfo: "",
            quality: "WEB-DL",
            customQuality: "",
            audioType: "Dual Audio",
            customAudioType: "",
            language: "Hindi-English",
            customLanguage: "",
            releaseDate: "",
            movieOrigin: "Hollywood",
            size480p: "422MB",
            size720p: "1GB",
            size1080p: "2.6GB",
            size2160p: "",
            show4K: false,
            isEditorPick: false,
            genre: "",
            rating: "",
            duration: "",
            synopsis: "",
            cast: "",
            screenshots: "",
            codec: "none",
            download360p: "",
            size360p: "250MB",
            qualityDetail360p: "WEB-DL",
            download480p: "",
            size480pCustom: "422MB",
            qualityDetail480p: "WEB-DL",
            download720p10bit: "",
            size720p10bit: "670MB",
            qualityDetail720p10bit: "WEB-DL x264",
            download720p: "",
            size720pCustom: "1GB",
            qualityDetail720p: "WEB-DL x264",
            download1080p: "",
            size1080pCustom: "2.6GB",
            qualityDetail1080p: "WEB-DL x264",
            download1440p: "",
            size1440p: "4.5GB",
            qualityDetail1440p: "WEB-DL x265",
            download2160p: "",
            size2160p: "8GB",
            qualityDetail2160p: "4K SDR x265",
            customDownloads: [],
          });
        }
      } else {
        alert(`Failed to ${isEditMode ? 'update' : 'add'} movie: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => window.location.href = '/admin-crud?tab=movies'} 
            variant="outline" 
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CRUD Panel
          </Button>
          <h1 className="text-4xl font-bold text-white">
            Admin Panel - {isEditMode ? 'Edit Movie' : 'Add Movie'}
          </h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="lg:col-span-1 bg-gray-900 border-gray-800 admin-form-card">
            <CardHeader>
              <CardTitle className="text-white">Movie Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* TMDB Auto-Fill */}
                {!isEditMode && (
                  <TMDBSearch
                    onSelect={(data) => setFormData({ ...formData, ...data })}
                  />
                )}

                {/* SECTION 1: Card Information */}
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-lg font-bold text-pink mb-4">Card Information</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-gray-800 text-white border-gray-700"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Year</Label>
                        <Input
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Release Date</Label>
                        <Input
                          value={formData.releaseDate}
                          onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                          placeholder="NOVEMBER 18, 2025"
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Poster URL</Label>
                      <Input
                        value={formData.posterUrl}
                        onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Platform (optional)</Label>
                        <Select value={formData.platform} onValueChange={(val) => setFormData({ ...formData, platform: val })}>
                          <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="Netflix">Netflix</SelectItem>
                            <SelectItem value="JioHotstar">JioHotstar</SelectItem>
                            <SelectItem value="Amazon Prime">Amazon Prime</SelectItem>
                            <SelectItem value="Disney+">Disney+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Is Series?</Label>
                        <Select value={formData.isSeries ? "yes" : "no"} onValueChange={(val) => setFormData({ ...formData, isSeries: val === "yes" })}>
                          <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">No (Movie)</SelectItem>
                            <SelectItem value="yes">Yes (Series)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.isSeries && (
                      <div>
                        <Label className="text-white">Episode Info (for series)</Label>
                        <Input
                          value={formData.episodeInfo}
                          onChange={(e) => setFormData({ ...formData, episodeInfo: e.target.value })}
                          placeholder="[S01E05 – Added] or (Season 1) Complete"
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                    )}

                    <div>
                      <Label className="text-white">Quality</Label>
                      {formData.quality === "custom" ? (
                        <Input
                          value={formData.customQuality}
                          onChange={(e) => setFormData({ ...formData, customQuality: e.target.value })}
                          placeholder="Type custom quality"
                          className="bg-gray-800 text-white border-gray-700"
                          onBlur={() => !formData.customQuality && setFormData({ ...formData, quality: "WEB-DL" })}
                        />
                      ) : (
                        <Select value={formData.quality} onValueChange={(val) => setFormData({ ...formData, quality: val })}>
                          <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="WEB-DL">WEB-DL</SelectItem>
                            <SelectItem value="BluRay">BluRay</SelectItem>
                            <SelectItem value="HDRip">HDRip</SelectItem>
                            <SelectItem value="HDCAM">HDCAM</SelectItem>
                            <SelectItem value="4k">4k</SelectItem>
                            <SelectItem value="custom">Custom (Type)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Audio Type</Label>
                        {formData.audioType === "custom" ? (
                          <Input
                            value={formData.customAudioType}
                            onChange={(e) => setFormData({ ...formData, customAudioType: e.target.value })}
                            placeholder="Type custom audio type"
                            className="bg-gray-800 text-white border-gray-700"
                            onBlur={() => !formData.customAudioType && setFormData({ ...formData, audioType: "Dual Audio" })}
                          />
                        ) : (
                          <Select value={formData.audioType} onValueChange={(val) => setFormData({ ...formData, audioType: val })}>
                            <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dual Audio">Dual Audio</SelectItem>
                              <SelectItem value="Hindi">Hindi</SelectItem>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Multi Audio">Multi Audio</SelectItem>
                              <SelectItem value="custom">Custom (Type)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <div>
                        <Label className="text-white">Language</Label>
                        {formData.language === "custom" ? (
                          <Input
                            value={formData.customLanguage}
                            onChange={(e) => setFormData({ ...formData, customLanguage: e.target.value })}
                            placeholder="Type custom language"
                            className="bg-gray-800 text-white border-gray-700"
                            onBlur={() => !formData.customLanguage && setFormData({ ...formData, language: "Hindi-English" })}
                          />
                        ) : (
                          <Select value={formData.language} onValueChange={(val) => setFormData({ ...formData, language: val })}>
                            <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hindi-English">Hindi-English</SelectItem>
                              <SelectItem value="Hindi">Hindi</SelectItem>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Hindi ORG">Hindi ORG</SelectItem>
                              <SelectItem value="Japanese-English">Japanese-English</SelectItem>
                              <SelectItem value="custom">Custom (Type)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Subtitle</Label>
                      {formData.subtitle === "custom" ? (
                        <Input
                          value={formData.customSubtitle}
                          onChange={(e) => setFormData({ ...formData, customSubtitle: e.target.value })}
                          placeholder="Type custom subtitle"
                          className="bg-gray-800 text-white border-gray-700"
                          onBlur={() => !formData.customSubtitle && setFormData({ ...formData, subtitle: "none" })}
                        />
                      ) : (
                        <Select value={formData.subtitle} onValueChange={(val) => setFormData({ ...formData, subtitle: val })}>
                          <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="custom">Custom (Type)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    <div>
                      <Label className="text-white">Movie Origin</Label>
                      <Select value={formData.movieOrigin} onValueChange={(val) => setFormData({ ...formData, movieOrigin: val })}>
                        <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hollywood">Hollywood</SelectItem>
                          <SelectItem value="Bollywood">Bollywood</SelectItem>
                          <SelectItem value="South Indian">South Indian</SelectItem>
                          <SelectItem value="Korean">Korean</SelectItem>
                          <SelectItem value="Anime">Anime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.show4K}
                          onChange={(e) => setFormData({ ...formData, show4K: e.target.checked })}
                          className="w-4 h-4"
                        />
                        Add 4K/2160p Quality to card
                      </label>
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isEditorPick}
                          onChange={(e) => setFormData({ ...formData, isEditorPick: e.target.checked })}
                          className="w-4 h-4"
                        />
                        ⭐ Editor's Pick (Boosts ranking)
                      </label>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Detail Page Information */}
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-lg font-bold text-pink mb-4">Detail Page Information</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Genre</Label>
                        <Input
                          value={formData.genre}
                          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                          placeholder="Action, Thriller"
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Rating</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Duration</Label>
                      <Input
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="2h 15m"
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Synopsis</Label>
                      <Textarea
                        value={formData.synopsis}
                        onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                        className="bg-gray-800 text-white border-gray-700"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label className="text-white">Cast (comma separated)</Label>
                      <Input
                        value={formData.cast}
                        onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                        placeholder="Tom Hardy, Charlize Theron"
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Screenshots (comma separated URLs)</Label>
                      <Textarea
                        value={formData.screenshots}
                        onChange={(e) => setFormData({ ...formData, screenshots: e.target.value })}
                        placeholder="https://image1.jpg, https://image2.jpg"
                        className="bg-gray-800 text-white border-gray-700"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Download Links */}
                <div>
                  <h3 className="text-lg font-bold text-pink mb-4">Download Links & Sizes</h3>

                  <div className="mb-4">
                    <Label className="text-white">Codec (Auto-fills quality details)</Label>
                    <Select value={formData.codec} onValueChange={(val) => {
                      const baseQuality = formData.quality === "custom" ? formData.customQuality : formData.quality;
                      const codecMap: Record<string, Record<string, string>> = {
                        "none": {"360p": baseQuality, "480p": baseQuality, "720p10bit": baseQuality, "720p": baseQuality, "1080p": baseQuality, "1440p": baseQuality, "2160p": `4K ${baseQuality}`},
                        "x264": {"360p": `${baseQuality} x264`, "480p": `${baseQuality} x264`, "720p10bit": `${baseQuality} x264`, "720p": `${baseQuality} x264`, "1080p": `${baseQuality} x264`, "1440p": `${baseQuality} x264`, "2160p": `4K ${baseQuality} x264`},
                        "x265": {"360p": `${baseQuality} x265`, "480p": `${baseQuality} x265`, "720p10bit": `10Bit x265`, "720p": `${baseQuality} x265`, "1080p": `${baseQuality} x265`, "1440p": `${baseQuality} x265`, "2160p": `4K ${baseQuality} x265`},
                        "H.264": {"360p": `${baseQuality} H.264`, "480p": `${baseQuality} H.264`, "720p10bit": `${baseQuality} H.264`, "720p": `${baseQuality} H.264`, "1080p": `${baseQuality} H.264`, "1440p": `${baseQuality} H.264`, "2160p": `4K ${baseQuality} H.264`},
                        "H.265": {"360p": `${baseQuality} H.265`, "480p": `${baseQuality} H.265`, "720p10bit": `10Bit H.265`, "720p": `${baseQuality} H.265`, "1080p": `${baseQuality} H.265`, "1440p": `${baseQuality} H.265`, "2160p": `4K ${baseQuality} H.265`},
                        "HEVC": {"360p": `${baseQuality} HEVC`, "480p": `${baseQuality} HEVC`, "720p10bit": `10Bit HEVC`, "720p": `${baseQuality} HEVC`, "1080p": `${baseQuality} HEVC`, "1440p": `${baseQuality} HEVC`, "2160p": `4K ${baseQuality} HEVC`},
                      };
                      const details = codecMap[val] || codecMap["none"];
                      setFormData({
                        ...formData,
                        codec: val,
                        qualityDetail360p: details["360p"],
                        qualityDetail480p: details["480p"],
                        qualityDetail720p10bit: details["720p10bit"],
                        qualityDetail720p: details["720p"],
                        qualityDetail1080p: details["1080p"],
                        qualityDetail1440p: details["1440p"],
                        qualityDetail2160p: details["2160p"],
                      });
                    }}>
                      <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="x264">x264</SelectItem>
                        <SelectItem value="x265">x265</SelectItem>
                        <SelectItem value="H.264">H.264</SelectItem>
                        <SelectItem value="H.265">H.265</SelectItem>
                        <SelectItem value="HEVC">HEVC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white text-xs mb-2 block">All Downloads - Drag to Reorder</Label>
                    {formData.allDownloads.map((dl, idx) => (
                      <div 
                        key={dl.id} 
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = 'move';
                          e.dataTransfer.setData('text/html', idx.toString());
                          (e.target as HTMLElement).style.opacity = '0.4';
                        }}
                        onDragEnd={(e) => {
                          (e.target as HTMLElement).style.opacity = '1';
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'move';
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const dragIdx = parseInt(e.dataTransfer.getData('text/html'));
                          if (dragIdx !== idx) {
                            const updated = [...formData.allDownloads];
                            const [draggedItem] = updated.splice(dragIdx, 1);
                            updated.splice(idx, 0, draggedItem);
                            updated.forEach((item, i) => item.order = i);
                            setFormData({ ...formData, allDownloads: updated });
                          }
                        }}
                        className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-2 mb-2 cursor-move hover:bg-gray-800/50 p-1 rounded"
                      >
                        <div className="flex items-center text-gray-500 text-lg cursor-grab active:cursor-grabbing">⋮⋮</div>
                        <Input 
                          value={dl.name} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].name = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder="Quality" 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                          disabled={!dl.isCustom}
                        />
                        <Input 
                          value={dl.link} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].link = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder="Link" 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                        />
                        <Input 
                          value={dl.qualityDetail} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].qualityDetail = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder="Quality Detail" 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                        />
                        <Input 
                          value={dl.size} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].size = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder="Size" 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                        />
                        {dl.isCustom ? (
                          <button 
                            type="button" 
                            onClick={() => setFormData({ ...formData, allDownloads: formData.allDownloads.filter((_, i) => i !== idx) })} 
                            className="text-red-500 text-xs hover:text-red-400"
                          >✕</button>
                        ) : (
                          <div className="w-4"></div>
                        )}
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => setFormData({ 
                        ...formData, 
                        allDownloads: [...formData.allDownloads, {id: `custom-${Date.now()}`, name: "", link: "", qualityDetail: "", size: "", order: formData.allDownloads.length, isCustom: true}] 
                      })} 
                      className="text-pink text-xs mt-1 hover:text-pink-400"
                    >+ Add Custom Quality</button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600">
                    {isEditMode ? 'Update Movie' : 'Add Movie'}
                  </Button>
                  {isEditMode && (
                    <Button type="button" onClick={() => window.location.href = '/admin-crud'} variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Previews */}
          <div className="lg:col-span-1 overflow-y-auto" style={{ maxHeight: formHeight ? `${formHeight}px` : 'calc(100vh - 200px)' }}>
            <div className="space-y-8 pr-2">
            {/* Card Preview */}
            <div>
              <h3 className="text-white font-bold mb-4 text-center">Card Preview</h3>
              <div className="max-w-[200px] mx-auto">
                <div className="cursor-pointer relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] shadow-lg">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-t-2xl">
                    {formData.posterUrl ? (
                      <img src={formData.posterUrl} alt={formData.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <span className="text-center text-sm font-bold text-gray-500 p-4">Poster</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-center text-white/60 text-[10px] font-medium mb-2">
                      {(formData.releaseDate || "NOVEMBER 18, 2025").toUpperCase()}
                    </div>
                    <div className="text-white text-xs font-bold leading-[1.4] text-left">
                      Download {formData.title || "Movie Title"} {formData.episodeInfo && `${formData.episodeInfo} `}({formData.year || "2025"}) {formData.platform && formData.platform !== "none" && `${formData.platform}-`}{formData.quality === "custom" ? formData.customQuality : formData.quality} {(() => { const audio = formData.audioType === "custom" ? formData.customAudioType : formData.audioType; const lang = formData.language === "custom" ? formData.customLanguage : formData.language; return audio === lang ? `{${lang}}` : `${audio} {${lang}}`; })()} {formData.allDownloads.filter(d => d.link).slice(0, 3).map(d => `${d.name} [${d.size}]`).join(' | ')}{formData.show4K ? " | 2160p 4K" : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Page Preview */}
            <div className="flex-1">
              <h3 className="text-white font-bold mb-4">Detail Page Preview</h3>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="space-y-4 text-xs">
                  <div className="text-white font-bold">
                    MoviesWala.is | 1080p | Download {formData.title || "Movie Title"} ({formData.year || "2025"}) {formData.quality === "custom" ? formData.customQuality : formData.quality} {(() => { const audio = formData.audioType === "custom" ? formData.customAudioType : formData.audioType; const lang = formData.language === "custom" ? formData.customLanguage : formData.language; return audio === lang ? `{${lang}}` : `${audio} {${lang}}`; })()} {formData.allDownloads.filter(d => d.link).slice(0, 3).map(d => `${d.name} [${d.size}]`).join(' | ')}{formData.show4K ? " | 2160p 4K" : ""}
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <h3 className="text-pink font-bold mb-2">Movie Specifications</h3>
                    <p className="text-gray-300 text-[10px] leading-relaxed">
                      Download {formData.title || "Movie Title"} ({formData.year || "2025"}) {formData.quality === "custom" ? formData.customQuality : formData.quality} Full Movie ({formData.language === "custom" ? formData.customLanguage : formData.language}) {(() => { const qualities = formData.allDownloads.filter(d => d.link).map(d => d.name); return qualities.length > 1 ? qualities.slice(0, -1).join(', ') + ' & ' + qualities.slice(-1) : qualities.join('') || '480p, 720p & 1080p'; })()} Qualities. This is a {formData.movieOrigin} movie and Available {(() => { const sizes = formData.allDownloads.filter(d => d.link).map(d => `${d.name} in [${d.size}]`); return sizes.length > 1 ? sizes.slice(0, -1).join(', ') + ' & ' + sizes.slice(-1) : sizes.join('') || 'in 480p in [422MB], 720p in [1GB] & 1080p in [2.6GB]'; })()} in MKV Format. This Movie Is Now Available In {formData.language === "custom" ? formData.customLanguage : formData.language}. This is {formData.quality === "custom" ? formData.customQuality : formData.quality} Print with {formData.language === "custom" ? formData.customLanguage : formData.language} Audio{formData.subtitle !== "none" ? ` and ${formData.subtitle === "custom" ? formData.customSubtitle : formData.subtitle} Subtitles` : ""}.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <h3 className="text-pink font-bold mb-2">Movie Info</h3>
                    <div className="space-y-1 text-[10px]">
                      <div className="flex"><span className="w-[35%] text-gray-400">IMDb Rating:</span><span className="text-white">{formData.rating || "0.0"}/10</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Movie Name:</span><span className="text-white">{formData.title || "Movie Title"}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Release Year:</span><span className="text-white">{formData.year || "2025"}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Runtime:</span><span className="text-white">{formData.duration || "N/A"}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Genre:</span><span className="text-white">{formData.genre || "N/A"}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Language:</span><span className="text-white">{formData.language === "custom" ? formData.customLanguage : formData.language} [{formData.audioType === "custom" ? formData.customAudioType : formData.audioType}]</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Subtitle:</span><span className="text-white">{formData.subtitle === "custom" ? formData.customSubtitle : formData.subtitle === "none" ? "N/A" : formData.subtitle}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Size:</span><span className="text-white">{(() => { const sizes = formData.allDownloads.filter(d => d.link).map(d => d.size); return sizes.join(' || ') || '422MB || 1GB || 2.6GB'; })()}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Quality:</span><span className="text-white">{formData.allDownloads.filter(d => d.link).map(d => d.name).join(' || ') || '480p || 720p || 1080p'} - {formData.quality === "custom" ? formData.customQuality : formData.quality}</span></div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <h3 className="text-pink font-bold mb-2">Movie Synopsis</h3>
                    <p className="text-gray-400 text-[10px] leading-relaxed">
                      {formData.synopsis || "Movie synopsis will appear here..."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-pink font-bold mb-2 text-center">Screenshots: (Must See Before Downloading)...</h3>
                    <div className="space-y-2">
                      {formData.screenshots ? (
                        formData.screenshots.split(',').map((url: string, idx: number) => (
                          <div key={idx} className="w-full aspect-video bg-gray-800 rounded overflow-hidden">
                            <img src={url.trim()} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))
                      ) : (
                        <div className="w-full aspect-video bg-gray-800 rounded overflow-hidden flex items-center justify-center">
                          <span className="text-gray-600 text-[10px]">Screenshot Preview</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <h3 className="text-white font-bold mb-3 text-center text-[11px]">{(() => {
                      const lang = formData.language === "custom" ? formData.customLanguage : formData.language;
                      const langs = lang.split(/[-,+]/).map(l => l.trim());
                      const hasHindi = lang.includes("Hindi");
                      const hasEnglish = lang.includes("English");
                      if (hasHindi && langs.length === 1) return "DOWNLOAD हिंदी ORG Audio (हिन्दी में)";
                      if (hasHindi && langs.length === 2) return `DOWNLOAD हिंदी Dubbed ORG – ${langs.find(l => !l.includes("Hindi"))} (हिन्दी में)`;
                      if (hasEnglish && langs.length === 1) return "DOWNLOAD English ORG Audio (English)";
                      if (hasEnglish && langs.length === 2) return `DOWNLOAD ORG Dual Audio – English (${lang} में)`;
                      if (langs.length > 2) return `DOWNLOAD ORG Multi Audio (${lang} में)`;
                      if (langs.length === 1) return `DOWNLOAD ORG Original Audio (${lang} में)`;
                      return `DOWNLOAD ORG Dual Audio (${lang} में)`;
                    })()}</h3>
                    <div className="space-y-4">
                      {formData.allDownloads.filter(dl => dl.link).map((dl, idx) => (
                        <div key={idx}>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} {dl.name} {dl.qualityDetail} [{dl.size}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
