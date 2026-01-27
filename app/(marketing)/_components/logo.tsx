import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
})

const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image src={"/notion-dark.png"} alt="Logo" width={30} height={30} className="dark:hidden"/>
            <Image src={"/notion-light.png"} alt="Logo" width={30} height={30} className="hidden dark:block"/>
            <p className={cn("font-bold", font.className)}>Knowledge</p>
        </div>
    );
};

export default Logo;