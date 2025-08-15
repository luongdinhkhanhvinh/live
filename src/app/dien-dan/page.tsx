"use client";

import { useState } from "react";
import Image from "next/image";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  showCommentInput?: boolean;
  commentText?: string;
  commentsList?: Comment[];
}

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    author: {
      name: "Nguyễn Văn A",
      avatar: "/ngoaihangtv.png",
      role: "Thành viên"
    },
    content: "Hôm qua trận đấu thật tuyệt vời! Manchester United đã chơi rất hay. Các bạn có thấy không?",
    image: "/ngoaihangtv.png",
    timestamp: "2 giờ trước",
    likes: 45,
    comments: 12,
    shares: 3,
    isLiked: false,
    isBookmarked: false,
    showCommentInput: false,
    commentText: "",
    commentsList: [
      {
        id: 101,
        author: {
          name: "Trần Thị B",
          avatar: "/ngoaihangtv.png",
          role: "Moderator"
        },
        content: "Tôi đồng ý với bạn. Manchester United đã chơi rất tốt trong trận đấu đó.",
        timestamp: "1 giờ trước",
        likes: 5,
        isLiked: false
      },
      {
        id: 102,
        author: {
          name: "Lê Văn C",
          avatar: "/ngoaihangtv.png",
          role: "Thành viên"
        },
        content: "Tôi cũng thấy Manchester United đã chơi rất tốt. Họ đã thể hiện được tinh thần của một đội bóng chuyên nghiệp.",
        timestamp: "30 phút trước",
        likes: 3,
        isLiked: false
      }
    ]
  },
  {
    id: 2,
    author: {
      name: "Trần Thị B",
      avatar: "/ngoaihangtv.png",
      role: "Moderator"
    },
    content: "Chào mừng các bạn đến với diễn đàn bóng đá! Hãy chia sẻ những suy nghĩ của bạn về các trận đấu sắp tới.",
    timestamp: "5 giờ trước",
    likes: 23,
    comments: 8,
    shares: 1,
    isLiked: true,
    isBookmarked: false,
    showCommentInput: false,
    commentText: "",
    commentsList: [
      {
        id: 201,
        author: {
          name: "Nguyễn Văn A",
          avatar: "/ngoaihangtv.png",
          role: "Thành viên"
        },
        content: "Tôi rất hào hứng với các trận đấu sắp tới. Tôi hy vọng các đội sẽ có những trận đấu thú vị.",
        timestamp: "4 giờ trước",
        likes: 2,
        isLiked: false
      }
    ]
  },
  {
    id: 3,
    author: {
      name: "Lê Văn C",
      avatar: "/ngoaihangtv.png",
      role: "Thành viên"
    },
    content: "Ai có thể giải thích cho mình về luật việt vị mới không? Mình thấy có vẻ phức tạp quá.",
    timestamp: "1 ngày trước",
    likes: 15,
    comments: 25,
    shares: 2,
    isLiked: false,
    isBookmarked: true,
    showCommentInput: false,
    commentText: "",
    commentsList: [
      {
        id: 301,
        author: {
          name: "Trần Thị B",
          avatar: "/ngoaihangtv.png",
          role: "Moderator"
        },
        content: "Luật việt vị là một trong những luật cơ bản nhất của bóng đá. Nó quy định cách thức di chuyển của cầu thủ trên sân.",
        timestamp: "1 ngày trước",
        likes: 10,
        isLiked: false
      },
      {
        id: 302,
        author: {
          name: "Nguyễn Văn A",
          avatar: "/ngoaihangtv.png",
          role: "Thành viên"
        },
        content: "Tôi đồng ý với bạn. Luật việt vị rất quan trọng để đảm bảo sự công bằng trong trận đấu.",
        timestamp: "1 ngày trước",
        likes: 5,
        isLiked: false
      }
    ]
  }
];

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (postId: number) => {
    console.log("Like clicked for post:", postId);
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    console.log("Bookmark clicked for post:", postId);
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    console.log("Comment clicked for post:", postId);
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, showCommentInput: !post.showCommentInput }
        : post
    ));
  };

  const handleCommentInputChange = (postId: number, value: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, commentText: value }
        : post
    ));
  };

  const handleSubmitComment = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post && post.commentText?.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: {
          name: "Bạn",
          avatar: "/ngoaihangtv.png",
          role: "Thành viên"
        },
        content: post.commentText,
        timestamp: "Vừa xong",
        likes: 0,
        isLiked: false
      };

      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              comments: p.comments + 1, 
              showCommentInput: false, 
              commentText: "",
              commentsList: [...(p.commentsList || []), newComment]
            }
          : p
      ));
      console.log("Comment submitted:", post.commentText);
    }
  };

  const handleShare = (postId: number) => {
    console.log("Share clicked for post:", postId);
    // Có thể mở modal chia sẻ ở đây
    alert(`Chia sẻ bài viết ${postId}`);
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now(),
        author: {
          name: "Bạn",
          avatar: "/ngoaihangtv.png",
          role: "Thành viên"
        },
        content: newPostContent,
        timestamp: "Vừa xong",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        showCommentInput: false,
        commentText: "",
        commentsList: []
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      console.log("New post created:", newPost);
    }
  };

  const handleCommentLike = (postId: number, commentId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            commentsList: post.commentsList?.map(comment =>
              comment.id === commentId
                ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
                : comment
            )
          }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-custom-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Diễn đàn bóng đá</h1>
          <p className="text-gray-600 dark:text-gray-400">Chia sẻ, thảo luận và kết nối với cộng đồng bóng đá</p>
        </div>

        {/* Create Post */}
        <div className="bg-white dark:bg-custom-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-start gap-3">
            <Image
              src="/ngoaihangtv.png"
              alt="Your avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Bạn đang nghĩ gì về bóng đá?"
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                rows={3}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                  <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Ảnh</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Video</span>
                  </button>
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Đăng bài
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-custom-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{post.author.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.author.role}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-900 dark:text-white mb-4">{post.content}</p>
                {post.image && (
                  <div className="mb-4">
                    <Image
                      src={post.image}
                      alt="Post image"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg max-h-96 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Post Stats */}
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>{post.likes} lượt thích</span>
                    <span>{post.comments} bình luận</span>
                    <span>{post.shares} lượt chia sẻ</span>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      post.isLiked
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>Thích</span>
                  </button>
                  
                  <button 
                    onClick={() => handleComment(post.id)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Bình luận</span>
                  </button>
                  
                  <button 
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Chia sẻ</span>
                  </button>
                  
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      post.isBookmarked
                        ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <svg className={`w-5 h-5 ${post.isBookmarked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>Lưu</span>
                  </button>
                </div>
              </div>

              {/* Comment Input Field */}
              {post.showCommentInput && (
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/ngoaihangtv.png"
                      alt="Your avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <textarea
                        value={post.commentText || ""}
                        onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                        placeholder="Viết bình luận..."
                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white text-sm"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => handleComment(post.id)}
                          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={() => handleSubmitComment(post.id)}
                          disabled={!post.commentText?.trim()}
                          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Bình luận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              {post.showCommentInput && post.commentsList && post.commentsList.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <div className="px-4 py-3">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {post.comments} bình luận
                    </h4>
                    <div className="space-y-3">
                      {post.commentsList.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3">
                          <Image
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="bg-white dark:bg-gray-600 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {comment.author.name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {comment.author.role}
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                  • {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-gray-900 dark:text-white mb-2">
                                {comment.content}
                              </p>
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => handleCommentLike(post.id, comment.id)}
                                  className={`flex items-center gap-1 text-xs transition-colors ${
                                    comment.isLiked
                                      ? "text-blue-600 font-medium"
                                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                  }`}
                                >
                                  <svg className={`w-3 h-3 ${comment.isLiked ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                  </svg>
                                  <span>Thích</span>
                                </button>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                  {comment.likes} lượt thích
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Tải thêm bài viết
          </button>
        </div>
      </div>
    </div>
  );
}
