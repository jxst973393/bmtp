// components/cc_countDown/cc_countDown.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time:{
      type:Object
    },
    endText:{
      type:String,
      value:'已结束'
    },
  },
  data: {
    error:false,
    timer:'',
    isEnd:false
  },
  ready(){
    let temp = this.data.time;
    for( let e in temp){
      if(isNaN(temp[e])){
        console.error('倒计时参数出错，请检查。');
        this.setData({
          error:true
        });
        return
      }
      temp[e] = parseInt(temp[e]);
    }
    this.setData({
      time: temp
    });
    this.interval();
  }
  ,
  methods: {
     interval(){
       const that = this ;
       clearInterval(this.data.timer);
       this.data.timer = setInterval(function(){
         let time = that.data.time;
           if(time.s == 0){
             if(time.m == 0){
               if(time.h == 0){
                 that.setData({
                    isEnd: true
                  });
                  clearInterval(that.data.timer);
                  return
               }
               time.h = time.h - 1;
               time.m = 59;
               time.s = 59;
               that.setTime(time);
               return
             }
             time.m = time.m - 1;
             time.s = 59;
             that.setTime(time);
             return
           }
           time.s = time.s - 1;
           that.setTime(time);  
       },1000);
     },
     setTime(e){
       this.setData({
         time:e
       });
     }

  }
})
