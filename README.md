<img src="https://raw.githubusercontent.com/samsavv/Scriptofino/master/docs/scriptofino-logo.png" width=100 height=100>

# ScriptoFino

*Katie, Sofia, Merci, Jimmy, Sam, & Ronald*

## ¡ Bienvenidos a ScriptoFino !

ScriptoFino is a simple scripting language that draws inspiration from Python. It aims at removing the cognitive dissonance between thinking in code and writing out its implementation. Additionally, SciptoFino is designed to mimic the natural syntax and structure of the Spanish language. 

**Features:**
- Spanish Keywords
- Easy to Read
- Function Indentation
- Dynamic Typing 
- Easy to learn 

## Examples
#### Variable Declarations

```
String name           -> la name = 'name'
number age            -> la age = 21
boolean is_true       -> la is_true = verdad
```

#### Types
```
* boolean: `verdad`, `falso`
* num: `1`, `-382`, `3.0`
* string: `'hello'`, `'sofia'`, `'scriptofino is cool!'`
* list: `['hello', 'this', 'is', 'a', 'list']` , `[3, 2, 1]`
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
##### `if` statements
scriptofino
```
si (num == 3):

si (verdad):
```
python
```
if (num == 3):

if (True):
```
##### `for` loops 
scriptofino
```
para i en rango(1, 100):

para num en numeros:
```
python
```
for i in range(1, 100):

for num in numbers:
```
##### `while` loops
scriptofino
```
mientras y > 3:
```

python
```
while y > 3:
```
### Sample Programs
examples in ScriptoFino with JavaScript "translation"
```
la x = 10
si verdad:
    la x = x + 5
    imprimir(x)
```

```
llama hello_word():
    imprimir("Hello world")

function helloWorld(){
    console.log("Hello World!");
};
```

```
llama add(a, b):
    regresa a + b

function add(a, b){
    return a + b;
};
```

```
llama fib(x):
    si x > 0:
        regresa fib(x-1)
    sino: 
        regresa x

myRecursiveFunction = (n) => {
    if (n > 0) {
        return myRecursiveFunction(n-1);
    } else {
	return n;
    }
};  
```

```
llama is_even(number):
    si (number % 2 == 0):
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
llama make_change(amount):
    si (amount = 0):
        regresa [0, 0, 0, 0]
    
    si (amount < 0):
        echar nuevo Error('Amount cannot be negative')

    la initAmount = amount
    la newAmount

    la quarters = piso(initAmount/25)
    newAmount = initAmount % 25

    la dimes = piso(newAmount/10)
    newAmount %= 10

    la nickels = piso(newAmount/5)
    newAmount %= 5

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