/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { UGC_POSTS } from '../data/cafeData';
import { Heart, Instagram, Send, MessageCircle } from 'lucide-react';

export default function SocialUGC() {
  const [posts, setPosts] = useState(UGC_POSTS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  const shareHandler = (id: string, username: string) => {
    navigator.clipboard.writeText(`Check out ${username}'s vibe at the Cafe!`);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section className="bg-brand-bg py-20 px-4 md:px-8 border-b border-brand-border scroll-mt-24" id="community-ugc">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="h-[1px] w-8 bg-brand-accent/40"></span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">
                Shared Vibes
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-text tracking-tight animate-fade-in">
              Curated by Our Community
            </h2>
            <p className="font-sans text-brand-text/70 text-sm mt-3 max-w-xl font-light">
              Real capsules of moments, aesthetics, and study sessions shared by creators at our tables. Mention us on social for a feature.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-brand-secondary border border-brand-border text-brand-text/80 hover:text-brand-accent hover:border-brand-accent/30 transition-all text-xs font-mono uppercase tracking-wider font-bold"
              id="instagram-join-btn"
            >
              <Instagram className="w-4 h-4 text-brand-accent" />
              <span>Follow @_velvetroast</span>
            </a>
          </div>
        </div>

        {/* Live Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden group hover:border-brand-accent/55 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between"
              id={`ugc-post-${post.id}`}
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between border-b border-brand-border bg-brand-secondary/40">
                <div className="flex items-center space-x-3">
                  <img 
                    src={post.avatar} 
                    alt={post.username} 
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full border border-brand-border object-cover"
                  />
                  <span className="font-mono text-xs font-semibold text-brand-text cursor-pointer hover:text-brand-accent transition-colors">
                    {post.username}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" title="Verified Creator Location"></div>
              </div>

              {/* Aspect Ratio 1:1 Block */}
              <div className="relative aspect-square overflow-hidden bg-brand-secondary">
                <img 
                  src={post.image} 
                  alt={`Vibe by ${post.username}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay details on hover */}
                <div className="absolute inset-0 bg-brand-bg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex flex-col items-center space-y-1.5 focus:outline-none focus:scale-110 active:scale-95 transition-transform cursor-pointer"
                    id={`like-btn-overlay-${post.id}`}
                  >
                    <div className="w-11 h-11 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/40 transition-colors shadow-sm">
                      <Heart className="w-5 h-5 fill-rose-500" />
                    </div>
                    <span className="font-mono text-[10px] uppercase text-brand-text/75 font-bold">{post.likes} Likes</span>
                  </button>

                  <button 
                    onClick={() => shareHandler(post.id, post.username)}
                    className="flex flex-col items-center space-y-1.5 focus:outline-none focus:scale-110 cursor-pointer"
                    id={`share-btn-overlay-${post.id}`}
                  >
                    <div className="w-11 h-11 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-accent/10 hover:border-brand-accent/40 transition-colors shadow-sm">
                      <Send className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase text-brand-text/75 font-bold animate-pulse">
                      {copiedId === post.id ? 'Copied!' : 'Copy Grid'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Text / Stats */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <p className="font-sans text-brand-text/75 text-xs leading-relaxed mb-4 line-clamp-3 font-light">
                  {post.caption}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-brand-border">
                  {post.tags.map((tg, i) => (
                    <span 
                      key={i} 
                      className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-brand-accent/5 border border-brand-accent/10 text-brand-accent font-bold"
                    >
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core quick interaction footer */}
              <div className="px-4 py-3 border-t border-brand-border flex items-center justify-between text-[11px] font-mono text-brand-text/50 bg-brand-secondary/30">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 hover:text-rose-500 transition-colors cursor-pointer"
                  id={`like-bar-btn-${post.id}`}
                >
                  <Heart className="w-3.5 h-3.5 stroke-[2]" />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-brand-accent transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{(post.likes % 7) + 2} replies</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
