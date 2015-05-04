define([
	"dojo/_base/declare", "dijit/_WidgetBase","dojox/gfx",
	"dojo/dom-construct","dojo/_base/lang"
],function(
	declare,WidgetBase,gfx,
	domConstruct,lang
){
	return declare([WidgetBase], {
		tracks: null,
		centerPoint: {x: 500,  y:500},
		centerRadius: 100,
		trackMargin: 4,
		constructor: function(){
			this._tracks=[];
		},

		postCreate: function(){
			this.inherited(arguments);
			this.surfaceNode = domConstruct.create("div", {style: {width: "100%",height:"100%"}}, this.domNode);
			this.surface = gfx.createSurface(this.surfaceNode,1000,1000);
		},

		addTrack: function(track){
			var opts = track.options || {};
			
			if (!opts.internalRadius) {
				opts.internalRadius = this.centerRadius;
				this._tracks.forEach(function(t){
					opts.internalRadius += t.trackWidth + this.trackMargin;
				},this);
			}
			this._tracks.push(new track.type(this, opts, track.data||[]));	
		},

		startup: function(){
			if (this._started) { return; }
			this._started=true;	
			this.surface.whenLoaded(lang.hitch(this,function(){
				console.log("Tracks: ", this.tracks);	
				if (this.tracks) {
					console.log("Tracks: ", this.tracks);
					this.tracks.forEach(function(track){
						this.addTrack(track);	
					},this);
				}
			}));
		}		
	});

});
