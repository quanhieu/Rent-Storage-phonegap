var storageHandler={
	addStorage: function(space){
		// console.log(space);
		const {storagetype, dimension, datetime, feature, rent, reporter} = space;
		dbHdler.db.transaction(
			function(trans){
				trans.executeSql(
					"insert into mystorage(storagetype, dimension, datetime, feature, rent, reporter) values(?, ?, ?, ?, ?, ?)",
					[storagetype, dimension, datetime, feature, rent, reporter],
					function(trans, rs){},
					function(trans, err){
						console.log("Add storage error: " +err.message);
					}
				);
			},
			function(err){
				console.log(err.message);
			},
			function(){},
		);
	},

	loadStorage: function(viewStorage){		
		dbHdler.db.readTransaction(
			function(trans){
				trans.executeSql(
					"select * from mystorage",
					[],
					function(trans, rs){
                    	viewStorage(rs);
                	},
	                function(trans, err){
	                	console.log(err);
	                }
                );
			}
		);
	},

	deleteStorage:function(_id){
		dbHdler.db.transaction(
			function(trans){
				trans.executeSql(
					"delete from mystorage where _id = ?",
					[_id],
					function(trans, rs){},
	                function(trans, err){//TODO: Could make an alert for this one.
	                	console.log("Delete the storage error: " + err.message);
	                }
                );
			},
			function(err){},
			function(){},
		);
	},

	updateStorage: function(upload){
		const {newStoragetype, newDimension, newDatetime, newFeature, newRent, newNote, newReporter, _id} = upload;
		dbHdler.db.transaction(
			function(trans){
				trans.executeSql(
					"update mystorage set storagetype=?, dimension=?, datetime=?, feature=?, rent=?, note=?, reporter=? where _id = ?",
					[newStoragetype, newDimension, newDatetime, newFeature, newRent,  newNote, newReporter, _id],
					function(trans, result){},
	                function(trans, err){//TODO: alert/display this message to user
	                	console.log("Update the storage error" + err.message);
	                }
                );
			},
			function(err){},
			function(){},
		);
	},

	addNote: function(note){
		const {_idn, newNote} = note;
		dbHdler.db.transaction(
			function(trans){
				trans.executeSql(
					"update mystorage set note=? where _id = ?",
					[newNote, _idn],
					function(trans, result){},
	                function(trans, err){//TODO: alert/display this message to user
	                	console.log("Add note for storage error" + err.message);
	                }
                );
			},
			function(err){},
			function(){},
		);
	}

	
	// deleteAll:function(){
	// 	dbHdler.transaction(
	// 		function(trans){
	// 			trans.execSQL("delete from "+ mystorage);

	// 		}
	// 	);
	//         https://stackoverflow.com/questions/9599741/how-to-delete-all-record-from-table-in-sqlite-with-android
	//         https://www.youtube.com/watch?v=dk7Y1E04qXc
	// }

	// addNote: function(_id, newNote){
	// 	dbHdler.db.transaction(
	// 		function(trans){
	// 			trans.executeSql(
	// 				"update mystorage set note=? where _id = ?",
	// 				[newNote, _id],
	// 				function(trans, result){},
	//                 function(trans, err){//TODO: alert/display this message to user
	//                 	console.log("Add note for storage error" + err.message);
	//                 }
 //                );
	// 		}
	// 	);
	// }
}