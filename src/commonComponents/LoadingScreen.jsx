export default function LoadingScreen({ className, variant = 'gif' }) {
    if (variant === 'skeleton') {
        return (
            <div className={`z-50 flex h-full w-full flex-col p-4 gap-3 ${className}`} style={{ background: '#f0f4ff' }}>
                <style>{`@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}`}</style>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ ...sk.card, flex: 1 }}>
                            <div style={{ ...sk.box, width: 38, height: 38, borderRadius: 10 }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                                <div style={{ ...sk.box, height: 20, width: '50%' }} />
                                <div style={{ ...sk.box, height: 12, width: '70%' }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ ...sk.card, flex: 1, flexDirection: 'column', gap: 0, padding: 0, overflow: 'hidden' }}>
                    <div style={{ ...sk.box, height: 44, borderRadius: 0, margin: 0 }} />
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid #f1f5f9', alignItems: 'center', width: '100%' }}>
                            <div style={{ ...sk.box, width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
                            <div style={{ ...sk.box, height: 14, flex: 2, minWidth: 0 }} />
                            <div style={{ ...sk.box, height: 14, flex: 1, minWidth: 0 }} />
                            <div style={{ ...sk.box, height: 14, flex: 1, minWidth: 0 }} />
                            <div style={{ ...sk.box, height: 14, flex: 1, minWidth: 0 }} />
                            <div style={{ ...sk.box, height: 14, flex: 1, minWidth: 0 }} />
                            <div style={{ ...sk.box, height: 14, flex: 1, minWidth: 0 }} />
                            <div style={{ ...sk.box, height: 14, flex: 1, minWidth: 0 }} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`z-50 flex h-full w-full items-center justify-center ${className}`}>
            <img src="/loading.gif" alt="" className="w-24" />
        </div>
    );
}

const shimmer = {
    background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
    backgroundSize: '400px 100%',
    animation: 'shimmer 1.4s infinite linear',
};

const sk = {
    card: {
        background: '#fff', borderRadius: 12, padding: '0.85rem 1.1rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0',
    },
    box: { borderRadius: 6, ...shimmer },
};
