var SimpleCalculator = function () {
    if ( document.querySelector ( "#simpleCalculator") )
        return
    this.container = document.createElement ( 'div' )
    this.container.id = "simpleCalculator"
    this.elementStyling (
        this.container,
        this.containerStyle
    )
    this.createButton ( "C",
        Object.assign ( this.operationStyle, { width: "20%", height: "80px" } ),
        this.clear )
    this.memory = document.createElement ( 'input' )
    this.memory.disabled = true
    this.container.appendChild ( this.memory )
    this.elementStyling ( this.memory, this.inputStyle )
    this.operation = document.createElement ( 'input' )
    this.operation.disabled = true
    this.elementStyling (
        this.operation,
        Object.assign ( this.operationStyle, { height: "40px" } )
    )
    this.container.appendChild ( this.operation )
    this.inputElement = document.createElement ( 'input' )
    this.container.appendChild ( this.inputElement )
    this.elementStyling ( this.inputElement, this.inputStyle )
    this.inputElement.value = ""
    this.buttons ()
    document.body.appendChild ( this.container )
}
SimpleCalculator.prototype.fontSize = "20px"
SimpleCalculator.prototype.operations = [
  '+', '-',  '*',  '/', '%', 'sqrt', 'sin', 'cos', 'tan', 'exp', 'log'
]

SimpleCalculator.prototype.clear = function () {
    this.parentObject.memory.value = ""
    this.parentObject.operation.value = ""
    this.parentObject.inputElement.value = ""
}

SimpleCalculator.prototype.elementStyling = function ( elem, styleObject ) {
    for ( var s of Object.keys ( styleObject ) ) {
        elem.style [s] = styleObject [s]
    }
    elem.style.fontSize = this.fontSize
    elem.style.boxSizing = "border-box"
}

SimpleCalculator.prototype.createButton = function ( buttonText, buttonStyle, clickHandler ) {
        var btn = document.createElement ( 'button' )
        btn.innerHTML = buttonText
        btn.parentObject = this
        btn.onclick = clickHandler
        this.container.appendChild ( btn )
        btn.style.fontSize = this.fontSize
        this.elementStyling ( btn, buttonStyle )
}
SimpleCalculator.prototype.buttons = function () {
    for ( var x of [ '.', 0,1,2,3,4,5,6,7,8,9 ] ) {
        this.createButton ( x, this.numStyle, function ( e ) {
            var num = this.parentObject.inputElement.value
            this.parentObject.inputElement.value += this.innerHTML
        })
    }
    for ( var x of this.operations ) {
        this.createButton ( x,
          Object.assign ( this.operationStyle, { width: "20%", height: "40px" }),
          this.clickHandler )
    }
    var w = ( 5 - this.operations.length % 5 ) * 20
    this.createButton ( "=",
        Object.assign ( this.operationStyle, { width: w + "%", height: "40px" } ),
        function ( e ) {
            if ( this.parentObject.memory.value === 0 || !this.parentObject.operation.value ) return

            var oper = this.parentObject.memory.value + this.parentObject.operation.value +
                        this.parentObject.inputElement.value
            this.parentObject.inputElement.value = eval ( oper )
    })
    this.createButton ( "x", this.closeButtonStyle,
        function ( e ) {
            document.body.removeChild ( this.parentNode )
        } )
}

SimpleCalculator.prototype.clickHandler = function () {
    var mem = this.parentObject.memory.value
    var num = parseFloat( this.parentObject.inputElement.value )
    var oper = this.innerHTML
    if ( oper.length > 1 ) {
        if ( !num ) return
        var operation = "Math." + oper + "(" + num + ")"
        this.parentObject.inputElement.value = eval ( operation )
    }
    else {
        if ( [ "+", "-", "/", "*", "%" ].indexOf ( oper ) >= 0 ) {
              this.parentObject.memory.value =
                        this.parentObject.inputElement.value
              this.parentObject.inputElement.value = ""
              this.parentObject.operation.value = this.innerHTML
        }
    }
}

function showCalculator () {
    var calculator = new SimpleCalculator ()
}

SimpleCalculator.prototype.containerStyle = {
    position: "fixed",
    bottom: "50px",
    right: "50px",
    width: "320px",
    zIndex: "500",
    boxShadow: "10px 10px 20px #00000090"
}
SimpleCalculator.prototype.inputStyle = {
    float: "left",
    outline: "none",
    width: "60%",
    height: "40px",
    padding: "4px 8px"
}
SimpleCalculator.prototype.numStyle = {
    color: "darkblue",
    float: "left",
    outline: "none",
    width: "20%",
    height: "40px"
}
SimpleCalculator.prototype.operationStyle = {
    color: "darkred",
    float: "left",
    width: "80px",
    textAlign: "center"
}

SimpleCalculator.prototype.closeButtonStyle = {
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "-30px",
    right: "-10px",
    width: "30px",
    textAlign: "center",
    outline: "none"
}
