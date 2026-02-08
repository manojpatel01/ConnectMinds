import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/feed?user=${user._id}`);
        console.log(res.data);
        if (res.data.posts) {
          setPosts(res.data.posts);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    if (user && user._id) {  // Pehle check karo user hai ya nahi
    getPosts();
  }
    getPosts();
  }, [user]);

  async function handlePostSubmit(e) {
    e.preventDefault();
    let data = {
      title: e.target.title.value,
      description: e.target.desc.value,
      image: e.target.poster.value,
      user: user._id
    };

    let res = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, data);
    console.log(res.data);
    if (res.data.post) {
      alert("Post created successfully");
    }
    let newFeed = await axios.get(`${import.meta.env.VITE_API_URL}/posts/feed?user=${user._id}`);
      setPosts(newFeed.data.posts);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Post Creation */}
        <div className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-slate-800">Create a Post</h2>
          <p className="mt-2 text-sm text-slate-500">
            Share your latest thoughts, discoveries, or inspiration with the community.
          </p>
          <form onSubmit={handlePostSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-600">Post Title</label>
              <input
                name="title"
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-inner transition focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200/80 focus:ring-offset-2 focus:ring-offset-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-600">Post Description</label>
              <textarea
                name="desc"
                required
                rows={3}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-inner transition focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200/80 focus:ring-offset-2 focus:ring-offset-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-600">Post Image URL</label>
              <input
                name="poster"
                type="url"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-inner transition focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200/80 focus:ring-offset-2 focus:ring-offset-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-white"
            >
              Share Post
            </button>
          </form>
        </div>

        {/* Posts Display */}
        {loading ? (
          <h1 className="mt-16 text-2xl font-semibold text-slate-500 animate-pulse">Fetching your feed...</h1>
        ) : posts.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-10 py-16 text-center text-slate-500 shadow-inner">
            <h1 className="text-2xl font-semibold">No posts yet</h1>
            <p className="mt-2 text-sm">Be the first to start the conversation above!</p>
          </div>
        ) : (
          <div className="mt-16 w-full space-y-6">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <h3 className="text-2xl font-semibold text-slate-800">Latest from your network</h3>
              <span className="rounded-full bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-500 shadow-sm">
                {posts.length} posts
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Author Section */}
                  <div className="relative flex items-center gap-3 border-b border-slate-100/80 bg-white/70 px-5 py-4">
                    <img
                      src={post.user?.avatar || 'https://via.placeholder.com/50'}
                      alt="User Avatar"
                      className="h-12 w-12 rounded-full border border-white/80 object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">{post.user?.name || 'Unknown User'}</h3>
                      <p className="text-xs text-slate-400">Shared with you</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="relative h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  )}

                  {/* Post Content */}
                  <div className="relative space-y-3 px-6 py-5">
                    <h1 className="text-lg font-semibold text-slate-900">{post.title}</h1>
                    <p className="text-sm leading-relaxed text-slate-600">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
