var main = function () {
    var init = function () {
        getCard()
    };
    var num = 0;
    let resultList = []
    var getCard = function () {
        console.log(2);
        $.getJSON('../json/cars.json',function(result) {
            console.log(result);
            resultList = result.data
            $(".js-CarBox").empty()
            result.data.forEach(item => {
                var car = ` <div class="card-box ">
                            <img src="./image/${item.img}" alt="">
                            <div class="card-text">${item.title}</div>
                            <div class="card-text"><span>mileage: </span>${item.mileage}</div>
                            <div class="card-text"><span>fuel_type: </span>${item.fuel_type}</div>
                            <div class="card-text"><span>seats:</span> ${item.seats}</div>
                            <div class="card-text"><span>price_per_day: </span>${item.price_per_day}</div>
                            <div class="card-text"><span>availability:</span> ${item.availability}</div>
                            <div class="card-text"><span>description: </span>${item.description}</div>
                            <div class="card-btn js-CarBtn" data-status="${item.availability}" data-id="${item.id}">Add to Car</div>
                            </div>`;
                $(".js-CarBox").append(car);
            })

            localStorage.removeItem('carItem')
            AddToCar()
        })
    }
    var AddToCar = function (){
        $('.js-CarBtn').click(function (){
            var status = $(this).attr('data-status')
            console.log(status);
            if(status === 'True'){
                layer.msg('Add to the cart successfully.');
                num++;
                $(".js-carNum").html(num)
                let car;
                if(localStorage.getItem('carItem')){
                    console.log(1);
                    car = JSON.parse(localStorage.getItem('carItem'))
                }else{
                    console.log(2);
                    car = []
                }
                var carId = $(this).attr('data-id')
                console.log(resultList);
                resultList.forEach(item => {
                    if(carId == item.id){
                        car.push(item)
                    }
                })
                car.forEach((item,index) => {
                    item.index = index
                })
                localStorage.setItem('carItem',JSON.stringify(car))
                console.log(car);
            }else{
                layer.msg('Sorry.the is not aviable now. Please use try other cars！');
            }
        })
        $('.js-goCar').click(function (){
            window.open('./Car.html','_self')
        })
    }
    return {
        init:init
    }
}();
