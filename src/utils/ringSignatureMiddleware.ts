import { RingSignature } from "@cypher-laboratory/alicesring-lsag";

/**
 * Middleware to privately check that someone is part of the DAO using a ring signature
 * @param ringSignature the ringSignature to check
 * @param tokenAddress the address of the token to check
 */
export async function checkRingSignature(ringSignature:RingSignature, tokenAddress:string){
    // then we check if the ringSignature is valid
    // then we check that all the addresses derivated from the public keys in the ring hold the token
    if(!ringSignature.verify()){
        throw new Error('The ringSignature is not valid');
    }
    const publicKeys = ringSignature.getRing();
    for(const publicKey of publicKeys){
        // TODO check if the publicKey holds the token using covalent API
        let ethAddress = publicKey.toEthAddress();
        console.log(ethAddress);
    }
}

/**
 * Middleware to private check that someone is part of the DAO and is the OP/message poster using a ring signature
 * @param ringSignature the ringSignature to check
 * @param ownerKeyImage the keyImage of the owner of the post/topic
 * @param tokenAddress the address of the token to check
 */
export async function checkRingSignatureWithOwner(ringSignature:RingSignature, ownerKeyImage:string, tokenAddress:string){
    // first we check if the keyImage is the same as the owner of the post/topic keyImage   
    // then we check if the ringSignature is valid
    // then we check that all the addresses derivated from the public keys in the ring hold the token-
    if(ringSignature.getKeyImage().toString() !== ownerKeyImage){
        throw new Error('The keyImage is not the same as the owner of the post/topic keyImage');
    }
    if(!ringSignature.verify()){
        throw new Error('The ringSignature is not valid');
    }
    const publicKeys = ringSignature.getRing();
    for(const publicKey of publicKeys){
        // TODO check if the publicKey holds the token using covalent API
        let ethAddress = publicKey.toEthAddress();
        console.log(ethAddress);
    }
}