const table = document.getElementById("mytable");
const btn_list = ["toggle_UD","toggle_LR","shuffle","clearbtn"];
let ROW,COL,table_arr;
let click_flg = 1,swap_idx;
let mytable;

class MyTable{

    constructor(row,col,table_array){
        this.row = row;
        this.col = col;
        this.table_array = table_array;
    }

    print_row_col(){
        console.log(this.row + " " + this.col);
    }
    // create table
    create_Table() {
        for (let i = 0; i < this.row; i++) {
          let table_row = table.insertRow(i);
          for (let j = 0; j < this.col; j++) {
            let table_col = table_row.insertCell(j);
            table_col.addEventListener('click',this.draggable.bind(this,i,j));
            }
        }
    }

    create_2d_array(){
        this.table_array = new Array(this.row);
        for (let i = 0; i < this.row; i++) {
            this.table_array[i] = new Array(this.col);
        }
    }

    // fill or clear table
    fill_Table(){
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            table.rows[i].cells[j].innerHTML = this.table_array[i][j];
          }
        }
    }

    clear_Table(){
        for (let i = table.rows.length - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
    }

    // check safe or not
    has_Blanked_Block(X,Y,val){
        if(this.table_array[X][Y]==val){
          return true;
        }
        return false;
    }

    isSafe(X,Y){
        if(X>=0 && X<this.row && Y>=0 && Y<this.col){
          return true;
        }
        return false;
    }

    isAdjacentCell(row,col,swap_idx){
        const dxy = [
          [-1, 0],
          [0, -1],
          [1, 0],
          [0, 1],
        ];
        for (let i=0;i<dxy.length;i++) {
          if (this.isSafe(row + dxy[i][0], col + dxy[i][1]) && (swap_idx[0]==row + dxy[i][0]) && (swap_idx[1]==col+dxy[i][1])) {
            return true;
          }
        }
        return false;
    }


    // utilities
    get_adjacent_Cell_Around_Selected(row,col){
        const dxy = [
            [-1, 0],
            [0, -1],
            [1, 0],
            [0, 1],
          ];
        let canmove = [];
        for (let i=0;i<dxy.length;i++) {
          if (this.isSafe(row + dxy[i][0], col + dxy[i][1])) {
            canmove.push([row+ dxy[i][0], col + dxy[i][1]]);
          }
        }
        return canmove;
    }

    get_coordinate_by_value(val){
        for(let i=0;i<this.row;i++){
          for(let j=0;j<this.col;j++){
            if(this.table_array[i][j]==val){
              return [i,j];
            }
          }
        }
    }

    get_Colored_given_value(val){
        for(let i=0;i<this.row;i++){
          let table_row = table.rows[i];
          for(let j=0;j<this.col;j++){
              let table_col = table_row.cells[j];
              if(this.table_array[i][j]==val){
                table_col.classList.add("color_block");
                table_col.innerHTML = "";
              }
          }
        }
    }

    coloration_of_Click_Cell(adjacentcell,curr_colored_idx,curr_x,curr_y){
        for(let i=0;i<adjacentcell.length;i++){
          if(adjacentcell[i][0]!=curr_colored_idx[0] || adjacentcell[i][1]!=curr_colored_idx[1]){
            table.rows[adjacentcell[i][0]].cells[adjacentcell[i][1]].classList.add("adj_curr_select_cell");
          }
        }
        table.rows[curr_x].cells[curr_y].classList.add("curr_select_cell");
    }

    swapping_two_blocks(curr_X,curr_Y,dest_X,dest_Y){
        this.table_array[curr_X][curr_Y] =this.table_array[dest_X][dest_Y];
        this.table_array[dest_X][dest_Y]= this.row*this.col;
    }

    // table creation
    toggle_Up_Down() {
        function Calculate(row,R, C) {
          return row * C + R - row;
        }
        for (let i = 1; i <= this.row; i++) {
          for (let j = 1; j <= this.col; j += 2) {
            this.table_array[i - 1][j - 1] = Calculate(this.row,i, j);
          }
        }
        for (let i = 1; i <= this.row; i++) {
          for (let j = 2; j <= this.col; j += 2) {
            this.table_array[this.row - i][j - 1] = Calculate(this.row,i, j);
          }
        }
        todo();
    }

    toggle_Left_Right() {
        function Calculate(col,R, C) {
          return col * R + C - col;
        }
        for (let i = 1; i <= this.row; i++) {
          if (i % 2 == 1) {
            for (let j = 1; j <= this.col; j++) {
              this.table_array[i - 1][j - 1] = Calculate(this.col,i, j);
            }
          } else {
            for (let j = 1; j <= this.col; j++) {
              this.table_array[i - 1][this.col - j] = Calculate(this.col,i, j);
            }
          }
        }
        todo();
    }

    shuffle() {
        const set = new Set();
        while (set.size < this.row * this.col) {
          set.add(Math.floor(Math.random() * this.row * this.col) + 1);
        }
        let it = set.values(),
          val = null;
        for (let i = 1; i <= this.row; i++) {
          for (let j = 1; j <= this.col; j++) {
            val = it.next().value;
            this.table_array[i - 1][j - 1] = val;
          }
        }
        todo();
    }

    // main draggable
    draggable(row,col){
        //  1. check whether the click is on colored or not.
        if(click_flg==1){
            // console.log(this);
            // console.log(this.row+" "+this.col);
          if(this.has_Blanked_Block(row,col,this.row*this.col)){
            alert("Colored block is click Pls click valid block")
            return;
          }
          let curr_colored_idx = this.get_coordinate_by_value(this.row*this.col);
          let adjacentcell = this.get_adjacent_Cell_Around_Selected(row,col);
          this.coloration_of_Click_Cell(adjacentcell,curr_colored_idx,row,col);
          swap_idx = [row,col];
          click_flg=0;
        }
        else if(click_flg==0){
          if(!this.has_Blanked_Block(row,col,this.row*this.col)){
            alert("Selected box is not blank");
          }
          else {
            if(this.isAdjacentCell(row,col,swap_idx)){
                this.swapping_two_blocks(row,col,swap_idx[0],swap_idx[1]);
            }
            else{
              alert("Selected box is not adjacent to color box");
            }
          }
          todo();
          click_flg=1;
        }
    }

}

function checkingInputWithInRange(maxRow,maxCol){
  if(ROW>=0 && ROW<=maxRow && COL>=0 && COL<=maxCol){
    return true;
  }
  return false;
}

function all_btn_toggle(toggle_state){
    for(btn of btn_list){
      document.getElementById(btn).disabled = toggle_state;
    }
    if(toggle_state){
      for(btn of btn_list){
        document.getElementById(btn).classList.add("disabled");
      }
    }
    else{
      for(btn of btn_list){
        document.getElementById(btn).classList.remove("disabled");
      }
    }
}

function reset_Form(){
  document.getElementById("detail_form").reset();
}

function clear_content(){
  mytable.clear_Table();
  all_btn_toggle(true);
  reset_Form();
}


function todo(){
  // console.log(table_arr);
  mytable.clear_Table();
  mytable.create_Table();
  mytable.fill_Table();
  mytable.get_Colored_given_value(ROW*COL);
}

function takingInput(){
    ROW = document.getElementById("nrow").value;
    COL = document.getElementById("ncol").value;
    mytable = new MyTable(ROW,COL,table_arr);
}

// 1. Submit Form is clicked
function submitform(){
    takingInput();
    if(!checkingInputWithInRange(20,20)){
      alert("Please enter the row or column within the range 1 to 20");
      reset_Form();
      return;
    }
    mytable.create_2d_array();
    all_btn_toggle(false);
}
  