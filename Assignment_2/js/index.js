function createusertable() {
  var row = prompt("Enter the no. of rows");
  var col = prompt("Enter the no. of cols");
  console.log(row + " " + col);
  function Calculate(R, C) {
    var ans = row * C;
    if (C % 2 == 1) {
      ans += R - row;
    } else {
      ans += 1 - R;
    }
    return ans;
  }
  for (var i = 1; i <= parseInt(row); i++) {
    var table_row = document.getElementById("mytable").insertRow(i - 1);
    for (var j = 1; j <= parseInt(col); j++) {
      var table_col = table_row.insertCell(j - 1);
      table_col.innerHTML = Calculate(i, j);
    }
  }
}

createusertable();
