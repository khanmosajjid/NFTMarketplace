const { NFT, Collection } = require("../../../models");

const GetTraitsRarity = async () => {
    AllCollections = await Collection.find()
    AllCollections.map(async (collection) => {
        const metadata = await NFT.find({ nCollection: collection.sContractAddress })
        const traitCounts = {};

        metadata.forEach(nft => {
            nft.attributes.forEach(attribute => {
                const trait = `${attribute.trait_type.trim().toLowerCase()}:${attribute.value.trim().toLowerCase()}`;
                if (!traitCounts[trait]) {
                    traitCounts[trait] = 0;
                }
                traitCounts[trait]++;
            });
        });

        const totalNFTs = metadata.length;

        // Step 4: Determine Rarity Score and Rarity Percentage

        const rarityPercentages = {};

        for (const [trait, count] of Object.entries(traitCounts)) {
            console.log("calculatingg traits")
            console.log(trait, count, totalNFTs)
            rarityPercentages[trait] = (count / totalNFTs) * 100;
        }



        for (const nft of metadata) {
            for (const attribute of nft.attributes) {
                const trait = `${attribute.trait_type.trim().toLowerCase()}:${attribute.value.trim().toLowerCase()}`;
                const percentage = rarityPercentages[trait];
                await NFT.updateOne(
                    { _id: nft._id, 'attributes.trait_type': attribute.trait_type, 'attributes.value': attribute.value },
                    { $set: { 'attributes.$.rarityPercentage': percentage } }
                );
            }
        }


        // Output the results
        console.log('Trait Counts:', traitCounts);

        console.log('Rarity Percentages:', rarityPercentages);
    })

}

module.exports = GetTraitsRarity;