"use client";

import * as React from "react";
import Image from "next/image";
import { 
  Film, 
  Sparkles, 
  Search, 
  Filter, 
  Heart, 
  Play, 
  Clock, 
  Eye, 
  Share2, 
  SlidersHorizontal,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Bookmark
} from "lucide-react";
import { getStoredVlogs, toggleLikeVlog, getStoredReels, toggleLikeReel } from "@/lib/data/store";
import { VlogItem, ReelItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StudentVlogsPage() {
  const [activeTab, setActiveTab] = React.useState<"VLOGS" | "REELS">("VLOGS");
  const [vlogs, setVlogs] = React.useState<VlogItem[]>([]);
  const [reels, setReels] = React.useState<ReelItem[]>([]);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("ALL");
  const [sortBy, setSortBy] = React.useState<"POPULAR" | "NEWEST" | "LIKES">("POPULAR");

  // Video Player Modal State
  const [activeVideo, setActiveVideo] = React.useState<{
    title: string;
    creator: string;
    category: string;
    duration: string;
    views: number;
    likes: number;
    thumbnail: string;
    description?: string;
    isLiked?: boolean;
    id: string;
    type: "vlog" | "reel";
  } | null>(null);

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const [shareToast, setShareToast] = React.useState(false);

  React.useEffect(() => {
    setVlogs(getStoredVlogs());
    setReels(getStoredReels());
  }, []);

  const handleLikeVlog = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = toggleLikeVlog(id);
    setVlogs(updated);
    if (activeVideo && activeVideo.id === id) {
      const target = updated.find(v => v.id === id);
      if (target) {
        setActiveVideo(prev => prev ? { ...prev, isLiked: target.isLiked, likes: target.likes } : null);
      }
    }
  };

  const handleLikeReel = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = toggleLikeReel(id);
    setReels(updated);
    if (activeVideo && activeVideo.id === id) {
      const target = updated.find(r => r.id === id);
      if (target) {
        setActiveVideo(prev => prev ? { ...prev, isLiked: target.isLiked, likes: target.likes } : null);
      }
    }
  };

  const handleShare = (title: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const categories = ["ALL", "Cultural", "Technical", "Sports", "Campus", "Events"];

  // Filter & Sort Vlogs
  const filteredVlogs = React.useMemo(() => {
    let list = vlogs.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) || 
                            v.creator.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "ALL" || v.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCat;
    });

    if (sortBy === "POPULAR") list.sort((a, b) => b.views - a.views);
    else if (sortBy === "LIKES") list.sort((a, b) => b.likes - a.likes);
    // Newest is default initial order
    return list;
  }, [vlogs, search, category, sortBy]);

  // Filter & Sort Reels
  const filteredReels = React.useMemo(() => {
    let list = reels.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                            r.creator.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "ALL" || r.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCat;
    });

    if (sortBy === "POPULAR") list.sort((a, b) => b.views - a.views);
    else if (sortBy === "LIKES") list.sort((a, b) => b.likes - a.likes);
    return list;
  }, [reels, search, category, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1 text-kiit-gold" />
              Campus Media Spotlight
            </Badge>
            <span className="text-xs text-slate-400">• Stories from 25 Campuses</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Film className="h-8 w-8 text-kiit-green" />
            KIIT Vlogs & Reels
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Immerse yourself in campus culture, hackathon energy, fest highlights, and daily student life.
          </p>
        </div>

        {/* Tab Switcher: Vlogs vs Reels */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1.5 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setActiveTab("VLOGS")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "VLOGS"
                ? "bg-kiit-green text-white shadow-md shadow-kiit-green/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Film className="h-4 w-4" />
            <span>Campus Vlogs ({vlogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("REELS")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "REELS"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Shorts & Reels ({reels.length})</span>
          </button>
        </div>
      </div>

      {shareToast && (
        <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Sharable link copied to clipboard!</span>
        </div>
      )}

      {/* Search, Categories, and Sort Controls */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, club or creator..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-kiit-green"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort videos"
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-kiit-green"
            >
              <option value="POPULAR">Most Popular (Views)</option>
              <option value="LIKES">Most Liked</option>
              <option value="NEWEST">Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                category.toLowerCase() === cat.toLowerCase()
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat === "ALL" ? "All Content" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ===================== TAB 1: VLOGS (16:9 Landscape) ===================== */}
      {activeTab === "VLOGS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVlogs.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400">
              <Film className="h-12 w-12 mx-auto text-slate-600 mb-3" />
              <p>No vlogs match your search or filter criteria.</p>
            </div>
          ) : (
            filteredVlogs.map((vlog) => (
              <div
                key={vlog.id}
                onClick={() =>
                  setActiveVideo({
                    ...vlog,
                    type: "vlog",
                  })
                }
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-emerald-500/40 transition-all hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between"
              >
                {/* 16:9 Thumbnail Container */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                  <img
                    src={vlog.thumbnail}
                    alt={vlog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/90 text-white shadow-lg group-hover:scale-110 group-hover:bg-kiit-green transition-all">
                      <Play className="h-6 w-6 ml-1 fill-white" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-white font-mono text-[11px] font-semibold border border-slate-800">
                    <Clock className="h-3 w-3 text-emerald-400" />
                    {vlog.duration}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="bg-slate-950/80 backdrop-blur-md text-xs border-slate-700">
                      {vlog.category}
                    </Badge>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {vlog.title}
                    </h2>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {vlog.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-200 block">{vlog.creator}</span>
                      <span className="text-[11px] text-slate-500">{vlog.views.toLocaleString()} views • {vlog.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleLikeVlog(vlog.id, e)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          vlog.isLiked
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                            : "bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${vlog.isLiked ? "fill-rose-400 text-rose-400" : ""}`} />
                        <span>{vlog.likes.toLocaleString()}</span>
                      </button>

                      <button
                        onClick={(e) => handleShare(vlog.title, e)}
                        className="p-1.5 rounded-xl bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
                        title="Share vlog"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ===================== TAB 2: REELS (9:16 Vertical Cards) ===================== */}
      {activeTab === "REELS" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredReels.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400">
              <Sparkles className="h-12 w-12 mx-auto text-slate-600 mb-3" />
              <p>No reels match your search or filter criteria.</p>
            </div>
          ) : (
            filteredReels.map((reel) => (
              <div
                key={reel.id}
                onClick={() =>
                  setActiveVideo({
                    ...reel,
                    duration: reel.duration || "0:30",
                    type: "reel",
                    description: `Short snippet by ${reel.creator} capturing ${reel.title} during campus season.`,
                  })
                }
                className="group relative cursor-pointer aspect-[9/16] rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-amber-400/50 transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between p-3"
              >
                {/* Background Image */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/20" />

                {/* Top Badge: Duration & Category */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-bold text-amber-300 border border-slate-700">
                    {reel.duration}
                  </span>
                  <Badge variant="outline" className="bg-slate-950/80 backdrop-blur-md text-[9px] border-slate-700 py-0">
                    {reel.category}
                  </Badge>
                </div>

                {/* Center Play Icon on Hover */}
                <div className="relative z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-xl">
                    <Play className="h-5 w-5 ml-0.5 fill-slate-950" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 space-y-1.5">
                  <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-2 leading-tight drop-shadow">
                    {reel.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="truncate max-w-[80px]">{reel.creator}</span>
                    <button
                      onClick={(e) => handleLikeReel(reel.id, e)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold backdrop-blur-md transition-all ${
                        reel.isLiked
                          ? "bg-rose-500/80 text-white"
                          : "bg-slate-900/80 text-white hover:bg-slate-800"
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${reel.isLiked ? "fill-white" : ""}`} />
                      <span>{reel.likes}</span>
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{reel.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ===================== VIDEO PLAYER PREVIEW MODAL ===================== */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video Screen Area */}
            <div className={`relative bg-black w-full flex items-center justify-center overflow-hidden ${
              activeVideo.type === "reel" ? "h-96" : "aspect-video"
            }`}>
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

              {/* Simulated Controls Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="text-xs">
                    HD 1080p
                  </Badge>
                  <span className="text-xs text-white drop-shadow font-medium">KIIT Student Media Channel</span>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-kiit-green/90 text-white shadow-2xl hover:scale-105 transition-transform"
                  >
                    <Play className={`h-7 w-7 ml-1 fill-white ${isPlaying ? "opacity-90" : "opacity-100"}`} />
                  </button>
                </div>

                {/* Progress bar simulation */}
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-kiit-green w-1/3 rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-white drop-shadow">
                    <span>01:14 / {activeVideo.duration}</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                      <Maximize2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Meta Info Footer */}
            <div className="p-6 space-y-4 bg-slate-900">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {activeVideo.category}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">by {activeVideo.creator}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    {activeVideo.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      activeVideo.type === "vlog"
                        ? handleLikeVlog(activeVideo.id)
                        : handleLikeReel(activeVideo.id)
                    }
                    className={`text-xs ${
                      activeVideo.isLiked
                        ? "border-rose-500 text-rose-400 bg-rose-950/30"
                        : "border-slate-700 text-slate-200"
                    }`}
                  >
                    <Heart className={`h-4 w-4 mr-1.5 ${activeVideo.isLiked ? "fill-rose-400" : ""}`} />
                    {activeVideo.likes.toLocaleString()} Likes
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(activeVideo.title)}
                    className="text-xs text-slate-300 hover:text-white"
                  >
                    <Share2 className="h-4 w-4 mr-1.5" />
                    Share
                  </Button>
                </div>
              </div>

              {activeVideo.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {activeVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
