jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.app.Application.extend("Application", {

	init : function () {
        var model = new sap.ui.model.json.JSONModel({});
        sap.ui.getCore().setModel(model);
	    var oConfig = new sap.ui.model.json.JSONModel({});
        sap.ui.getCore().setModel(oConfig, "config"); 
        this.getSessionInfo();        
	},
	
	main : function () {
	    

		// create app view and put to html root element
		var root = this.getRoot();
		var page = new sap.m.Page("pageID",{
			showHeader: false,
		    title: "Client Instance Assignment",
		    content: new sap.ui.xmlview("App", "view.AppDisplay")
		});
		page.setBusyIndicatorDelay(10);
		var app = new sap.m.App();
		app.addPage(page);
		app.placeAt(root);
	},
	
	getSessionInfo: function(){
		var aUrl = '/workshop/admin/services/exercisesMaster.xsjs?cmd=getSessionInfo';
	    this.onLoadSession(
	    		JSON.parse(jQuery.ajax({
	    		       url: aUrl,
	    		       method: 'GET',
	    		       dataType: 'json',
	    		       async: false}).responseText));    
	   
	},
	
	onLoadSession: function(myJSON){
		for( var i = 0; i<myJSON.session.length; i++)
	     {
		   var config =  sap.ui.getCore().getModel("config");
		   config.setProperty("/UserName",myJSON.session[i].UserName);
	     }
	},	
});          