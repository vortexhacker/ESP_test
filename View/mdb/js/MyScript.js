// Basic example
$(document).ready(function() {
    $('#dtBasicExample').DataTable({
        "ordering": false,
        "paging": true
            // false to disable pagination (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');




});

function increase(element) {
    var $lienactuel = $(element);
    //var $inputValue = Number($('.inputqte').val());
    var $nga = $lienactuel.parent().next().find('.inputqte');
    var $ngaVal = Number($nga.val());
    $nga.val($ngaVal + 1);


}

function decrease(element) {
    var $lienactuel = $(element);
    //var $inputValue = Number($('.inputqte').val());
    var $nga = $lienactuel.parent().prev().find('.inputqte');
    var $ngaVal = Number($nga.val());
    if ($ngaVal != 0) {
        $nga.val($ngaVal - 1);
    }
}


function buy(element) {
    var $lienactuel = $(element);
    var $objectProdId = $lienactuel.parent().prevAll('.tdProduct').find('.product-id').val();
    var $objectProdCat = $lienactuel.parent().prevAll('.tdProduct').find('.product-cat').val();
    var $objectProdName = $lienactuel.parent().prevAll('.tdProduct').find('.product-name');
    var $objectInputQty = $lienactuel.parent().prevAll('.mainTD').find('.spanqty').find('.inputqte');
    var $qty = Number($objectInputQty.val());
    var $cartItems = Number($('#noItems').text());
    var $prodName = $objectProdName.text();
    $.post('index.php', { 'controller': 'addToCartDefault', 'idProd': $objectProdId, 'prodName': $prodName, 'qty': $qty, 'catProd': $objectProdCat }, function(data) {});
    $('#noItems').text($cartItems + 1);

}

function displayCart() {
    $.post('index.php', { 'controller': 'getCartItems' }, function(data) {
        if ($.trim(data)) {
            $('#blocToFill').html(data);
            $('#cartModal').modal('show');
            //alert("non empty");
        }


    });

}

/*script for DetailComponentAdmin*/
function Update(element) {
    var $lienactuel = $(element);
    var $objectProdId = $lienactuel.parent().prevAll('.tdProduct').find('.product-id').val();
    var $objectProdName = $lienactuel.parent().prevAll('.tdProduct').find('.product-name').find('.inputProdName').val();
    var $objectProdPartNumber = $lienactuel.parent().prevAll('.tdProdPartNumber').find('.inputProdPartNumber').val();



    $.post('index.php', { 'controller': 'updateComponent', 'idProd': $objectProdId, 'prodName': $objectProdName, 'prodPartNumber': $objectProdPartNumber }, function(data) {
        console.log(data);
    });

    $('#Successful-modal').modal('show');

}

function displayPictureModal(idComponent) {
    var $idComponent = idComponent;
    $('#picture-modal-componentId').val($idComponent);
    //alert($idEquipment);
    $('#Picture-modal').modal('show');
}

function displayManualModal(idComponent) {
    var $idComponent = idComponent;
    $('#manual-modal-componentId').val($idComponent);
    //alert($idEquipment);
    $('#Manual-modal').modal('show');
}

function addComponent() {
    $('#modal-add-component').modal('show');

}
/*end 

/*function buy(element) {
    var $lienactuel = $(element);
    //var $inputValue = Number($('.inputqte').val());
    var $objectInputQty = $lienactuel.parent().prevAll('.mainTD').find('.spanqty').find('.inputqte');
    var $objectProdName = $lienactuel.parent().prevAll('.tdProduct').find('.product-name');
    var $qty = Number($objectInputQty.val());
    var $cartItems = Number($('#noItems').text());
    var $prodName = $objectProdName.text();
    $.post('index.php', {'controller':'addToCart','prodName':$prodName,'qty':$qty}, function(data) {
		$('#blocToFill').html($('#blocToFill').html() + data);
    });
    $('#noItems').text($cartItems + 1);
    /*$('#input1').val($qty);
    $('#modalProdName').text($prodName);
    $('#modalProdQty').text($qty);
    $('#totalQte').text($qty);
}*/

function deleteItem(element) {
    var $lienactuel = $(element);
    var $itemIndex = $lienactuel.parent().prevAll('.modalProdName').find('.inputitemArrayIndex').val();
    var $cartItems = Number($('#noItems').text());
    $.post('index.php', { 'controller': 'removeItemFromItemsArray', 'itemIndex': $itemIndex }, function(data) {
        console.log(data);
    });
    $lienactuel.parent().parent().remove();
    $('#noItems').text($cartItems - 1);
}

function detailOrderUser() {

    $.post('index.php', { 'controller': 'getItemsPerUser' }, function(data) {
        $('#blocToFillUser').html(data);
        $('#cartModalUser').modal('show');

    });

}

function checkout() {
    var $orderId = "";
    $.post('index.php', { 'controller': 'saveOrder' }, function(data) {
        $orderId = Number(data);
        $('.itemTosend').each(function(i, obj) {
            var $lienactuel = $(obj);
            var prodId = $lienactuel.find('.qtyTable2').find('.inputProdId').val();
            var prodCat = $lienactuel.find('.qtyTable2').find('.inputProdCat').val();
            var prodName = $lienactuel.find('.modalProdName').html();
            var prodQte = $lienactuel.find('.modalQteToSend').html();

            $.post('index.php', { 'controller': 'saveItem', 'orderId': $orderId, 'productId': prodId, 'productCat': prodCat, 'productQte': prodQte }, function(data) {
                console.log("product insert");
            });
        });
        //$('.itemTosend').remove();
        $('#noItems').text('0');
        $('#cartModal').modal('hide');
    });

}