	
	var population = 0;
	var maxPopulation = 0;
	var money = 1000;

	var danTask = {};
	var danBasePlaced = false;
	var currentSelection = "empty";
	
	function makeGrid(size,smoothness){
		money = 1000;
		danBasePlaced = false;
		var grid = {};
		grid.length = size;
		document.getElementById("gridDiv").innerHTML = "";
		var parent = document.getElementById("gridDiv");
		for(var i = 0; i < size ; i ++) {
			grid[i] = {};
			for(var j = 0; j < size ; j ++) {
				grid[i][j]={};
				var el = document.createElement("img");
				el.id = "x"+j+"y"+i;
				el.style = "-moz-user-select: none;"
				el.style.height = (500/size)+"px";
				el.style.width = (500/size)+"px";
				el.style.backgroundColor = "#55ff55";
				el.draggable = false;
				el.src = "";
				el.onmousedown = function (j,i){
					return function(){
						gridClick.call(this,j,i);
					}
				}(j,i);
				
				el.onmouseover = function (j,i){
					return function(){
						displayStats.call(this,j,i);
					}
				}(j,i);
				
				parent.appendChild(el);
				
				grid[i][j]["contents"]="empty";
				grid[i][j]["happyness"] = 50;
				grid[i][j]["population"] = 0;
				grid[i][j]["jobs"] = 0;
				grid[i][j]["storeValue"] = 0;
				grid[i][j]["danValue"] = 0;
				
				/*
				if(Math.floor((Math.random() * 100) + 1) > 90){
					grid[i][j]["contents"]="medHouse";
				}
				if(Math.floor((Math.random() * 100) + 1) > 97){
					grid[i][j]["contents"]="bigHouse";
				}
				if(Math.floor((Math.random() * 100) + 1) > 95){
					grid[i][j]["contents"]="medFactory";
				}
				*/
				
			}
			var el = document.createElement("br");
			parent.appendChild(el);
		}
		//
		for(var i = 0; i < size ; i ++) {
			for(var j = 0; j < size ; j ++) {
				grid[i][j]["height"] = Math.floor(Math.floor((Math.random() * 128) + 1)+100);
			}
		}
		//
		
		var randomness = 30;
		
		for(var k = 0; k < smoothness; k++){
			for(var i = 0; i < size ; i ++) {
				for(var j = 0; j < size ; j ++) {
					if(grid[i+1] != undefined && grid[i-1] != undefined){
						if(grid[i][j+1] == undefined || grid[i][j-1] == undefined){
							//grid[i][j]["height"] = Math.floor(Math.floor((Math.random() * 128) + 1)+100);
							if(grid[j+1] == undefined){
								grid[i][j]["height"] = Math.floor((Math.floor((Math.random() * randomness) + 1)-((randomness/2))) + ((grid[i][j-1]["height"]+grid[i+1][j]["height"]+grid[i-1][j]["height"])/3));
							}else{
								grid[i][j]["height"] = Math.floor((Math.floor((Math.random() * randomness) + 1)-((randomness/2))) + ((grid[i][j+1]["height"]+grid[i+1][j]["height"]+grid[i-1][j]["height"])/3));
							}
						}else{
							if(((grid[i][j+1]["height"]+grid[i][j-1]["height"]+grid[i+1][j]["height"]+grid[i-1][j]["height"])/4) > 170){
								grid[i][j]["height"] = Math.floor((Math.floor((Math.random() * randomness) + 1)-((randomness/2)-1)) + ((grid[i][j+1]["height"]+grid[i][j-1]["height"]+grid[i+1][j]["height"]+grid[i-1][j]["height"])/4));
								if(grid[j][i]["height"]>=230){
									grid[i+1][j]["height"] += 3;
									grid[i-1][j]["height"] += 3;
									grid[i][j+1]["height"] += 3;
									grid[i][j-1]["height"] += 3;
								}document.getElementById("gridSizeTextbox")
							}else if(((grid[i][j+1]["height"]+grid[i][j-1]["height"]+grid[i+1][j]["height"]+grid[i-1][j]["height"])/4) < 155){
								grid[i][j]["height"] = Math.floor((Math.floor((Math.random() * randomness) + 1)-((randomness/2)+1)) + ((grid[i][j+1]["height"]+grid[i][j-1]["height"]+grid[i+1][j]["height"]+grid[i-1][j]["height"])/4));
							}else{
								grid[i][j]["height"] = Math.floor((Math.floor((Math.random() * randomness) + 1)-((randomness/2))) + ((grid[i][j+1]["height"]+grid[i][j-1]["height"]+grid[i+1][j]["height"]+grid[i-1][j]["height"])/4));
							}
							
						}
					}else{
						if(grid[i+1] == undefined){
							grid[i][j]["height"] = Math.floor((Math.floor((Math.random() * randomness) + 1)-((randomness/2))) + (grid[i-1][j]["height"]));
						}else{
							grid[i][j]["height"] = Math.floor((Math.floor((Math.random() * randomness) + 1)-((randomness/2))) + (grid[i+1][j]["height"]));
						}
					}
					
					if(grid[i][j]["height"] > 255){
						grid[i][j]["height"] = 255;
					}
						
					if(grid[i][j]["height"] < 60){
						grid[i][j]["content"] = "empty";
					}
					
				}
			}
		}
		
		grid[Math.floor((Math.random() * size))][Math.floor((Math.random() * size))]["content"] = "dan";
		
		return grid;
	}
	
	
	
	function dispGrid(grid){
		for(var i = 0; i < grid.length ; i ++) {
			for(var j = 0; j < grid.length ; j ++) {
				var el = document.getElementById("x"+j+"y"+i);
				if(el.src = grid[j][i]["contents"] == ""){
					el.src = "empty.png";
				}else{
					el.src = grid[j][i]["contents"]+".png";
				}
				
				console.log(grid[j][i]["height"]);
				if(grid[j][i]["height"]<240){
					el.style.backgroundColor = "rgb(55, "+grid[j][i]["height"]+",55)";
				}else{
					el.style.backgroundColor = "rgb(55,88,"+255+")"; //(grid[j][i]["height"]-250)*25
					el.src = "empty.png";
					grid[j][i]["contents"] = "empty";
				}
				console.log("rgb(55,"+grid[j][i]["height"]+" ,55)");
				//grid[i][j]["height"]=0;
				//grid[i][j]["contents"]="";
			}
		}
	}
	//==================================================================================
	function gridClick(x,y){
		if(grid != undefined){
			if(grid[x][y]["content"] != "danBase" && grid[x][y]["content"] != "dormantDanBase" && grid[x][y]["content"] != "reallyDormantDanBase"){
				if(currentSelection == "wall" && money >= 50){
						grid[x][y]["content"] = currentSelection;
						money-=50;
						grid[x][y]["content"] = "walls/wall";
						wallCheck();
						
					}else if(currentSelection == "wall" && money < 50){
						
					}
				}
			
			if(grid[x][y]["content"] != "danBase" && grid[x][y]["content"] != "dormantDanBase" && grid[x][y]["content"] != "reallyDormantDanBase" && grid[x][y]["height"]<240 && grid[x][y]["height"] >140){
				
				
				if(currentSelection == "upgrade"){
					if(grid[x][y]["content"] == "tinyHouse" && money >= 250){
						grid[x][y]["content"] = "medHouse";
						grid[x][y]["population"] += 10;
						grid[x][y]["storeValue"] -= 10;
						money-=250;
					}else if(grid[x][y]["content"] == "medHouse" && money >= 500){
						grid[x][y]["content"] = "bigHouse";
						grid[x][y]["population"] += 35;
						grid[x][y]["storeValue"] -= 35;
						money-=500;
					}
					if(grid[x][y]["content"] == "tinyStore" && money >= 300){
						grid[x][y]["content"] = "medStore";
						grid[x][y]["storeValue"] += 100;
						effect("happyness",4,x,y,20);
						money-=300;
					}
					if(grid[x][y]["content"] == "tinyFactory" && money >= 100){
						grid[x][y]["content"] = "medFactory";
						effect("happyness",3,x,y,-20);
						money-=100;
					}
					if(grid[x][y]["content"] == "tinyPark" && money >= 750){
						grid[x][y]["content"] = "bigPark";
						effect("happyness",3,x,y,50);
						money-=750;
					}
					
					document.getElementById("x"+x+"y"+y).src = grid[x][y]["content"]+".png";
					
				}
				
				if(grid[x][y]["height"]<240 && grid[x][y]["height"] >140){
					if(currentSelection == "empty"){
						if(grid[x][y]["content"] == "tinyPark"){
							effect("happyness",3,x,y,-50);
						}
						if(grid[x][y]["content"] == "tinyFactory"){
							effect("happyness",3,x,y,10);
						}
							
						if(grid[x][y]["content"] == "bigPark"){
							effect("happyness",3,x,y,-150);
						}
						if(grid[x][y]["content"] == "medFactory"){
							effect("happyness",3,x,y,30);
						}
						if(grid[x][y]["content"] == "abandoned"){
							effect("happyness",2,x,y,10);
						}
						
						if(grid[x][y]["content"] == "tinyStore"){
							effect("happyness",4,x,y,10);
						}
						if(grid[x][y]["content"] == "medStore"){
							effect("happyness",4,x,y,-30);
						}
						
						grid[x][y]["content"] = "empty";
						
						grid[x][y]["population"] = 0;
						grid[x][y]["storeValue"] = 0;
						
						//grid[x][y]["content"] = currentSelection;
						
						document.getElementById("x"+x+"y"+y).src = grid[x][y]["content"]+".png";
					}
				}
				
				if(grid[x][y]["height"]<240 && grid[x][y]["height"] >140){
					console.log(x+","+y+"  pressed: "+grid[x][y]["content"]);
					
					
					
					if(grid[x][y]["content"] == "empty" || grid[x][y]["content"] == undefined || currentSelection == "empty"){
						if(currentSelection != "upgrade"){
							//grid[x][y]["content"] = currentSelection;
							if(currentSelection == "tinyPark"){
								effect("happyness",3,x,y,50);
							}
							if(currentSelection == "tinyFactory"){
								effect("happyness",3,x,y,-10);
								if(currentSelection == "tinyFactory" && money>100){
									money-=100;
									grid[x][y]["content"] = currentSelection;
								}
							}
							
						}else{
							grid[x][y]["content"] = "empty";
						}
					}
				}else{
					grid[x][y]["content"] = "empty";
				}
				
				console.log(grid[x][y]["content"]);
				
				if(grid[x][y]["content"] == "empty"){
					if(currentSelection == "tinyStore" && money>=150){
						grid[x][y]["content"] = currentSelection;
						grid[x][y]["storeValue"] += 50;
						effect("happyness",4,x,y,10);
						money-=150;
					}else if(money < 150){
						
					}
					 
					
					 console.log(money);
					if(currentSelection == "tinyHouse" && money>=50){
						grid[x][y]["content"] = currentSelection;
						grid[x][y]["population"] += 5;
						grid[x][y]["storeValue"] -= 5;
						money-=50;
						console.log(money);
					}else if(currentSelection == "tinyHouse" && money < 50){
						
					}
					
					if(currentSelection == "tower" && money>=10000){
						grid[x][y]["content"] = currentSelection;
						grid[x][y]["towerTime"] = 720;
						money-=10000;
						console.log(money);
					}else if(currentSelection == "tower" && money <= 10000){
						
					}
					
					if(currentSelection == "tinyPark" && money>=200){
						grid[x][y]["content"] = currentSelection;
						money-=200;
					}else if(money < 200){
						
					}
					
					
					
				}else{
					console.log(grid[x][y]["content"]);
				}
				
				
			}
			document.getElementById("x"+x+"y"+y).src = grid[x][y]["content"]+".png";
			//if(grid[x][y]["content"] == "wall"){
				wallCheck();
			//}
			document.getElementById("moneySpan").innerHTML = money;
		}
	}
	
	function setSelection(sel){
		currentSelection = sel;
		document.getElementById("currSelection").innerHTML = currentSelection;
	}
	
	
	
	function makeGridViaButton(){
		grid = makeGrid(document.getElementById("gridSizeTextbox").value,document.getElementById("gridSmoothnessTextbox").value);
		dispGrid(grid);
		size = document.getElementById("gridSizeTextbox").value;
	}
	
	function nearby(key,radius,centerx,centery){
		var total = 0;
		for(var i = radius*-1; i < radius; i++){
			for(var j = radius*-1; j < radius; j++){
				if(grid[i+centerx] != undefined){
					if(grid[i+centerx][j+centery] != undefined){
						total+=grid[i+centerx][j+centery][key];
					}
				}
			}
		}
		return total;
	}
	
	function nearbyCount(key,radius,centerx,centery,value){
		var total = 0;
		for(var i = radius*-1; i < radius; i++){
			for(var j = radius*-1; j < radius; j++){
				if(grid[i+centerx] != undefined){
					if(grid[i+centerx][j+centery] != undefined){
						if(grid[i+centerx][j+centery][key] == value){
							total+=1;
						}
					}
				}
			}
		}
		return total;
	}
	
	
	function danMove(grid,j,i,x,y){
		
		if(grid[j+x] != undefined){
			if(grid[j+x][i+y] != undefined){
				if(grid[j+x][i+y]["content"] == "empty" && grid[j+x][i+y]["height"] < 240){
					grid[j+x][i+y]["content"] = "mdan";
					grid[j][i]["content"] = "empty";
				}
			}
		}
		return grid;
	}
	
	function danAI(grid,x,y){ //function nearby(key,radius,centerx,centery)
		//if(danBasePlaced){
			tempCount = nearbyCount("content",2,x,y,"danBase");
			tempCounta = nearbyCount("content",2,x,y,"dormantDanBase");
			tempCountb = nearbyCount("content",2,x,y,"reallyDormantDanBase");
			if(tempCount > 0 || tempCounta > 0 || tempCountb > 0){
				if(Math.floor((Math.random() * 5) + 1) == 3){
					grid[x][y]["content"] = "danBase";
					grid[x][y]["danValue"] = 0;
				}
			}
		//}else{
			tempnum = Math.floor((Math.random() * 100) + 1);
			if(tempnum > 70){
				grid[x][y]["content"] = "danBase";
				grid[x][y]["danValue"] = 0;
			}
		//}
		
		if(grid[x+1] != undefined && grid[x-1] != undefined ){
			if(grid[x][y+1] != undefined && grid[x][y-1] != undefined ){
				temp = Math.floor((Math.random() * 30) + 1);
				if(temp==1 && grid[x][y+1]["content"].substring(0,4) == "wall"){
					grid[x][y+1]["content"] = "empty";
					document.getElementById("x"+(x)+"y"+(y+1)).src = grid[x][y+1]["content"]+".png";
				}
				if(temp==2 && grid[x][y-1]["content"].substring(0,4) == "wall"){
					grid[x][y-1]["content"] = "empty";
					document.getElementById("x"+(x)+"y"+(y-1)).src = grid[x][y-1]["content"]+".png";
				}
				if(temp==3 && grid[x-1][y]["content"].substring(0,4) == "wall"){
					grid[x-1][y]["content"] = "empty";
					document.getElementById("x"+(x-1)+"y"+y).src = grid[x-1][y]["content"]+".png";
				}
				if(temp==4 && grid[x+1][y]["content"].substring(0,4) == "wall"){
					grid[x+1][y]["content"] = "empty";
					document.getElementById("x"+(x+1)+"y"+y).src = grid[x+1][y]["content"]+".png";
				}
				
				temp = Math.floor((Math.random() * 4) + 1);
				try{
					if(temp==1 && grid[x][y+1]["content"].substring(0,4) != "wall" && (grid[x][y+1]["content"] != "danBase" && grid[x][y+1]["content"] != "reallyDormantDanBase" && grid[x][y+1]["content"] != "dormantDanBase" && grid[x][y+1]["content"] != "dan")){
						grid[x][y+1]["content"] = "empty";
						document.getElementById("x"+(x)+"y"+(y+1)).src = grid[x][y+1]["content"]+".png";
					}
					
					if(temp==2 && grid[x][y-1]["content"].substring(0,4) != "wall" && (grid[x][y-1]["content"] != "danBase" && grid[x][y-1]["content"] != "reallyDormantDanBase" && grid[x][y-1]["content"] != "dormantDanBase" && grid[x][y-1]["content"] != "dan")){
						grid[x][y-1]["content"] = "empty";
						document.getElementById("x"+(x)+"y"+(y-1)).src = grid[x][y-1]["content"]+".png";
					}
					
					if(temp==3 && grid[x+1][y]["content"].substring(0,4) != "wall" && (grid[x+1][y]["content"] != "danBase" && grid[x+1][y]["content"] != "reallyDormantDanBase" && grid[x+1][y]["content"] != "dormantDanBase" && grid[x+1][y]["content"] != "dan")){
						grid[x+1][y]["content"] = "empty";
						document.getElementById("x"+(x+1)+"y"+(y)).src = grid[x+1][y]["content"]+".png";
					}
					
					if(temp==4 && grid[x-1][y]["content"].substring(0,4) != "wall" && (grid[x-1][y]["content"] != "danBase" && grid[x-1][y]["content"] != "reallyDormantDanBase" && grid[x-1][y]["content"] != "dormantDanBase" && grid[x-1][y]["content"] != "dan")){
						grid[x-1][y]["content"] = "empty";
						document.getElementById("x"+(x-1)+"y"+(y)).src = grid[x-1][y]["content"]+".png";
					}
				}catch(err){
					console.log("ERROR: "+err);
				}
					
			}else{
				
				
			}
		}
		
		temp = Math.floor((Math.random() * 4) + 1);
		if(temp==1){
			grid = danMove(grid,x,y,1,0);
		}
		if(temp==2){
			grid = danMove(grid,x,y,-1,0);
		}
		if(temp==3){
			grid = danMove(grid,x,y,0,1);
		}
		if(temp==4){
			grid = danMove(grid,x,y,0,-1);
		}
		
		return grid;
	}
	danBasePlaced = false;
	
	
	function tick(){
		if(Math.floor((Math.random() * 20) + 1) == 10){
			decay = true;
		}else{
			decay = false;
		}
		for(var i = 0; i < size ; i ++) {
			for(var j = 0; j < size ; j ++) {
				
				
				if(grid[j][i]["content"] == "tower"){
					money-=1;
					if(grid[j][i]["towerTime"] <= 0 || nearby("population",6,j,i) <= 20){
						grid[j][i]["content"] = "abandoned";
					}else{
						destroyDan(3,j,i);
					}
				}
				
				if(grid[j][i]["content"] == "abandoned"){
					document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
				}
				
				if(decay){
					if(grid[j][i]["content"] == "dormantDanBase"){
						if(Math.floor((Math.random() * 20) + 1) == 10){
							grid[j][i]["content"] = "reallyDormantDanBase";
							document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
						}
					}
					
					if(grid[j][i]["content"] == "reallyDormantDanBase"){
						if(Math.floor((Math.random() * 50) + 1) == 25){
							grid[j][i]["content"] = "empty";
							document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
						}
					}
				}
				
				
				if(grid[j][i]["content"] == "danBase" || grid[j][i]["content"] == "dormantDanBase" ){
					
					
						if(grid[j+1] != undefined && grid[j-1] != undefined ){
							if(grid[j][i+1] != undefined && grid[j][i-1] != undefined ){
								if(grid[j][i+1]["content"] != undefined && grid[j][i-1]["content"] != undefined ){
									if(grid[j+1][i]["content"] != undefined && grid[j-1][i]["content"] != undefined ){
										temp = Math.floor((Math.random() * 4) + 1);
										
										if(temp==1 && grid[j][i+1]["content"].substring(0,4) != "wall" && (grid[j][i+1]["content"] != "danBase" && grid[j][i+1]["content"] != "reallyDormantDanBase" && grid[j][i+1]["content"] != "dormantDanBase" && grid[j][i+1]["content"] != "dan")){
											grid[j][i+1]["content"] = "empty";
											grid[j][i+1]["population"] = 0;
											grid[j][i+1]["storeValue"] = 0;
											document.getElementById("x"+(j)+"y"+(i+1)).src = grid[j][i+1]["content"]+".png";
										}
											
										if(temp==2 && grid[j][i-1]["content"].substring(0,4) != "wall" && (grid[j][i-1]["content"] != "danBase" && grid[j][i-1]["content"] != "reallyDormantDanBase" && grid[j][i-1]["content"] != "dormantDanBase" && grid[j][i-1]["content"] != "dan")){
											grid[j][i-1]["content"] = "empty";
											grid[j][i-1]["population"] = 0;
											grid[j][i-1]["storeValue"] = 0;
											document.getElementById("x"+(j)+"y"+(i-1)).src = grid[j][i-1]["content"]+".png";
										}
												
										if(temp==3 && grid[j+1][i]["content"].substring(0,4) != "wall" && (grid[j+1][i]["content"] != "danBase" && grid[j+1][i]["content"] != "reallyDormantDanBase" && grid[j+1][i]["content"] != "dormantDanBase" && grid[j+1][i]["content"] != "dan")){
											grid[j+1][i]["content"] = "empty";
											grid[j-1][i]["population"] = 0;
											grid[j-1][i]["storeValue"] = 0;
											document.getElementById("x"+(j+1)+"y"+(i)).src = grid[j+1][i]["content"]+".png";
										}
												
										if(temp==4 && grid[j-1][i]["content"].substring(0,4) != "wall" && (grid[j-1][i]["content"] != "danBase" && grid[j-1][i]["content"] != "reallyDormantDanBase" && grid[j-1][i]["content"] != "dormantDanBase" && grid[j-1][i]["content"] != "dan")){
											grid[j-1][i]["content"] = "empty";
											grid[j+1][i]["population"] = 0;
											grid[j+1][i]["storeValue"] = 0;
											document.getElementById("x"+(j-1)+"y"+(i)).src = grid[j-1][i]["content"]+".png";
										}
									}
								}
							}
						}
					
					danBasePlaced = true;
					grid[j][i]["danValue"] += 1;
					if(grid[j-1] != undefined){
						if(grid[j+1] != undefined){
							if(grid[j][i+1] != undefined){
								if(grid[j][i-1] != undefined){
									if(grid[j-1][i]["content"] != "empty" && grid[j+1][i]["content"] != "empty" && grid[j][i+1]["content"] != "empty" && grid[j][i-1]["content"] != "empty"){
										grid[j][i]["content"] = "dormantDanBase";
										if(grid[j-1][i]["content"] == "dormantDanBase" && grid[j+1][i]["content"] == "dormantDanBase" && grid[j][i+1]["content"] == "dormantDanBase" && grid[j][i-1]["content"] == "dormantDanBase"){
											grid[j][i]["content"] = "reallyDormantDanBase";
										}
										
										if(grid[j-1][i]["content"] == "reallyDormantDanBase" && grid[j+1][i]["content"] == "reallyDormantDanBase" && grid[j][i+1]["content"] == "reallyDormantDanBase" && grid[j][i-1]["content"] == "reallyDormantDanBase"){
											grid[j][i]["content"] = "reallyDormantDanBase";
										}
										
										document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
									}else{
										if(grid[j][i]["content"] == "dormantDanBase"){
											grid[j][i]["content"] = "danBase";
											document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
										}
									}
								}
							}
						}
					}
					
					if(grid[j][i]["danValue"] > 200){
						
						
						if(grid[j+1] != undefined && grid[j-1] != undefined ){
							if(grid[j][i+1] != undefined && grid[j][i-1] != undefined ){
								temp = Math.floor((Math.random() * 10) + 1);
								if(temp==1 && grid[j][i+1]["content"].substring(0,4) == "wall"){
									grid[j][i+1]["content"] = "empty";
									grid[j][i+1]["population"] = 0;
									grid[j][i+1]["storeValue"] = 0;
								}
								if(temp==2 && grid[j][i-1]["content"].substring(0,4) == "wall"){
									grid[j][i-1]["content"] = "empty";
									grid[j][i-1]["population"] = 0;
									grid[j][i-1]["storeValue"] = 0;
								}
								if(temp==3 && grid[j-1][i]["content"].substring(0,4) == "wall"){
									grid[j-1][i]["content"] = "empty";
									grid[j-1][i]["population"] = 0;
									grid[j-1][i]["storeValue"] = 0;
								}
								if(temp==4 && grid[j+1][i]["content"].substring(0,4) == "wall"){
									grid[j+1][i]["content"] = "empty";
									grid[j+1][i]["population"] = 0;
									grid[j+1][i]["storeValue"] = 0;
								}
								
				
								
							}
						}
						
						grid[j][i]["danValue"] = 0;
						if(grid[j+1] != undefined){
							if(grid[j+1][i] != undefined){
								if(grid[j+1][i]["content"] == "empty"){
									grid[j+1][i]["content"] = "dan";
									document.getElementById("x"+(j+1)+"y"+i).src = grid[j+1][i]["content"]+".png";
								}
							}
						}
						if(grid[j-1] != undefined){
							if(grid[j-1][i] != undefined){
								if(grid[j-1][i]["content"] == "empty"){
									grid[j-1][i]["content"] = "dan";
									document.getElementById("x"+(j-1)+"y"+i).src = grid[j-1][i]["content"]+".png";
								}
							}
						} 
						if(grid[j][i+1] != undefined){
							if(grid[j][i+1]["content"] == "empty"){
								grid[j][i+1]["content"] = "dan";
								document.getElementById("x"+j+"y"+(i+1)).src = grid[j][i+1]["content"]+".png";

							}
						}
						if(grid[j][i-1] != undefined){
							if(grid[j][i-1]["content"] == "empty"){
								grid[j][i-1]["content"] = "dan";
								document.getElementById("x"+j+"y"+(i-1)).src = grid[j][i-1]["content"]+".png";

							}
						}
					}
				}
				
				
				
				
				
				
				if(grid[j][i]["content"] == "dan"){
					//grid[j][i]["content"] == "empty";
					//if(danTask == undefined || danTask == null){
						
					//}else{
						
					//}
					grid = danAI(grid,j,i);
					
					
					document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
				}
				
				if(grid[j][i]["content"] == "tinyFactory"){
					if(nearby("population",6,j,i) >= 10 ){
						money += 5;
					}
					
				}
				
				if(grid[j][i]["content"] == "tinyStore"){
					if(nearby("population",6,j,i) <= 10 ){
						grid[j][i]["content"] = "abandoned";
					}
					money -= 2;
				}
				
				if(grid[j][i]["content"] == "tower"){
					if(nearby("population",6,j,i) <= 20 ){
						grid[j][i]["content"] = "abandoned";
					}
					money -= 2;
				}
				
				if(grid[j][i]["content"] == "medStore"){
					if(nearby("population",6,j,i) <= 50 ){
						grid[j][i]["content"] = "abandoned";
					}
					money -= 5;
				}
				
				if(grid[j][i]["content"] == "medFactory"){
					if(nearby("population",6,j,i) >= 30){
						money += 10;
					}
					
				}
				
			}
			document.getElementById("moneySpan").innerHTML = money;
		}
		for(var i = 0; i < size ; i ++) {
			for(var j = 0; j < size ; j ++) {
				if(grid[j] != undefined){
					if(grid[j][i] != undefined){
						if(grid[j][i]["content"] == undefined){
							grid[j][i]["content"] = "empty";
							document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
						}
						
						if(grid[j][i]["content"] == "mdan"){
							grid[j][i]["content"] = "dan";
							document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
						}
						
						if(grid[j][i]["content"] == "dan"){
							document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
						}
					}
				}
				if(grid[j][i]["content"] == "tinyHouse" || grid[j][i]["content"] == "medHouse" || grid[j][i]["content"] == "bigHouse"  ){
					if((grid[j][i]["happyness"] <= 20 || nearby("storeValue",4,j,i)<=-50) && Math.floor((Math.random() * 20) + 1) == 2){
						grid[j][i]["content"] = "abandoned";
						grid[j][i]["population"] = 0;
						grid[j][i]["storeValue"] = 0;
						document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png"
						effect("happyness",2,j,i,-10);
					}
				}
			}
		}
	}
	
	function effect(key,radius,centerx,centery,potency){
		for(var i = radius*-1; i < radius; i++){
			for(var j = radius*-1; j < radius; j++){
				if(grid[i+centerx] != undefined){
					if(grid[i+centerx][j+centery] != undefined){
						grid[i+centerx][j+centery][key] += potency;
					}
				}
			}
		}
	}
	
	function destroyDan(radius,centerx,centery){
		for(var i = radius*-1; i < radius; i++){
			for(var j = radius*-1; j < radius; j++){
				if(grid[i+centerx] != undefined){
					if(grid[i+centerx][j+centery] != undefined){
						if(grid[i+centerx][j+centery]["content"] == "dan" || grid[i+centerx][j+centery]["content"] == "danBase" || grid[i+centerx][j+centery]["content"] == "dormantDanBase"){
							grid[i+centerx][j+centery]["content"] = "abandoned";
							document.getElementById("x"+(i+centerx)+"y"+(j+centery)).src = grid[i+centerx][j+centery]["content"]+".png";
						}
					}
				}
			}
		}
	}
	
	function definedArea(radius,centerx,centery){
		var total = 0;
		for(var i = radius*-1; i < radius; i++){
			for(var j = radius*-1; j < radius; j++){
				if(grid[i+centerx] != undefined){
					if(grid[i+centerx][j+centery] != undefined){
						total+=1;
					}
				}
			}
		}
		return total;
	}
	
	function wallCheck(){
		
		
		for(var i = 0; i < size ; i ++) {
			for(var j = 0; j < size ; j ++) {
				//console.log(grid[j][i]["content"].substring(0,4));
				if(grid[j][i]["content"].substring(0,4) == "wall"){
					
					var N = "";
					var E = "";
					var S = "";
					var W = "";
					
					if(grid[j+1] != undefined && grid[j-1] != undefined){
						if(grid[j][i+1] != undefined && grid[j][i-1] != undefined){
							if(grid[j][i-1]["content"].substring(0,4) == "wall"){
								N = "N";
							}
							if(grid[j+1][i]["content"].substring(0,4) == "wall"){
								E = "E";
							}
							if(grid[j][i+1]["content"].substring(0,4) == "wall"){
								S = "S";
							}
							if(grid[j-1][i]["content"].substring(0,4) == "wall"){
								W = "W";
							}
						}else{
							//i undefined
							if(grid[j][i+1] != undefined){
								N = "N";
								if(grid[j+1][i]["content"].substring(0,4) == "wall"){
									E = "E";
								}
								if(grid[j][i+1]["content"].substring(0,4) == "wall"){
									S = "S";
								}
								if(grid[j-1][i]["content"].substring(0,4) == "wall"){
									W = "W";
								}
							}else{
								S = "S";
								if(grid[j+1][i]["content"].substring(0,4) == "wall"){
									E = "E";
								}
								if(grid[j][i-1]["content"].substring(0,4) == "wall"){
									N = "N";
								}
								if(grid[j-1][i]["content"].substring(0,4) == "wall"){
									W = "W";
								}
							}
						}
					}else{
						//j undefined
						if(grid[j][i+1] == undefined){
							N = "N";
						}else if(grid[j][i-1] == undefined){
							S = "S";
						}
						
						if(grid[j+1] != undefined){
							W = "W";
							if(grid[j][i-1]["content"].substring(0,4) == "wall"){
								N = "N";
							}
							if(grid[j][i+1]["content"].substring(0,4) == "wall"){
								S = "S";
							}
							if(grid[j+1][i]["content"].substring(0,4) == "wall"){
								E = "E";
							}
						}else{
							E = "E";
							if(grid[j][i-1]["content"].substring(0,4) == "wall"){
								N = "N";
							}
							if(grid[j][i+1]["content"].substring(0,4) == "wall"){
								S = "S";
							}
							if(grid[j-1][i]["content"].substring(0,4) == "wall"){
								W = "W";
							}
						}
						
					}
					
					
					
					console.log("walls/wall"+N+E+S+W);
					grid[j][i]["content"] = "walls/wall"+N+E+S+W;
					document.getElementById("x"+j+"y"+i).src = grid[j][i]["content"]+".png";
				}
			}
		}
	}
	
	function displayStats(x,y){
		if(grid[x] != undefined){
				if(grid[x][y] != undefined){
					document.getElementById("statDiv").innerHTML = "happyness:"+grid[x][y]["happyness"]+"<br/>"+"storeValue:"+grid[x][y]["storeValue"]+"<br/>";
					document.getElementById("statDiv").innerHTML +="averageLocalHappyness:"+Math.floor(nearby("happyness",4,x,y)/definedArea(4,x,y))+"<br/>"+"localStoreValue:"+nearby("storeValue",4,x,y);
				}
			}
	}		
	
	var size = 25;
	var grid = makeGrid(25,30);
	dispGrid(grid);
	
	var timer = setInterval(tick,250);
	