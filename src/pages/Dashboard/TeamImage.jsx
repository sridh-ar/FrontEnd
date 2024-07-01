import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import { fetchAPI } from '../../utils/commonServices';
import Button from '../../commonComponents/Button';
import LoadingScreen from '../../commonComponents/LoadingScreen';

export default function TeamImage({ teamData, closeModal }) {
    const [imagesData, setImagesData] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    async function fetchTeamImages(team_id) {
        const images = await fetchAPI(`/teamPlayer/team-photo-list/${team_id}`);
        if (!_.isEmpty(images)) {
            setImagesData(images);
            setisLoading(false);
        } else {
            toast.error('No Players Registered to this Team.');
            closeModal();
        }
    }
    useEffect(() => {
        fetchTeamImages(teamData[0].team_id);
    }, []);

    async function downloadImage() {
        console.log('here');
        const element = document.getElementById('myHiddenDiv');
        console.log(element);
        html2canvas(element).then((canvas) => {
            const url = canvas.toDataURL();
            console.log(url);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image.png';
            link.click();
        });
    }

    return (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen overflow-scroll bg-white p-5">
            {/* Loading Screen */}
            {isLoading && <LoadingScreen className="absolute z-[100] bg-white" />}

            <div id="myHiddenDiv" className="flex flex-wrap justify-center gap-5">
                <p className="my-2 mb-5 flex w-full justify-center text-center text-2xl font-bold">{teamData[0].team_name}</p>
                {imagesData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <img
                            src={item.player_photo}
                            alt="Rounded avatar"
                            className="m-2 h-40 w-40 rounded-full object-cover p-0.5 ring-2 ring-gray-300"
                        />
                        <p className="my-2 font-semibold capitalize">
                            {item.name}
                            {item.type != 'player' ? ` (${item.type})` : ''}
                        </p>
                    </div>
                ))}
            </div>
            <span className="my-4 flex w-full justify-center">
                <Button title="Download Image" className="text-white" onClick={downloadImage} />
                <Button title="Close" className="mx-4 bg-slate-300 text-black" onClick={closeModal} />
            </span>
        </div>
    );
}
