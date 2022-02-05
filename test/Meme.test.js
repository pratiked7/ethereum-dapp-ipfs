const { assert } = require("chai");

const Meme = artifacts.require("Meme");

require("chai").use(require("chai-as-promised")).should();

contract("Meme", (accounts) => {
    let meme;

    before(async () => {
        meme = await Meme.deployed();
    })

    describe("deployment", async () => {
        it("deploys successfully", async () => {
            //meme = await Meme.deployed();
            const address = meme.address;
            assert.notEqual(address, undefined);
            assert.notEqual(address, null);
            assert.notEqual(address, "");
            assert.notEqual(address, 0x0);
        })
        
    })

    describe("storage", async() => {
        it("updates the memeHash", async() => {
            let memeHash = "samplehash";
            await meme.set(memeHash);
            const result = await meme.get();
            assert.equal(result, memeHash);
        })
    })
});