ws.on('drain',()=>{ 
    console.log('drain');
    write();
});