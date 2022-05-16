var main = function () {
    var init = function () {
        getCar()
    };
    var isHasPhone = true;
    var getCar = function (){
        $(".js-sureMsg").click(function (){
            var name = $(".js-name").val()
            var address = $(".js-address").val()
            var email = $(".js-email").val()
            var phone = $(".js-phone").val()
            if(!name) return layer.msg("Please enter your name！")
            if(!address) return layer.msg("Please enter your full address！")
            if(!email) return layer.msg("Please enter your email address！")
            if(!phone) return layer.msg("Please enter your mobile phone number！")

                $(".js-tjdd").show()
                $(this).hide()
                $(".js-int-box").hide()
                $(".js-shouhuo").show()
                $('.js-addressMsg').html(address)
                $('.js-nameMsg').html(name+"<b style='width: 10px;display: inline-block;'></b>"+phone+ "<b style='width: 10px;display: inline-block;'></b>"+email)
            if(localStorage.getItem('carItem')){
                var car = JSON.parse(localStorage.getItem('carItem'))
                var zpricle = 0;
                car.forEach(item => {
                    zpricle+=(item.price_per_day-0)
                })
                $('.js-price_per_day').html(zpricle)
            }
        })
        $('.js-tjdd').click(function (){
            window.open("./end.html","_self")
        })

    }
    var isPhone = function (val){
        if(val.length != 11){
            layer.msg("请输入11位手机号码！")
            $(".js-phone").val('')
            isHasPhone = false
        }else {
            if (!/^1[3456789]\d{9}$/.test(val)) {
                layer.msg("请输入正确的手机号！")
                $(".js-phone").val('')
                isHasPhone = false
            }
        }
    }
    //邮箱校验
    var checkEmail = function (value){
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!mailReg.test(value)) {
            layer.msg("请输入正确的邮箱格式！")
            $(".js-email").val('')
        }

    }
    return {
        init:init,
        isPhone:isPhone,
        checkEmail:checkEmail
    }
}();