import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle2, Sliders, MessageSquarePlus, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CustomerReviewsSection = ({ product }) => {
    const { user } = useShop();

    // Default mock initial reviews for this product
    const [reviews, setReviews] = useState([
        {
            id: 'rev-1',
            author: 'Rhea Kapoor',
            location: 'Mumbai',
            date: '28 Sep 2026',
            rating: 5,
            verified: true,
            fitFeedback: 'True to Size',
            title: 'Exquisite Silk Texture & Flawless Drape',
            comment: 'The quality of the mulberry silk is unmatched. I wore this to an evening gala in South Mumbai and received countless compliments. Fits like a glove.',
            helpfulCount: 24,
            userLiked: false,
            tags: ['Fabric Quality', 'Red Carpet Ready']
        },
        {
            id: 'rev-2',
            author: 'Priya Sharma',
            location: 'New Delhi',
            date: '15 Sep 2026',
            rating: 5,
            verified: true,
            fitFeedback: 'True to Size',
            title: 'Royal Packaging & Bespoke Stitching',
            comment: 'Delivered in a velvet-lined box with gold foil lettering. Stitching detail is high-end atelier tier. Will definitely buy again from Tisuta Privé.',
            helpfulCount: 18,
            userLiked: false,
            tags: ['Premium Packaging', 'Fast Shipping']
        },
        {
            id: 'rev-3',
            author: 'Ananya Deshmukh',
            location: 'Bengaluru',
            date: '02 Aug 2026',
            rating: 4,
            verified: true,
            fitFeedback: 'Slightly Large',
            title: 'Beautiful Garment, Recommend Sizing Down',
            comment: 'Sensational silk drape. Slightly longer at the hem than expected, but paired with heels it was perfection. 3D Virtual Fit was very accurate!',
            helpfulCount: 9,
            userLiked: false,
            tags: ['True Fit']
        }
    ]);

    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    // New review form state
    const [newRating, setNewRating] = useState(5);
    const [newFit, setNewFit] = useState('True to Size');
    const [newTitle, setNewTitle] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newAuthor, setNewAuthor] = useState(user?.name || 'Verified Buyer');

    // Filter reviews
    const filteredReviews = reviews.filter(r => {
        if (activeFilter === '5star') return r.rating === 5;
        if (activeFilter === 'verified') return r.verified;
        return true;
    });

    const handleUpvote = (revId) => {
        setReviews(prev =>
            prev.map(r => {
                if (r.id === revId) {
                    return {
                        ...r,
                        helpfulCount: r.userLiked ? r.helpfulCount - 1 : r.helpfulCount + 1,
                        userLiked: !r.userLiked
                    };
                }
                return r;
            })
        );
    };

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newComment.trim()) return;

        const createdReview = {
            id: `rev-${Date.now()}`,
            author: newAuthor,
            location: 'India',
            date: 'Just now',
            rating: newRating,
            verified: true,
            fitFeedback: newFit,
            title: newTitle,
            comment: newComment,
            helpfulCount: 0,
            userLiked: false,
            tags: ['Customer Review']
        };

        setReviews([createdReview, ...reviews]);
        setIsWriteModalOpen(false);
        setNewTitle('');
        setNewComment('');
    };

    return (
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 space-y-8 shadow-sm">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059] block">
                        Myntra & Ajio Verified Reviews
                    </span>
                    <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
                        Customer Ratings & Reviews
                    </h2>
                </div>

                <button
                    onClick={() => setIsWriteModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white hover:bg-[#C5A059] hover:text-stone-900 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer"
                >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Write a Review</span>
                </button>
            </div>

            {/* Ratings Summary Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-stone-50 p-6 rounded-2xl border border-stone-200/80">
                {/* Score */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 pr-0 md:pr-6">
                    <div className="text-5xl sm:text-6xl font-extrabold text-stone-900 font-serif-luxury">
                        {product.rating || 4.9}
                    </div>
                    <div className="flex items-center text-[#C5A059] my-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#C5A059]" />
                        ))}
                    </div>
                    <p className="text-xs font-semibold text-stone-600">
                        Based on {reviews.length + (product.reviewCount || 100)} verified buyer ratings
                    </p>
                </div>

                {/* Rating Distribution Histogram */}
                <div className="md:col-span-5 space-y-2 border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 pr-0 md:pr-6">
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2">
                        Rating Distribution
                    </span>
                    {[
                        { stars: '5★', pct: '88%' },
                        { stars: '4★', pct: '9%' },
                        { stars: '3★', pct: '2%' },
                        { stars: '2★', pct: '1%' },
                        { stars: '1★', pct: '0%' }
                    ].map(bar => (
                        <div key={bar.stars} className="flex items-center gap-3 text-xs font-medium">
                            <span className="w-6 text-stone-600">{bar.stars}</span>
                            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#C5A059] rounded-full" style={{ width: bar.pct }} />
                            </div>
                            <span className="w-8 text-right text-stone-500 text-[11px]">{bar.pct}</span>
                        </div>
                    ))}
                </div>

                {/* Sizing & Fit Feedback Sentiment */}
                <div className="md:col-span-3 space-y-3 flex flex-col justify-center">
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                        Sizing & Fit Feedback
                    </span>

                    <div className="space-y-2 text-xs">
                        <div>
                            <div className="flex justify-between font-semibold text-stone-800">
                                <span>True to Size</span>
                                <span className="text-[#C5A059] font-bold">88%</span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mt-1">
                                <div className="h-full bg-emerald-600 rounded-full w-[88%]" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-stone-600 text-[11px]">
                                <span>Runs Slightly Large</span>
                                <span>8%</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-stone-600 text-[11px]">
                                <span>Runs Small</span>
                                <span>4%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Filters */}
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 pb-4">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-2">Filter Reviews:</span>
                {[
                    { id: 'all', label: `All (${reviews.length})` },
                    { id: 'verified', label: 'Verified Buyers' },
                    { id: '5star', label: '5 Star Rating' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveFilter(tab.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeFilter === tab.id
                                ? 'bg-stone-900 text-[#C5A059]'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-6">
                {filteredReviews.map((rev) => (
                    <div
                        key={rev.id}
                        className="p-6 bg-white border border-stone-200 rounded-2xl space-y-4 hover:border-[#C5A059]/40 transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-stone-900 font-bold flex items-center justify-center text-sm border border-[#C5A059]">
                                    {rev.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-stone-900 text-sm">{rev.author}</h4>
                                        {rev.verified && (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                <CheckCircle2 className="w-3 h-3" />
                                                <span>Verified Buyer</span>
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-stone-400 font-light">{rev.location} · {rev.date}</p>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center text-[#C5A059]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < rev.rating ? 'fill-[#C5A059]' : 'text-stone-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="px-2 py-0.5 bg-stone-100 text-stone-800 text-[10px] font-bold rounded">
                                    Fit: {rev.fitFeedback}
                                </span>
                            </div>
                        </div>

                        {/* Title & Comment */}
                        <div className="space-y-1.5">
                            <h5 className="font-serif-luxury text-lg font-bold text-stone-900">
                                {rev.title}
                            </h5>
                            <p className="text-sm text-stone-600 leading-relaxed font-light">
                                {rev.comment}
                            </p>
                        </div>

                        {/* Footer tags & upvotes */}
                        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                            <div className="flex items-center gap-2">
                                {rev.tags.map(t => (
                                    <span key={t} className="text-[10px] text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full font-medium">
                                        #{t}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() => handleUpvote(rev.id)}
                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${rev.userLiked
                                        ? 'bg-[#C5A059]/20 text-stone-900 border border-[#C5A059]'
                                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                                    }`}
                            >
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>Helpful ({rev.helpfulCount})</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Write Review Modal */}
            {isWriteModalOpen && (
                <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-stone-200 animate-in fade-in zoom-in-95">
                        <button
                            onClick={() => setIsWriteModalOpen(false)}
                            className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-900 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                                Share Your Experience
                            </span>
                            <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                                Write a Customer Review
                            </h3>
                        </div>

                        <form onSubmit={handleAddReview} className="space-y-4">
                            {/* Star Selection */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                                    Your Rating
                                </label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button
                                            type="button"
                                            key={s}
                                            onClick={() => setNewRating(s)}
                                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                                        >
                                            <Star
                                                className={`w-7 h-7 ${s <= newRating ? 'fill-[#C5A059] text-[#C5A059]' : 'text-stone-300'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fit Selection */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                                    Fit Recommendation
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Runs Small', 'True to Size', 'Runs Large'].map(f => (
                                        <button
                                            type="button"
                                            key={f}
                                            onClick={() => setNewFit(f)}
                                            className={`py-2 text-xs font-bold rounded-xl border transition-all ${newFit === f
                                                    ? 'bg-stone-900 text-[#C5A059] border-stone-900'
                                                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Review Title */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                                    Review Headline
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Sensational silk drape & premium fit"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C5A059]"
                                />
                            </div>

                            {/* Detailed Comment */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                                    Detailed Feedback
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Share details about the fabric quality, stitching, drape, and occasion..."
                                    value={newComment}
                                    onChange={e => setNewComment(e.target.value)}
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C5A059]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-[#C5A059] text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-stone-900 hover:text-white transition-all shadow-lg cursor-pointer"
                            >
                                Submit Verified Review
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CustomerReviewsSection;
