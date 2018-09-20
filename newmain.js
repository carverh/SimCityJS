var vars = {};
vars.selection = "empty";
vars.grid = {};
vars.gridSize = 25;

var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");

class tile{
    constructor(){
        this.population = 0;
        this.type = "empty";
        this.img = "";
        this.elevation = 5;
    }

    draw(x,y){
        ctx.fillStyle = "rgb(0,"+(255*(this.elevation/10))+",0)";
        var tileSize = 500/vars.gridSize;
        ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
        if(this.img != "")
            ctx.drawImg(this.img,x,y,500/vars.gridSize,500/vars.gridSize);
            

    }

}

function setSelection(newSel){
    vars.selection = newSel;
    
}

function makeGrid(size){
    vars.gridSize = size;
    vars.grid = {};
    for(var x = 0; x < vars.gridSize;x++){
        vars.grid[x] = {};
        for(var y = 0; y < vars.gridSize;y++){
            vars.grid[x][y] = new tile();
            vars.grid[x][y].elevation = Math.round((Math.random()*5)+3);
        }
    }
}

function smoothNeighbors(_x,_y){
    for(var x = _x-1; x < _x+1;x++){
        for(var y = _y-1; y < _y+1;y++){
            var temppos = pos(x,y);
            //console.log(temppos[0]+","+temppos[1]);
            vars.grid[_x][_y].elevation = (vars.grid[temppos[0]][temppos[1]].elevation *0.2) + (vars.grid[_x][_y].elevation*0.8);
        }
    }
}

function smoothGrid(){
    for(var x = 0; x < vars.gridSize;x++){
        for(var y = 0; y < vars.gridSize;y++){
            smoothNeighbors(x,y);
        }
    }
}

function pos(x,y){
    x = parseInt(x);
    y = parseInt(y);

    //console.log(x,y);
    x = (x+vars.gridSize)%vars.gridSize;
    y = (y+vars.gridSize)%vars.gridSize;
    x = Math.abs(x);
    y = Math.abs(y);
    //console.log(x,y);

    return [x,y];
}



function displayGrid(){
    for(var x = 0; x < vars.gridSize;x++){
        for(var y = 0; y < vars.gridSize;y++){
            try{
                vars.grid[x][y].draw(x,y);
            }catch(err){
                console.log(x+","+y);
            }
        }
    }
}

makeGrid(25);
for(var i = 0; i < 3; i++)
    smoothGrid();
function startDisplay(){
    setInterval(function(){
        displayGrid();
    },1000);
}
startDisplay();
    


console.log(vars.grid);

