define([
        "dojo/_base/declare","dojox/gfx","dojox/gfx/matrix",
        "dojo/_base/lang","./Track"
],function(
        declare,gfx,matrix,
        lang,Track
){
	return declare([Track], {
		max:100,
		min: 0,
		stroke: {color: "black", width: 2},
		render: function(){
			this.renderBackground();
			this.renderData(this.data);		
		},

		renderData: function(data) {
			var numPoints = data.length;
			var deg = 360/numPoints

			this.path = this.surface.createPath("");
		
			var pathPoints = [];	
			this.data.forEach(function(score,index){

				var point = {x: 0, y:this.internalRadius + (this.trackWidth*.3) +   (this.trackWidth * (score/this.max) *.55)}
				var rads = (deg*index)*Math.PI/180;
				var nextPoint = {
					x: point.y * Math.cos(rads) + this.centerPoint.x,
					y: point.y * Math.sin(rads) + this.centerPoint.y
				}

				pathPoints.push(nextPoint);
			},this);

			var first = pathPoints.shift();
			this.path.moveTo(first).smoothCurveTo(pathPoints).closePath().setStroke(this.stroke);
		}
	});
});

