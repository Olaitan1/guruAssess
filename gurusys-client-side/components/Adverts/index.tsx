"use client";
import { fetcher } from "../../views/BlogsPage";
import useSWR from "swr";
import Error from "../../utils/Error";
import AdvertCarousel from "./advertCarousel";
import { IAdvert } from "../../types/advert";
import { Skeleton } from "@mui/material";

interface IProps {
    advertPosition: string;
}

const Adverts = ({ advertPosition }: IProps) => {
    const { data, error, isLoading } = useSWR("/adverts", fetcher);
    const adverts: IAdvert[] = data;

    if (error) return <Error />;

    const singledAd: IAdvert[] =
        adverts &&
        adverts.filter((advert: IAdvert) => advert.position === advertPosition);

    const advertStartDate =
        adverts &&
        singledAd.length > 0 &&
        new Date(
            singledAd[singledAd.length - 1].startDate,
        ).toLocaleDateString();
    const advertEndDate =
        adverts &&
        singledAd.length > 0 &&
        new Date(singledAd[singledAd.length - 1].endDate).toLocaleDateString();

    const todaysDate = new Date().toLocaleDateString();

    return (
        <>
            {isLoading ? (
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                        minHeight: "10rem",
                        maxHeight: "15rem",
                        width: "100%",
                    }}
                />
            ) : (singledAd.length > 0 &&
                  advertStartDate <= todaysDate &&
                  advertEndDate <= todaysDate) ||
              advertEndDate >= todaysDate ? (
                <AdvertCarousel singledAd={singledAd} />
            ) : (
                <div className="flex items-center justify-center w-full min-h-[10rem] max-h-[15rem] bg-deepGrey">
                    <h1 className="text-xl font-bold text-black">
                        Place Ads. Here
                    </h1>
                </div>
            )}
        </>
    );
};

export default Adverts;
