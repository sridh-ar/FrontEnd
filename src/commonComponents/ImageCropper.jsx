import { useRef, useState } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from '../utils/setCanvasPreview';
import 'react-image-crop/dist/ReactCrop.css';
import Button from './Button';
import ModalWrapper from './ModalWrapper';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function ImageCropper({ uploadedFile, onChange, closeModal }) {
    const [crop, setCrop] = useState({});
    const imgRef = useRef();
    const previewCanvasRef = useRef();

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;

        // Determine the size of the square crop based on the smaller dimension
        const cropSize = Math.min(width, height);

        const crop = makeAspectCrop(
            {
                unit: 'px', // Using pixels for precise size control
                width: cropSize,
                height: cropSize,
                x: (width - cropSize) / 2, // Center the crop horizontally
                y: (height - cropSize) / 2, // Center the crop vertically
            },
            ASPECT_RATIO,
            width,
            height,
        );

        setCrop(crop);
    };

    return (
        <ModalWrapper>
            <div className="relative z-50 flex flex-col items-center overflow-hidden rounded bg-white p-10">
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)} circularCrop aspect={1}>
                    <img src={uploadedFile} onLoad={(e) => onImageLoad(e)} ref={imgRef} className="h-96 object-contain" />
                </ReactCrop>
                <div>
                    <Button
                        title="Crop Image"
                        className="mt-5 text-white"
                        onClick={async () => {
                            setCanvasPreview(
                                imgRef.current, // HTMLImageElement
                                previewCanvasRef.current, // HTMLCanvasElement
                                convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
                            );
                            const dataUrl = previewCanvasRef.current.toDataURL();
                            const blob = await fetch(dataUrl).then((res) => res.blob());
                            console.log(blob);
                            onChange({
                                target: {
                                    name: 'player_photo',
                                    files: [blob],
                                },
                            });
                            closeModal();
                        }}
                    />
                    <Button title="Cancel" onClick={closeModal} className="ml-3 bg-slate-200" />
                </div>

                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: 'none',
                        border: '1px solid black',
                        objectFit: 'contain',
                        width: 150,
                        height: 150,
                    }}
                />
            </div>
        </ModalWrapper>
    );
}
