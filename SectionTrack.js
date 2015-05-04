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
		//stroke: {color: "black", width: 2},
		stroke:"",//{color: "black", width:.25},
		fill: "",
		render: function(){
			this.renderBackground();
			this.renderData(this.data);		
		},

		renderData: function(data) {
			var numPoints = data.length;
			var deg = 360/numPoints;
		
			this.data.forEach(function(score,index){

				var path = this.surface.createPath("");
				var startRads = (deg*(index-1))*Math.PI/180;
				var rads = (deg*index)*Math.PI/180;

				var innerStart= {
					x: this.internalRadius * Math.cos(startRads) + this.centerPoint.x ,
					y: this.internalRadius * Math.sin(startRads) + this.centerPoint.y 
				}

				var outerStart = {
					x: (this.internalRadius + this.trackWidth) * Math.cos(startRads) + this.centerPoint.x ,
					y: (this.internalRadius + this.trackWidth) * Math.sin(startRads) + this.centerPoint.y 
				}

				var outerEnd = {
					x: (this.internalRadius + this.trackWidth) * Math.cos(rads) + this.centerPoint.x ,
					y: (this.internalRadius + this.trackWidth) * Math.sin(rads) + this.centerPoint.y 
				}
				var innerEnd = {
					x: (this.internalRadius) * Math.cos(rads) + this.centerPoint.x ,
					y: (this.internalRadius) * Math.sin(rads) + this.centerPoint.y 
				}
				var fillSel = index % 3;
				var outerRadius = this.internalRadius + this.trackWidth;
				var innerRadius = this.internalRadius
				path.moveTo(innerStart)
					.arcTo(this.centerPoint.x,innerRadius+this.centerPoint.y,0,false,false,innerEnd)
					.lineTo(outerEnd)
					.arcTo(this.centerPoint.x,outerRadius+this.centerPoint.y,0,false,false,outerStart)
					.lineTo(innerStart)
					.closePath()
				
				console.log("Fill: ", this.fill);
				if (this.fill){
					console.log("typeof fill: ", typeof this.fill);
					if (typeof this.fill == "function") {
						path.setFill(this.fill(score,index))
					}else{
						path.setFill(this.fill)
					}
				}
				if (this.stroke) {
					path.setStroke(this.stroke);
				}
	
			},this);

			

		}
	});
});

