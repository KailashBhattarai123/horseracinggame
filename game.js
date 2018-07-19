

/*Creating a Javascript Object for a horse as this, with 3 parameters: HTML ID, position a and b*/
function Horse(id, a, b){
	this.element = document.getElementById(id);/*This indicates the html element of the horse*/
	this.speed = Math.random()*10 + 10; /*Initializing speed for each horse, the speed is random. The value is between 10 and 20 so any speed may happen*/
	this.originX = a;/*Original X position as a*/
	this.originY = b;/*Original Y position as b*/
	this.a = a; /*Current X as a*/
	this.b = b; /*Current Y as b*/
	this.number = parseInt(id.replace(/[\D]/g, '')); /*Number of horse, number will be 1 or 2 or 3 or 4*/
	this.lap = 0; //Current lap of the horse

	this.moveRight = function(){
		var horse = this;/*Assign horse to this object*/

		/*Use setTimeout to have the delay in moving the horse*/
		setTimeout(function(){
			//Move the horse to right 1vw
			horse.a ++;
			horse.element.style.left = horse.a +'vw';

			//Check if goes through the start line, if horse runs enough number of laps and has pass the start line then stop
			if (horse.lap == num_lap && horse.a > horse.originX + 6){
				horse.arrive();
			}else{
				//Make decision to move Up or not
				//The width of the Up Road is 10wh, then the distance of each horse is 2.5vw (4 horses). The right position of the road is 82.5vw
				//Continue to move right if not reach the point to turn
				if (horse.a < 82.5 - horse.number*2.5){
					horse.moveRight();
				}else{
					//Change HTML class of horse to runUp
					horse.element.className = 'horse runUp';
					//Change the speed, will be random value from 10 to 20
					horse.speed = Math.random()*10 + 10;
					horse.moveUp();
				}
			}

		}, 1000/this.speed);
		/* 1000/this.speed is timeout time*/
	}

	/*Do the same for moveUp, moveDown, moveLeft*/
		this.moveUp = function(){
		var horse = this;
		setTimeout(function(){
			horse.b --;
			horse.element.style.top = horse.b +'vh';
			if (horse.b > horse.originY - 65){
				horse.speed = Math.random()*10 + 10;
				horse.moveUp();
			}else{
				horse.element.className = 'horse runLeft';
				//Nearly finish the lap
				horse.lap ++;
				horse.moveLeft();
			}
		}, 1000/this.speed)
	}
	this.moveDown = function(){
		var horse = this;
		setTimeout(function(){
			horse.b ++;
			horse.element.style.top = horse.b +'vh';
			if (horse.b < horse.originY){
				horse.moveDown();
			}else{
				horse.element.className = 'horse runRight';
				horse.speed = Math.random()*10 + 10;
				horse.moveRight();
			}
		}, 1000/this.speed)
	}
	this.moveLeft = function(){
		var horse = this;
		setTimeout(function(){
			horse.a --;
			horse.element.style.left = horse.a +'vw';
			if (horse.a > 12.5 - horse.number*2.5){
				horse.moveLeft();
			}else{
				horse.element.className = 'horse runDown';
				horse.speed = Math.random()*10 + 10;
				horse.moveDown();
			}
		}, 1000/this.speed)
	}


	/*Trigger the horse by run*/
	this.run = function(){
		this.element.className = 'horse runRight';
		this.moveRight();
	}
	this.arrive = function(){
		//Stop the horse run by change class to standRight
		this.element.className = 'horse standRight';
		this.lap = 0;//Reset the lap

		/*Shows result*/
		var tds = document.querySelectorAll('#results .result');// To display the result it gets all the table cells
		//results.length is the current arrive position
		tds[results.length].className = 'result horse'+this.number;//The class of result look like: result horse1...

		//Push the horse number to results array, according the the results array, we know the order of race results
		results.push(this.number);

		//Win horse
		if (results.length == 1){
			//If win horse is the bet horse, then add the fund
			if (this.number == bethorse){
				funds += amount+amount;
			}else{
				funds -= amount;
			}
			document.getElementById('funds').innerText = funds;
		}else if (results.length == 4){
			//All horse arrived, enable again the Start Button
			document.getElementById('start').disabled = false;
		}
	}
}

var num_lap = 1, results = [], funds = 100, bethorse, amount;

//Start the function when the document loaded
document.addEventListener("DOMContentLoaded", function(event) {

	var horse1 = new Horse('horse1', 20, 4);
	var horse2 = new Horse('horse2', 20, 8);
	var horse3 = new Horse('horse3', 20, 12);
	var horse4 = new Horse('horse4', 20, 16);

	//Event listener to the Start button
	document.getElementById('start').onclick = function(){
		amount = parseInt(document.getElementById('amount').value);
		num_lap = parseInt(document.getElementById('num_lap').value);
		bethorse = parseInt(document.getElementById('bethorse').value);

		if (funds < amount){
			alert('Not enough funds.');
		}
		else if (num_lap <= 0){
			alert('Number of lap must be greater than 1.');
		}else{

			/*Started the game*/
			this.disabled = true;/*Disable the start button*/
			var tds = document.querySelectorAll('#results .result');//Get all cells of result table.
			for (var i = 0; i < tds.length; i++) {
				tds[i].className = 'result';//Reset the result.
			}

			document.getElementById('funds').innerText = funds;
			results = [];//Results array is to save the horse numbers when the race is finished.
			horse1.run();
			horse2.run();
			horse3.run();
			horse4.run();
		}
	}
});
