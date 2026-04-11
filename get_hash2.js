async function getHash() {
    console.log("Fetching main page...");
    const r = await fetch('https://www.twitch.tv/drops/inventory');
    const text = await r.text();
    const assets = [...text.matchAll(/src="([^"]+)"/g)]
        .map(m => m[1])
        .filter(url => url.includes('assets/'));
    
    console.log("Found assets:", assets.length);
    for (const url of assets) {
        try {
            const js = await fetch(url).then(r => r.text());
            const hash = js.match(/ViewerDropsDashboard.{1,100}sha256Hash":"([a-f0-9]{64})"/);
            if (hash) {
                console.log('HASH:', hash[1]);
                return;
            }
        } catch(e) {}
    }
    console.log('Not found');
}
getHash();
