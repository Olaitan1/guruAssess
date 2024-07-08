import type { NextPage } from "next";
import Adverts from "../../components/Adverts";

const PriceAdsPage: NextPage = () => {
    return (
        <section className="flex flex-col items-center gap-8 w-full max-w-[100rem] mx-auto p-4 md:p-8">
            <Adverts advertPosition="Article1" />
            <div className="flex items-center justify-center bg-lightGrey text-center min-h-[30rem] max-w-[75rem] w-full shadow-[0px_10px_4px_1px] shadow-black rounded-lg">
                <div className="flex flex-col gap-5 text-black max-w-[57rem] w-full p-2">
                    <p>Hi There!</p>
                    <p>
                        Thank you for your interest in advertising with Eco
                        online blog.
                    </p>
                    <p>
                        Gurusys blog enjoys heavy traffic that is sure to
                        generate leads for you.
                    </p>
                    <p>
                        To place ads, first you need to get your ad banner
                        designed. Your add banner must be borderless, 1300pixels
                        wide and 200pixels tall with PNG, JPEG or GIF as its
                        formats. Once ready, reach out to us at&nbsp;
                        <a
                            href="mailto:networkblogsng@gmail.com.com"
                            className="text-blue"
                        >
                            networkblogsng@gmail.com
                        </a>
                        &nbsp;to take you further.
                    </p>
                    <p>
                        Please call&nbsp;
                        <a href="tel:+2348183322118" className="text-blue">
                            +2348183322118&nbsp;
                        </a>
                        for more info.
                    </p>
                    <p>Thanks.</p>
                </div>
            </div>
            <Adverts advertPosition="Article2" />
        </section>
    );
};

export default PriceAdsPage;
