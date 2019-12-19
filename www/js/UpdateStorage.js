(function($, doc){
    const updatepage = "#updatedialog";

    $("#updatedialog form button").on("tap", update);

    function update(e){
        e.preventDefault();
        let data = extract.extractForm(updatepage);
        let isEmpty = Object.keys(data).some(key=> data[key] === "" || data[key] === null);
        if(isEmpty) return alert('Please input in required fileds');
        // console.log(data);
        storageHandler.updateStorage(data);
        $(updatepage).dialog("close");
    }

}(jQuery, document));