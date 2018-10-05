
function asyn_single_timer(length){
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, length);
    });
};

function asyn_repeat_timer(check_fun, length){
    console.log('asyn_repeat_timer start');
    return new Promise(function (resolve, reject) {
        console.log('asyn_repeat_timer continue, %O', resolve);
        var loop = function(){
            asyn_single_timer(length).then(function(){
                if (!check_fun()){
                    console.log('asyn_repeat_timer continue, %O', resolve);
                    resolve();
                    loop();
                }else{
                    console.log('asyn_repeat_timer stop');
                    reject();
                }
            });
        };
        loop();
    });
};