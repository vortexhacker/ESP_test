// Basic example
$(document).ready(function () {
    $('#dtBasicExample').DataTable({
        "ordering":false,
        "paging": true // false to disable pagination (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');

    

   
});

function detailOrder(element) {
    var $lienactuel = $(element);
    
    var $orderId = $lienactuel.parent().prevAll('.tdIdOrder').html();
    $.post('index.php', {'controller':'getItemsPerOrderId','orderId':$orderId}, function(data) {
        $('#blocToFill').html(data);
        $('#cartModal').modal('show');
        
    });
  
}

function generateCertificate(element) {
    var $lienactuel = $(element);
    
    var $certificateNumber = $lienactuel.parent().prevAll('.tdCertificateNumber').html();
    alert($certificateNumber);
    /*$.post('index.php', {'controller':'getItemsPerOrderId','orderId':$orderId}, function(data) {
        $('#blocToFill').html(data);
        $('#cartModal').modal('show');
        
    });*/
  
}
function detailOrderDebtor(element) {
    var $lienactuel = $(element);
    
    var $orderId = $lienactuel.parent().prevAll('.tdIdOrder').html();
    $.post('index.php', {'controller':'getItemsPerOrderIdDebtor','orderId':$orderId}, function(data) {
        $('#blocToFill').html(data);
        $('#cartModal').modal('show');
        
    });
  
}

function addStudent(){
    $('#modal-register').modal('show');
}

function addPromotion(){
    $('#modal-register').modal('show');
}

function editStudent(studentId,nom,postnom,prenom,telephone){
    //alert(studentId);
    $('#modal-edit #id').val(studentId);
    $('#modal-edit #nom').val(nom);
    $('#modal-edit #postnom').val(postnom);
    $('#modal-edit #prenom').val(prenom);
    $('#modal-edit #telephone').val(telephone);
    $('#modal-edit').modal('show');
}

function editPromotion(promotionId,startdate,enddate){
    //alert(studentId);
    $('#modal-edit #id').val(promotionId);
    $('#modal-edit #startdate').val(startdate);
    $('#modal-edit #enddate').val(enddate);
    $('#modal-edit').modal('show');
}

function validate() {
    var $orderId = $('#mainOrderId').html();
    $.post('index.php', {'controller':'changeOrderStatus','orderId':$orderId}, function(data) {
        console.log(data);
        
    });
    $('#cartModal').modal('hide');
  
}

function changeStatus(element){
    var $lienactuel = $(element);
    var orderId = $lienactuel.parent().prevAll('.modalOrderToValidate').html();
    var productId = $lienactuel.parent().prevAll('.modalItemIdToValidate').html();
    //var trimProductId = productId.replace(/^\s+|\s+$/g, "");
    $.post('index.php', {'controller':'changeOrderItemStatus','orderId':orderId,'productId':productId}, function(data) {
        $lienactuel.parent().prevAll('.modalStatusToValidate').html(data);
        
    });
    
    //console.log(productId);
}

function changeStatusDebtor(element){
    var $lienactuel = $(element);
    var orderId = $lienactuel.parent().prevAll('.modalOrderToValidate').html();
    var productId = $lienactuel.parent().prevAll('.modalItemIdToValidate').html();
    var $actualStatus = $lienactuel.parent().prevAll('.modalStatusToValidate').html();
    
    $.post('index.php', {'controller':'changeOrderItemStatusDebtor','orderId':orderId,'productId':productId,'actualStatus':$actualStatus}, function(data) {
        $lienactuel.parent().prevAll('.modalStatusToValidate').html(data);
        
    });
    
    //console.log(productId);
}




