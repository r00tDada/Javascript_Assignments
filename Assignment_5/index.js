var ROW,COL,table_arr;
const table = document.getElementById("mytable");
const btn_list = ["toggle_UD","toggle_LR","shuffle","clearbtn"];
var click_flg = -1;

function checkingInput(maxRow,maxCol){
  if(ROW>=0 && ROW<=maxRow && COL>=0 && COL<=maxCol){
    return true;
  }
  return false;
}

function create_2d_array(){
  table_arr = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    table_arr[i] = new Array(COL);
  }
}

function create_Table() {
  for (let i = 0; i < ROW; i++) {
    var table_row = table.insertRow(i);
    for (let j = 0; j < COL; j++) {
      var table_col = table_row.insertCell(j);
      table_col.addEventListener('click',draggable.bind(this,i,j));

    }
  }
}

function hasblankblock(X,Y,val){
  if(table_arr[X][Y]==val){
    return true;
  }
  return false;
}


function isSafe(X,Y){
  if(X>=0 && X<ROW && Y>=0 && Y<COL){
    return true;
  }
  return false;
}

function get_adjacent_cell(row,col){
  const dxy = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  var canmove = [];
  for (dir of dxy) {
    if (isSafe(row + dir[0], col + dir[1], row, col)) {
      canmove.push([row+ dir[0], col + dir[1]]);
    }
  }
  return canmove;
}

function get_coordinate_by_value(val){
  for(let i=0;i<ROW;i++){
    for(let j=0;j<COL;j++){
      if(table_arr[i][j]==val){
        return [i,j];
      }
    }
  }
}

function color_click_cell(adjacentcell,curr_colored_idx,curr_x,curr_y){
  for(idx of adjacentcell){
    if(idx[0]!=curr_colored_idx[0] || idx[1]!=curr_colored_idx[1]){
      table.rows[idx[0]].cells[idx[1]].classList.add("adj_curr_select_cell");
    }
  }
  table.rows[curr_x].cells[curr_y].classList.add("curr_select_cell");
}

function draggable(row,col){
  //  1. check whether the click is on colored or not.
  if(click_flg==-1){
    if(hasblankblock(row,col,ROW*COL)){
      alert("Colored block is click Pls click valid block")
      return;
    }
    var curr_colored_idx = get_coordinate_by_value(ROW*COL);
    var adjacentcell = get_adjacent_cell(row,col);
    color_click_cell(adjacentcell,curr_colored_idx,row,col);
    click_flg=0;
  }
  else if(click_flg==0){
    
  }


}

function toggle_Up_Down() {
  function Calculate(R, C) {
    return ROW * C + R - ROW;
  }
  for (var i = 1; i <= ROW; i++) {
    for (var j = 1; j <= COL; j += 2) {
      table_arr[i - 1][j - 1] = Calculate(i, j);
    }
  }
  for (let i = 1; i <= ROW; i++) {
    for (var j = 2; j <= COL; j += 2) {
      table_arr[ROW - i][j - 1] = Calculate(i, j);
    }
  }
  todo();
}

function toggle_Left_Right() {
  function Calculate(R, C) {
    return COL * R + C - COL;
  }
  for (var i = 1; i <= ROW; i++) {
    if (i % 2 == 1) {
      for (var j = 1; j <= COL; j++) {
        table_arr[i - 1][j - 1] = Calculate(i, j);
      }
    } else {
      for (var j = 1; j <= COL; j++) {
        table_arr[i - 1][COL - j] = Calculate(i, j);
      }
    }
  }
  todo();
}

function shuffle() {
  const set = new Set();
  while (set.size < ROW * COL) {
    set.add(Math.floor(Math.random() * ROW * COL) + 1);
  }
  let it = set.values(),
    val = null;
  for (let i = 1; i <= ROW; i++) {
    for (let j = 1; j <= COL; j++) {
      val = it.next().value;
      table_arr[i - 1][j - 1] = val;
    }
  }
  todo();
}

function fill_Table(){
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      table.rows[i].cells[j].innerHTML = table_arr[i][j];
    }
  }
}

function cleartable(){
  for (let i = table.rows.length - 1; i >= 0; i--) {
      table.deleteRow(i);
  }
}

function all_btn_toggle(toggle_state){
  for(btn of btn_list){
    document.getElementById(btn).disabled = toggle_state;
  }
}

function clear_content(){
  cleartable();
  all_btn_toggle(true);
  document.getElementById("detail_form").reset();

}


function takingInput(){
  ROW = document.getElementById("nrow").value;
  COL = document.getElementById("ncol").value;
}

function submitform(){
  takingInput();
  if(!checkingInput(20,20)){
    alert("Please enter the row or column within the range 1 to 20");
    return;
  }
  create_2d_array();
  all_btn_toggle(false);
}

function get_colored_given_value(val){
  for(let i=0;i<ROW;i++){
    var table_row = table.rows[i];
    for(let j=0;j<COL;j++){
        var table_col = table_row.cells[j];
        if(table_arr[i][j]==val){
          table_col.classList.add("color_block");
          table_col.innerHTML = "";
        }
    }
  }
}

function todo(){
  // console.log(table_arr);
  cleartable();
  create_Table();
  fill_Table();
  get_colored_given_value(ROW*COL);
}

