class openCanvas {
    constructor(canvasElement, optionStyle, optionTip) {
        
        if(canvasElement.getContext) {
            this.canvas = canvasElement;
            this.context = canvasElement.getContext('2d');
            this.style = undefined;
            
            this.setStyle({
                lineCap: "butt", 
                lineJoin: "miter",
                lineWidth: 1,
                strokeStyle: "rgb(20, 103, 158)",
                fillStyle: "rgb(23, 121, 186)"
            });
            
            if(optionStyle!=undefined) {
                this.setStyle(optionStyle);
            }
            
            this.clear();
        }else{
            let _tip = optionTip==undefined? "Your browser doesn't appear to support the canvas element.": optionTip;
            alert(_tip);
        }
        
    }
    
    setStyle(optionStyle) {    
    
        let _context = this.context;
        if(optionStyle == undefined) {
            return;
        }
        
        this.style = {
            lineCap: optionStyle.lineCap == undefined? this.style.lineCap: optionStyle.lineCap,
            lineJoin: optionStyle.lineJoin == undefined? this.style.lineJoin: optionStyle.lineJoin,
            lineWidth: optionStyle.lineWidth == undefined? this.style.lineWidth: optionStyle.lineWidth,
            strokeStyle: optionStyle.strokeStyle == undefined? this.style.strokeStyle: optionStyle.strokeStyle,
            fillStyle: optionStyle.fillStyle == undefined? this.style.fillStyle: optionStyle.fillStyle
        };
        
        _context.lineCap = this.style.lineCap;
        _context.lineJoin = this.style.lineJoin;
        _context.lineWidth = this.style.lineWidth;
        _context.strokeStyle = this.style.strokeStyle;
        _context.fillStyle = this.style.fillStyle;
    }
    
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getContext() {
        return this.context;
    }
    
    

    circle(x, y, r) {
        let _context = this.context;
        _context.beginPath();
        _context.arc(x, y, r, 0, 2*Math.PI);
        _context.stroke();
    }

    fan(x, y, sAngle, eAngle, outsideR, optionInsideR, optionDirection) {    
        this.sector(x, y, sAngle, eAngle, outsideR, optionInsideR, optionDirection);
    }

    sector(x, y, sAngle, eAngle, outsideR, optionInsideR, optionDirection) {
        let _context = this.context;
        let _insideR = optionInsideR==undefined? 0: optionInsideR;
        let _direction = optionDirection==undefined? false: optionDirection;
        _context.beginPath();
        _context.arc(x, y, outsideR, sAngle, eAngle, _direction);
        if(_insideR==0){
            _context.lineTo(x, y);
        } else {
            _context.arc(x, y, _insideR, eAngle, sAngle, !_direction);
        }
        _context.lineTo(x+outsideR*Math.cos(sAngle), y+outsideR*Math.sin(sAngle));
        _context.stroke();
    }

    oval(x, y, a, b, optionSAngle, optionEAngle, optionDirection, optionStep) {
        this.ellipse(x, y, a, b, optionSAngle, optionEAngle, optionDirection, optionStep);
    }

    ellipse(x, y, a, b, optionSAngle, optionEAngle, optionDirection, optionStep) {
        let _context = this.context;
        let _sAngle = optionSAngle==undefined? 0: optionSAngle;
        let _eAngle = optionEAngle==undefined? 2*Math.PI: optionEAngle;
        let _direction = optionDirection==undefined? false: optionDirection;
        let _step = optionStep;
        let nowAngle = _sAngle;
        if (_step==undefined) {
            // default step is 720;
            let dx = 360 / Math.PI;
            _step = _direction? (_sAngle-_eAngle)*dx: (_eAngle-_sAngle)*dx;
        }
        if (_step<3&&_step>=0) { _step = 3;}
        if (_step>-3&&_step<=0) { _step = -3;}
        if(_direction) {
            _step = -_step;
        }
        _context.beginPath();
        _context.moveTo(x+a*Math.cos(_sAngle), y+b*Math.sin(_sAngle));

        // if(_step>0) {
        for(let i=0; i<_step; i++) {    
            if(_direction) {
                nowAngle -= (2*Math.PI-(_eAngle-_sAngle))/_step;
            } else {
                nowAngle += (_eAngle-_sAngle)/_step;
            }
            _context.lineTo(x+a*Math.cos(nowAngle), y+b*Math.sin(nowAngle));
        }
        // } else {
        for(let i=0; i>_step; i--) {
            if(_direction) {
                nowAngle -= (2*Math.PI-(_sAngle-_eAngle))/_step;
                
            }else {
                nowAngle += (_sAngle-_eAngle)/_step;
            }
            _context.lineTo(x+a*Math.cos(nowAngle), y+b*Math.sin(nowAngle));
        }
        // }
        _context.stroke();
    }
    
}
