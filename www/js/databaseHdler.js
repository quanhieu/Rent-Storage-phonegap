var dbHdler = {
    db: null,
    createDatabase: function(){
        this.db = window.openDatabase(
            "mystorage.db",
            "1.1",
            "mystorage database",
            1000000);
        this.db.transaction(
            function(trans){
            //Run sql here using trans
            trans.executeSql(
                "create table if not exists mystorage(_id integer primary key, storagetype integer, dimension text, datetime text, feature text, rent integer, note text, reporter text)",
                [],
                function(trans, rs){},
                function(trans, err){
                    console.log("Created table err: " + err.message);
                }
            );
        },
            function(err){
                console.log("Transaction err: " + err.message);
            },
            function(){
                console.log("Database created successfully");
            }
        );

    }
}