var main = function () {
    var init = function () {
        getCar()
        fk()
    };
    var car;
    var getCar = function (){
        if(localStorage.getItem('carItem')){
             car = JSON.parse(localStorage.getItem('carItem'))
            $(".js-CarBox").empty()
            car.forEach((item,index) => {
                    var carHtml  = `<ul class="car-head" style="height: 80px;">
                            <li> <img src="./image/${item.img}" alt=""></li>
                            <li>${item.title}</li>
                            <li class="js-price">${item.price_per_day}</li>
                            <li><input type="text" value="1" class="js-intV${index}"  onkeyup="main.calcPrice(value,'js-intV${index}',${item.index})"></li>
                            <li><div class="card-btn js-deleteCarBtn" style="margin: 0;"  data-index="${item.index}">Delete</div></li>
                        </ul>`;
                    $(".js-CarBox").append(carHtml);
            })
            $(".js-deleteCarBtn").click(function (){
                let indexNum = $(this).attr('data-index')
                car.forEach((item,index) => {
                    if(item.index == indexNum){
                        car.splice(index,1)
                    }
                })
                localStorage.removeItem('carItem')
                localStorage.setItem('carItem',JSON.stringify(car))
                getCar()
            })
        }
    }
    var calcPrice = function (value,dom,indexNum){
        $("."+dom).val(value.replace(/[^\d]/g,''))
        var price = $("."+dom).parent().siblings('.js-price').html()
        console.log(isRealNum(price));
        console.log(parseInt(value));
        if(isRealNum(price)){
            $("."+dom).parent().siblings('.js-price').html(price*parseInt(value))
            car.forEach((item) => {
                if(item.index == indexNum){
                    item.price_per_day = price*parseInt(value)
                    item.nums = value
                }
            })
            localStorage.removeItem('carItem')
            localStorage.setItem('carItem',JSON.stringify(car))
        }
    }
    function isRealNum(val){
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
        if(val === "" || val ==null){
            return false;
        }
        if(!isNaN(val)){
            return true;
        }else{
            return false;
        }
    }
    //付款
    var fk = function (){
        $(".js-fk").click(function (){
            if(!localStorage.getItem('carItem') || JSON.parse(localStorage.getItem('carItem')).length == 0){
                layer.msg('No car reservation');
               setTimeout(function (){
                   window.open('./index.html','_self')
               },1000)
            } else {
                window.open('./payment.html','_self')
            }
        })
    }
    return {
        init:init,
        calcPrice:calcPrice
    }
}();