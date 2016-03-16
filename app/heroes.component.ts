import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {HeroDetailComponent} from './hero-detail.component';
import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
    selector: 'my-heroes',
    directives: [HeroDetailComponent],
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html'
})
export class HeroesComponent implements OnInit { 
    heroes: Hero[];
    selectedHero: Hero;
    
    gotoDetail() {
        this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }    
    
    onSelect(hero: Hero) { 
        this.selectedHero = hero; 
    }
       
    getHeroes(){
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    
    ngOnInit(){
        this.getHeroes();
    }
    
    constructor(private _router: Router,private _heroService: HeroService) {}
}