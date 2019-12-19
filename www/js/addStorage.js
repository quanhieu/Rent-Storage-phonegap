(function($, doc){
    const page = "#addStoraged";

    $(doc).on("pageinit", page, ready);
    // $(doc).on("pageinit", ready);

    function ready(){
        dbHdler.createDatabase();
        $("#addStoraged form button").on("tap", addStorage);
    }

    function addStorage(e){
        e.preventDefault();
        let data = extract.extractForm("#addStoraged");
        data.datetime = new Date().toLocaleString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).toString();
        let isEmpty = Object.keys(data).some(key => data[key] === "" || data[key] === null);
        if(isEmpty) return alert(`Please fill in required fields`);
        else{
            var r = confirm("Storage Type: " + data.storagetype 
            + "\n" +"Dimension: " + data.dimension
            + "\n" +"Date: " + data.datetime
            + "\n" +"Storage feature: " + data.feature
            + "\n" +"Monthly rent price: " + data.rent
            + "\n" +"Name of reporter: " + data.reporter
            );
            if(r== true){
                storageHandler.addStorage(data);
                window.open('#loadStoraged', '_self');  
            }
            
        } 
    }

    // function deleteTable(){
    //     storageHandler.deleteAll();
    //     $("#deletetanle").dialog("close");
    // }
}(jQuery, document));


