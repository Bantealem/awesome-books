 
 function removeItem() {
 
    var a = document.getElementById("list");
    var candidate = document.getElementById("candidate");
    var item = document.getElementById(candidate.value);
    a.removeChild(item);
    }
 function addItem() {
    var a = document.getElementById("list");
    var candidate = document.getElementById("candidate");
    var li = document.createElement("li");
    li.setAttribute('id', candidate.value);
    li.appendChild(document.createTextNode(candidate.value));
    a.appendChild(li);
    }

