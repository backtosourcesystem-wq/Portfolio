import { useEffect, useRef, useState } from 'react';
import { Star, MessageCircle, User, Send, X, Quote, Sparkles, TrendingUp } from 'lucide-react';

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewsComments = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();
  const sectionRef = useRef<HTMLElement>(null);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reviews]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStarClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.rating || !formData.comment) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setFormData({ name: '', rating: 0, comment: '' });
        setIsFormOpen(false);
        fetchReviews();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starNumber = i + 1;
      const isFilled = interactive
        ? (hoverRating || formData.rating) >= starNumber
        : rating >= starNumber;

      return (
        <Star
          key={i}
          className={`h-6 w-6 transition-all duration-300 ${
            isFilled ? 'text-orange-500 fill-orange-500 scale-110' : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:scale-125' : ''}`}
          onClick={interactive ? () => handleStarClick(starNumber) : undefined}
          onMouseEnter={interactive ? () => handleStarHover(starNumber) : undefined}
          onMouseLeave={interactive ? handleStarLeave : undefined}
        />
      );
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} months ago`;
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-white via-orange-50/40 to-slate-50/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-600/10 to-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-slate-400/5 to-slate-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full mb-6 backdrop-blur-sm border border-orange-200/20">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">Client Testimonials</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-orange-600 to-black bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Read genuine reviews from our satisfied clients and see how we've transformed their businesses.
          </p>

          {reviews.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-6 w-6 text-orange-500 fill-orange-500" />
                  <span className="text-3xl font-bold text-black">{averageRating}</span>
                </div>
                <p className="text-sm text-slate-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                  <span className="text-3xl font-bold text-black">{reviews.length}</span>
                </div>
                <p className="text-sm text-slate-600">Total Reviews</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-6 w-6 text-orange-700" />
                  <span className="text-3xl font-bold text-black">100%</span>
                </div>
                <p className="text-sm text-slate-600">Satisfaction</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {reviews.length > 0 ? (
              <div className="relative h-[450px] flex items-center justify-center">
                <div className="relative w-full max-w-lg h-full">
                  {reviews.map((review, index) => {
                    const isActive = index === currentReviewIndex;
                    const isPrev = index === (currentReviewIndex - 1 + reviews.length) % reviews.length;
                    const isNext = index === (currentReviewIndex + 1) % reviews.length;

                    return (
                      <div
                        key={review._id}
                        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
                          isActive
                            ? 'translate-x-0 opacity-100 scale-100 z-20 rotate-0'
                            : isPrev
                            ? '-translate-x-full opacity-0 scale-90 z-10 -rotate-3'
                            : isNext
                            ? 'translate-x-full opacity-0 scale-90 z-10 rotate-3'
                            : 'translate-x-full opacity-0 scale-85 z-0'
                        }`}
                      >
                        <div className="h-full bg-white rounded-3xl shadow-2xl p-10 border border-slate-200/50 relative overflow-hidden hover:shadow-3xl transition-shadow duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-orange-600/5 to-slate-900/5 pointer-events-none"></div>
                          
                          <Quote className="absolute top-8 right-8 h-16 w-16 text-orange-200/40 -rotate-12" />
                          
                          <div className="absolute top-6 left-6 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                          <div className="absolute bottom-10 right-10 w-3 h-3 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                          <div className="flex flex-col h-full relative z-10">
                            <div className="flex mb-6 gap-1">
                              {renderStars(review.rating)}
                            </div>

                            <div className="flex-1 mb-8">
                              <p className="text-slate-700 text-lg leading-relaxed">
                                "{review.comment}"
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-orange-600 to-slate-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {review.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                  <p className="font-bold text-black text-lg">{review.name}</p>
                                  <p className="text-sm text-slate-500">{getTimeAgo(review.createdAt)}</p>
                                </div>
                              </div>
                              <MessageCircle className="h-7 w-7 text-orange-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewIndex(index)}
                      className={`rounded-full transition-all duration-500 ${
                        index === currentReviewIndex
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-12 h-3 shadow-lg'
                          : 'bg-slate-300 hover:bg-slate-400 w-3 h-3'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[450px] flex items-center justify-center">
                <div className="text-center">
                  <div className="relative mb-6">
                    <MessageCircle className="h-20 w-20 text-slate-300 mx-auto animate-pulse" />
                    <Sparkles className="h-8 w-8 text-orange-500 absolute top-0 right-1/3 animate-bounce" />
                  </div>
                  <p className="text-slate-700 text-xl font-medium">No reviews yet</p>
                  <p className="text-slate-500 mt-2">Be the first to share your experience!</p>
                </div>
              </div>
            )}
          </div>

          <div className={`text-center lg:text-left transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-slate-200/50 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-orange-600/5 to-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full mb-6">
                  <Star className="h-4 w-4 text-orange-600 fill-orange-600 animate-pulse" />
                  <span className="text-sm font-semibold text-orange-700">Your Feedback Matters</span>
                </div>

                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-black to-orange-600 bg-clip-text text-transparent">
                  Share Your Experience
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed text-lg">
                  Tell us about your journey with us. Your feedback helps us improve and helps other clients make informed decisions.
                </p>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="group/btn inline-flex items-center gap-3 px-10 py-5 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Star className="h-6 w-6 group-hover/btn:rotate-180 transition-transform duration-500" />
                  <span>Write a Review</span>
                  <Send className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span>Verified Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span>100% Authentic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-10 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-black mb-2">Write a Review</h3>
                    <p className="text-slate-600">Share your thoughts with us</p>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="p-3 hover:bg-orange-100 rounded-full transition-all duration-300 hover:rotate-90"
                  >
                    <X className="h-6 w-6 text-slate-600" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-800 mb-3">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 outline-none"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-3">
                      Rating *
                    </label>
                    <div className="flex justify-center lg:justify-start gap-2 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                      {renderStars(0, true)}
                    </div>
                    <p className="text-sm text-slate-600 mt-3 font-medium">
                      {formData.rating > 0 ? (
                        <span className="text-orange-600">
                          {formData.rating} star{formData.rating > 1 ? 's' : ''} selected
                        </span>
                      ) : (
                        'Tap to select a rating'
                      )}
                    </p>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-800 mb-3">
                      Your Comment *
                    </label>
                    <textarea
                      required
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none outline-none"
                      rows={5}
                      placeholder="Tell us about your experience..."
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      {formData.comment.length} characters
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitLoading}
                    className="w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group/submit"
                  >
                    {submitLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover/submit:translate-x-1 transition-transform duration-300" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsComments;