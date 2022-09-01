const collection = [{
    name: "Pizza_Client-1.1.3.jar",
    hash: "b144b79473eb8dcde764a1eae5ff5031bad55f1b1a345842bd59e61ca97bcdc2"
}, {
    name: "OringoClient-1.7.1-@everyone.jar",
    hash: "98ea6391a9f78897b2df3cabec20e365d0b0339759169dd06ea8e74bfa903756"
}, {
    name: "Danker.s.Skyblock.Mod-1.8.7-hotfix1.jar",
    hash: "b1a09a15075e3564b08f7532544c893abf0879a987f806c88e4e47b62f973645"
}, {
    name: "NotEnoughCoins-1.0-all.jar",
    hash: "c6559f9bd5d71427f8ce5c056a117732058ee92e863044d58cc91d4442a8fa9b"
}, {
    name: "NotEnoughUpdates-2.0.0.jar",
    hash: "b8bfbf95c1b6d37e32002f1fdecb9699300a8b821adf4472ca8df764ae1c4d60"
}, {
    name: "SkyblockAddons-1.7.0-for-MC-1.8.9.jar",
    hash: "cd4f32c651f4b67555281ad31091e70ffe699d829ec310869b5eb35c7bb64825"
}, {
    name: "RoseGoldAddons-2.9.8.jar",
    hash: "9780cb5cbe6da63c888b213b8e0bdb1611db0a38369fb9d84e0f4fe208361b29"
}, {
    name: "ChromaHUD-3.0.jar",
    hash: "78a2bcbc457f327c3127e1be32c4fccd3a24e87f0f94945535840c4d04a441b0"
}, {
    name: "SkySkipped-3.3.jar",
    hash: "6ba91da42339edcee09f8ad8b40233cd3cf414d3862c199015448d130928ec16"
}, {
    name: "aiomacro-1.7.2-release.jar",
    hash: "58fefe77f5c9b60a2eddcbcfd4aa54f9f4834c2d10a2e8e7fb5fba7ddf8704b3"
}, {
    name: "FarmHelper-v4.2.10.jar",
    hash: "f69b05550bdbfd5bce7c452544b5b3a894eefdf0f0c61c8615968c92369e3c01"
}, {
    name: "FarmHelper-Bot-v1.0.3.jar",
    hash: "f0b9abaa26a49c15ea8ff0450c6c4c6ce99e4f050fbaac15b084bfe8e9ed2846"
}, {
    name: "ShadyAddons-2.7.2.jar",
    hash: "f82f160b0c6f21e51b0be98cd6289d72abb609b7d84b82e9666ab9e9c83fdedd"
}, {
    name: "Skytils-1.2.6.jar",
    hash: "02c101bf7b92462c3ff399071ef09cb528f705269aaa036e8a959f8424ee5b7c"
}, {
    name: "Hephaestus-2.0-RELEASE.jar",
    hash: "71016fb45ff1f5eef9b358f3ebe4e07b8926f4f30ac5e5446ac976e62bdc34a6"
}, {
    name: "TokenAuth-1.0.0.jar",
    hash: "1efdb8d5e0fc635d365a33648923795aeb8d306e0e133e0483fece8fd95b45a5"
}, {
    name: "TokenAuth-1.0.0.jar", //no validation
    hash: "6b1962f181d200754c61e4f678dc3f35f56270bccca6bc324c6a6a16fc163adf"
}, {
    name: "SkyblockClient-1.3.11.exe",
    hash: "8ebba7fb74c74f5c613e1c1b869222d22fef455f23e3d455564acbae12f8bc01"
}, {
    name: "MightyMiner.alpha-v0.2.6.jar",
    hash: "938bbbee639d98afca4cfb1c2763d88634894b425aec6046b28f59dd3066ec8b"
}]

const results = document.querySelector("#results");
document.querySelector("#hash").innerHTML += ` (${collection.length} file entries)`;

document.querySelector("*").addEventListener("dragover", e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
})

document.querySelector("*").addEventListener("drop", e => {
    e.preventDefault()
    results.innerText = "Loading..."
    if (e.dataTransfer.getData("URL") != "") {
        results.innerText = "Links aren't supported due to CORS."
    } else {
        const fileReader = new FileReader()
        const file = e.dataTransfer.files[0]
        fileReader.readAsBinaryString(file)
        fileReader.onload = () => {
            const hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(fileReader.result)).toString()
            let entry
            collection.forEach(c => {
                if (c.hash == hash) {
                    entry = c.name
                    results.innerHTML = `${file.name} matches SHA256 hash of <b style="color: lime;">${entry}</b>`
                }
            })
            if (!entry) {
                results.innerHTML = `${file.name} <b style="color: red;">doesn't match</b> any known SHA256 hashes.`
                if (/session|login|token/.test(file.name.toLowerCase())) results.innerHTML += "<br>Most distributed session login mods are <b style=\"color: red;\">RATS</b>. You can check out <a href=\"https://github.com/DxxxxY/TokenAuth\">TokenAuth</a> for an opensource one."
                if (/dupe|kmod|dmod/.test(file.name.toLowerCase())) results.innerHTML += "<br>Dupe mods <b style=\"color: red;\">aren't  public</b>. It is most likely a <b style=\"color: red;\">RAT</b>."
            }

            results.innerHTML += `<br><i>${hash}</i>`
        }
    }
})