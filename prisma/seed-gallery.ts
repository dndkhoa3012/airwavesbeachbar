import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialImages = [
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuANPwTyjbQsQoknQ34V8LK86yJ0mYfmdveyvs3Vybc6MLBFdkMIQpQ3cLUUp2qrLLbVOs0PjvbHFXm4YNg7lbvEg5fv6X2UBPuAdrfHwPS8JJpOCAO7gK4kImsGGgFUasyN24CY4yNKG4K0IHhT5KsDe_goSJuOuaOR2qPiuDIRRaCZJ-zpJ2a8jf3uII6zeOhB8DV79trJDH5v9eBrvqJlm0xR5r0yFpl4syheDdXQ1UXHhv35Ag49mF1gpmXQWknMFhuFUIpoMHU",
        alt: "Sunset view at Airwave"
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT2A9ZQvkrUrPokTzNKj6RZqhrdt2qR5N-ePw7mfsf3fM1wzpSk3wOHPY9LJcXi0wo6jgB3uG3y4GJFkD8klCGE6W8pbSxS-_HfELVkygCPKKjI3cjtKce7Vg2BnHf_nla3yE5-MNRBz0MpIsjMoPe7PnQ7hbZdcaPYikN-1dCJ5xVojbamu6RD_lLojhBviu2Zpv64kwfXFE53d-R02x4WRNJPNc4VdTpnreE1TB6QTK6xXsX5wTmEmwJf2S1UZAzgItl2gzBe6I",
        alt: "Signature Cocktails"
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrN38An2vv-nOQNJVLTcsKyfHiCbljRpe_lUrOeDyRr5u9HsrbzCrrf19UaTcGpC8oVdF8oGlzYe8dEk3Q5Mmld5Pdh73JlidxTfhcRp9xXHoeT8ARQeC3aAumnEKsCxlNsdUBUFyW436-4CtxAO1To8EVV7jK4AxbXE1LPKieLalwhZYePdwU7z2oi_1amsJsItmbYK-v7ZZnRKYsPOQPHwEPDM5ee9Sci8BT67QhDpGr9XjeSR8nBxpyi1WGs71oC-702fXdV74",
        alt: "Night Beach Party"
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyGaXFQQGecI8XGAVsmWDsKDnHVS6qGSaafIChAJUOdLsOG6k6m7GWp-pTCY1U-4kYOnMMtLsey_DinWdTsn3io45onSekgZ8064wjOfFe3fqg_HqgWC0RmeZr949bpxGgLcufs9oYN_0k4tdK13kQezGJxEIR2r22pzpqZ3FvBF88EdPgBMmx7KWH_qNL3OX6Ohzc3JWKMxpHqn2Dv8fk_idzLkWPGyrs_OKLAfqK7eIQTG43AJIEEIN0jj-UowexQYPy3g6LaUo",
        alt: "Professional Bartender"
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHAOYGUQXqX03Gq8KbIDkAjBLaHXoS5eGdpu-YwV5TaNF8Un9GVFlJV1xsyHT1Qoyrw7GCUTvZlK-zJSxG97A6BO8b-hGjUb-R60fc6mrB4OiUK7CHA9vIG0qbZIblKuCb2ofkX24omz9W-M7B8X0740pxr1eVESVbDQct9twP5UOFCDF8ZrNSPttDdvyt0LZZ4NVMD492deSpxH53IHi0TGn7fwsKmAOE7w8gzYvn_UW-gCaYdPB5P6B7lwxQnE6PoIw7-F1m3pg",
        alt: "DJ Live Performance"
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZZbq06yMIJiyptrBKGwGUo3ZT4sHsLVnQ2vDmlZKgQtC9_7tlIVjxOF8HEj3qxfPc83a2-7dx5fcqd_OSEWUhPcrxVxKs0ZrQx1VrKc8ZpzreR6jijNLfcr8fJy_o0LRRg9P2sdO68fGBTwh_CAsMlwRnqEQTxs3SEaGG9N82Yn9jeJ_xi4hDlsgkQblaVQkvPiYs_EwtP6upbC_M72p621wuwGNrCIqnH2zWWK6FFbcS8OrTNFLHhdhpSVGp7Lj5rC8GrxupwE",
        alt: "Blue Ocean Waves"
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2c-Nu0EDvE5QrwZs55x-9T4shwjB2uDCkpSPCyfwUSGLnLqB277DA5vi0JpIpQujen2S7vpPxAaU3xnnnndO9mu5Jjc8tMJEj8joTh2RTugtnX2t9Kwu3jiVs2I2plUwDfP2aHahIBJ78znh6uv-8B2ysfHaD1dXLTQc-n9r9dYS8pvp_QfE8P0UdTYadAbrp-HZVIt5LKHRfqnXr6U_uRWxr3BDLHZThBpk8ALfrNrtub81w8AdlfJs0PyN0NrYNdTsKhpplSSU",
        alt: "Vibrant Nightlife"
    },
    {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9ICrki5HvnnCkCyY3bZ8hFCg7Ze4roHFI8N-b5zfDBhuNlVN87c6CanvzjULUIVEf3o8U9qmcSEDaB0KogsZ_OFlbFBIjLIk0Xk2TEOCFJsc4iA0HcXKPosE39PZV49YzzqHjRP7HGvreTG_-wk_F0dIZYHgFMFr1NT9tLz3Wue6Qrq5TRYfUnQ7_VmuJcU_MP4Q_z6nm6ukt_wUvjmKSYnX6YXwaPs4W6ECNAwDCe0OKEym1OHt5LGRy8CPAuB96eGQ--PWj-lw",
        alt: "Live Acoustic Band"
    }
];

async function main() {
    console.log(`Starting gallery seed...`);

    // Check if gallery is empty
    const count = await prisma.galleryImage.count();
    if (count > 0) {
        console.log('Gallery already has images, skipping seed.');
        return;
    }

    for (const img of initialImages) {
        await prisma.galleryImage.create({
            data: img
        });
        console.log(`Added image: ${img.alt}`);
    }

    console.log(`Gallery seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
