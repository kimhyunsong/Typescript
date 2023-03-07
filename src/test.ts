// ts 실행 방법 : npx ts-node src/test.ts
/*
// 문법의 유효성과 동작의 이슈는 독립적인 문제이다.
// 타입스크립트는 자바스크립트의 상위 집합이기 때문에 js 코드를 ts로 migration 하는데 이점이 된다.
// 그러나 모든 오류를 찾아낼 것을 기대하면 안된다. 타입체커를 통과하면서도 런타임 오류를 밠행시키는 코드는 존재한다.
function greet(who: string){
  console.log('Hello', who)
}

greet('Asdasd');

// 타입스크립트의 목표 : 초기값으로부터 타입을 추론하여 런타임에 발생시킬 코드를 미리 찾아 내는 것
// interface를 통해 의도를 분명하게 할 수 있다.
interface State{
  name: string;
  capital: string;
}



const state: State[] =[
  {name: 'Alabama', capitol: "Montgomery"},
  {name: 'Alaska', capitol: "Juneau"},
  {name: 'Arizona', capitol:"Phoenix"}
]

// 타입스크립트의 타입 시스템은 자바스크립트의 런타임 동작을 모델링하기 때문에 다음은 오류가 없는 코드이다.


const x = 2 + '3';
const y = '2' + 3;



// 하지만 일부는 코드에 오류를 표시하기도 한다.
const a = null + 7;
const b = [] + 12;

alert('Hello', 'Kim');
*/

// 타입 체크를 통과하더라도 여전히 런타임 오류가 발생할 수 있다.
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());


// 타입 설정을 하지 않을경우 암시적으로 any 타입으로 간주된다.
// tsconfig.json 에 따라 오류가 되기도 한다.
// function add(a : any, b: any){
//   return a + b;
// }


// const x: number | null = null;

// const el = document.getElementById('status');
// el.textContent = 'Ready'

// if (el) {
//   el.textContent = 'Ready'
// }
// el!.textContent = 'Ready'


// 타입스크립트 컴파일러의 역할
// 1. 구버전 js로 코드를 transpile 함
// 2. 코드의 타입 오류를 체크함

// 위 두 과정은 독립적으로 이루어지기 때문에 타입 오류가 있는 코드도 컴파일이 가능하다.


let x = 'hello';
x =1234;

// 런타임에는 타입체크가 불가능하다.
interface Square{
  width:number;
}
interface Rectangle extends Square{
  height: number;
}
type Shape = Square | Rectangle;

// function calculateArea(shape: Shape){
//   if (shape instanceof Rectangle){
//     return shape.width * shape.height;
//   } else{
//     return shape.width * shape.width;
//   }
// }
// instanceof 체크는 런타임에 일어나지만, Rectangle은 타입이기때문에
// 자바스크립트로 컴파일되는 과정에서 모든 인터페이스는 제거되므로 없는 타입이라고 볼 수 있다.
// 위 예제의 shape 타입을 명확하게 하려면, 다음과 같이 할 수 있다.

function calculateArea(shape: Shape){
  if ('height' in shape){
    shape; // 타입이 Rectangle
    return shape.width * shape.height;
  } else {
    shape;
    return shape.width ** 2;
  }
} 

