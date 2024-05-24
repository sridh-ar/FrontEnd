import html2canvas from "html2canvas";
import { useEffect } from "react";

export default function TeamImage({
  teamData,
  ownerData = [],
  handleDownload,
}) {
  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById("myHiddenDiv");
      html2canvas(element).then((canvas) => {
        const url = canvas.toDataURL();
        handleDownload(url);
      });
    }, 5000);
  }, []);

  return (
    <div
      id="myHiddenDiv"
      className="p-3 w-full flex items-center justify-between flex-wrap wrap absolute -z-10"
    >
      {ownerData.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <img
            src={ownerData[0].ownerphoto}
            alt="Rounded avatar"
            width={1000}
            height={1000}
            className="w-40 h-40 object-cover  m-2 rounded-full ring-2 ring-gray-300 p-0.5"
          />
          <p className="font-semibold capitalize my-2">
            {ownerData[0].owner}(Owner)
          </p>
        </div>
      )}

      {teamData.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center justify-center"
        >
          <img
            src={item.photo}
            alt="Rounded avatar"
            width={1000}
            height={1000}
            className="w-40 h-40 object-cover  m-2 rounded-full ring-2 ring-gray-300 p-0.5"
          />
          <p className="font-semibold capitalize my-2">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
