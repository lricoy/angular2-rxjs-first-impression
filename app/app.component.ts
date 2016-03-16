import {Component} from 'angular2/core'
import {Observable, Subject} from 'rxjs/Rx'

@Component({
    selector: 'my-app',
    template: `<h1>My First ANgular 2 App</h1>
    <pre>Current iteration: {{ currentValue }} </pre>
    <pre>Current sum: {{ currentSum }} </pre>
    
    
    <p *ngFor="#item of bindStream | async" class="animate-flicker">{{ item }}</p>
    
    `  
})

export class AppComponent { 
    currentValue: number;
    currentSum: number;
    bindStream: Observable<Object>;
    
    constructor() {
        const MAX_NUM_ARRAY = 25;
        const MS_LIMIT = 1000;
        const MS_INTERVAL_SOURCE = 10;
        const MS_INTERVAL_ARRAY = 1;
        
        console.clear();
        
        let i = 0;
        let timerSource = Observable.create((observer) =>{
        
            let idInterval = setInterval(() => {
                observer.next(i++);
                if(i >= MS_LIMIT) observer.complete();
            }, MS_INTERVAL_SOURCE);
            
            return () => {
                clearInterval(idInterval);
            };
        });
        
        let arrayStrem = Observable.create((observer) => {
           let myVet = Array.from(Array(MAX_NUM_ARRAY).keys());
           
            let idInterval = setInterval(() => {
                myVet[Math.floor(Math.random() * (MAX_NUM_ARRAY - 0)) + 0] = new Date().getMilliseconds();
                observer.next(myVet);
                if(i >= MS_LIMIT) observer.complete();
            }, MS_INTERVAL_ARRAY);
            
            return () => {
                clearInterval(idInterval);
            };      
        });
        
       let result = timerSource
            .map(x => parseInt(x))
            .filter(x=> x % 2 === 0)
            .reduce(function (acc, x, idx, source) {
                return acc + x;
            }, 1);
            
       let scanSteram = timerSource
            .map(x => parseInt(x))
            .filter(x=> x % 2 === 0)
            .scan((a,c) => a + c, 1);     
        
      this.bindStream = arrayStrem;
            
            
      arrayStrem.subscribe(
            () => {},
            err => console.log(err),
            () => console.log('onComplete of arrayStrem', new Date().getMilliseconds())
        );      

       scanSteram.subscribe(
            (x:number) => (this.currentSum = x),
            err => console.log(err),
            () => console.log('onComplete of scanStream', new Date().getMilliseconds())
        );
        
       timerSource.subscribe(
            (x:number) => (this.currentValue = x),
            err => console.log(err),
            () => console.log('onComplete of mapper', new Date().getMilliseconds())
        );

       result.subscribe(
            x => console.log(x),
            err => console.log(err),
            () => console.log('onComplete of reduce', new Date().getMilliseconds())
        );


    }
}