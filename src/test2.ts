// 타입 정보를 유지하는 방법
// 태그 기법
interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle{
  kind: 'rectangle';
  height: number;
  width: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape){
  if (shape.kind === 'rectangle'){
    shape; // 타입이 Rectangle
    return shape.width * shape.height;
  } else {
    shape;
    return shape.width * shape.width;
  }
}

// 클래스로 만들게 되면 타입(런타임 접근 불가)과 값(런타임 접근 가능)을 둘다 사용할 수 있다.
class Square{
  constructor(public width: number){}
}
class Rectangle extends Square {
  constructor(public width:number, public height:number){
    super(width);
  }
}
type Shape = Square | Rectangle
function calculateArea(shape: Shape){
  if (shape instanceof Rectangle){
    shape;
    return shape.width * shape.height;
  } else {
    shape;
    return shape.width ** 2;
  }
}
// 타입 연산은 런타임에 영향을 주지 않는다.
// Ts
function asNumber(val: number | string) : number{
  return val as number;
}
// js로 변환할 경우
function asNumber(val){
  return val;
}
// 아무런 정제 과정이 없이 타입만 삭제된다.

// 값을 정제하기 위해서는 런타임의 타입을 체크해야하고 자바스크립트 연산을 통해 변환을 수행해야 한다.
function asNumber(val: number | string) : number{
  return typeof(val) === 'string' ? Number(val) : val;
}
// 런타임 타입은 선언된 타입과 다를 수 있다.
function setLightSwitch(value : boolean){
  switch(value){
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOn();
      break;
    // 어차피 실행 안될텐데?
    default:
      console.log("?????");
  }
}
interface LightApiResponse{
  lightSwitchValue : boolean;
}
async function setLight(){
  const response = await fetch('/light');
  const result: LightApiResponse = await response.json();
  setLightSwitch(result.lightSwitchValue);
}

// 선언된 타입은 언제든지 달라질 수 있음을 유의해야 한다.

// 타입스크립트 타입으로는 함수를 오버로드 할 수 없다.
// function add(a: number, b: number){return a + b;}
// function add(a: string, b: string){return a + b;}

// 타입스크립트가 함수 오버로딩 기능을 지원하기는 하지만 타입 수준에서만 동작한다.
// 구현체는 오지 하나만 가능하다.
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a, b) {
  return a + b;
}
const three = add(1, 2);
const twelve = add('1', '2')

/*
- 코드 생성은 타입 시스템과 무관하다. 타입은 런타임 동작이나 성능에 영향을 주지 않는다.
- 타입 오류가 존재하더라도 코드 생성(컴파일)은 가능하다.
- 타입스크립트 타입은 런타임에 사용할 수 없다. 런타임에 타입을 지정하려면 타입 정보 유지를 위한 별도의 방법이 필요한데, 일반적으로는 태그된 유니온과 속성 체크 방법을 사용한다. 또는 클래스 같이 타입스크립트 타입과 런타임값 둘다 제공하는 방법이 있다.
*/

// 구조적 타이핑
interface Vector2D{
  x: number;
  y: number;
}
function calculateLength(v: Vector2D){
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}
const v: NamedVector = {x: 3, y: 4, name: 'Zee'};
calculateLength(v);
// Vector2D와 NamedVector의 관계를 선언하지 않았는데 ( calculateLength의 매개변수인 Vector2D와 NamedVector2D 간의 관계가 없음) 동작함
// NamedVector를 위한 별도의 calculateLength 도 구현이 안되어있음
// 이유 : js의 런타임 동작을 모델링하기 때문에 NamedVector의 구조가 Vector2D의 구조와 호환되기 때문에 호출이 가능하다.
// 이를 구조적 타이핑이라 한다.

interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function normalize(v: Vector3D){
  const length = calculateLength(v);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}

// 위 코드는 타입체커는 발견하지 못하지만 오류 동작이다.
// Vector3D와 호환되는 {x, y, z} 객체로 calculateLength를 호출하면 구조적 타이핑 관점에서 x, y 가 Vector2D에 있기 때문에 호환된다. 
// 함수를 작성할 때, 호출에 사용되는 매개변수의 속성들이 매개변수의 타입에 선언된 속성만을 가지는 타입을 '봉인된'타입 또는 '정확한 타입'이라 불린다. 
// 해당 타입들은 타입스크립트에서는 표현할 수 없다. ( 책의 표현을 빌리자면 타입은 열려있다. )


//따라서 다음과 같은 결과를 나타내기도 한다.
function calculateLength1(v: Vector3D){
  let length =0;
  for (const axis of Object.keys(v)){
    const coord = v[axis];
    length += Math.abs(coord);
  }
  return length;
}

const vec3D = {x: 3, y: 4, z: 1, address: '123 Broadway'};
calculateLength1(vec3D)

// 위 코드는 실행되며 NaN을 반환한다.
// 즉, v[axis]가 가지는 type은 어떤 속성이 될지 알 수 없기 때문에 number라고 확정할 수 없어 any라는 오류메시지를 나타내는 것이다.


class C {
  foo: string;
  constructor(foo: string){
    this.foo = foo;
  }
}
const c = new C('instance of C');
const d: C= {foo: 'object literal'};



// 테스트를 작성할 때 구조적 타이핑이 유리하다.
interface Author{
  first: string;
  last: string;
}
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery('SELECT FIRST, LAST FROM AUTHORS');
  return authorRows.map(row=>({first:row[0], last:row[1]}))
}