(function($) {
    let user;
    getUserData();


    $('#user-details-edit-btn').on("click",function () {
        $('.user-data-display').css('display', 'none');
        $('.user-AJAX-form').css('display', 'block');
        $('#user-fname-input').val(user.firstName);
        $('#user-lname-input').val(user.lastName);
        var $radios = $('input:radio[name=gender]');
        if($radios.is(':checked') === false) {
            $radios.filter(`[value=${user.gender}]`).prop('checked', true);
        }
        let userdob = new Date(user.dateOfBirth);
        var day = ("0" + userdob.getDate()).slice(-2);
        var month = ("0" + (userdob.getMonth() + 1)).slice(-2);
        $('#user-dob-input').val(`${userdob.getFullYear()}-${month}-${day}`);
    })

    $('#ajax-form').submit(function () {
        event.preventDefault();
        $('.user-AJAX-form').css('display', 'none');
        $('.user-data-display').css('display', 'block');

        var requestConfig = {
            method: 'POST',
            url: `/users/update/${user.userId}` ,
            dataType : 'json', // data type
            data : $("#ajax-form").serialize(), // post data || get data
        };
        $.ajax(requestConfig).then(function(responseMessage) {

        });
        getUserData();
    })

    function getUserData() {
        var requestConfig = {
            method: 'POST',
            url: '/users/userdata'
        };

        $.ajax(requestConfig).then(function(responseMessage) {
            var userdata = $(responseMessage);
            user = userdata[0]
            $('#greetUser').html( `Hi ${user.firstName} !`);
            $('#user-fname').html(user.firstName);
            $('#user-lname').html(user.lastName);
            $('#user-gender').html(user.gender);
            $('#user-dob').html(user.dateOfBirth);
            console.log('here');
        });
    }



})(window.jQuery);