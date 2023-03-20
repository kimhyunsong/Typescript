/* any 타입 지향하기 */

let age: number;
//age = '12';
age = '12' as any;
// 1. any 타입에는 타입 안정성이 없다.
age += 1;
// 런타임에는 정상이나 결과값은 "121"

// 2. 함수 시그니처를 무시한다.
// 함수를 호출 하는 쪽은 약속된 타입의 입력을 제공하고, 함수는 약속된 타입의 출력을 반환한다.
// 그러나 any 타입을 사용하면 이러한 약속을 무시한다.

function calculateAge(birthday: Date): number {
  return 1;
}
let birthday: any = '1996-01-04';
calculateAge(birthday) 
// 해당 코드가 런타임에서 실행될 때 string '1996-01-04' 값이 암묵적 변환이 되어버리므로, 오류없이 실행되기에 문제가 될 수 있다.


//3. any 타입은 코드 리팩토링 때 버그를 감춘다.

interface ComponentProps {
  onSelectItem: (item: any) => void;
}

function renderSelector(props: ComponentProps){}
let selectedId: number = 0;

function handleSelectItem(item: any){
  selectedId:item.id;
}

renderSelector({onSelectItem: handleSelectItem});

