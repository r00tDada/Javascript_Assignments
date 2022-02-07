const table = document.getElementById("mytable");
var table_array = [];

function fillvalueupdown(row, col) {
  function Calculate(R, C) {
    return row * C + R - row;
  }
  for (var i = 1; i <= row; i++) {
    var table_row = table.rows[i - 1];
    for (var j = 1; j <= col; j += 2) {
      var table_col = table_row.cells[j - 1];
      table_col.innerHTML = Calculate(i, j);
      table_array[i - 1][j - 1] = Calculate(i, j);
    }
  }
  for (let i = 1; i <= row; i++) {
    var table_row = table.rows[row - i];
    for (var j = 2; j <= col; j += 2) {
      var table_col = table_row.cells[j - 1];
      table_col.innerHTML = Calculate(i, j);
      table_array[i - 1][j - 1] = Calculate(i, j);
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
        table_array[i - 1][j - 1] = Calculate(i, j);
      }
    } else {
      for (var j = 1; j <= col; j++) {
        var table_col = table_row.cells[col - j];
        table_col.innerHTML = Calculate(i, j);
        table_array[i - 1][j - 1] = Calculate(i, j);
      }
    }
  }
}

function fillrandom(row, col) {
  const set = new Set();
  while (set.size < row * col) {
    set.add(Math.floor(Math.random() * row * col) + 1);
  }
  let it = set.values(),
    val = null;
  for (let i = 1; i <= row; i++) {
    var table_row = table.rows[i - 1];
    for (let j = 1; j <= col; j++) {
      var table_col = table_row.cells[j - 1];
      val = it.next().value;
      table_col.innerHTML = val;
      table_array[i - 1][j - 1] = val;
    }
  }
}

function createtable(row, col) {
  for (let i = 0; i < row; i++) {
    var table_row = table.insertRow(i);
    for (let j = 0; j < col; j++) {
      var table_col = table_row.insertCell(j);
    }
  }
}

function deletetable() {
  var sz = table.rows.length;
  for (let i = sz - 1; i >= 0; i--) {
    table.deleteRow(i);
  }
}

function fillcellcolor(row, col) {
  for (let i = 0; i < row; i++) {
    var table_row = table.rows[i];
    for (let j = 0; j < col; j++) {
      var table_col = table_row.cells[j];
      if (table_col.innerHTML == row * col) {
        table_col.innerHTML = "";
        table_col.classList.add("color_draggable");
      }
    }
  }
}

function findingcolorindex(row, col) {
  var idx = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (table_array[i][j]==row*col) {
        idx = [i, j];
        return idx;
      }
    }
  }
}

function isSafe(currX, currY, row, col) {
  if (currX >= 0 && currX < row && currY >= 0 && currY < col) {
    return true;
  }
  return false;
}

function availablesafe(row, col) {
  const dxy = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  var idx = findingcolorindex(row, col);
  var canmove = [];
  for (dir of dxy) {
    if (isSafe(idx[0] + dir[0], idx[1] + dir[1], row, col)) {
      canmove.push([idx[0] + dir[0], idx[1] + dir[1]]);
    }
  }
  return canmove;
}

function availabledrag(row, col) {
  var dragmove = availablesafe(row, col);
  var idx = findingcolorindex(row, col);
  console.log(dragmove);
  console.log(idx);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (table.rows[i].cells[j].classList.contains("draggable")) {
        table.rows[i].cells[j].classList.remove("draggable");
      }
    }
  }
  if (idx.length == 2) {
    table.rows[idx[0]].cells[idx[1]].setAttribute("draggable", true);
    table.rows[idx[0]].cells[idx[1]].classList.add("draggable");
    for (crd of dragmove) {
      table.rows[crd[0]].cells[crd[1]].classList.add("draggable");
    }
  }
}

var row,col;
var cnt=0;
function dragable() {
  var val=-1;
  // console.log("****************");
  // console.log("In draggable");
  availabledrag(row, col);
  const draggables = document.querySelectorAll(".draggable:not(.color_draggable)");
  const color_draggables = document.querySelector(".color_draggable");
  console.log(draggables);
  console.log(color_draggables);

  color_draggables.addEventListener("dragstart", (e) => {
    e.target.classList.remove("color_draggable");
    e.stopImmediatePropagation()
  });

  color_draggables.addEventListener("dragend", (e) => {
    console.log("Dragend");
    e.target.removeAttribute("draggable");
    e.target.innerHTML = val;
    console.log("cnt: ",cnt);
    cnt++;
    e.stopImmediatePropagation();
  });

  for (dg of draggables) {
    dg.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    dg.addEventListener("dragenter", () => {});

    dg.addEventListener("dragleave", () => {});

    dg.addEventListener("drop", (e) => {
      console.log("in drop");
      e.target.classList.add("color_draggable");
      val = e.target.innerHTML;
      console.log("dest1: ", val);
      e.target.innerHTML = "";
      e.stopImmediatePropagation()
    });

  }
 

}

function submitform() {
  var radio1 = document.getElementById("toggle_UD");
  var radio2 = document.getElementById("toggle_LR");
  var radio3 = document.getElementById("shuffle");
  row = document.getElementById("row").value;
  col = document.getElementById("col").value;

  if (row >= 1 && row <= 100 && col >= 1 && col <= 100) {
    table_array = new Array(row);
    for (let i = 0; i < row; i++) {
      table_array[i] = new Array(col);
    }
    if (typeof table.rows[0] !== "undefined") {
      deletetable();
    }
    if (radio1.checked == true) {
      createtable(row, col);
      fillvalueupdown(row, col);
      fillcellcolor(row, col);
    } else if (radio2.checked == true) {
      createtable(row, col);
      fillvalueleftright(row, col);
      fillcellcolor(row, col);
    } else if (radio3.checked == true) {
      createtable(row, col);
      fillrandom(row, col);
      fillcellcolor(row, col);
    } else {
      alert("Please select valid options !!!");
      return;
    }
  } else {
    alert("Please enter the row or column within the range between 1 and 100 ");
    return;
  }
  document.getElementById("dragbtn").disabled = false;
  document.getElementById("detail_form").reset();

}
