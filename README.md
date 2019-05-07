<img src="https://raw.githubusercontent.com/samsavv/Scriptofino/master/docs/final-scriptofino-logo.png" width="400" >

# ScriptoFino

*Katie, Sofia, Merci, Jimmy, Sam, & Ronald*

## ¡ Bienvenidos a ScriptoFino !

ScriptoFino is a simple scripting language that draws inspiration from Python. It aims at removing the cognitive dissonance between thinking in code and writing out its implementation. Additionally, SciptoFino is designed to mimic the natural syntax and structure of the Spanish language. 

**Features:**
- Spanish Keywords
- Easy to Read
- Function Indentation
- Function Annotations
- Easy to Learn 

## Grammar 
```
Scriptofino {
  Program     =  newline* Stmt+ newline*
  Stmt        =  SimpleStmt newline                          -- simple
              |  Loop
              |  Conditional
              |  FuncDec
              |  Error
  SimpleStmt  =  VarDeclar
              |  Assignment
              |  Call                                        -- call
              |  "rompe"                                     -- break
              |  "regresa" Exp?                              -- return
  Suite       = ":" SimpleStmt newline                       -- small
              | ":" newline indent Stmt+ dedent              -- large

  Exp         =  Exp "oo" Exp1                               -- or
              |  Exp "yy" Exp1                               -- and
              |  Exp1
  Exp1        =  Exp2 relop Exp2                             -- binary
              |  Exp2
  Exp2        =  Exp2 addop Exp3                             -- binary
              |  Exp3
  Exp3        =  Exp3 mulop Exp4                             -- binary
              |  Exp4
  Exp4        =  prefixop Exp5                               -- unary
              |  Exp5
  Exp5        =  Exp5 "^" Exp6                               -- power
              |  Exp6
  Exp6        =  boollit
              |  numlit
              |  strlit
              |  nonelit
              |  "[" ListOf<Exp, ","> "]"                    -- list
              |  "{" ListOf<KeyVal, ","> "}"                 -- dictionary
              |  "(" NonemptyListOf<Exp, ","> ")"            -- tuple
              |  Call
              |  VarExp
              |  "(" Exp ")"                                 -- parens

  Loop        =  For | While
  For         =  "para" id "en" Exps Suite
  While       =  "mientras" Exp Suite
  Conditional =  "si" Exp Suite ("sinosi" Exp Suite)* ("sino" Suite)?
  FuncDec     =  Annotation newline "llama" id "("Params")" Suite
  Annotation  =  id ":" ParamType "->" ParamType
  ParamType   =  NonemptyListOf<Type, ",">
  Error       =  "echar nuevo Error" "("strlit")" newline

  VarDeclar   =  VarConst | VarMutable
  VarConst    =  "el" (basicType | "lista" | "tuple" | "diccionario")? id "=" Exp
  VarMutable  =  "la" (basicType | "lista" | "tuple" | "diccionario")? id "=" Exp
  Assignment  =  VarExps "=" Exps
  Call        =  VarExp "(" Args ")"

  Exps        =  NonemptyListOf<Exp, ",">
  Ids         =  NonemptyListOf<id, ",">
  VarExp      =  VarExp "[" Exp "]"                          -- subscripted
              |  id                                          -- simple
  VarExps     =  NonemptyListOf<VarExp, ",">
  Param       =  id ("=" Exp)?
  Params      =  ListOf<Param, ",">
  Arg         =  (id ":")? Exp
  Args        =  ListOf<Arg, ",">
  KeyVal      =  Exp ":" Exp
  Type        =  ListType | TupleType | DictType | basicType
  ListType    =  "lista" "("basicType")"
  TupleType   =  "tuple" "("NonemptyListOf<basicType, ",">")"
  DictType    =  "diccionario" "("basicType":"basicType")"

  basicType   =  "string" | "boolean" | "num" | "nada" | "objecto"
  keyword     =  (basicType | "mientras" | "para" | "si" | "sinosi" | "sino" | "llama" | "la" | "el"
              |  "regresa" | "rompe" | "yy" | "oo" | "not" | "verdad" | "falso" | "echar nuevo Error"
              | "es" | "no es" | "lista" | "tuple" | "diccionario" | "en") ~idrest
  id          =  ~keyword ("_" | letter) idrest*
  idrest      =  "_" | alnum
  numlit      =  digit+ ("." digit+)? (("E" | "e") ("+" | "-")? digit+)?
  boollit     =  "verdad" | "falso"
  strlit      = "\"" (~"\\" ~"\"" ~"\n" any | escape)* "\""
  nonelit     = "nada"
  escape      = "\\" ("\\" | "\"" | "n")                     -- simple
              | "\\u{" hexDigit+ "}"                         -- codepoint
  addop       =  "+" | "-"
  relop       =  "<=" | "<" | "es" | "no es" | ">=" | ">"
  mulop       =  "*" | "/" | "%"
  prefixop    =  "-" | "not"
  indent      =  "⇨"
  dedent      =  "⇦"

  newline     =  "\n"+
  space      :=  " " | "\t" | comment
  comment     = "¡" ~"¡" (~"\n" ~"¡" any)*                   -- comment
              |  multiline
  multiline   = "¡!" (~"¡!" any)* "¡!"
}
```

## Examples

#### Types
* boolean: ```verdad, falso```
* num: ```1, -382, 3.0```
* string: ```"hello", "sofia", "¡scriptofino is cool!"```
* nada: ```nada```
* object: ```objecto```
  * super type that is compatible with all other types
* list: ```["hello", "this", "is", "a", "list"] , [3, 2, 1]```
* dictionary: ```{"Hello": "Hola", "Goodbye": "Adiós"}```
* tuple: ```(9, 22, "rojo")```

#### Built-In Functions
* imprimir(print): params - objecto
* piso(floor): params - num

#### Variable Declarations
```
string name           -> la name = "name"
num age               -> la age = 21
boolean is_true       -> la is_true = verdad
mutable binding       -> la emotion = "feliz"
immutable binding     -> el número = 3
type declaration      -> la num age = 3
```

#### Comments
```
¡ This is a comment

¡! 
This is a multiline 
comment 
¡!
```

#### Arithmetic
```
sum = 3 + 7
difference = 10 - 3
multiplication = 7 * 8
division = 100 / 4
exponents = 10 ^ 2
modulus = 11 % 2
```

#### Control Flow

##### `if` Statements
ScriptoFino
```
si (num es 3):

si (verdad):
```
Python
```
if (num == 3):

if (True):
```

##### `for` Loops 
ScriptoFino
```
para i en rango(1, 100):

para num en numeros:
```
Python
```
for i in range(1, 100):

for num in numbers:
```

##### `while` Loops
ScriptoFino
```
mientras y > 3:
```
Python
```
while y > 3:
```

### Sample Programs
Examples in ScriptoFino with JavaScript "translations"
```
la x = 10
si (verdad):
    la x = x + 5
    imprimir(x)
```
```
hello_world: nada -> string
llama hello_word():
    imprimir("Hello world")

function helloWorld(){
    console.log("Hello World!");
};
```

```
add: num, num -> num
llama add(a, b):
    regresa a + b

function add(a, b){
    return a + b;
};
```

```
fib: num -> num
llama fib(x):
    si (x > 0):
        regresa fib(x-1)
    sino: 
        regresa x

fib = (n) => {
    if (n > 0) {
        return fib(n-1);
    } else {
	return n;
    }
};  
```

```
is_even: num -> boolean
llama is_even(number):
    si (number % 2 es 0):
        regresa verdad
    sino:
        regresa falso

function isEven(number){
    if (number % 2 == 0){
        return true;
    } else {
        return false;
    }
};
```

```
make_change: num -> lista(num)
llama make_change(amount):
    si (amount es 0):
        regresa [0, 0, 0, 0]
    
    si (amount < 0):
        echar nuevo Error("Amount cannot be negative")

    la initAmount = amount
    la newAmount = 0

    la quarters = piso(initAmount/25)
    newAmount = initAmount % 25

    la dimes = piso(newAmount/10)
    newAmount = newAmount % 10

    la nickels = piso(newAmount/5)
    newAmount = newAmount % 5

    la pennies = newAmount;

    regresa [quarters, dimes, nickels, pennies]


function makeChange(amount){
    
    if (amount === 0) {
        return [0, 0, 0, 0];
    }

    if (amount < 0) {
        throw new RangeError('Amount cannot be negative');
    }

    const initAmount = amount;
    let newAmount;

    const quarters = Math.floor(initAmount / 25);
    newAmount = initAmount % 25;

    const dimes = Math.floor(newAmount / 10);
    newAmount %= 10;

    const nickels = Math.floor(newAmount / 5);
    newAmount %= 5;

    const pennies = newAmount;

    return [quarters, dimes, nickels, pennies];
}
```
```
la nombre = " "
la años = 0

info: string, num -> tuple(string, num)
llama info(nombre, años):
    regresa (nombre, años)

la x = info("katie", 21)


function info(name, age) {
    return [name, age];
}
```

#### Semantic Analyzer
+ detects if a break statement is outside of a loop
+ detects if a variable has already been binded
+ detects if a function has the correct parameters and the correct number of parameters
+ detects if an identifier has already been declared in scope and if an identifier has not been declared
+ makes sure a negative operator is only being applied to numbers
+ makes sure 'not' is only applied to booleans
+ detects if not enough arguments are in a call
+ detects if number of parametrs match
+ detects if the number of variables matches the number of expressions
+ makes sure that a subscripted identifier must be a tuple, a dictionary, or a list
+ detects if there are too many arguments in a call
+ detects if the type of the parameters matches the type of the arguments 
+ detects if there are type mismatches in a dictionary
+ detects if there are type mismatches in a list
+ detects all type mismatches

#### Work in Progress
+ Issues with calling calls within calls
+ Parenthesis are recognized as tuples, regardless of context 
