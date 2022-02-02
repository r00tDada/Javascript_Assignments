var row = prompt("Enter the no. of rows");
var col = prompt("Enter the no. of cols");
console.log(row + " " + col);


function Calculate_1(R, C) {
    var ans = row * C;
    if (C % 2 == 1) {
        ans += R - row;
    } else {
        ans += 1 - R;
    }
    return ans;
}
function Calculate_2(R, C) {
    var ans = col*R + C-col;
    return ans;
}

function createusertable(row,col) {       
    for (var i = 1; i <= parseInt(row); i++) {
        var table_row = document.getElementById("mytable").insertRow(i - 1);
        for (var j = 1; j <= parseInt(col); j++) {
            var table_col = table_row.insertCell(j - 1);
            table_col.innerHTML = Calculate_1(i, j);
        }
    }
    
}
createusertable(row,col);

function togglefunction() {
    for (var i = 1; i <= parseInt(row); i++) {
        var table_row = document.getElementById("mytable").rows[i - 1];
        if(i%2==1){
            for (var j = 1; j <= parseInt(col); j++) {
                var table_col = table_row.cells[j - 1];
            table_col.innerHTML = Calculate_2(i, j);
        }
    }
    else{
        for (var j = 1; j <= parseInt(col); j++) {
            var table_col = table_row.cells[col-j];
            table_col.innerHTML = Calculate_2(i, j);
        }
    }
    }
}
