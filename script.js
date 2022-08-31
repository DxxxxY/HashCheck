const collection = [{
    name: "Pizza_Client-1.1.3.jar",
    hash: "f3dba8676f61d198e71ea755b3318284488ff5ce3f54447f0c8abe00b521a654"
}, {
    name: "OringoClient-1.7.1-@everyone.jar",
    hash: "950e4dab70cf9ef74adea4b3a1ba16699f145a9f5e5c7bbd6710d5fd69e7867f"
}]

const results = document.querySelector("#results");

document.querySelector("*").addEventListener("dragover", e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
})

document.querySelector("*").addEventListener("drop", e => {
    results.innerText = "Loading..."
    e.preventDefault()
    if (e.dataTransfer.getData("URL") != "") {
        results.innerText = "Links aren't supported due to CORS."
    } else {
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(e.dataTransfer.files[0])
        fileReader.onload = () => {
            let entry
            collection.forEach(c => {
                if (c.hash == CryptoJS.SHA256(fileReader.result).toString()) {
                    entry = c.name
                    results.innerHTML = `File matches SHA256 hash of <b>${entry}</b>`
                }
            })
            if (!entry) results.innerText = "File doesn't match any known hashes."

            results.innerHTML += `<br><i>${CryptoJS.SHA256(fileReader.result).toString()}</i>`
        }
    }
})