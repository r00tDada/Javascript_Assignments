const table = document.getElementById("mytable");
const btn_list = ["toggle_UD","toggle_LR","shuffle","clearbtn"];
let ROW,COL,table_arr;
let click_flg,swap_idx;
let mytable;

class MyTable{
    // Private variable
    #click_flg=1;
    #swap_idx=[];

    constructor(row,col,table_array){
        this.row = row;
        this.col = col;
        this.table_array = table_array;
    }

    // getter and setter
    getclick_flg(){
        return this.#click_flg;
    }

    setclick_flg(value){
        value==1?value=0:value=1;
        this.#click_flg=value;
    }

    getswap_idx(){
        return this.#swap_idx;
    }

    setswap_idx(value){
        this.#swap_idx=value;
    }

    // Printing
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
    // name change
    coloration_or_decoloration_of_Click_Cell(adjacentcell,curr_colored_idx,curr_x,curr_y,flg){
        for(let i=0;i<adjacentcell.length;i++){
          if(adjacentcell[i][0]!=curr_colored_idx[0] || adjacentcell[i][1]!=curr_colored_idx[1]){
            if(flg==1){
                table.rows[adjacentcell[i][0]].cells[adjacentcell[i][1]].classList.add("adj_curr_select_cell");
            }
            else{
                table.rows[adjacentcell[i][0]].cells[adjacentcell[i][1]].classList.remove("adj_curr_select_cell");
            }
          }
        }
        if(flg==1){
            table.rows[curr_x].cells[curr_y].classList.add("curr_select_cell");
        }
        else{
            table.rows[curr_x].cells[curr_y].classList.remove("curr_select_cell");
        }
    }

    swapping_two_blocks(curr_X,curr_Y,destination){
        this.table_array[curr_X][curr_Y] =this.table_array[destination[0]][destination[1]];
        this.table_array[destination[0]][destination[1]]= this.row*this.col;
        table.rows[curr_X].cells[curr_Y].innerHTML = table.rows[destination[0]].cells[destination[1]].innerHTML;
        table.rows[destination[0]].cells[destination[1]].innerHTML= "";
        table.rows[destination[0]].cells[destination[1]].classList.add("color_block");
        table.rows[curr_X].cells[curr_Y].classList.remove("color_block");
    }

    todo(){
        // console.log(table_arr);
        this.clear_Table();
        this.create_Table();
        this.fill_Table();
        this.get_Colored_given_value(ROW*COL);
    }
    
    // table creation
    toggle_UD_LR(r,c,type){
      let cnt = 1;
        for (let i = 0; i < c; i++) {
          if(i%2==0){
            for (let j = 0; j < r; j++){
              if(type=="UD")
                this.table_array[j][i] = cnt;
              else
                this.table_array[i][j] = cnt;
              cnt++;
            }
          }
          else{
            for (let j = r-1; j >=0; j--){
            if(type=="UD")
              this.table_array[j][i] = cnt;
            else
              this.table_array[i][j] = cnt;
              cnt++;
            }
          }
        }
    }

    toggle_Up_Down() {
        this.toggle_UD_LR(this.row,this.col,"UD");
        this.todo();
    }

    toggle_Left_Right() {
      this.toggle_UD_LR(this.col,this.row,"LR");
      this.todo();
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
        this.todo();
    }

    // main draggable
    draggable(row,col){
        //  1. check whether the click is on colored or not.
        let curr_colored_idx = this.get_coordinate_by_value(this.row*this.col);
        if(this.getclick_flg()==1){
          if(this.has_Blanked_Block(row,col,this.row*this.col)){
            alert("Colored block is click Pls click valid block")
            return;
          }
          let adjacentcell = this.get_adjacent_Cell_Around_Selected(row,col);
          this.coloration_or_decoloration_of_Click_Cell(adjacentcell,curr_colored_idx,row,col,1);
          this.setswap_idx([row,col]);
          this.setclick_flg(1);
        }
        else {
          if(!this.has_Blanked_Block(row,col,this.row*this.col)){
            alert("Selected box is not blank");
          }
          else {
            if(this.isAdjacentCell(row,col,this.getswap_idx())){
                this.swapping_two_blocks(row,col,this.getswap_idx());
            }
            else{
              alert("Selected box is not adjacent to color box");
            }
          }
          let adjacentcell = this.get_adjacent_Cell_Around_Selected(this.getswap_idx()[0],this.getswap_idx()[1]);
          this.coloration_or_decoloration_of_Click_Cell(adjacentcell,curr_colored_idx,this.getswap_idx()[0],this.getswap_idx()[1],0);
          this.setclick_flg(0);
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

function takingInput(){
    ROW = document.getElementById("nrow").value;
    COL = document.getElementById("ncol").value;
    mytable = new MyTable(ROW,COL,table_arr);
}

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
