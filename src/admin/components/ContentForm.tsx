import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TMDBSearch } from "./TMDBSearch";
import { API_URL } from "@/config/api";

interface ContentFormProps {
  editMovieId?: number;
  onSuccess?: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ editMovieId: propEditMovieId, onSuccess }) => {
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
    seriesBaseName: "",
    seasonNumber: "1",
    seriesId: "",
    episodesThisSeason: "",
    totalSeasons: "",
    seriesStatus: "Ongoing",
    seriesType: "Web Series",
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
    trending: false,
    featured: false,
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
      {id: '480p', name: '480p', link: '', size: '422MB', qualityDetail: 'WEB-DL', batchLink: '', batchSize: '', order: 0, isCustom: false},
      {id: '720p10bit', name: '720p 10Bit', link: '', size: '670MB', qualityDetail: 'WEB-DL x264', batchLink: '', batchSize: '', order: 1, isCustom: false},
      {id: '720p', name: '720p', link: '', size: '1GB', qualityDetail: 'WEB-DL x264', batchLink: '', batchSize: '', order: 2, isCustom: false},
      {id: '1080p10bit', name: '1080p 10Bit', link: '', size: '2GB', qualityDetail: 'WEB-DL x265', batchLink: '', batchSize: '', order: 3, isCustom: false},
      {id: '1080p', name: '1080p', link: '', size: '2.6GB', qualityDetail: 'WEB-DL x264', batchLink: '', batchSize: '', order: 4, isCustom: false},
      {id: '1080p60fps', name: '1080p 60FPS', link: '', size: '3.5GB', qualityDetail: 'WEB-DL x264', batchLink: '', batchSize: '', order: 5, isCustom: false},
      {id: '1440p', name: '1440p', link: '', size: '4.5GB', qualityDetail: 'WEB-DL x265', batchLink: '', batchSize: '', order: 6, isCustom: false},
      {id: '2160p', name: '2160p', link: '', size: '8GB', qualityDetail: '4K SDR x265', batchLink: '', batchSize: '', order: 7, isCustom: false},
      {id: '2160p10bit', name: '2160p 10Bit', link: '', size: '10GB', qualityDetail: '4K HDR x265', batchLink: '', batchSize: '', order: 8, isCustom: false},
    ] as Array<{id: string, name: string, link: string, size: string, qualityDetail: string, batchLink?: string, batchSize?: string, order: number, isCustom: boolean}>,
  });

  useEffect(() => {
    // Check if we're in edit mode
    if (propEditMovieId) {
      setIsEditMode(true);
      setEditMovieId(propEditMovieId);
      loadMovieForEdit(propEditMovieId);
    }
  }, [propEditMovieId]);

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
      const response = await fetch(`${API_URL}/api/admin/movies/${movieId}`);
      const movie = await response.json();
      
      const predefinedIds = ['480p', '720p 10Bit', '720p', '1080p 10Bit', '1080p', '1080p 60FPS', '1440p', '2160p', '2160p 10Bit'];
      const allDownloads = [
        {id: '480p', name: '480p', link: movie.downloads?.find((d: any) => d.resolution === '480p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '480p')?.size || '422MB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '480p')?.qualityDetail || 'WEB-DL', batchLink: movie.downloads?.find((d: any) => d.resolution === '480p')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '480p')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '480p')?.order ?? 0, isCustom: false},
        {id: '720p10bit', name: '720p 10Bit', link: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.size || '670MB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.qualityDetail || 'WEB-DL x264', batchLink: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '720p 10Bit')?.order ?? 1, isCustom: false},
        {id: '720p', name: '720p', link: movie.downloads?.find((d: any) => d.resolution === '720p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '720p')?.size || '1GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '720p')?.qualityDetail || 'WEB-DL x264', batchLink: movie.downloads?.find((d: any) => d.resolution === '720p')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '720p')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '720p')?.order ?? 2, isCustom: false},
        {id: '1080p10bit', name: '1080p 10Bit', link: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.size || '2GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.qualityDetail || 'WEB-DL x265', batchLink: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '1080p 10Bit')?.order ?? 3, isCustom: false},
        {id: '1080p', name: '1080p', link: movie.downloads?.find((d: any) => d.resolution === '1080p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1080p')?.size || '2.6GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1080p')?.qualityDetail || 'WEB-DL x264', batchLink: movie.downloads?.find((d: any) => d.resolution === '1080p')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '1080p')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '1080p')?.order ?? 4, isCustom: false},
        {id: '1080p60fps', name: '1080p 60FPS', link: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.size || '3.5GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.qualityDetail || 'WEB-DL x264', batchLink: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '1080p 60FPS')?.order ?? 5, isCustom: false},
        {id: '1440p', name: '1440p', link: movie.downloads?.find((d: any) => d.resolution === '1440p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '1440p')?.size || '4.5GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '1440p')?.qualityDetail || 'WEB-DL x265', batchLink: movie.downloads?.find((d: any) => d.resolution === '1440p')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '1440p')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '1440p')?.order ?? 6, isCustom: false},
        {id: '2160p', name: '2160p', link: movie.downloads?.find((d: any) => d.resolution === '2160p')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '2160p')?.size || '8GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '2160p')?.qualityDetail || '4K SDR x265', batchLink: movie.downloads?.find((d: any) => d.resolution === '2160p')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '2160p')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '2160p')?.order ?? 7, isCustom: false},
        {id: '2160p10bit', name: '2160p 10Bit', link: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.link || '', size: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.size || '10GB', qualityDetail: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.qualityDetail || 'WEB-DL x265', batchLink: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.batchLink || '', batchSize: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.batchSize || '', order: movie.downloads?.find((d: any) => d.resolution === '2160p 10Bit')?.order ?? 8, isCustom: false},
        ...movie.downloads?.filter((d: any) => !predefinedIds.includes(d.resolution)).map((d: any, idx: number) => ({id: `custom-${idx}`, name: d.resolution, link: d.link, qualityDetail: d.qualityDetail || '', size: d.size, batchLink: d.batchLink || '', order: d.order ?? 999, isCustom: true})) || []
      ].sort((a, b) => a.order - b.order);
      
      setFormData({
        title: movie.title || "",
        year: movie.year || "",
        posterUrl: movie.posterUrl || "",
        platform: movie.platform || "",
        isSeries: movie.isSeries || false,
        episodeInfo: movie.episodeInfo || "",
        seriesBaseName: movie.title?.replace(/ Season \d+/g, '') || "",
        seasonNumber: movie.seasonNumber?.toString() || "1",
        seriesId: movie.seriesId || "",
        episodesThisSeason: movie.episodesThisSeason?.toString() || "",
        totalSeasons: movie.totalSeasons?.toString() || "",
        seriesStatus: movie.seriesStatus || "Ongoing",
        seriesType: movie.seriesType || "Web Series",
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
        trending: movie.trending || false,
        featured: movie.featured || false,
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

  // Computed values for preview (updates in real-time)
  const previewQuality = formData.quality === "custom" ? formData.customQuality : formData.quality;
  const previewAudio = formData.audioType === "custom" ? formData.customAudioType : formData.audioType;
  const previewLanguage = formData.language === "custom" ? formData.customLanguage : formData.language;
  const previewSubtitle = formData.subtitle === "custom" ? formData.customSubtitle : formData.subtitle;
  const previewTitle = formData.title || (formData.isSeries ? "Series Title" : "Movie Title");
  const previewYear = formData.year || "2025";
  const previewDownloads = formData.allDownloads.filter(d => d.link || d.batchLink);
  const previewAudioLang = previewAudio === previewLanguage ? `{${previewLanguage}}` : `${previewAudio} {${previewLanguage}}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    if (!formData.posterUrl.trim()) {
      alert('Poster URL is required');
      return;
    }
    if (!formData.genre.trim()) {
      alert('Genre is required');
      return;
    }
    const hasDownloads = formData.allDownloads.some(d => d.link || d.batchLink);
    if (!hasDownloads) {
      alert('At least one download link is required');
      return;
    }
    if (formData.isSeries) {
      if (!formData.seriesBaseName.trim()) {
        alert('Series Base Name is required for series');
        return;
      }
      if (!formData.seasonNumber) {
        alert('Season Number is required for series');
        return;
      }
    }
    
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
        ? `${API_URL}/api/admin/movies/${editMovieId}`
        : `${API_URL}/api/movies`;
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
        onSuccess?.();
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
    <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="lg:col-span-1 bg-gray-900 border-gray-800 admin-form-card">
            <CardHeader>
              <CardTitle className="text-white">{formData.isSeries ? 'Series Details' : 'Movie Details'}</CardTitle>
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
                      <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h4 className="text-pink font-medium">Series Information</h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-white">Series Type</Label>
                            <Select value={formData.seriesType} onValueChange={(val) => setFormData({ ...formData, seriesType: val })}>
                              <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Web Series">Web Series</SelectItem>
                                <SelectItem value="TV Show">TV Show</SelectItem>
                                <SelectItem value="Mini Series">Mini Series</SelectItem>
                                <SelectItem value="Documentary Series">Documentary Series</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white">Series Status</Label>
                            <Select value={formData.seriesStatus} onValueChange={(val) => setFormData({ ...formData, seriesStatus: val })}>
                              <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ongoing">Ongoing</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="Hiatus">Hiatus</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg mb-4">
                          <p className="text-blue-300 text-sm mb-2">📺 One Season Per Entry System</p>
                          <p className="text-blue-200 text-xs">Each season will be a separate database entry for better management.</p>
                        </div>

                        <div>
                          <Label className="text-white">Series Base Name</Label>
                          <Input
                            value={formData.seriesBaseName}
                            onChange={(e) => {
                              const baseName = e.target.value;
                              const seasonNum = formData.seasonNumber;
                              setFormData({ 
                                ...formData, 
                                seriesBaseName: baseName,
                                title: baseName && seasonNum ? `${baseName} Season ${seasonNum}` : baseName,
                                seriesId: baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                              });
                            }}
                            placeholder="Breaking Bad"
                            className="bg-gray-800 text-white border-gray-700 mb-4"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-white">Season Number</Label>
                            <Input
                              value={formData.seasonNumber}
                              onChange={(e) => {
                                const seasonNum = e.target.value;
                                const baseName = formData.seriesBaseName;
                                setFormData({ 
                                  ...formData, 
                                  seasonNumber: seasonNum,
                                  title: baseName && seasonNum ? `${baseName} Season ${seasonNum}` : baseName
                                });
                              }}
                              placeholder="1"
                              className="bg-gray-800 text-white border-gray-700"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Episodes This Season</Label>
                            <Input
                              value={formData.episodesThisSeason}
                              onChange={(e) => setFormData({ ...formData, episodesThisSeason: e.target.value })}
                              placeholder="10"
                              className="bg-gray-800 text-white border-gray-700"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Total Seasons</Label>
                            <Input
                              value={formData.totalSeasons}
                              onChange={(e) => setFormData({ ...formData, totalSeasons: e.target.value })}
                              placeholder="4"
                              className="bg-gray-800 text-white border-gray-700"
                            />
                          </div>
                        </div>

                        {formData.seriesBaseName && formData.seasonNumber && (
                          <div className="mt-3 p-2 bg-green-900/20 border border-green-500/30 rounded">
                            <p className="text-green-300 text-sm">✅ Title: {formData.title}</p>
                            <p className="text-green-300 text-xs">Series ID: {formData.seriesId}</p>
                          </div>
                        )}

                        <div>
                          <Label className="text-white">Episode Info (Display Text)</Label>
                          <Input
                            value={formData.episodeInfo}
                            onChange={(e) => setFormData({ ...formData, episodeInfo: e.target.value })}
                            placeholder="[S01E05 – Added] or (Season 1) Complete"
                            className="bg-gray-800 text-white border-gray-700"
                          />
                        </div>
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
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.trending}
                          onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                          className="w-4 h-4"
                        />
                        🔥 Force Trending (Manual override)
                      </label>
                      <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4"
                        />
                        ⭐ Force Featured/Popular (Manual override)
                      </label>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Detail Page Information */}
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-lg font-bold text-pink mb-4">{formData.isSeries ? 'Series' : 'Movie'} Detail Information</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Genre</Label>
                        <Input
                          value={formData.genre}
                          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                          placeholder={formData.isSeries ? "Drama, Crime, Thriller" : "Action, Thriller"}
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

                    {!formData.isSeries ? (
                      <div>
                        <Label className="text-white">Duration</Label>
                        <Input
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="2h 15m"
                          className="bg-gray-800 text-white border-gray-700"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Episode Duration</Label>
                          <Input
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            placeholder="45m"
                            className="bg-gray-800 text-white border-gray-700"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Episodes This Season</Label>
                          <Input
                            value={formData.episodesThisSeason || ''}
                            onChange={(e) => setFormData({ ...formData, episodesThisSeason: e.target.value })}
                            placeholder="10"
                            className="bg-gray-800 text-white border-gray-700"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label className="text-white">{formData.isSeries ? 'Series Synopsis' : 'Movie Synopsis'}</Label>
                      <Textarea
                        value={formData.synopsis}
                        onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                        className="bg-gray-800 text-white border-gray-700"
                        rows={4}
                        placeholder={formData.isSeries ? "Series plot and storyline..." : "Movie plot and storyline..."}
                      />
                    </div>

                    <div>
                      <Label className="text-white">{formData.isSeries ? 'Main Cast' : 'Cast'} (comma separated)</Label>
                      <Input
                        value={formData.cast}
                        onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                        placeholder={formData.isSeries ? "Bryan Cranston, Aaron Paul, Anna Gunn" : "Tom Hardy, Charlize Theron"}
                        className="bg-gray-800 text-white border-gray-700"
                      />
                    </div>

                    <div>
                      <Label className="text-white">{formData.isSeries ? 'Series Screenshots' : 'Movie Screenshots'} (comma separated URLs)</Label>
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
                  <h3 className="text-lg font-bold text-pink mb-4">{formData.isSeries ? 'Series Downloads (Season ' + formData.seasonNumber + ')' : 'Movie Downloads'}</h3>
                  
                  {formData.isSeries && (
                    <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-300 text-sm mb-2">📺 Series Download Structure:</p>
                      <div className="text-xs space-y-2">
                        <div className="bg-gray-800/50 p-2 rounded">
                          <p className="text-yellow-300 font-medium">Format: Series Name [Season X] Language &#123;Type&#125; Quality [Size]</p>
                          <p className="text-gray-400">Example: The Family Man [Season 1] Hindi &#123;Single Episodes&#125; 480p [150MB/E]</p>
                          <p className="text-gray-400">Or: The Family Man [Season 1] Hindi &#123;Complete Zip&#125; 480p [1.4GB]</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-green-300 font-medium">📱 G-DIRECT [INSTANT]</p>
                            <p className="text-gray-400">Individual episodes</p>
                          </div>
                          <div>
                            <p className="text-purple-300 font-medium">📦 BATCH/ZIP</p>
                            <p className="text-gray-400">Complete season pack</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <Label className="text-white">Codec (Auto-fills quality details)</Label>
                    <Select value={formData.codec} onValueChange={(val) => {
                      const baseQuality = formData.quality === "custom" ? formData.customQuality : formData.quality;
                      const codecMap: Record<string, Record<string, string>> = {
                        "none": {"480p": baseQuality, "720p10bit": baseQuality, "720p": baseQuality, "1080p": baseQuality, "1440p": baseQuality, "2160p": `4K ${baseQuality}`},
                        "x264": {"480p": `${baseQuality} x264`, "720p10bit": `${baseQuality} x264`, "720p": `${baseQuality} x264`, "1080p": `${baseQuality} x264`, "1440p": `${baseQuality} x264`, "2160p": `4K ${baseQuality} x264`},
                        "x265": {"480p": `${baseQuality} x265`, "720p10bit": `10Bit x265`, "720p": `${baseQuality} x265`, "1080p": `${baseQuality} x265`, "1440p": `${baseQuality} x265`, "2160p": `4K ${baseQuality} x265`},
                        "H.264": {"480p": `${baseQuality} H.264`, "720p10bit": `${baseQuality} H.264`, "720p": `${baseQuality} H.264`, "1080p": `${baseQuality} H.264`, "1440p": `${baseQuality} H.264`, "2160p": `4K ${baseQuality} H.264`},
                        "H.265": {"480p": `${baseQuality} H.265`, "720p10bit": `10Bit H.265`, "720p": `${baseQuality} H.265`, "1080p": `${baseQuality} H.265`, "1440p": `${baseQuality} H.265`, "2160p": `4K ${baseQuality} H.265`},
                        "HEVC": {"480p": `${baseQuality} HEVC`, "720p10bit": `10Bit HEVC`, "720p": `${baseQuality} HEVC`, "1080p": `${baseQuality} HEVC`, "1440p": `${baseQuality} HEVC`, "2160p": `4K ${baseQuality} HEVC`},
                      };
                      const details = codecMap[val] || codecMap["none"];
                      setFormData({
                        ...formData,
                        codec: val,
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
                    <Label className="text-white text-xs mb-2 block">{formData.isSeries ? 'Series Downloads - Drag to Reorder' : 'Movie Downloads - Drag to Reorder'}</Label>
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
                        className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-2 mb-2 cursor-move hover:bg-gray-800/50 p-1 rounded"
                      >
                        <div className="flex items-center text-gray-500 text-lg cursor-grab active:cursor-grabbing">⋮⋮</div>
                        <Input 
                          value={dl.name} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].name = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder={formData.isSeries ? "480p" : "Quality"} 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                          disabled={!dl.isCustom}
                        />
                        <Input 
                          value={dl.qualityDetail} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].qualityDetail = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder={formData.isSeries ? "Single Episodes" : "WEB-DL"} 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                        />
                        <Input 
                          value={dl.size} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].size = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder={formData.isSeries ? "150MB/E or 1.4GB" : "2.6GB"} 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                        />
                        <Input 
                          value={dl.link} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].link = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder="Download Link" 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                        />
                        <Input 
                          value={dl.batchLink || ''} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].batchLink = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder={formData.isSeries ? "Batch/ZIP Link" : ""} 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                          disabled={!formData.isSeries}
                        />
                        <Input 
                          value={dl.batchSize || ''} 
                          onChange={(e) => { 
                            const updated = [...formData.allDownloads]; 
                            updated[idx].batchSize = e.target.value; 
                            setFormData({ ...formData, allDownloads: updated }); 
                          }} 
                          placeholder={formData.isSeries ? "Batch Size" : ""} 
                          className="bg-gray-800 text-white border-gray-700 text-xs" 
                          disabled={!formData.isSeries}
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
                        allDownloads: [...formData.allDownloads, {id: `custom-${Date.now()}`, name: "", link: "", qualityDetail: "", size: "", batchLink: "", batchSize: "", order: formData.allDownloads.length, isCustom: true}] 
                      })} 
                      className="text-pink text-xs mt-1 hover:text-pink-400"
                    >+ Add Custom Quality</button>
                    
                    {formData.isSeries && (
                      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                        <Label className="text-white text-sm mb-2 block">Series Download Guide:</Label>
                        <div className="text-xs text-gray-400 space-y-1">
                          <p>• <span className="text-green-300">G-Direct Link:</span> Individual episode downloads (instant)</p>
                          <p>• <span className="text-purple-300">Batch/ZIP Link:</span> Complete season pack (optional)</p>
                          <p>• <span className="text-yellow-300">Size Format:</span> "150MB/E" (per episode) or "1.4GB" (total size)</p>
                          <p>• <span className="text-blue-300">Type:</span> "Single Episodes", "Complete Zip", "Season Pack"</p>
                          <p>• <span className="text-orange-300">Single Link:</span> If only one link, it will show as main download</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600">
                    {isEditMode ? 'Update Movie' : 'Add Movie'}
                  </Button>
                  {isEditMode && (
                    <Button type="button" onClick={onSuccess} variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
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
                      Download {previewTitle} {formData.episodeInfo && `${formData.episodeInfo} `}({previewYear}) {formData.isSeries ? `Season ${formData.seasonNumber} ` : ''}{formData.platform && formData.platform !== "none" && `${formData.platform}-`}{previewQuality} {previewAudioLang} {previewDownloads.slice(0, 3).map(d => `${d.name} [${d.size}]`).join(' | ')}{formData.show4K ? " | 2160p 4K" : ""}
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
                    MoviesWala.is | 1080p | Download {previewTitle} ({previewYear}) {formData.isSeries ? `Season ${formData.seasonNumber} ` : ''}{previewQuality} {previewAudioLang} {previewDownloads.slice(0, 3).map(d => `${d.name} [${d.size}]`).join(' | ')}{formData.show4K ? " | 2160p 4K" : ""}
                  </div>

                  <div className="mt-6 bg-white/[0.03] rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-pink mb-4">{formData.isSeries ? 'Series Specifications' : 'Movie Specifications'}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {formData.isSeries ? (
                        <>Download {previewTitle} {formData.seasonNumber ? `[Season ${formData.seasonNumber}]` : ''} ({previewYear}) {previewQuality} Complete Episodes ({previewLanguage}) {(() => { const qualities = previewDownloads.map(d => d.name); if (qualities.length > 1) { return <>{qualities.slice(0, -1).map((q, i) => <><span className="text-cyan-400 font-bold" key={i}>{q}</span>{i < qualities.length - 2 ? ', ' : ''}</>)} & <span className="text-cyan-400 font-bold">{qualities[qualities.length - 1]}</span></>; } else if (qualities.length === 1) { return <span className="text-cyan-400 font-bold">{qualities[0]}</span>; } else { return <><span className="text-cyan-400 font-bold">480p</span> & <span className="text-cyan-400 font-bold">720p</span> & <span className="text-cyan-400 font-bold">1080p</span></>; } })()} Qualities. This is a {formData.movieOrigin} {formData.seriesType.toLowerCase()} with {formData.episodesThisSeason || "N/A"} episodes per season. Available in both Single Episodes and Complete Season Pack formats {previewDownloads.length > 0 ? previewDownloads.map((d, i, arr) => <>{d.name} in <span className="text-white font-bold" key={i}>[{d.size}]</span>{i < arr.length - 1 ? ', ' : ''}</>) : <>480p in <span className="text-white font-bold">[150MB/E]</span>, 720p in <span className="text-white font-bold">[350MB/E]</span> & 1080p in <span className="text-white font-bold">[22.5GB]</span></>} in MKV Format. This is one of the best series based on <span className="text-yellow-400 font-bold">{formData.genre || 'N/A'}</span>. This Series Is Now Available In <span className="text-white font-bold">{previewLanguage}</span>. This is {previewQuality} Print with <span className="font-bold" style={{color: '#f2070f'}}>{previewAudio}{previewSubtitle !== "none" ? ` and ${previewSubtitle} Subtitles` : ''}</span>.</>
                      ) : (
                        <>Download {previewTitle} ({previewYear}) {previewQuality} Full Movie ({previewLanguage}) {(() => { const qualities = previewDownloads.map(d => d.name); if (qualities.length > 1) { return <>{qualities.slice(0, -1).map((q, i) => <><span className="text-cyan-400 font-bold" key={i}>{q}</span>{i < qualities.length - 2 ? ', ' : ''}</>)} & <span className="text-cyan-400 font-bold">{qualities[qualities.length - 1]}</span></>; } else if (qualities.length === 1) { return <span className="text-cyan-400 font-bold">{qualities[0]}</span>; } else { return <><span className="text-cyan-400 font-bold">480p</span>, <span className="text-cyan-400 font-bold">720p</span> & <span className="text-cyan-400 font-bold">1080p</span></>; } })()} Qualities. This is a {formData.movieOrigin} movie and Available {previewDownloads.length > 0 ? previewDownloads.map((d, i, arr) => <>{d.name} in <span className="text-white font-bold" key={i}>[{d.size}]</span>{i < arr.length - 1 ? ', ' : ''}</>) : <>in 480p in <span className="text-white font-bold">[422MB]</span>, 720p in <span className="text-white font-bold">[1GB]</span> & 1080p in <span className="text-white font-bold">[2.6GB]</span></>} in MKV Format. This is one of the best movie based on <span className="text-yellow-400 font-bold">{formData.genre || 'N/A'}</span>. This Movie Is Now Available In <span className="text-white font-bold">{previewLanguage}</span>. This is {previewQuality} Print with <span className="font-bold" style={{color: '#f2070f'}}>{previewAudio.toLowerCase().includes('audio') ? previewAudio : `${previewAudio} Audio`}{previewSubtitle !== "none" ? ` and ${previewSubtitle} Subtitles` : ''}</span>.</>
                      )}
                    </p>
                  </div>

                  <div className="mt-6 bg-white/[0.03] rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-pink mb-4">{formData.isSeries ? 'Series Info' : 'Movie Info'}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex"><span className="w-[35%] font-bold" style={{color: '#00ff1c'}}>👉 IMDb Rating:</span><span className="w-[65%] font-bold" style={{color: '#00ff1c'}}>{formData.rating || "0.0"}/10</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">{formData.isSeries ? 'Series Name:' : 'Movie Name:'}</span><span className="text-white">{previewTitle}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">{formData.isSeries ? 'First Air Date:' : 'Release Year:'}</span><span className="text-white">{previewYear}</span></div>
                      {formData.isSeries ? (
                        <>
                          <div className="flex"><span className="w-[35%] text-gray-400">Season:</span><span className="text-white">Season {formData.seasonNumber || "1"}</span></div>
                          <div className="flex"><span className="w-[35%] text-gray-400">Episodes:</span><span className="w-[65%] text-white">{formData.episodesThisSeason || "N/A"} Episodes</span></div>
                          <div className="flex"><span className="w-[35%] text-gray-400">Status:</span><span className="text-white">{formData.seriesStatus}</span></div>
                          <div className="flex"><span className="w-[35%] text-gray-400">Total Seasons:</span><span className="text-white">{formData.totalSeasons || "N/A"}</span></div>
                        </>
                      ) : (
                        <div className="flex"><span className="w-[35%] text-gray-400">Runtime:</span><span className="text-white">{formData.duration || "N/A"}</span></div>
                      )}
                      <div className="flex"><span className="w-[35%] text-gray-400">Genre:</span><span className="text-white">{formData.genre || "N/A"}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Language:</span><span className="w-[65%]"><span className="font-bold" style={{color: '#f2070f'}}>{previewLanguage}</span> <span className="text-white font-bold">[{previewAudio}]</span></span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Subtitle:</span><span className="w-[65%] text-white">{previewSubtitle === "none" ? "N/A" : previewSubtitle}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Size:</span><span className="w-[65%] text-white">{previewDownloads.length > 0 ? previewDownloads.map(d => d.size).filter(Boolean).join(' || ') : '422MB || 1GB || 2.6GB'}</span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Quality:</span><span className="w-[65%]"><span className="text-white">{previewDownloads.length > 0 ? previewDownloads.map(d => d.name).join(' || ') : '480p || 720p || 1080p'} - </span><span className="font-bold" style={{color: '#f2070f'}}>{previewQuality}</span></span></div>
                      <div className="flex"><span className="w-[35%] text-gray-400">Format:</span><span className="w-[65%] text-white">MKV</span></div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white/[0.03] rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-pink mb-4 text-center">{formData.isSeries ? 'Series Synopsis' : 'Movie Synopsis'}</h3>
                    <div className="text-gray-400 text-sm leading-relaxed relative">
                      <p>{formData.synopsis || "A team of elite hackers must pull off the ultimate digital heist while staying one step ahead of international law enforcement."}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-pink mb-4 text-center">{formData.isSeries ? 'Series Screenshots:' : 'Screenshots:'} <span className="text-white">(Must See Before Downloading)</span>...</h3>
                    <div className="space-y-4">
                      {formData.screenshots ? (
                        formData.screenshots.split(',').slice(0, 5).map((url: string, idx: number) => (
                          <div key={idx} className="w-full aspect-video md:h-82">
                            <img src={url.trim()} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))
                      ) : (
                        <div className="bg-white/[0.03] rounded-xl p-8 text-center">
                          <p className="text-gray-400 text-lg">Screenshots not available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="my-6">
                    <div className="relative w-full">
                      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent opacity-80"></div>
                      <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent blur-sm opacity-60"></div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white mb-4 text-center">{(() => {
                      const langs = previewLanguage.split(/[-,+]/).map(l => l.trim());
                      const hasHindi = previewLanguage.includes("Hindi");
                      const hasEnglish = previewLanguage.includes("English");
                      if (hasHindi && langs.length === 1) return "DOWNLOAD हिंदी ORG Audio (हिन्दी में)";
                      if (hasHindi && langs.length === 2) return `DOWNLOAD हिंदी Dubbed ORG – ${langs.find(l => !l.includes("Hindi"))} (हिन्दी में)`;
                      if (hasEnglish && langs.length === 1) return "DOWNLOAD English ORG Audio (English)";
                      if (hasEnglish && langs.length === 2) return `DOWNLOAD ORG Dual Audio – English (${previewLanguage} में)`;
                      if (langs.length > 2) return `DOWNLOAD ORG Multi Audio (${previewLanguage} में)`;
                      if (langs.length === 1) return `DOWNLOAD ORG Original Audio (${previewLanguage} में)`;
                      return `** DOWNLOAD ORG Dual Audio (${previewLanguage} में) **`;
                    })()}</h3>

                    <div className="bg-white/[0.03] rounded-xl p-6 backdrop-blur-sm border border-white/20">
                      <div className="space-y-0">
                        {previewDownloads.map((dl, idx) => (
                          <div key={idx} className="pb-6 last:pb-0">
                            <p className="text-white font-medium mb-3 text-center">
                              {previewTitle} ({previewYear}) ({previewLanguage}) {dl.qualityDetail || dl.name} [{dl.size || 'N/A'}]
                            </p>
                            {formData.isSeries ? (
                              <div className="flex gap-3 justify-center">
                                {dl.link && (
                                  <button className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center">
                                    Single Episode
                                  </button>
                                )}
                                {dl.batchLink && (
                                  <button className="flex-1 max-w-xs bg-gradient-to-r from-magenta to-pink text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center">
                                    Batch/Zip [{dl.batchSize || dl.size}]
                                  </button>
                                )}
                              </div>
                            ) : (
                              <button className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center">
                                Download Now
                              </button>
                            )}
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

export default ContentForm;
