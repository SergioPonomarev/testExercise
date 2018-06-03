//Bootstrap block

$('#addUpdate').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var actionButton = button.data('action') // Extract info from data-* attributes
    var modal = $(this)
    modal.find('.modal-title').text(actionButton + ' product')
    //modal.find('.modal-body input').val(actionButton)
    modal.find('[type="submit"]').text(actionButton)
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
        });
    }, false);
})();

//Bootstrap block

$("#validationProductPrice").maskMoney({thousands:'', decimal:'.', allowZero: true});

var $productName = $('#validationProductName'),
    $productCount = $('#validationProductCount'),
    $productPrice = $('#validationProductPrice'),
    $form = $('.needs-validation'),
    $productList = $('#productList'),
    $formDelete = $('#delete'),
    $btnDelete = $('.btn-danger');

$form.submit(function(event) {

    var productName = $productName.val(),
        productCount = $productCount.val(),
        productPrice = $productPrice.val();
        
    if ((productName.trim() === '') ||
        productName.length > 15) {
        return false;
    }

    if (productCount.trim() === '' || 
        (isNaN(productCount))) {
        return false;
    }
        
    var $tr = $('<tr>'),
        $spanCount = $('<span>').addClass('position-absolute').text(productCount),
        $buttonUpdate = $('<button>', {
                                    type:'button',
                                    class:'update btn btn-warning btn-sm',
                                    "data-toggle":'modal',
                                    "data-target":'#addUpdate',
                                    "data-action":'Update'})
                                    .text('Update'),
        $buttonDelete = $('<button>', {
                                    type:'button',
                                    class:'btn btn-danger btn-sm ml-xl-5 ml-lg-3 ml-md-1',
                                    "data-toggle":'modal',
                                    "data-target":'#delete'})
                                    .text('Delete'),
        $tdName = $('<td>')
                    .addClass('position-relative')
                    .text(productName)
                    .append($spanCount),
        $tdPrice = $('<td>')
                    .addClass('text-center')
                    .text('$' + productPrice),
        $tdActions = $('<td>')
                    .addClass('text-center')
                    .append($buttonUpdate)
                    .append($buttonDelete);

    $tr
        .append($tdName)
        .append($tdPrice)
        .append($tdActions);

    $productList.append($tr);
    event.preventDefault();
    event.stopPropagation();
    $productName.val('');
    $productCount.val('');
    $productPrice.val('');
    $('#addUpdate').modal('hide');
});