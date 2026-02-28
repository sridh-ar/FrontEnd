import { useRef, useState } from 'react';
import ReactCrop, { convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from '../utils/setCanvasPreview';
import 'react-image-crop/dist/ReactCrop.css';
import ModalWrapper from './ModalWrapper';

const ASPECT_RATIO = 1;

export default function ImageCropper({ uploadedFile, onChange, closeModal }) {
    const [crop, setCrop] = useState({});
    const imgRef = useRef();
    const previewCanvasRef = useRef();

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropSize = Math.min(width, height);
        setCrop(makeAspectCrop(
            { unit: 'px', width: cropSize, height: cropSize, x: (width - cropSize) / 2, y: (height - cropSize) / 2 },
            ASPECT_RATIO, width, height,
        ));
    };

    return (
        <ModalWrapper>
            <div style={cs.box}>
                <p style={cs.title}>Crop Photo</p>
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)} circularCrop aspect={1}>
                    <img src={uploadedFile} onLoad={onImageLoad} ref={imgRef} crossOrigin="anonymous" style={{ maxHeight: '60vh', objectFit: 'contain' }} />
                </ReactCrop>
                <div style={cs.btnRow}>
                    <button style={cs.btnCrop} onClick={async () => {
                        setCanvasPreview(imgRef.current, previewCanvasRef.current, convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height));
                        const dataUrl = previewCanvasRef.current.toDataURL();
                        const blob = await fetch(dataUrl).then((res) => res.blob());
                        onChange({ target: { name: 'player_photo', files: [blob] } });
                        closeModal();
                    }}>Crop & Use</button>
                    <button style={cs.btnCancel} onClick={closeModal}>Cancel</button>
                </div>
                <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
            </div>
        </ModalWrapper>
    );
}

const cs = {
    box: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 40%, #16213e 100%)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
        padding: '1.5rem', maxWidth: '90vw', boxSizing: 'border-box',
    },
    title: { color: '#fff', fontWeight: '700', fontSize: '1rem', margin: 0 },
    btnRow: { display: 'flex', gap: '0.75rem', width: '100%' },
    btnCrop: {
        flex: 1, padding: '12px', borderRadius: '999px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)', color: '#fff',
        fontWeight: '700', fontSize: '0.95rem',
    },
    btnCancel: {
        padding: '12px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)',
        background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.9rem',
    },
};
