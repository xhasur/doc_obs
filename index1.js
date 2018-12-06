//1
const hello = rxjs.Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});


//const subscribe = hello.subscribe(val => console.log(val));


console.log('just antes de subscribirnos');
hello.subscribe({
  next : x => console.log('x vale', x),
  error: err => console.log('algo salio mal', err),
  complete: () => console.log('done'),
});
console.log('just despues de subscribirnos');

//2

var button = document.querySelector('button');
//Rx.Observable.fromEvent(button, 'click');
var o = fromEvent(button, 'click');
// creamos un “Observable” sobre el evento click del boton.
//"Agregamos" a nuestra colección de eventos futuros” (observable) 
// un posible evento futuro en button del tipo click .
var a = o.subscribe(() => console.log('Clicked RxJS!'));
var b = o.subscribe(() => alert('Clicked RxJS'));

//2


var buttonMap = document.getElementById('RxJSButton');

// Rx.Observable.fromEvent(button, 'click')
//   .throttleTime(1000)
//   .map(event => event.clientX)
//   .scan((count, clientX) => count + clientX, 0)
//   .subscribe(count => console.log(count));

var source = fromEvent(buttonMap, 'click');
source.pipe(
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0),
    catchError(err => of('error found')),
   ).subscribe(count => console.log(count)); 

//4 D5



var observable = rxjs.Observable.create(function subscribe(observer) {
    var id = setInterval(() => {
        observer.next('hola');
      }, 1000);
      return function unsubscribe() {
        clearInterval(id);
      };
    });
  

   // observable.subscribe((x) => console.log(x));

//5

  //const observableArr = Rx.Observable.from([1, 2, 3, 4, 5]);

  const observableArr = from([1, 2, 3, 4, 5]);
  var subscription = observableArr.subscribe((x) => console.log(x));
  subscription.unsubscribe()




//6 D6

var observer = {
    next : x => console.log('x vale', x),
    error: err => console.log('algo salio mal', err),
    complete: () => console.log('done'),
  }


//7 D7

// var observable1 = Rx.Observable.interval(400);

var observable1 = interval(400);
var observable2 = interval(300);

var subscription = observable1.subscribe(x=> console.log('primero: ' + x));
var childSubscription = observable2.subscribe(x=> console.log('segundo: ' + x));

subscription.add(childSubscription);
//tmbien tiene metodo remove
//subscripotion padre  desusbcribe al hijo

setTimeout(()=>{
    // subscription.remove(childSubscription);
    subscription.unsubscribe();
}, 1000);
