//D8

var subject =  new rxjs.Subject();


subject.subscribe({
    next: (v) => console.log('ObserverA -->'+ v)
});

subject.subscribe({
    next: (v) => console.log('ObserverB -->'+ v)
});


var observable3 = from([1,2,3]);
observable3.subscribe(subject);

//subject es un observer
//subject tabien es observble
//la unica maneera que cualquier ejecucon de observers sea compartida con mucltipes observes
//

//d9
console.log()
console.log('muilticast')
console.log()


var source_1 = from([1,2,3,4,5,6]);
var subject_1 =  new rxjs.Subject();



var multicasted = source_1.pipe(multicast(subject_1));


multicasted.subscribe({
    next: (v)=> console.log("MC observerA: " + v)
});

multicasted.subscribe({
    next: (v)=> console.log("MC observerb: " + v)
});

multicasted.connect();


// devvuelve un observabkle con metodo connect



//D10
//“Reference Couting”!
//cuando llamamos al connect tenemos que handlear.. resulta engorroso..
//conectar cuando llegue  el primer observer y cancelar cunado  el ultimo cancele la subscripcion


var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);
var subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log('observerB: ' + v)
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);