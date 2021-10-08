recieved = null;
$(document).ready(function (){
    query_database("SELECT * FROM accounts;")
});

function query_database(cmd) {
    $.ajax({                                      
        url: '/admin',              
        type: "post",          
        data: {
            "type" : "query",
            "command" : cmd
        },
        beforeSend: function() {
            $('#current_page').append("loading..");
        },
        success : success
    });
}
function update_database(_this) {
    console.log(_this)
    cmd = `UPDATE ? SET ${_this.attributes["update_type"].nodeValue} = ${_this.value} WHERE id = ${_this.name};`
    $.ajax({
        url: '/admin',
        type: "post",          
        data: {
            "type" : "update",
            "command" : cmd,
            "tables" : ["accounts"]
        }
    });
}
function success(data) {
    recieved = data;
    createTableHeaders(function() {
        createTable()
    })
}
function createTableHeaders(callback) {
    var div = document.getElementById("database-inventory")
    var table = document.createElement('table');
    table.setAttribute("id", "databaseContent")
    table.setAttribute("style", "width:100%")
    div.appendChild(table)

    let thead = table.createTHead();
    let row = thead.insertRow();

    KEYS = []
    for(k in recieved) {
        for(l of Object.keys(recieved[k])) {
            if(KEYS.includes(l)) {

            } else {
                KEYS.push(l)
            }
        }
    }

    for (i in recieved[0]) {
        let th = document.createElement("th");
        rows = Object.keys(recieved[0])
        let text = document.createTextNode(i + " ");
        let input = document.createElement("input")

        input.setAttribute("type", "text")
        input.setAttribute("class", "search_header")
        input.setAttribute("id", i + "_search")
        input.setAttribute("name", i)
        input.onkeyup = function() {
            createTable()
        }
        th.appendChild(text);
        th.appendChild(input)
        row.appendChild(th);
    }
    callback()
}
function createTable() {
    document.getElementById('database-inventory').style.display = "block";
    table = document.getElementById("databaseContent")

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    //THIS ADDS THE COULUMN NAMES
    KEYS = []
    FILTERS = []
    for(k in recieved) {
        for(l of Object.keys(recieved[k])) {
            if(KEYS.includes(l)) {

            } else {
                KEYS.push(l)
                FILTERS.push("")
            }
        }
    }

    for(l in KEYS) {
        FILTERS[l] = document.getElementById(KEYS[l] + "_search").value
    }
    displayMode = $('#mode-database').val();
    console.log(displayMode)
    if (displayMode == "All accounts"){ 
        for (let element of recieved) {
            skip = false;
            skip_counter = 0;
            for (key in element) {
                if(FILTERS[skip_counter] !== ""){
                    if(!element[key].toString().includes(FILTERS[skip_counter])) {
                        skip = true;
                    }
                }
                skip_counter++
            }
            if(!skip) {
                key_counter = 0;
                let row = table.insertRow();
                for (key in element) {
                    let cell = row.insertCell();
                    text = document.createElement('input'); //element[key]
                    text.setAttribute("type", "text")
                    text.setAttribute("class", "database_text")
                    text.setAttribute("value", element[key])
                    text.setAttribute("name", element["id"])
                    text.setAttribute("update_type", KEYS[key_counter])
                    text.onkeyup = function(e) {
                        if(e.key == "Enter") {
                            update_database(this)
                        }
                    }

                    cell.appendChild(text);
                    key_counter++
                }
            } else {
                skip = false;
            }      
        }
    } else if (displayMode == "Accepted accounts"){
        for (let element of recieved) {
            skip = false;
            skip_counter = 0;
            for (key in element) {
                if(FILTERS[skip_counter] !== ""){
                    if(!element[key].toString().includes(FILTERS[skip_counter])) {
                        skip = true;
                    }
                }
                skip_counter++
            }
            if(!element["accepted"].toString().includes("1")) {
                skip = true;
            }
            if(!skip) {
                key_counter = 0;
                let row = table.insertRow();
                for (key in element) {
                    let cell = row.insertCell();
                    text = document.createElement('input'); //element[key]
                    text.setAttribute("type", "text")
                    text.setAttribute("class", "database_text")
                    text.setAttribute("value", element[key])
                    text.setAttribute("name", element["id"])
                    text.setAttribute("update_type", KEYS[key_counter])
                    text.onkeyup = function(e) {
                        if(e.key == "Enter") {
                            update_database(this)
                        }
                    }

                    cell.appendChild(text);
                    key_counter++
                }
            } else {
                skip = false;
            }      
        }
    }
}