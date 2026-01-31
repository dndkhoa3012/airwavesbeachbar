"use client";
import React from "react";
import Link from "next/link";

export default function CollectionPage() {
    const galleryImages = [
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuANPwTyjbQsQoknQ34V8LK86yJ0mYfmdveyvs3Vybc6MLBFdkMIQpQ3cLUUp2qrLLbVOs0PjvbHFXm4YNg7lbvEg5fv6X2UBPuAdrfHwPS8JJpOCAO7gK4kImsGGgFUasyN24CY4yNKG4K0IHhT5KsDe_goSJuOuaOR2qPiuDIRRaCZJ-zpJ2a8jf3uII6zeOhB8DV79trJDH5v9eBrvqJlm0xR5r0yFpl4syheDdXQ1UXHhv35Ag49mF1gpmXQWknMFhuFUIpoMHU",
            alt: "Sunset view at Airwave",
            size: "large"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT2A9ZQvkrUrPokTzNKj6RZqhrdt2qR5N-ePw7mfsf3fM1wzpSk3wOHPY9LJcXi0wo6jgB3uG3y4GJFkD8klCGE6W8pbSxS-_HfELVkygCPKKjI3cjtKce7Vg2BnHf_nla3yE5-MNRBz0MpIsjMoPe7PnQ7hbZdcaPYikN-1dCJ5xVojbamu6RD_lLojhBviu2Zpv64kwfXFE53d-R02x4WRNJPNc4VdTpnreE1TB6QTK6xXsX5wTmEmwJf2S1UZAzgItl2gzBe6I",
            alt: "Signature Cocktails",
            size: "small"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrN38An2vv-nOQNJVLTcsKyfHiCbljRpe_lUrOeDyRr5u9HsrbzCrrf19UaTcGpC8oVdF8oGlzYe8dEk3Q5Mmld5Pdh73JlidxTfhcRp9xXHoeT8ARQeC3aAumnEKsCxlNsdUBUFyW436-4CtxAO1To8EVV7jK4AxbXE1LPKieLalwhZYePdwU7z2oi_1amsJsItmbYK-v7ZZnRKYsPOQPHwEPDM5ee9Sci8BT67QhDpGr9XjeSR8nBxpyi1WGs71oC-702fXdV74",
            alt: "Night Beach Party",
            size: "medium"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyGaXFQQGecI8XGAVsmWDsKDnHVS6qGSaafIChAJUOdLsOG6k6m7GWp-pTCY1U-4kYOnMMtLsey_DinWdTsn3io45onSekgZ8064wjOfFe3fqg_HqgWC0RmeZr949bpxGgLcufs9oYN_0k4tdK13kQezGJxEIR2r22pzpqZ3FvBF88EdPgBMmx7KWH_qNL3OX6Ohzc3JWKMxpHqn2Dv8fk_idzLkWPGyrs_OKLAfqK7eIQTG43AJIEEIN0jj-UowexQYPy3g6LaUo",
            alt: "Professional Bartender",
            size: "medium"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHAOYGUQXqX03Gq8KbIDkAjBLaHXoS5eGdpu-YwV5TaNF8Un9GVFlJV1xsyHT1Qoyrw7GCUTvZlK-zJSxG97A6BO8b-hGjUb-R60fc6mrB4OiUK7CHA9vIG0qbZIblKuCb2ofkX24omz9W-M7B8X0740pxr1eVESVbDQct9twP5UOFCDF8ZrNSPttDdvyt0LZZ4NVMD492deSpxH53IHi0TGn7fwsKmAOE7w8gzYvn_UW-gCaYdPB5P6B7lwxQnE6PoIw7-F1m3pg",
            alt: "DJ Live Performance",
            size: "small"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZZbq06yMIJiyptrBKGwGUo3ZT4sHsLVnQ2vDmlZKgQtC9_7tlIVjxOF8HEj3qxfPc83a2-7dx5fcqd_OSEWUhPcrxVxKs0ZrQx1VrKc8ZpzreR6jijNLfcr8fJy_o0LRRg9P2sdO68fGBTwh_CAsMlwRnqEQTxs3SEaGG9N82Yn9jeJ_xi4hDlsgkQblaVQkvPiYs_EwtP6upbC_M72p621wuwGNrCIqnH2zWWK6FFbcS8OrTNFLHhdhpSVGp7Lj5rC8GrxupwE",
            alt: "Blue Ocean Waves",
            size: "large"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2c-Nu0EDvE5QrwZs55x-9T4shwjB2uDCkpSPCyfwUSGLnLqB277DA5vi0JpIpQujen2S7vpPxAaU3xnnnndO9mu5Jjc8tMJEj8joTh2RTugtnX2t9Kwu3jiVs2I2plUwDfP2aHahIBJ78znh6uv-8B2ysfHaD1dXLTQc-n9r9dYS8pvp_QfE8P0UdTYadAbrp-HZVIt5LKHRfqnXr6U_uRWxr3BDLHZThBpk8ALfrNrtub81w8AdlfJs0PyN0NrYNdTsKhpplSSU",
            alt: "Vibrant Nightlife",
            size: "medium"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9ICrki5HvnnCkCyY3bZ8hFCg7Ze4roHFI8N-b5zfDBhuNlVN87c6CanvzjULUIVEf3o8U9qmcSEDaB0KogsZ_OFlbFBIjLIk0Xk2TEOCFJsc4iA0HcXKPosE39PZV49YzzqHjRP7HGvreTG_-wk_F0dIZYHgFMFr1NT9tLz3Wue6Qrq5TRYfUnQ7_VmuJcU_MP4Q_z6nm6ukt_wUvjmKSYnX6YXwaPs4W6ECNAwDCe0OKEym1OHt5LGRy8CPAuB96eGQ--PWj-lw",
            alt: "Live Acoustic Band",
            size: "small"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Dramatic Hero Section */}
            {/* Hero Section */}
            <div className="px-4 pt-6 md:px-10 lg:px-40 bg-slate-50 flex justify-center">
                <div className="relative w-full max-w-[1200px] h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200">
                    <img
                        alt="Airwaves Collection"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZZbq06yMIJiyptrBKGwGUo3ZT4sHsLVnQ2vDmlZKgQtC9_7tlIVjxOF8HEj3qxfPc83a2-7dx5fcqd_OSEWUhPcrxVxKs0ZrQx1VrKc8ZpzreR6jijNLfcr8fJy_o0LRRg9P2sdO68fGBTwh_CAsMlwRnqEQTxs3SEaGG9N82Yn9jeJ_xi4hDlsgkQblaVQkvPiYs_EwtP6upbC_M72p621wuwGNrCIqnH2zWWK6FFbcS8OrTNFLHhdhpSVGp7Lj5rC8GrxupwE"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="w-full py-16 bg-white">
                <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">

                        {/* Title Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Bộ Sưu Tập</h1>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Những khoảnh khắc đáng nhớ tại Airwaves Beach Bar.</p>
                        </div>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {galleryImages.map((img, index) => (
                                <div key={index} className="break-inside-avoid relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-20">
                                        <h3 className="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {img.alt}
                                        </h3>
                                        <div className="w-10 h-1 bg-primary mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    </div>

                                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-[-10px] group-hover:translate-y-0">
                                        <div className="size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                            <span className="material-symbols-outlined">fullscreen</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
