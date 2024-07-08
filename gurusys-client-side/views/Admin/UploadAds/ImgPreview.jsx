import { useState, useEffect } from "react";
import Image from "next/image";

// interface IProps {
//     file: any;
//     fileName: string;
// }

const ImgPreview = ({ file, fileName }) => {
// const ImgPreview = ({ file, fileName }: IProps) => {
    const [imgAdPreview, setImgAdPreview] = useState("");

    // console.log(typeof file);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgAdPreview(reader.result);
                // setImgAdPreview(reader.result as string);
            };
            // console.log(imgAdPreview);
        }
    }, [file, imgAdPreview]);

    return (
            <Image src={imgAdPreview || file} alt={fileName} width={200} height={200} priority className="max-h-[10rem] h-full w-full" />
    );
};

export default ImgPreview;
