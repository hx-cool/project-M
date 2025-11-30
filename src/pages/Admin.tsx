import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
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
    // Download Links
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
    customDownloads: [] as Array<{name: string, link: string, size: string, qualityDetail: string}>,
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
        download360p: movie.downloads?.find((d: any) => d.resolution === '360p')?.link || "",
        size360p: movie.downloads?.find((d: any) => d.resolution === '360p')?.size || "250MB",
        qualityDetail360p: movie.downloads?.find((d: any) => d.resolution === '360p')?.qualityDetail || "WEB-DL",
        download480p: movie.downloads?.find((d: any) => d.resolution === '480p')?.link || "",
        size480pCustom: movie.downloads?.find((d: any) => d.resolution === '480p')?.size || "422MB",
        qualityDetail480p: movie.downloads?.find((d: any) => d.resolution === '480p')?.qualityDetail || "WEB-DL",
        download720p10bit: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.link || "",
        size720p10bit: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.size || "670MB",
        qualityDetail720p10bit: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.qualityDetail || "WEB-DL x264",
        download720p: movie.downloads?.find((d: any) => d.resolution === '720p')?.link || "",
        size720pCustom: movie.downloads?.find((d: any) => d.resolution === '720p')?.size || "1GB",
        qualityDetail720p: movie.downloads?.find((d: any) => d.resolution === '720p')?.qualityDetail || "WEB-DL x264",
        download1080p: movie.downloads?.find((d: any) => d.resolution === '1080p')?.link || "",
        size1080pCustom: movie.downloads?.find((d: any) => d.resolution === '1080p')?.size || "2.6GB",
        qualityDetail1080p: movie.downloads?.find((d: any) => d.resolution === '1080p')?.qualityDetail || "WEB-DL x264",
        download1440p: movie.downloads?.find((d: any) => d.resolution === '1440p')?.link || "",
        size1440p: movie.downloads?.find((d: any) => d.resolution === '1440p')?.size || "4.5GB",
        qualityDetail1440p: movie.downloads?.find((d: any) => d.resolution === '1440p')?.qualityDetail || "WEB-DL x265",
        download2160p: movie.downloads?.find((d: any) => d.resolution === '2160p')?.link || "",
        size2160p: movie.downloads?.find((d: any) => d.resolution === '2160p')?.size || "8GB",
        qualityDetail2160p: movie.downloads?.find((d: any) => d.resolution === '2160p')?.qualityDetail || "4K SDR x265",
        customDownloads: movie.downloads?.filter((d: any) => !['360p', '480p', '720p 10Bit', '720p', '1080p', '1440p', '2160p'].includes(d.resolution)).map((d: any) => ({ name: d.resolution, link: d.link, qualityDetail: d.qualityDetail || "", size: d.size })) || [],
      });
    } catch (error) {
      console.error('Failed to load movie for editing:', error);
    }
  };

  useEffect(() => {
    const baseQuality = formData.quality === "custom" ? formData.customQuality : formData.quality;
    const codecMap: Record<string, Record<string, string>> = {
      "none": {"360p": baseQuality, "480p": baseQuality, "720p10bit": baseQuality, "720p": baseQuality, "1080p": baseQuality, "1440p": baseQuality, "2160p": `4K ${baseQuality}`},
      "x264": {"360p": `${baseQuality} x264`, "480p": `${baseQuality} x264`, "720p10bit": `${baseQuality} x264`, "720p": `${baseQuality} x264`, "1080p": `${baseQuality} x264`, "1440p": `${baseQuality} x264`, "2160p": `4K ${baseQuality} x264`},
      "x265": {"360p": `${baseQuality} x265`, "480p": `${baseQuality} x265`, "720p10bit": `10Bit x265`, "720p": `${baseQuality} x265`, "1080p": `${baseQuality} x265`, "1440p": `${baseQuality} x265`, "2160p": `4K ${baseQuality} x265`},
      "H.264": {"360p": `${baseQuality} H.264`, "480p": `${baseQuality} H.264`, "720p10bit": `${baseQuality} H.264`, "720p": `${baseQuality} H.264`, "1080p": `${baseQuality} H.264`, "1440p": `${baseQuality} H.264`, "2160p": `4K ${baseQuality} H.264`},
      "H.265": {"360p": `${baseQuality} H.265`, "480p": `${baseQuality} H.265`, "720p10bit": `10Bit H.265`, "720p": `${baseQuality} H.265`, "1080p": `${baseQuality} H.265`, "1440p": `${baseQuality} H.265`, "2160p": `4K ${baseQuality} H.265`},
      "HEVC": {"360p": `${baseQuality} HEVC`, "480p": `${baseQuality} HEVC`, "720p10bit": `10Bit HEVC`, "720p": `${baseQuality} HEVC`, "1080p": `${baseQuality} HEVC`, "1440p": `${baseQuality} HEVC`, "2160p": `4K ${baseQuality} HEVC`},
    };
    const details = codecMap[formData.codec] || codecMap["none"];
    setFormData(prev => ({
      ...prev,
      qualityDetail360p: details["360p"],
      qualityDetail480p: details["480p"],
      qualityDetail720p10bit: details["720p10bit"],
      qualityDetail720p: details["720p"],
      qualityDetail1080p: details["1080p"],
      qualityDetail1440p: details["1440p"],
      qualityDetail2160p: details["2160p"],
    }));
  }, [formData.quality, formData.customQuality, formData.codec]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting form data:', formData);
    
    try {
      const url = isEditMode 
        ? `http://${window.location.hostname}:3001/api/admin/movies/${editMovieId}`
        : `http://${window.location.hostname}:3001/api/movies`;
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
        <h1 className="text-4xl font-bold text-white mb-8">
          Admin Panel - {isEditMode ? 'Edit Movie' : 'Add Movie'}
        </h1>
        
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
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-white text-xs">360p Link</Label>
                        <Input
                          value={formData.download360p}
                          onChange={(e) => setFormData({ ...formData, download360p: e.target.value })}
                          placeholder="Download link"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Quality Detail</Label>
                        <Input
                          value={formData.qualityDetail360p}
                          onChange={(e) => setFormData({ ...formData, qualityDetail360p: e.target.value })}
                          placeholder="WEB-DL"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Size</Label>
                        <Input
                          value={formData.size360p}
                          onChange={(e) => setFormData({ ...formData, size360p: e.target.value })}
                          placeholder="250MB"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-white text-xs">480p Link</Label>
                        <Input
                          value={formData.download480p}
                          onChange={(e) => setFormData({ ...formData, download480p: e.target.value })}
                          placeholder="Download link"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Quality Detail</Label>
                        <Input
                          value={formData.qualityDetail480p}
                          onChange={(e) => setFormData({ ...formData, qualityDetail480p: e.target.value })}
                          placeholder="WEB-DL"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Size</Label>
                        <Input
                          value={formData.size480pCustom}
                          onChange={(e) => setFormData({ ...formData, size480pCustom: e.target.value })}
                          placeholder="422MB"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-white text-xs">720p 10Bit Link</Label>
                        <Input
                          value={formData.download720p10bit}
                          onChange={(e) => setFormData({ ...formData, download720p10bit: e.target.value })}
                          placeholder="Download link"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Quality Detail</Label>
                        <Input
                          value={formData.qualityDetail720p10bit}
                          onChange={(e) => setFormData({ ...formData, qualityDetail720p10bit: e.target.value })}
                          placeholder="WEB-DL x264"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Size</Label>
                        <Input
                          value={formData.size720p10bit}
                          onChange={(e) => setFormData({ ...formData, size720p10bit: e.target.value })}
                          placeholder="670MB"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-white text-xs">720p Link</Label>
                        <Input
                          value={formData.download720p}
                          onChange={(e) => setFormData({ ...formData, download720p: e.target.value })}
                          placeholder="Download link"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Quality Detail</Label>
                        <Input
                          value={formData.qualityDetail720p}
                          onChange={(e) => setFormData({ ...formData, qualityDetail720p: e.target.value })}
                          placeholder="WEB-DL x264"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Size</Label>
                        <Input
                          value={formData.size720pCustom}
                          onChange={(e) => setFormData({ ...formData, size720pCustom: e.target.value })}
                          placeholder="1GB"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-white text-xs">1080p Link</Label>
                        <Input
                          value={formData.download1080p}
                          onChange={(e) => setFormData({ ...formData, download1080p: e.target.value })}
                          placeholder="Download link"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Quality Detail</Label>
                        <Input
                          value={formData.qualityDetail1080p}
                          onChange={(e) => setFormData({ ...formData, qualityDetail1080p: e.target.value })}
                          placeholder="WEB-DL x264"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Size</Label>
                        <Input
                          value={formData.size1080pCustom}
                          onChange={(e) => setFormData({ ...formData, size1080pCustom: e.target.value })}
                          placeholder="2.6GB"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-white text-xs">1440p (2K) Link</Label>
                        <Input
                          value={formData.download1440p}
                          onChange={(e) => setFormData({ ...formData, download1440p: e.target.value })}
                          placeholder="Download link"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Quality Detail</Label>
                        <Input
                          value={formData.qualityDetail1440p}
                          onChange={(e) => setFormData({ ...formData, qualityDetail1440p: e.target.value })}
                          placeholder="WEB-DL x265"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Size</Label>
                        <Input
                          value={formData.size1440p}
                          onChange={(e) => setFormData({ ...formData, size1440p: e.target.value })}
                          placeholder="4.5GB"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-white text-xs">2160p (4K) Link</Label>
                        <Input
                          value={formData.download2160p}
                          onChange={(e) => setFormData({ ...formData, download2160p: e.target.value })}
                          placeholder="Download link"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Quality Detail</Label>
                        <Input
                          value={formData.qualityDetail2160p}
                          onChange={(e) => setFormData({ ...formData, qualityDetail2160p: e.target.value })}
                          placeholder="4K SDR x265"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-xs">Size</Label>
                        <Input
                          value={formData.size2160p}
                          onChange={(e) => setFormData({ ...formData, size2160p: e.target.value })}
                          placeholder="8GB"
                          className="bg-gray-800 text-white border-gray-700 text-xs"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-3 mt-3">
                      <Label className="text-white text-xs mb-2 block">Custom Quality (Add Multiple)</Label>
                      {formData.customDownloads.map((custom, idx) => (
                        <div key={idx} className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 mb-2">
                          <Input value={custom.name} onChange={(e) => { const updated = [...formData.customDownloads]; updated[idx].name = e.target.value; setFormData({ ...formData, customDownloads: updated }); }} placeholder="720p HEVC" className="bg-gray-800 text-white border-gray-700 text-xs" />
                          <Input value={custom.link} onChange={(e) => { const updated = [...formData.customDownloads]; updated[idx].link = e.target.value; setFormData({ ...formData, customDownloads: updated }); }} placeholder="Link" className="bg-gray-800 text-white border-gray-700 text-xs" />
                          <Input value={custom.qualityDetail} onChange={(e) => { const updated = [...formData.customDownloads]; updated[idx].qualityDetail = e.target.value; setFormData({ ...formData, customDownloads: updated }); }} placeholder="WEB-DL x264" className="bg-gray-800 text-white border-gray-700 text-xs" />
                          <Input value={custom.size} onChange={(e) => { const updated = [...formData.customDownloads]; updated[idx].size = e.target.value; setFormData({ ...formData, customDownloads: updated }); }} placeholder="Size" className="bg-gray-800 text-white border-gray-700 text-xs" />
                          <button type="button" onClick={() => setFormData({ ...formData, customDownloads: formData.customDownloads.filter((_, i) => i !== idx) })} className="text-red-500 text-xs">✕</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => setFormData({ ...formData, customDownloads: [...formData.customDownloads, {name: "", link: "", qualityDetail: "", size: ""}] })} className="text-pink text-xs mt-1">+ Add Custom Quality</button>
                    </div>
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
          <div className="lg:col-span-1 space-y-8">
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
                      Download {formData.title || "Movie Title"} {formData.episodeInfo && `${formData.episodeInfo} `}({formData.year || "2025"}) {formData.platform && formData.platform !== "none" && `${formData.platform}-`}{formData.quality === "custom" ? formData.customQuality : formData.quality} {(() => { const audio = formData.audioType === "custom" ? formData.customAudioType : formData.audioType; const lang = formData.language === "custom" ? formData.customLanguage : formData.language; return audio === lang ? `{${lang}}` : `${audio} {${lang}}`; })()} 480p [{formData.size480pCustom}] | 720p [{formData.size720pCustom}] | 1080p [{formData.size1080pCustom}]{formData.show4K ? " | 2160p 4K" : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Page Preview */}
            <div className="flex-1">
              <h3 className="text-white font-bold mb-4">Detail Page Preview</h3>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-y-auto" style={{ maxHeight: formHeight ? `${formHeight}px` : 'auto' }}>
                <div className="space-y-4 text-xs">
                  <div className="text-white font-bold">
                    MoviesWala.is | 1080p | Download {formData.title || "Movie Title"} ({formData.year || "2025"}) {formData.quality === "custom" ? formData.customQuality : formData.quality} {(() => { const audio = formData.audioType === "custom" ? formData.customAudioType : formData.audioType; const lang = formData.language === "custom" ? formData.customLanguage : formData.language; return audio === lang ? `{${lang}}` : `${audio} {${lang}}`; })()} 480p [{formData.size480pCustom}] | 720p [{formData.size720pCustom}] | 1080p [{formData.size1080pCustom}]{formData.show4K ? " | 2160p 4K" : ""}
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <h3 className="text-pink font-bold mb-2">Movie Specifications</h3>
                    <p className="text-gray-300 text-[10px] leading-relaxed">
                      Download {formData.title || "Movie Title"} ({formData.year || "2025"}) {formData.quality === "custom" ? formData.customQuality : formData.quality} Full Movie ({formData.language === "custom" ? formData.customLanguage : formData.language}) {(() => { const qualities = [formData.download360p && '360p', formData.download480p && '480p', formData.download720p10bit && '720p 10Bit', formData.download720p && '720p', formData.download1080p && '1080p', formData.download1440p && '1440p', formData.download2160p && '2160p', ...formData.customDownloads.filter(c => c.link).map(c => c.name)].filter(Boolean); return qualities.length > 1 ? qualities.slice(0, -1).join(', ') + ' & ' + qualities.slice(-1) : qualities.join('') || '480p, 720p & 1080p'; })()} Qualities. This is a {formData.movieOrigin} movie and Available {(() => { const sizes = [formData.download360p && `in 360p in [${formData.size360p}]`, formData.download480p && `480p in [${formData.size480pCustom}]`, formData.download720p10bit && `720p 10Bit in [${formData.size720p10bit}]`, formData.download720p && `720p in [${formData.size720pCustom}]`, formData.download1080p && `1080p in [${formData.size1080pCustom}]`, formData.download1440p && `1440p in [${formData.size1440p}]`, formData.download2160p && `2160p in [${formData.size2160p}]`, ...formData.customDownloads.filter(c => c.link).map(c => `${c.name} in [${c.size}]`)].filter(Boolean); return sizes.length > 1 ? sizes.slice(0, -1).join(', ') + ' & ' + sizes.slice(-1) : sizes.join('') || 'in 480p in [422MB], 720p in [1GB] & 1080p in [2.6GB]'; })()} in MKV Format. This Movie Is Now Available In {formData.language === "custom" ? formData.customLanguage : formData.language}. This is {formData.quality === "custom" ? formData.customQuality : formData.quality} Print with {formData.language === "custom" ? formData.customLanguage : formData.language} Audio{formData.subtitle !== "none" ? ` and ${formData.subtitle === "custom" ? formData.customSubtitle : formData.subtitle} Subtitles` : ""}.
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
                      <div className="flex"><span className="w-[35%] text-gray-400">Size:</span><span className="text-white">{(() => { const sizes = [formData.download480p && formData.size480pCustom, formData.download720p && formData.size720pCustom, formData.download1080p && formData.size1080pCustom].filter(Boolean); return sizes.join(' || ') || '422MB || 1GB || 2.6GB'; })()}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Quality:</span><span className="text-white">{[formData.download360p && '360p', formData.download480p && '480p', formData.download720p10bit && '720p 10Bit', formData.download720p && '720p', formData.download1080p && '1080p', formData.download1440p && '1440p', formData.download2160p && '2160p', ...formData.customDownloads.filter(c => c.link).map(c => c.name)].filter(Boolean).join(' || ') || '480p || 720p || 1080p'} - {formData.quality === "custom" ? formData.customQuality : formData.quality}</span></div>
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
                      {formData.download360p && (
                        <div>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} 360p {formData.qualityDetail360p} [{formData.size360p}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      )}
                      {formData.download480p && (
                        <div>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} 480p {formData.qualityDetail480p} [{formData.size480pCustom}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      )}
                      {formData.download720p10bit && (
                        <div>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} 720p 10Bit {formData.qualityDetail720p10bit} [{formData.size720p10bit}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      )}
                      {formData.download720p && (
                        <div>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} 720p {formData.qualityDetail720p} [{formData.size720pCustom}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      )}
                      {formData.download1080p && (
                        <div>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} 1080p {formData.qualityDetail1080p} [{formData.size1080pCustom}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      )}
                      {formData.download1440p && (
                        <div>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} 1440p {formData.qualityDetail1440p} [{formData.size1440p}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      )}
                      {formData.download2160p && (
                        <div>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} 2160p {formData.qualityDetail2160p} [{formData.size2160p}]</p>
                          <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-2 text-[10px] rounded-lg opacity-80">Download Now</button>
                        </div>
                      )}
                      {formData.customDownloads.map((custom, idx) => custom.link && (
                        <div key={idx}>
                          <p className="text-white text-[10px] mb-2 text-center font-medium">{formData.title} ({formData.year}) {`{${formData.language === "custom" ? formData.customLanguage : formData.language}}`} {custom.name} [{custom.size}]</p>
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
  );
};

export default Admin;
