const Ac_Game_Objects=[];

export class AcGameObject{
    constructor(){
        Ac_Game_Objects.push(this);
        this.timedelta;
        this.has_called_start=false;
    }

    start(){

    }

    update(){

    }

    on_destroy(){

    }

    destroy(){
        this.on_destroy();

        for(let i in Ac_Game_Objects){
            if(Ac_Game_Objects[i]===this){
                Ac_Game_Objects.splice(i); //将该对象从列表中删除
            }
        }
    }
}

let last_timestamp;

const step=timestamp=>{
    for(let obj of Ac_Game_Objects){
        if(!obj.has_called_start){
            obj.has_called_start=true;
            obj.start();
        }else{
            obj.timedelta=timestamp-last_timestamp;
            obj.update();
        }
    }

    last_timestamp=timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);