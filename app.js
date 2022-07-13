var color_val = "rgb(255, 255, 255)"
var grid_width =0;
var grid_height = 0;
var block_array
var start ;
var end;
var grid;
var openSet = [];
var closeSet = [];
var path = [];
var speed_factor = 100;



function take_input(){
    
    document.getElementById('contener').innerHTML=""

    grid_width = prompt("Enter Grid Width" ,"20");
    grid_height = prompt("Enter Grid Height","20");
  
    block_array = new Array(grid_width);
    for (var i = 0; i < grid_width; i++) {
      block_array[i] = new Array(grid_height);
    }
   grid = new Array(grid_width);
    for (var i = 0; i < grid_width; i++) {
        grid[i] = new Array(grid_height);
    }

    for (var i = 0; i < grid_width; i++) {
        for (var j = 0; j < grid_height; j++) {
            grid[i][j] = {};
        }
    }

    for (var i = 0; i < grid_width; i++) {
      for (var j = 0; j < grid_height; j++) {
        block_array[i][j] = {"style":"" ,"id":"","x":i ,"class":"", "y":j ,"value":"", knokme(){}};
      }
    }
    

    displygrid();
}
function displygrid(){
    
    for(var i = 0 ;i < grid_width ; i++ ){
        var div_row = document.createElement('div');
        div_row.className = "row";
        div_row.id=i
        document.getElementById('contener').append(div_row)

        for(var j = 0 ; j < grid_height ; j++){
        var div_cell = document.createElement('div');
        div_cell.className = "cell";
        div_cell.setAttribute("x",i)
        div_cell.setAttribute("y",j)
        div_cell.id = "x="+i+",y="+j
        div_cell.setAttribute("value","white")
        div_cell.onclick = function(){
            //our function
            // console.log(color_val)
            if(color_val == "rgb(255, 255, 255)"){
                //wall
                var wallval = ''
                this.style.backgroundImage= "url("+wallval+")";
                document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_yallow");
                document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_blue");
                document.getElementById(this.getAttribute("id")).classList.add("animation_fill_white");
                document.getElementById(this.getAttribute("id")).setAttribute("value","white")
                this.style.backgroundColor ="rgb(255, 255, 255)"
                // console.log(color_val)
            }
            else if(color_val== "rgb(0, 0, 0)"){
                //white
                var wallval = 'wall/wall'+Math.floor(Math.random() * (7 - 1 + 1) + 1)+'.png'
                this.style.backgroundImage= "url("+wallval+")";
                this.style.backgroundColor="rgb(0, 0, 0)"
                document.getElementById(this.setAttribute('value','wall'))

            }
            else{
                //other Color
                if(color_val== "rgb(243, 228, 23)"){
                    var wallval = ''
                    this.style.backgroundImage= "url("+wallval+")";
                    for(var i = 0 ; i < grid_width ; i++){
                        for(var j = 0 ; j < grid_height ; j++){
                            if(document.getElementById("x="+i+",y="+j).style.backgroundColor == "rgb(243, 228, 23)"){//already have a yallow color
                                document.getElementById("x="+i+",y="+j).innerHTML="";
                                document.getElementById("x="+i+",y="+j).setAttribute("value","white")
                                document.getElementById("x="+i+",y="+j).style.backgroundColor="rgb(255, 255, 255)"
                                document.getElementById("x="+i+",y="+j).classList.remove("animation_fill_yallow");
                                document.getElementById("x="+i+",y="+j).classList.add("animation_fill_white");
                            }
                        }
                    }
                    document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_white");
                    document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_yallow");
                    document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_blue");
                    document.getElementById(this.getAttribute("id")).classList.add("animation_fill_yallow");
                    document.getElementById(this.setAttribute('value','start'))
                }
                else{
                    for(var i = 0 ; i < grid_width ; i++){
                        for(var j = 0 ; j < grid_height ; j++){
                            if(document.getElementById("x="+i+",y="+j).style.backgroundColor == "rgb(0, 0, 255)"){//already have a blue color
                                document.getElementById("x="+i+",y="+j).innerHTML="";
                                document.getElementById("x="+i+",y="+j).setAttribute("value","white")
                                document.getElementById("x="+i+",y="+j).style.backgroundColor="rgb(255, 255, 255)"
                                document.getElementById("x="+i+",y="+j).classList.remove("animation_fill_blue");
                                document.getElementById("x="+i+",y="+j).classList.add("animation_fill_white");
                            }
                        }
                    }
                    var wallval = ''
                    this.style.backgroundImage= "url("+wallval+")";
                    document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_white");
                    document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_yallow");
                    document.getElementById(this.getAttribute("id")).classList.remove("animation_fill_blue");
                    document.getElementById(this.getAttribute("id")).classList.add("animation_fill_blue");
                    document.getElementById(this.setAttribute('value','target'))
                }
                this.style.backgroundColor=color_val;
               
            }
            //finding the index 
        };
        document.getElementById(i).appendChild(div_cell);

      }
    }
}
function pick_target_color(){
    var target_color = document.getElementById("target-color");
    var style = window.getComputedStyle(target_color)
    document.getElementById('target').style.backgroundColor="white"
    document.getElementById('start').style.backgroundColor="transparent"
    document.getElementById('wall').style.backgroundColor="transparent"
    document.getElementById('clr').style.backgroundColor="transparent"

    

    color_val = style.backgroundColor
    
}
function pick_start_color(){
    var target_color = document.getElementById("start-color");
    var style = window.getComputedStyle(target_color)
    document.getElementById('start').style.backgroundColor="white"
    document.getElementById('target').style.backgroundColor = "transparent"
    document.getElementById('wall').style.backgroundColor= "transparent"
    document.getElementById('clr').style.backgroundColor="transparent"
    color_val = style.backgroundColor

}
function pick_wall_color(){
    var target_color = document.getElementById("wall-color");
    var style = window.getComputedStyle(target_color)
    document.getElementById('wall').style.backgroundColor="white"
    document.getElementById('start').style.backgroundColor="transparent"
    document.getElementById('target').style.backgroundColor="transparent"
    document.getElementById('clr').style.backgroundColor="transparent"
    var wallval = 'wall/wall'+Math.floor(Math.random() * (4 - 1 + 1) + 1)+'.png'
    color_val = "rgb(0, 0, 0)"
    
}
function clear_curser(){
    var target_color = document.getElementById("clear-color");
    var style = window.getComputedStyle(target_color)
    document.getElementById('wall').style.backgroundColor="transparent"
    document.getElementById('start').style.backgroundColor="transparent"
    document.getElementById('target').style.backgroundColor="transparent"
    document.getElementById('clr').style.backgroundColor="transparent"
    color_val = style.backgroundColor
}
function reset_tab(){
    window.location.href = "index.html"
    //location.reload();
}
function goto_about(){
    window.location.href = "About.html" 
}



function Gen_Path(){
    openSet = [];
    closeSet = [];
    var start_node_i;
    var start_node_j;
    var target_node_i;
    var target_node_j;
    for (var i = 0; i < grid_width; i++) {
        for (var j = 0; j < grid_height; j++) {
            var ele = document.getElementById("x="+i+",y="+j)
            block_array[i][j].value = ele.getAttribute('value')
            block_array[i][j].id = ele.id

            // console.log(block_array[i][j].id + " its a "+ block_array[i][j].value);
            if(ele.getAttribute('value')=="start"){
                start_node_i = i;
                start_node_j=j;
            }
            if(ele.getAttribute('value')=="target"){
                target_node_i = i;
                target_node_j =j;
            }
        }
    }

    //Setup
    //add anim to the start Node
    var start_div = document.getElementById("x="+start_node_i+",y="+start_node_j)
    start_div.classList.add("Start_node_con")
    start_div.innerHTML = "xy :"+start_node_i+","+start_node_j+"<br>"+"h ="+dist_2p_find(start_node_i,start_node_j,target_node_i,target_node_j)
    +"<br>"+"g ="+dist_2p_find(start_node_i,start_node_j,start_node_i,start_node_j)

    var start_div = document.getElementById("x="+target_node_i+",y="+target_node_j)
    start_div.classList.add("Start_node_con")
    start_div.innerHTML = "xy :"+target_node_i+","+target_node_j+"<br>"+"h ="+dist_2p_find(target_node_i,target_node_j,target_node_i,target_node_j)
    +"<br>"+"g ="+dist_2p_find(target_node_i,target_node_j,start_node_i,start_node_j)
    



    
    for(var i = 0 ; i <grid_width ; i++)
    {
    for (var j = 0; j < grid_height; j++) {
        
        
        if(block_array[i][j].value == "start"){
            var tmp = new cell(i,j,false)
            grid[i][j] = tmp
            start = grid[i][j]
        }
        else if(block_array[i][j].value ==="target"){
            grid[i][j] = new cell(i,j,false)
            end = grid[i][j]
        }
        else if(block_array[i][j].value ==="wall"){
            grid[i][j] = new cell(i,j,true)
        }
        else if(block_array[i][j].value === "white"){
            grid[i][j] = new cell(i,j,false)
        }
     }
    }
    for(var i = 0 ; i <grid_width ; i++)
    {
        for (var j = 0; j < grid_height; j++) {
            grid[i][j].SuccessorNeighbors(grid)
        }
    }
    openSet.push(start)
    draw();
    //console.log(path)
}

class cell{
    i;
    j;
    f;
    h;
    g = 0;
    neighbors = [];
    wall;
    prev = undefined;
    
    constructor(x,y,wall) {
        this.i=x;
        this.j=y;
        this.wall=wall;   
    }
    SuccessorNeighbors(grid)
    {
        var i  = this.i ;
        var j  = this.j ;
        if(i< grid_width-1){
            this.neighbors.push(grid[i+1][j]);
        }
        if(i>0)
        {
            this.neighbors.push(grid[i-1][j]);
        }
        if(j< grid_height-1)
        {
            this.neighbors.push(grid[i][j+1]);
        }
        if(j>0)
        {
            this.neighbors.push(grid[i][j-1]);
        }
    }
    

}



async function draw()
{
    
    while(true){

        if (openSet.length>0)
        {
            var smallEvaluationFunNodeIndex = 0 ;
            for (let i = 0; i < openSet.length; i++) {
                if(openSet[i].f < openSet[smallEvaluationFunNodeIndex].f)
                {
                    smallEvaluationFunNodeIndex = i ;
                }
            }
            var currentNode = openSet[smallEvaluationFunNodeIndex];
            if(openSet[smallEvaluationFunNodeIndex] === end){

                console.log("DONE!");
                break;
                


            }
            deleteFromArray(openSet,currentNode);
            closeSet.push(currentNode);
            
            var neighborr  = currentNode.neighbors ;
            for (let i = 0; i < neighborr.length; i++) {
                var neighboor_tmp = neighborr[i];
                var tmpg  = currentNode.g + 1;

                if(!closeSet.includes(neighboor_tmp) && !neighboor_tmp.wall &&!openSet.includes(neighboor_tmp) ) {

                    neighboor_tmp.g = tmpg ;
                    openSet.push(neighboor_tmp) ;

                    neighboor_tmp.h = heuristic(neighboor_tmp,end);
                    neighboor_tmp.f = neighboor_tmp.g + neighboor_tmp.h;
                    neighboor_tmp.previous = currentNode;



                }
                else{
                    if(tmpg < neighboor_tmp.g)
                    {
                        neighboor_tmp.g = tmpg ;
                        deleteFromArray(closeSet,neighboor_tmp);
                        openSet.push(neighboor_tmp);
                        neighboor_tmp.h = heuristic(neighboor_tmp,end);
                        neighboor_tmp.f = neighboor_tmp.g + neighboor_tmp.h;
                        neighboor_tmp.previous = currentNode;

                    }
                }
                
            }

            for(var i = 1 ; i < closeSet.length ;i++){
                document.getElementById("x="+closeSet[i].i+",y="+closeSet[i].j).classList.add("test_node_anim")
                document.getElementById("x="+closeSet[i].i+",y="+closeSet[i].j).innerHTML="h ="+closeSet[i].h+"<br>"+"g ="+closeSet[i].g+"<br>"+"f ="+closeSet[i].f;
                
                // console.log(closeSet[i])
            }


            await new Promise(r => setTimeout(r, speed_factor));
            
            
        }
        else{
            console.log("no solution");
            alert("no solution");
            break
        }
        
    }
    //console.log(closeSet)
    // for(var i = 1 ; i < closeSet.length ;i++){
    //         //console.log("x="+closeSet[i].i+",y="+closeSet[i].j)
    //         document.getElementById("x="+closeSet[i].i+",y="+closeSet[i].j).style.backgroundColor = "rgb(255, 0, 0)";
    // }




    var tempp = currentNode;
    path.push(tempp);
    while (tempp.previous) {
        path.push(tempp.previous);
        tempp = tempp.previous;

    }
    console.log(path)
    for(var i = 1 ; i < path.length-1 ;i++){
        document.getElementById("x="+path[i].i+",y="+path[i].j).classList.remove("test_node_anim")
        document.getElementById("x="+path[i].i+",y="+path[i].j).classList.add("path_node_anim")
        await new Promise(r => setTimeout(r, speed_factor));
    }
    return;
}
function deleteFromArray(Array , elementToDelete)
{
    for (let i =Array.length-1 ; i >=0 ; i--) {
        if(Array[i]== elementToDelete) {
            Array.splice(i, 1); // delete one element from an array

        }

    }
}
function heuristic(a,b)
{
    //var d = dist(a.i , a.j , b.i , b.j) ; // dist is an p5.js function
    var d = Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
    return d;

}
function dist_2p_find(x1 , y1 , x2 ,y2){
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}
function dumpy(){
    console.log("wain")
}

function speed_update(){
    speed_factor = document.getElementById("points").value
    console.log(speed_factor)
}