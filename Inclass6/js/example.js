var list = document.getElementById("one").parentNode;
// ADD NEW ITEM TO END OF LIST
var node = document.createElement("li");
var textNode = document.createTextNode("Cream")
node.appendChild(textNode)
list.appendChild(node);
// ADD NEW ITEM START OF LIST
var firstNode = document.createElement("li")
var firstText = document.createTextNode("Kale")
firstNode.appendChild(firstText)
list.insertBefore(firstNode,list.childNodes[0])
// ADD A CLASS OF COOL TO ALL LIST ITEMS
var classList = document.getElementsByTagName("li")
for( i=0; i<classList.length ; i++){
    classList[i].className = "cool"
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var head = document.getElementsByTagName("h2")[0].innerHTML += ": " + classList.length