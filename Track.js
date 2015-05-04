define([
        "dojo/_base/declare","dojox/gfx",
        "dojo/_base/lang"
],function(
        declare,gfx,
        lang
){
	return declare([], {
		internalRadius: 100,
		trackWidth: 32,
		fill: "",
		background: {
			fill: "",
			stroke: "",
		},
		stroke: "",
		data: [],
		constructor: function(viewer,options,data){
			if (options) {
				for (var prop in options) {
					console.log("Mixin in", prop);
					this[prop] = options[prop];
				}
			}

			this.data=data || [];
			
			this.centerPoint = viewer.get("centerPoint");
			this.surface = viewer.get("surface");
			this.render();
		},

		render: function(){
			this.renderBackground();
		},

		renderBackground: function(){
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
			return this.bgPath;
		}
	});
});

