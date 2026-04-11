fetch('https://www.twitch.tv/drops/inventory').then(r=>r.text()).then(t=>{
    const m = t.match(/ViewerDropsDashboard.*?sha256Hash":"([^"]+)"/);
    console.log("MATCH:", m ? m[1] : "not found");
});
