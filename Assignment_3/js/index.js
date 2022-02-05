const table = document.getElementById("mytable");

function fillvalueupdown(row, col) {
  function Calculate(R, C) {
    return row * C + R - row;
  }
  for (var i = 1; i <= row; i++) {
    var table_row = table.rows[i - 1];
    for (var j = 1; j <= col; j += 2) {
      var table_col = table_row.cells[j - 1];
      table_col.innerHTML = Calculate(i, j);
    }
  }
  for (let i = 1; i <= row; i++) {
    var table_row = table.rows[row - i];
    for (var j = 2; j <= col; j += 2) {
      var table_col = table_row.cells[j - 1];
      table_col.innerHTML = Calculate(i, j);
    }
  }
}

function fillvalueleftright(row, col) {
  function Calculate(R, C) {
    return col * R + C - col;
  }
  for (var i = 1; i <= row; i++) {
    var table_row = table.rows[i - 1];
    if (i % 2 == 1) {
      for (var j = 1; j <= col; j++) {
        var table_col = table_row.cells[j - 1];
        table_col.innerHTML = Calculate(i, j);
      }
    } else {
      for (var j = 1; j <= col; j++) {
        var table_col = table_row.cells[col - j];
        table_col.innerHTML = Calculate(i, j);
      }
    }
  }
}

function fillrandom(row, col) {
  const set = new Set()
  while(set.size < row*col) {
    set.add(Math.floor(Math.random() * row*col) + 1)
  }
  let it = set.values(),val=null;
  for (let i = 1; i <= row; i++) {
    var table_row = table.rows[i - 1];
    for (let j = 1; j <= col; j++) {
      var table_col = table_row.cells[j - 1];
      val=it.next().value;
      table_col.innerHTML = val;
    }
  }
}

function createtable(row, col) {
  for (let i = 0; i < row; i++) {
    var table_row = table.insertRow(i);
    for (let j = 0; j < col; j++) {
      var table_col = table_row.insertCell(j);
      table_col.classList.add("draggable")
      table_col.setAttribute('draggable', true);
    }
  }
}

function deletetable() {
  var sz = table.rows.length;
  for (let i = sz - 1; i >= 0; i--) {
    table.deleteRow(i);
  }
}

function fillcellcolor(row,col){
  for(let i=0;i<row;i++){
    var table_row = table.rows[i];
    for(let j=0;j<col;j++){
      var table_col = table_row.cells[j];
      if (table_col.innerHTML == row*col){
        table_col.innerHTML="";
        table_col.style.backgroundColor = "blue";
      }
    }
  }
}

function dragable(){
  const draggables = document.querySelectorAll(".draggable");
  console.log(draggables);
  draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart',()=>{
      draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend',()=>{
      draggable.classList.remove('dragging');
    })

  })

}

function submitform() {
  var radio1 = document.getElementById("toggle_UD");
  var radio2 = document.getElementById("toggle_LR");
  var radio3 = document.getElementById("shuffle");
  var row = document.getElementById("row").value;
  var col = document.getElementById("col").value;
  if (row >= 1 && row <= 100 && col >= 1 && col <= 100) {
    if(typeof table.rows[0] !== "undefined"){
      deletetable();
    }
    if (radio1.checked == true) {
      createtable(row, col);
      fillvalueupdown(row, col); 
      fillcellcolor(row,col);  
      dragable();
    } else if (radio2.checked == true) {
      createtable(row, col);
      fillvalueleftright(row, col);
      fillcellcolor(row,col);  
      dragable();
    } else if (radio3.checked == true) {
      createtable(row, col);
      fillrandom(row, col);
      fillcellcolor(row,col);  
      dragable();
    } else {
      alert("Please select valid options !!!");
    }
  } else {
    alert("Please enter the row or column within the range between 1 and 100 ");
  }
  document.getElementById("detail_form").reset();
}
