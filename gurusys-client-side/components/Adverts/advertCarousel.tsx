import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IProps {
    singledAd: Object[];
}

const AdvertCarousel = ({ singledAd }: IProps) => {
    return (
        <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            swipeable={true}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            className="w-full"
        >
            {singledAd.map((ad: any) => (
                <a
                    href={ad.link}
                    key={ad._id}
                    target="_blank"
                    className="flex items-center justify-center min-h-[5rem] md:min-h-[10rem] max-h-[12rem] w-full"
                    style={{
                        backgroundImage: `url(${ad.imageUrl})`,
                        backgroundOrigin: "border-box",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                    }}
                />
            ))}
        </Carousel>
    );
};

export default AdvertCarousel;
