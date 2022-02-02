function createusertable(){
    var row = prompt("Enter the no. of rows")
    var col = prompt("Enter the no. of cols")
    console.log(row+" "+ col);

    for(var i =0;i<parseInt(row);i++){
        var tr = document.getElementById("mytable").insertRow(i);
        for(var j=0;j<parseInt(col);j++){
            var tc = tr.insertCell(j);
            if(j%2==0){
                tc.innerHTML = i+1+(j*row);
            }
            else{
                tc.innerHTML = ((j+1)*row)-i;
            }
        }
    }
}

createusertable()