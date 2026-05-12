import { useEffect, useRef } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import LinkIcon from "../icons/LinkIcon";
import ShareIcon from "../icons/ShareIcon";

interface cardprops {
  title: string;
  type: "tweet" | "youtube";
  link: string;
}

const Card = ({ title, type, link }: cardprops) => {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const render = () => {
      (window as any).twttr?.widgets?.load(tweetRef.current);
    };
    render();
    // if (!(window as any).twttr) {
    //   const script = document.createElement("script");
    //   script.src = "https://platform.twitter.com/widgets.js";
    //   script.async = true;
    //   script.charset = "utf-8";
    //   script.onload = render;
    //   document.body.appendChild(script);
    // } else {
    //   render();
    // }
  }, []);

  return (
    <div className="m-2 p-3 w-72 h-64 border border-gray-200 bg-white shadow-sm rounded-md flex flex-col">
      {/* Header — fixed height, never shrinks */}
      <div className="flex justify-between items-center shrink-0 mb-2">
        <div className="flex items-center gap-2 text-gray-500">
          <LinkIcon />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <div className="flex gap-2 text-gray-500">
          <ShareIcon size="md" />
          <DeleteIcon />
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-md">
        {type === "youtube" && (
          <iframe
            className="w-full h-48 mt-3"
            width="560"
            height="315"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
                  autoplay;
                   clipboard-write;
                    encrypted-media;
                    gyroscope; picture-in-picture;
                    web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "tweet" && (
          <div
            ref={tweetRef}
            className="w-full h-full overflow-hidden"
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <blockquote
              className="twitter-tweet"
              data-width="260"
              data-chrome="noheader nofooter noborders"
            >
              <a href={link}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

// import DeleteIcon from "../icons/DeleteIcon";
// import LinkIcon from "../icons/LinkIcon";
// import ShareIcon from "../icons/ShareIcon";

// // const Card = () => {
// //   return (
// //     <div className="m-2 p-2  w-80 h-64 border border-gray-200  bg-white  shadow-sm rounded-md">
// //       <div className="flex justify-between">
// //         <div className="flex items-center">
// //           <div className="pr-2  text-gray-500">
// //             <LinkIcon />
// //           </div>
// //           <div>Project Ideas</div>
// //         </div>

// //         <div className="flex pr-2 text-gray-500 ">
// //           <div className="pr-2 ">
// //             <ShareIcon size="md" />
// //           </div>
// //           <div>
// //             <DeleteIcon />
// //           </div>
// //         </div>
// //       </div>
// //       {/* <iframe
// //         className="w-full h-48 mt-3"
// //         width="560"
// //         height="315"
// //         src="https://www.youtube.com/embed/oOvURgHcd4w?si=PaA72HGMtUvx1kkH"
// //         title="YouTube video player"
// //         frameBorder="0"
// //         allow="accelerometer;
// //                   autoplay;
// //                    clipboard-write;
// //                     encrypted-media;
// //                     gyroscope; picture-in-picture;
// //                     web-share"
// //         referrerPolicy="strict-origin-when-cross-origin"
// //         allowFullScreen
// //       ></iframe> */}
// //       <div className="max-h-48 overflow-y-auto">
// //         <blockquote className="twitter-tweet">
// //           <a href="https://x.com/nandini__bagga/status/2053012195651559651"></a>
// //         </blockquote>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Card;
