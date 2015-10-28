define([
        "dojo/_base/declare","dojox/gfx","dojox/gfx/matrix",
        "dojo/_base/lang","./Track"
],function(
        declare,gfx,matrix,
        lang,Track
){
	return declare([Track], {
		max:1,
		min: 0,
		data:null,
		stroke: {color: "black", width: 2},
		scoreProperty: "score",
		gridLines: true,
		render: function(){
			this.renderBackground();
			if (this.data && this.data.length>0){
				// console.log("RENDER DATA: ", this.data)
				this.renderData(this.data);		
			}else{
				this.set("loading", true);
			}
		},

		renderAlignedData: function(data){

		},
		renderData: function(data) {
			// if (this.referenceTrack){
			// 	return this.renderAlignedData(data);
			// }
			var numPoints = data.length;
			var deg = 360/numPoints

			if (this.path){ return; }

			// console.log("lineTrack this.surface: ", this.surface);
			this.path = this.surface.createPath("");
		
			var pathPoints = [];	

			var diff = this.max - this.min;


			this.data.forEach(function(item,index){
				var score = item[this.scoreProperty];

				// console.log("Internal Radius: ", this.internalRadius, " Track Width: ", this.trackWidth, score, (this.trackWidth * (score/this.max)));

				// var trackCenter = this.internalRadius + (this.trackWidth/2);

				var point;

				if (  (this.min < 0) && ((this.max+this.min)===0) ){
					var trackCenter = this.internalRadius + (this.trackWidth/2);
					point = {x: 0, y:trackCenter + ((score/this.max) * (this.trackWidth/2)) }
				}else if (this.min===0){
					point = {x: 0, y:this.internalRadius + ( (score/this.max) * this.trackWidth) }
				}else{
					// console.log("FIX ME (LineTrack.js line 56)");
				}

				var rads = (deg*index)*Math.PI/180;
				var nextPoint = {
					x: point.y * Math.cos(rads) + this.centerPoint.x,
					y: point.y * Math.sin(rads) + this.centerPoint.y
				}

				pathPoints.push(nextPoint);
			},this);

			var first = pathPoints.shift();
			this.path.moveTo(first).smoothCurveTo(pathPoints).closePath().setStroke(this.stroke);
		},
		renderBackground: function(refresh){
			if (!refresh && this._backgroundRendered){ return; }

			this.bgPath= this.surface.createPath("");
			var r = this.internalRadius+this.trackWidth;
			var start = {x: this.centerPoint.x, y: this.centerPoint.y - r};
			var end   = {x: this.centerPoint.x, y: this.centerPoint.y + r};
			this.bgPath.moveTo(start).arcTo(r, r, 0, true, true, end).arcTo(r, r, 0, true, true, start).closePath();

			var r = this.internalRadius;
			var start = {x: this.centerPoint.x, y: this.centerPoint.y - r};
			var end   = {x: this.centerPoint.x, y: this.centerPoint.y + r};
			this.bgPath.moveTo(start).arcTo(r, r, 0, true, true, end).arcTo(r, r, 0, true, true, start).closePath();

			if (this.background) {
				if (this.background.fill) {
					this.bgPath.setFill(this.background.fill)
				}

				if (this.background.stroke) {		
					this.bgPath.setStroke(this.background.stroke);
				}
			}

			if (this.gridLines){
				this.centerPath = this.surface.createPath("");
				var r = this.internalRadius+(this.trackWidth/2)
				var start = {x: this.centerPoint.x, y: this.centerPoint.y - r};
				var end   = {x: this.centerPoint.x, y: this.centerPoint.y + r};
				this.centerPath.moveTo(start).arcTo(r, r, 0, true, true, end).arcTo(r, r, 0, true, true, start).closePath();
				this.centerPath.setStroke({color: "#666666",style: "dot"});

				this.topQuarterPath = this.surface.createPath("");
				var r = this.internalRadius+((this.trackWidth/4)*3)
				var start = {x: this.centerPoint.x, y: this.centerPoint.y - r};
				var end   = {x: this.centerPoint.x, y: this.centerPoint.y + r};
				this.topQuarterPath.moveTo(start).arcTo(r, r, 0, true, true, end).arcTo(r, r, 0, true, true, start).closePath();
				this.topQuarterPath.setStroke({color: "#aaaaaa",style: "dot"});

				this.bottomQuarterPath = this.surface.createPath("");
				var r = this.internalRadius+(this.trackWidth/4)
				var start = {x: this.centerPoint.x, y: this.centerPoint.y - r};
				var end   = {x: this.centerPoint.x, y: this.centerPoint.y + r};
				this.bottomQuarterPath.moveTo(start).arcTo(r, r, 0, true, true, end).arcTo(r, r, 0, true, true, start).closePath();
				this.bottomQuarterPath.setStroke({color: "#aaaaaa",style: "dot"});
			}
			this._backgroundRendered=true;

			return this.bgPath;
		}
	});
});

