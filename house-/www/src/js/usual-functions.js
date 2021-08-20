$(document).ready(function(){

    //filter
    var filter = (str, obj) => {
        let countFilter = $(obj).parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').length
        for (var i = 0; i < countFilter; i++) {
            if (str.length >= 3 && 
                $(obj).parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').eq(i)
                .children('.dev-text')
                .eq(0).text().includes(str)
            ) {
                $(obj).parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').eq(i).show()
            }
            else {
                $(obj).parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').eq(i).hide()
            }
        }
    }

    //Loader for developments
    var loader = (n, title, adress, type, price) => {
        switch(type) {
            case 'IndependentLiving':
                $('.input').parent()
                    .parent()
                    .children('.dev-panel')
                    .children('.dev-object-block').eq(n)
                    .children('.default-dev-picture')
                    .children('.prefix-block').addClass('wave-block')
            break;
            case 'SupportAvailable':
                $('.input').parent()
                    .parent()
                    .children('.dev-panel')
                    .children('.dev-object-block').eq(n)
                    .children('.default-dev-picture')
                    .children('.prefix-block').addClass('orange-block')
            break;
        }
        $('.input').parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').eq(n)
                .children('.default-dev-picture')
                .children('.prefix-block').text(type);
        $('.input').parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').eq(n)
                .children('.dev-text').eq(0).text(title);
        $('.input').parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').eq(n)
                .children('.dev-text').eq(1).text(adress);
        $('.input').parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').eq(n)
                .children('.dev-text').eq(3)
                .children('.bold-text').text(price);
    }

    //data keeper
    var dataKeeper = (url) => {
        var filter = $('.input').parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').length
        $.ajax({
            url: url,
            method: 'get',
            dataType: 'text',
            success: function(data){
                var count = Math.min(JSON.parse(data).length, filter);
                for (var i = 0; i < count; i++) {
                    loader(i, JSON.parse(data)[i]['title'], JSON.parse(data)[i]['address'], JSON.parse(data)[i]['type'], JSON.parse(data)[i]['price'],);
                }
            }
        });
    }

    //events
    dataKeeper('https://603e38c548171b0017b2ecf7.mockapi.io/homes');
    $('.input').on('input', function(){
        if ($(this).val() != "") {
            filter($(this).val(), this);
        }
        else {
            $(this).parent()
                .parent()
                .children('.dev-panel')
                .children('.dev-object-block').show()
        }
    })
})