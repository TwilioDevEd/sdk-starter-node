$(function() {

    $('#sendNotificationButton').on('click', function() {
        $.post('/send-notification', {
           identity: $('#identityInput').val()
        }, function(response) {
            $('#identityInput').val('');
            $('#message').html(response.message);
            console.log(response);
        });
    });
});