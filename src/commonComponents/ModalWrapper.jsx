export default function ModalWrapper({ children, closing }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)', padding: '1rem',
            animation: `${closing ? 'backdropOut' : 'backdropIn'} 0.22s ease both`,
        }}>
            <style>{`
                @keyframes backdropIn{from{opacity:0}to{opacity:1}}
                @keyframes backdropOut{from{opacity:1}to{opacity:0}}
            `}</style>
            {children}
        </div>
    );
}
