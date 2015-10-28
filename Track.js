define([
        "dojo/_base/declare","dojox/gfx",
        "dojo/_base/lang","dojo/Stateful",
        "dojo/on"
],function(
        declare,gfx,
        lang,Stateful,
        on
){
	return declare([Stateful], {
		internalRadius: 100,
		trackWidth: 32,
		fill: "",
		background: {
			fill: "",
			stroke: "",
		},
		stroke: "",
		data: null,
		constructor: function(viewer,options,data){

			console.log("Create Track: ", options)

			if (options) {
				for (var prop in options) {
					console.log("Mixin in", prop);
					this[prop] = options[prop];
				}
			}

			this.surface = options.surface;

			this.data=data || [];

			var _self=this;
			this.watch('data', lang.hitch(this, function(attr,oldVal,data){

				//no idea why this is needed to avoid losing reference to the this.surface group from the viewer

				// console.log("Track set('data'): ",_self.surface.groupIdx, " opts groupIdx: ", options.surface.groupIdx)
				_self.surface = options.surface;
				_self.render();
			}))

			this.centerPoint = viewer.get("centerPoint");

			// if (!this.surface){
			// 	this.surface = viewer.get("surface");
			// }

			this.render();
		},

		render: function(){
			this.renderBackground();
		},

		renderBackground: function(refresh){
			if (!refresh && this._backgroundRendered){ console.log("Don't Re-render Background"); return; }

			console.log("Render Backgroup surface ID: ", this.surface.groupIdx);
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

			this._backgroundRendered=true;
			return this.bgPath;
		}
	});
});

