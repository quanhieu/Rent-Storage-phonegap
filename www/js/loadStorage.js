(function($, doc){

	const page = "#loadStoraged";
	const list = page + " #lstProducts";

	// HANDLE FUNCTION
	$(doc).on("pageinit", page, init);
	$(doc).on("pagebeforeshow", page, show); 


	function init(){
		$(`${page} #lstProducts`).on("tap", "#btnDelete", remove);
		$(`${page} #lstProducts`).on("tap", "#btnUpdate", reload);
		$(`${page} #lstProducts`).on("tap", "#btnNote", reload);
	}

	function show(){
        storageHandler.loadStorage(load);
	}

    function reload(e){
        let space = $(e.target).parents(".eachSpace").data('space');
        $("#newStoragetype").val(space.storagetype);
        $("#newDimension").val(space.dimension);
        $("#newDatetime").val(space.datetime);
        $("#newFeature").val(space.feature);
        $("#newRent").val(space.rent);
        $("#newReporter").val(space.reporter);
        $("#newNote").val(space.note);
        $("#_id").val(space._id);
        $("#_idn").val(space._id); // obj.name === obj["name"]
    }

	function remove(e){
        if(confirm("Are you sure to remove this storage space information?")){
            let space = $(e.target).parents(".eachSpace").data('space');
            storageHandler.deleteStorage(space._id);
            show();
        }
	}


	//RENDER FUNCTION
	function load(rs){
        $(list).empty();       
        Array.from(rs.rows).forEach(function(val){
            let storage = $(`
                <div class="ui-field-contain eachSpace">
                    <li>
                        <a>
                            <h1>Storage type: <span name="storagetype" id="storagetype">${val.storagetype}</span></h1> 
                            <h3>Dimensions in square meters: <span name="dimension">${val.dimension}</span>&nbsp;m<sup>2</sup></h3>
                            <h3>Date and time: <span name="datetime">${val.datetime}</span></h3>
                            <h3>Storage feature: <span name="feature">${val.feature}</span></h3>
                            <h3>Rent price: <span name="rent">${val.rent}</span>&nbsp;$/month</h3>
                            <h3>Name of the reporter: <span name="reporter">${val.reporter}</span></h3>
                            <h3>Note: <span name="note">${val.note}</span></h3>
                        </a>
                    </li>

                    <div data-role="navbar" class="ui-navbar" role="navigation">
                        <ul class="ui-grid-b">
                            <li>
                                <button class="ui-btn ui-icon-delete ui-btn-icon-right" id="btnDelete">Delete</button> 
                            </li>
                            <li>
                                <a href="#updatedialog" class="ui-btn ui-icon-edit ui-btn-icon-right " id="btnUpdate">Edit</a> 
                            </li>
                            <li>
                                <a href="#addnote" class="ui-btn ui-icon-comment ui-btn-icon-right " id="btnNote">Add note</a>
                            </li>
                        </ul>
                    </div>
                </div>
            `);
            storage.data("space", val);
            $("#lstProducts").append(storage); 
        });
        $("#lstProducts").listview("refresh");
    }


}(jQuery, document))