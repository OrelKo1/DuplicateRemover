function normalizeUrl(url) {
    url = url.replace(/^https?:\/\//, '');
    url = url.replace(/^www\./, '');
    url = url.replace(/#.*$/, '');
    url = url.replace(/\/{2,}/g, '/');
    url = url.trim();

    return url;
}

function addHttpProtocol(url) {
    return `http://${url}`;
}

function removeDuplicates(urls) {
    const uniqueUrls = new Set();

    urls.forEach(url => {

        if (url.trim() !== '') {
            uniqueUrls.add(normalizeUrl(url));
        }
    });

    return Array.from(uniqueUrls).map(url => addHttpProtocol(url));
}

function formatUrls() {
    const inputString = document.getElementById('input').value;


    let urls = inputString.split('\n').filter(line => line.trim() !== '');


    let uniqueUrls = removeDuplicates(urls);

    let num_of_removed=urls.length-uniqueUrls.length;
    document.getElementById('output').value = uniqueUrls.join('\n');
    document.getElementById('num_removed').innerHTML ="Number of duplicates removed: "+num_of_removed;
    return;
}

function copyToClipboard() {
    const outputText = document.getElementById('output').value;
    if (outputText) {
        navigator.clipboard.writeText(outputText)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        alert('No text to copy!');
    }
}

function clearData(){
    document.getElementById('input').value="";
    document.getElementById('output').value="";
    document.getElementById('num_removed').innerHTML="";
}