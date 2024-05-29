const { NFT } = require("../../../models");

const GetTraitsRarity = async () => {
    const metadata = await NFT.find()
    const traitCounts = {};

    metadata.forEach(nft => {
        nft.attributes.forEach(attribute => {
            const trait = `${attribute.trait_type.trim().toLowerCase()}:${attribute.value}`;
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
        console.log(trait,count)
        rarityPercentages[trait] = (count / totalNFTs) * 100;
    }

    

    for (const nft of metadata) {
        for (const attribute of nft.attributes) {
            const trait = `${attribute.trait_type.trim().toLowerCase()}:${attribute.value}`;
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

}

module.exports=GetTraitsRarity;