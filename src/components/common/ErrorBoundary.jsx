import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('TISUTA ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        try {
            localStorage.clear();
        } catch (e) { }
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#FDFBF7] text-[#121212] flex flex-col items-center justify-center p-6 text-center">
                    <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#D5B263]/40 shadow-2xl space-y-6">
                        <div className="w-16 h-16 rounded-full bg-[#121212] text-[#D5B263] flex items-center justify-center mx-auto text-xl font-bold font-serif-luxury">
                            T
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-widest text-[#D5B263] font-bold block">
                                TISUTA Luxury Studio
                            </span>
                            <h2 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                Session Optimization Required
                            </h2>
                            <p className="text-xs text-[#121212]/60 leading-relaxed font-light">
                                We detected an outdated cache state. Restoring museum-grade storefront parameters.
                            </p>
                        </div>
                        <button
                            onClick={this.handleReset}
                            className="w-full py-4 bg-[#121212] text-[#D5B263] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors cursor-pointer shadow-lg"
                        >
                            Reset Cache & Launch Storefront
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
