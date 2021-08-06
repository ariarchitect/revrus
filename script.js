let input = document.querySelector('input') 

//Function for xml downloading
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

//Function for soting an array and removing duplicates
function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

function revrus(match) {
    replacer = {
        "Q":"й", "W":"ц"  , "E":"у" , "R":"к" , "T":"е", "Y":"н", "U":"г", "I":"ш", "O":"щ", "P":"з" , "[":"х" , "]":"ъ",
        "A":"ф", "S":"ы", "D":"в" , "F":"а"  , "G":"п" , "H":"р" , "J":"о", "K":"л", "L":"д", ";":"ж" , "'":"э",
        "Z":"я", "X":"ч", "C":"с", "V":"м", "B":"и", "N":"т" , "M":"ь"  , ",":"б" , ".":"ю" , "/":"."
    };
    shortcuts = match.replace('Shortcuts=','').replace(/"/g,'').split('#'); //
    newshortcuts = []
    for(i=0; i < shortcuts.length; i++){
        if ( !shortcuts[i].includes("Ctrl") && !shortcuts[i].includes("Shift") && !shortcuts[i].includes("Alt") ) {
            newshortcuts.push(shortcuts[i].replace(/[A-Z]/g, m => replacer[m]));
            newshortcuts.push(newshortcuts[newshortcuts.length-1].toUpperCase())
        }
    }
    return 'Shortcuts="'+uniq(shortcuts.concat(newshortcuts)).join('#') + '"'; 
}


// If a file is chosen, the following runs
input.addEventListener('change', () => {
    let files = input.files; 
    if (files.length == 0) return; 
    const file = files[0]; 
    let reader = new FileReader(); 
    reader.onload = (e) => { 
        const file = e.target.result; 
        const lines = file.split(/\r\n|\n/); 
        RevitRusShortcuts = lines.join('\n').replace(/Shortcuts="[^"]*"/g, revrus)
        download("RevitRusShortcuts.xml",RevitRusShortcuts);
    }; 
    reader.onerror = (e) => alert(e.target.error.name); 
    reader.readAsText(file); 
}); 