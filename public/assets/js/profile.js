(function ($) {
    let user;
    getUserData();

    $('#user-details-edit-btn').on("click", function () {
        $('.user-details-undo-btn').css('display', 'block');
        $('.user-details-edit-btn').css('display', 'none');
        $('.user-data-display').css('display', 'none');
        $('.user-AJAX-form').css('display', 'block');
        $('#user-fname-input').val(user.firstName);
        $('#user-lname-input').val(user.lastName);
        var $radios = $('input:radio[name=gender]');
        if ($radios.is(':checked') === false) {
            $radios.filter(`[value=${user.gender}]`).prop('checked', true);
        }
        let userdob = new Date(user.dateOfBirth);

        $('#user-dob-input').val(ISODateString(userdob));
    })

    $('#user-details-undo-btn').on("click", function () {
        $('.user-details-undo-btn').css('display', 'none');
        $('.user-details-edit-btn').css('display', 'block');
        $('.user-data-display').css('display', 'block');
        $('.user-AJAX-form').css('display', 'none');
    })

    $('#ajax-form').submit(function () {
        event.preventDefault();
        $('.user-AJAX-form').css('display', 'none');
        $('.user-data-display').css('display', 'block');
        $('.user-details-undo-btn').css('display', 'none');
        $('.user-details-edit-btn').css('display', 'block');

        var requestConfig = {
            method: 'POST',
            url: `/users/update/${user.userId}`,
            dataType: 'json', // data type
            data: $("#ajax-form").serialize(), // post data || get data
        };
        $.ajax(requestConfig).then(function (responseMessage) {

        });
        getUserData();
    })

    function getUserData() {
        var requestConfig = {
            method: 'POST',
            url: '/users/userdata'
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            var userdata = $(responseMessage);
            user = userdata[0]
            $('#greetUser').html(`Hi ${user.firstName} !`);
            $('#user-fname').html(user.firstName);
            $('#user-lname').html(user.lastName);
            $('#user-gender').html(user.gender);
            const dob = new Date(user.dateOfBirth);
            console.log(dob)
            const formattedDate = dob.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            console.log(formattedDate)
            console.log(user.dateOfBirth)
            $('#user-dob').html(formattedDate);
            console.log('here');
        });
    }

    function ISODateString(d) {
        function pad(n) {
            return n < 10 ? '0' + n : n
        }

        return d.getUTCFullYear() + '-'
            + pad(d.getUTCMonth() + 1) + '-'
            + pad(d.getUTCDate())
    }

})(window.jQuery);
