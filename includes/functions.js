//--Make ajax call
async function doAjax( data, url, method ) {
    return new Promise(function(resolved, rejected){
        const xhttp = new XMLHttpRequest();
        xhttp.open(method, url);
        xhttp.send(data);
        xhttp.onreadystatechange = ()=>{
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) { resolved(xhttp.responseText); } 
                else { rejected(xhttp.statusText); }
            }
        };
    });
}