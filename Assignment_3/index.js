const table = document.getElementById("mytable");
var table_array = [];
var row, col;

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
  table_array = new Array(row);
  for (let i = 0; i < row; i++) {
    table_array[i] = new Array(col);
    var table_row = table.insertRow(i);
    for (let j = 0; j < col; j++) {
      var table_col = table_row.insertCell(j);
      table_col.classList.add("block");
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
        table_col.classList.add("color_block");
      }
    }
  }
}

function findingcolorindex(row, col) {
  var idx = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (table_array[i][j] == row * col) {
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

function currblock(classname) {
  var idx = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (table.rows[i].cells[j].classList.contains(classname)) {
        idx = [i, j];
        return idx;
      }
    }
  }
}

function availablesafe(idx) {
  const dxy = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  var canmove = [];
  for (dir of dxy) {
    if (isSafe(idx[0] + dir[0], idx[1] + dir[1], row, col)) {
      canmove.push([idx[0] + dir[0], idx[1] + dir[1]]);
    }
  }
  return canmove;
}

function safe_adjacent(idx, color_block_idx) {
  for (id of idx) {
    if (id[0] != color_block_idx[0] || id[1] != color_block_idx[1]) {
      table.rows[id[0]].cells[id[1]].classList.add("adjacentcell");
    }
  }
}

function remove_safe_adjacent(idx, color_block_idx) {
  for (id of idx) {
    if (id[0] != color_block_idx[0] || id[1] != color_block_idx[1]) {
      table.rows[id[0]].cells[id[1]].classList.remove("adjacentcell");
    }
  }
}

function findingindex(val) {
  var idx = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (table.rows[i].cells[j].innerHTML == val) {
        idx = [i, j];
        return idx;
      }
    }
  }
}

function check(idx, arr) {
  for (ar of arr) {
    if (ar[0] == idx[0] && ar[1] == idx[1]) {
      return true;
    }
  }
  return false;
}


function dragable() {
  var blocks = document.querySelectorAll(".block:not(.color_block)");
  var color_blocks = document.querySelector(".color_block");
  var color_block_idx = currblock("color_block");
  var curr_idx, safe_idx;
  
  var curr_click_box = -1,
    curr_click_idx;
  var curr_click_box_2 = -1,
    curr_click_idx_2;

 
  color_blocks.addEventListener("click", (e) => {
    if (curr_click_box != -1) {
      curr_click_box_2 = e.target.innerHTML;
      curr_click_idx_2 = findingindex(curr_click_box_2);
      if (
        curr_click_idx_2[0] == color_block_idx[0] &&
        curr_click_idx_2[1] == color_block_idx[1]
      ) {
        let tmp1 = table_array[curr_click_idx[0]][curr_click_idx[1]];
        let tmp2 = table_array[curr_click_idx_2[0]][curr_click_idx_2[1]];
        table_array[curr_click_idx_2[0]][curr_click_idx_2[1]] =
          table_array[curr_click_idx[0]][curr_click_idx[1]];
        table_array[curr_click_idx[0]][curr_click_idx[1]] = tmp2;
        console.log(table_array);
        table.rows[curr_click_idx[0]].cells[curr_click_idx[1]].innerHTML = "";
        table.rows[curr_click_idx_2[0]].cells[curr_click_idx_2[1]].innerHTML =
          tmp1;
        table.rows[curr_click_idx_2[0]].cells[
          curr_click_idx_2[1]
        ].classList.remove("color_block");
        table.rows[curr_click_idx[0]].cells[curr_click_idx[1]].classList.add(
          "color_block"
        );
        curr_click_box=-1;
        // block.appendChild(color_blocks);
        // block.remove(curr);
        }
      } else {
        alert("Pls select valid color box to interchange");
      }
  },{once:true});


  for (block of blocks) {
    block.addEventListener("mouseenter", (e) => {
      e.target.classList.add("curr_block");
      curr_idx = currblock("curr_block");
      safe_idx = availablesafe(curr_idx);
      safe_adjacent(safe_idx, color_block_idx);
    });

    block.addEventListener("mouseout", (e) => {
      e.target.classList.remove("curr_block");
      remove_safe_adjacent(safe_idx, color_block_idx);
    });

    block.addEventListener("click", (e) => {
      if (curr_click_box == -1) {
        curr_click_box = e.target.innerHTML;
        curr_click_idx = findingindex(curr_click_box);
        var safe_color_idx = availablesafe(color_block_idx);
        if (!check(curr_click_idx, safe_color_idx)) {
          alert("Pls select valid box");
        }
        console.log(table_array);
        console.log("**********");
      }
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
  // document.getElementById("dragbtn").disabled = false;
  dragable();
  document.getElementById("detail_form").reset();
}
