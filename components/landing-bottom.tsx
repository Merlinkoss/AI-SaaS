import Link from "next/link";

const LandingBottom = () => {
    return (
        <div className="py-20 px-10 grid grid-cols-4">
            <Link href="https://discord.gg/7RBrxupv">
                <div className="text-zinc-400 text-xs md:text-sm font-normal">
                    Support
                </div>
            </Link>

            <Link href="/privacy.html">
                <div className="text-zinc-400 text-xs md:text-sm font-normal">
                    Privacy policy
                </div>
            </Link>

        </div>
    );
};

export default LandingBottom;