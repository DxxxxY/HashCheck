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
}]

const results = document.querySelector("#results");

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
        fileReader.readAsBinaryString(e.dataTransfer.files[0])
        fileReader.onload = () => {
            const hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(fileReader.result)).toString()
            let entry
            collection.forEach(c => {
                if (c.hash == hash) {
                    entry = c.name
                    results.innerHTML = `File matches SHA256 hash of <b style="color: lime;">${entry}</b>`
                }
            })
            if (!entry) results.innerHTML = "File <b style=\"color: red;\">doesn't match</b> any known SHA256 hashes."

            results.innerHTML += `<br><i>${hash}</i>`
        }
    }
})