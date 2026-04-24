class Addable1{
    protected width:number;
    protected height: number=30;
    constructor(
        //l1 for first liidetav/addable 
        protected l1:number,
        protected g:CanvasRenderingContext2D,
        protected startx:number,
        protected endx: number,
        protected y:number
    )
    {
        this.width=this.endx-this.startx;
        this.draw();
    }
    
    draw(){
        //clear previous value
        this.g.clearRect(this.startx+ this.width, this.y-this.height/2, this.width,this.height);

        const bodyX=this.startx+ this.width;
        const bodyY= this.y-this.height/2;
        const bodyW=this.width;
        const bodyH=this.height;
        this.g.beginPath();
        this.g.rect(bodyX,bodyY,bodyW,bodyH);
        this.g.stroke();
        this.g.fillText(this.l1+"", bodyX+8, this.y+8);
    }

    //change the nr inside the rectangle
    setL1(l1:number){
        this.l1=l1;
        this.draw();
    }
    getL1():number{
        return this.l1;
    }
}


class Plus{
    protected xlenght: number;
    constructor(
        protected g:CanvasRenderingContext2D,
        protected startx:number,
        protected endx: number,
        protected y: number
    ){
        this.xlenght=this.endx-this.startx;
        this.draw();
    }

    draw(){
        this.g.beginPath();

        //-line
        this.g.moveTo(this.startx, this.y);
        this.g.lineTo(this.endx, this.y);

        //|line
        this.g.moveTo(this.startx+10, this.y-10)
        this.g.lineTo(this.startx+10, this.y+10);
        this.g.stroke();
    }
}


class Addable2{
    protected width:number;
    protected height: number=30;
    constructor(
        protected l2:number,
        protected g:CanvasRenderingContext2D,
        protected startx:number,
        protected endx: number,
        protected y:number
    ){
        this.width=this.endx-this.startx;
        this.draw();
    }
    
    draw(){
        this.g.clearRect(this.startx+ this.width, this.y-this.height/2, this.width,this.height);
        const bodyX=this.startx+ this.width;
        const bodyY= this.y-this.height/2;
        const bodyW=this.width;
        const bodyH=this.height;
        this.g.beginPath();
        this.g.rect(bodyX,bodyY,bodyW,bodyH);
        this.g.stroke();
        this.g.fillText(this.l2+"", bodyX+8, this.y+8);
    }

    setL2(l2:number){
        this.l2=l2;
        this.draw();
    }
    getL2():number{
        return this.l2;
    }
}


class Equals{
    protected xlen: number;
    constructor(
        protected g:CanvasRenderingContext2D,
        protected startx:number,
        protected endx: number,
        protected y: number
    ){
        this.xlen=this.endx-this.startx;
        this.draw();
    }

    draw(){
        this.g.beginPath();

        //-line
        this.g.moveTo(this.startx, this.y+3);
        this.g.lineTo(this.endx, this.y+3);

        //2nd -line
        this.g.moveTo(this.startx, this.y-3)
        this.g.lineTo(this.endx, this.y-3);
        this.g.stroke();
    }
}

 
class Total{
    protected width:number;
    protected height: number=30;
    constructor(
        protected s:number,
        protected g:CanvasRenderingContext2D,
        protected startx:number,
        protected endx: number,
        protected y:number
    ){
        this.width=this.endx-this.startx;
        this.draw();
    }

    draw(){
        this.g.clearRect(this.startx+ this.width, this.y-this.height/2, this.width,this.height);

        const bodyX=this.startx+ this.width;
        const bodyY= this.y-this.height/2;
        const bodyW=this.width;
        const bodyH=this.height;
        this.g.beginPath();
        this.g.rect(bodyX,bodyY,bodyW,bodyH);
        this.g.stroke();
        this.g.fillText(this.s+"", bodyX+8, this.y+8);
    }
    setS(s:number){
        this.s=s;
        this.draw()
    }
    getS():number{
        return this.s;
    }
}