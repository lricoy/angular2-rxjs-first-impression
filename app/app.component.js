System.register(['angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    var _this = this;
                    var MAX_NUM_ARRAY = 25;
                    var MS_LIMIT = 1000;
                    var MS_INTERVAL_SOURCE = 10;
                    var MS_INTERVAL_ARRAY = 1;
                    console.clear();
                    var i = 0;
                    var timerSource = Rx_1.Observable.create(function (observer) {
                        var idInterval = setInterval(function () {
                            observer.next(i++);
                            if (i >= MS_LIMIT)
                                observer.complete();
                        }, MS_INTERVAL_SOURCE);
                        return function () {
                            clearInterval(idInterval);
                        };
                    });
                    var arrayStrem = Rx_1.Observable.create(function (observer) {
                        var myVet = Array.from(Array(MAX_NUM_ARRAY).keys());
                        var idInterval = setInterval(function () {
                            myVet[Math.floor(Math.random() * (MAX_NUM_ARRAY - 0)) + 0] = new Date().getMilliseconds();
                            observer.next(myVet);
                            if (i >= MS_LIMIT)
                                observer.complete();
                        }, MS_INTERVAL_ARRAY);
                        return function () {
                            clearInterval(idInterval);
                        };
                    });
                    var result = timerSource
                        .map(function (x) { return parseInt(x); })
                        .filter(function (x) { return x % 2 === 0; })
                        .reduce(function (acc, x, idx, source) {
                        return acc + x;
                    }, 1);
                    var scanSteram = timerSource
                        .map(function (x) { return parseInt(x); })
                        .filter(function (x) { return x % 2 === 0; })
                        .scan(function (a, c) { return a + c; }, 1);
                    this.bindStream = arrayStrem;
                    arrayStrem.subscribe(function () { }, function (err) { return console.log(err); }, function () { return console.log('onComplete of arrayStrem', new Date().getMilliseconds()); });
                    scanSteram.subscribe(function (x) { return (_this.currentSum = x); }, function (err) { return console.log(err); }, function () { return console.log('onComplete of scanStream', new Date().getMilliseconds()); });
                    timerSource.subscribe(function (x) { return (_this.currentValue = x); }, function (err) { return console.log(err); }, function () { return console.log('onComplete of mapper', new Date().getMilliseconds()); });
                    result.subscribe(function (x) { return console.log(x); }, function (err) { return console.log(err); }, function () { return console.log('onComplete of reduce', new Date().getMilliseconds()); });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<h1>My First ANgular 2 App</h1>\n    <pre>Current iteration: {{ currentValue }} </pre>\n    <pre>Current sum: {{ currentSum }} </pre>\n    \n    \n    <p *ngFor=\"#item of bindStream | async\" class=\"animate-flicker\">{{ item }}</p>\n    \n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map