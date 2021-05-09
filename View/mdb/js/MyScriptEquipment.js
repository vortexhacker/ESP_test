// Basic example
$(document).ready(function () {
    $('#dtBasicExample').DataTable({
        "ordering":false,
        "paging": true // false to disable pagination (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');

    

   
});

function buy(element) {
    var $lienactuel = $(element);
    var $objectProdId = $lienactuel.parent().prevAll('.tdProduct').find('.product-id').val();
    var $objectProdCat = $lienactuel.parent().prevAll('.tdProduct').find('.product-cat').val();
    var $objectProdName = $lienactuel.parent().prevAll('.tdProduct').find('.product-name');
    var $objectInputQty = $lienactuel.parent().prevAll('.mainTD').find('.spanqty').find('.inputqte');
    var $qty = Number($objectInputQty.val());
    var $cartItems = Number($('#noItems').text());
    var $prodName = $objectProdName.text();
    $.post('index.php', {'controller':'addToCartDefault','idProd':$objectProdId,'prodName':$prodName,'qty':$qty,'catProd':$objectProdCat}, function(data) {
    });
    $('#noItems').text($cartItems + 1);

}

function displayCart(){
    $.post('index.php', {'controller':'getCartItems'}, function(data) {
        if($.trim(data)){
            $('#blocToFill').html(data);
             $('#cartModal').modal('show');
             //alert("non empty");
         }
         
    });
    
}

function deleteItem(element){
    var $lienactuel = $(element);
    var $itemIndex = $lienactuel.parent().prevAll('.modalProdName').find('.inputitemArrayIndex').val();
    var $cartItems = Number($('#noItems').text());
    $.post('index.php', {'controller':'removeItemFromItemsArray','itemIndex':$itemIndex}, function(data) {
        console.log(data);
    });
    $lienactuel.parent().parent().remove();
    $('#noItems').text($cartItems - 1);
}

/* Script for DetailEquipmentAdmin */
function Update(element) {
    var $lienactuel = $(element);
    var $objectProdId = $lienactuel.parent().prevAll('.tdProduct').find('.product-id').val();
    var $objectProdName = $lienactuel.parent().prevAll('.tdProduct').find('.product-name').find('.inputProdName').val();
    var $objectProdModel = $lienactuel.parent().prevAll('.tdProdModel').find('.inputProdModel').val();
    var $objectProdSerialNumber = $lienactuel.parent().prevAll('.tdProdSerialNumber').find('.inputProdSerialNumber').val();
    var $objectProdAssetNumber = $lienactuel.parent().prevAll('.tdProdAssetNumber').find('.inputProdAssetNumber').val();
    var $objectProdExistingStockToUpdate = $lienactuel.parent().prevAll('.tdProduct').find('.blocExistingStock').find('.btnExistingStock').find('.spanExistingStock');
    var $objectProdExistingStock = $lienactuel.parent().prevAll('.tdProduct').find('.blocExistingStock').find('.btnExistingStock').find('.spanExistingStock').text();
    var $objectInputQty = $lienactuel.parent().prevAll('.mainTD').find('.spanqty').find('.inputqte');
    var $qty = Number($objectInputQty.val());
    
   
    $.post('index.php', {'controller':'updateEquipment','idProd':$objectProdId,'prodName':$objectProdName, 'prodModel':$objectProdModel, 'prodSerialNumber':$objectProdSerialNumber, 'prodAssetNumber':$objectProdAssetNumber, 'existingStock':$objectProdExistingStock, 'newStock':$qty}, function(data) {
        console.log(data);
    });

    $objectProdExistingStockToUpdate.text(Number($objectProdExistingStock) + $qty);
    $('#Successful-modal').modal('show');

}



function displayPictureModal(idEquipment){
    var $idEquipment = idEquipment;
    $('#picture-modal-equipmentId').val($idEquipment);
    //alert($idEquipment);
    $('#Picture-modal').modal('show');
}

function displayManualModal(idEquipment){
    var $idEquipment = idEquipment;
    $('#manual-modal-equipmentId').val($idEquipment);
    //alert($idEquipment);
    $('#Manual-modal').modal('show');
}

function addEquipment(){
    $('#modal-add-equipment').modal('show');

}

/* Script for DetailEquipmentAdmin */

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

function checkout(){
    var $orderId = "";
    $.post('index.php', {'controller':'saveOrder'}, function(data) {
        $orderId = Number(data);
        $('.itemTosend').each(function(i, obj){
            var $lienactuel = $(obj);
            var prodId = $lienactuel.find('.qtyTable2').find('.inputProdId').val();
            var prodCat = $lienactuel.find('.qtyTable2').find('.inputProdCat').val();
            var prodName = $lienactuel.find('.modalProdName').html();
            var prodQte = $lienactuel.find('.modalQteToSend').html();
            
            $.post('index.php', {'controller':'saveItem','orderId':$orderId,'productId':prodId, 'productCat':prodCat,'productQte':prodQte}, function(data) {
                console.log("product insert");
            });
        });
        //$('.itemTosend').remove();
        $('#noItems').text('0');
        $('#cartModal').modal('hide');
    });
  
}





